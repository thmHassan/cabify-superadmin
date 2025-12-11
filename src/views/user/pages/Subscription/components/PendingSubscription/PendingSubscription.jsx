import { useEffect, useState } from "react";
import { apiGetPendingSubscriptionlist } from "../../../../../../services/SubscriptionService";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Modal from "../../../../../../components/shared/Modal";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import AddExtendSubscription from "./component/AddExtendSubscription/AddExtendSubscription";
import ApiService from "../../../../../../services/ApiService";
import Pagination from "../../../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS, PLAN_OPTIONS, STATUS_OPTIONS } from "../../../../../../constants/selectOptions";
import { useAppSelector } from "../../../../../../store";

const PendingSubscription = () => {
    const [pendingSubscriptionListDisplay, setPendingSubscriptionListDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
    const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
    const [allSubscription, setAllSubscription] = useState({
        data: [],
        last_page: 1,
    });

    const savedPagination = useAppSelector(
        (state) => state?.app?.app?.pagination?.subscription
    );
    const [currentPage, setCurrentPage] = useState(
        Number(savedPagination?.currentPage) || 1
    );
    const [itemsPerPage, setItemsPerPage] = useState(
        Number(savedPagination?.itemsPerPage) || 10
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchPendingSubscriptions();
    }, []);

    const fetchPendingSubscriptions = async () => {
        setIsLoading(true);
        try {
            const result = await apiGetPendingSubscriptionlist({});
            if (result?.status === 200) {
                const data = result?.data?.list?.data || [];
                setPendingSubscriptionListDisplay(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExtendSubscription = (subscription) => {
        setSelectedSubscription(subscription);
        setIsExtendModalOpen(true);
    };

    const handleModalClose = () => {
        setIsExtendModalOpen(false);
        setSelectedSubscription(null);
    };

    const handleExtensionSuccess = () => {
        fetchPendingSubscriptions();
        handleModalClose();
    };

    const handlePaymentAction = async (item) => {
        if (!item) return;
        setPaymentError(null);

        try {
            const formData = new FormData();
            formData.append("id", item.id);

            const amount = item?.subscription?.amount
                ? Number(item.subscription.amount)
                : null;

            const billingCycle = item?.subscription?.billing_cycle || null;
            const deductType = item?.subscription?.deduct_type; 

            if (deductType === "card") {
                if (!amount) {
                    setPaymentError("Stripe payment requires amount.");
                    return;
                }

                formData.append("amount", amount);

                const response = await ApiService.createStripePaymentUrl(formData);

                if ((response.status === 200 || response.status === 201) && response.data?.url) {
                    window.location.href = response.data.url; 
                } else {
                    setPaymentError("Stripe URL not received.");
                }

                return; 
            }

            if (deductType === "cash") {
                if (!billingCycle) {
                    setPaymentError("Billing cycle required for cash payment.");
                    return;
                }

                formData.append("billing_cycle", billingCycle);

                const response = await ApiService.cashPayment(formData);

                if (response.status === 200 || response.status === 201) {
                    fetchPendingSubscriptions();
                } else {
                    setPaymentError("Cash payment failed.");
                }

                return;
            }

        } catch (error) {
            setPaymentError(error.response?.data?.message || "Payment action failed");
        }
    };

    return (
        <div className="mt-6 pt-6 border-t-2 border-[#1F41BB]">
            <ChildText text="Pending Subscription" size="2xl" />

            <div className="flex flex-row items-center gap-5 justify-between my-5">
                {/* <SearchBar
                    value={pendingSearchQuery}
                    onSearchChange={setPendingSearchQuery}
                    className="w-full md:max-w-[400px]"
                /> */}

                {/* <div className="hidden md:flex gap-5">
                    <CustomSelect
                        variant={2}
                        options={[
                            { value: "all", label: "Cash/Card" },
                            { value: "cash", label: "Cash" },
                            { value: "card", label: "Card" },
                        ]}
                        value={pendingSelectedPaymentType}
                        onChange={setPendingSelectedPaymentType}
                        placeholder="Cash/Card"
                    />

                    <CustomSelect
                        variant={2}
                        options={STATUS_OPTIONS}
                        value={pendingSelectedStatus}
                        onChange={setPendingSelectedStatus}
                        placeholder="Status"
                    />

                    <CustomSelect
                        variant={2}
                        options={PLAN_OPTIONS}
                        value={pendingSelectedPlan}
                        onChange={setPendingSelectedPlan}
                        placeholder="Subscription"
                    />
                </div> */}
            </div>

            {paymentError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {paymentError}
                </div>
            )}

            <DataDetailsTable
                rowType="pendingsubscription"
                companies={pendingSubscriptionListDisplay}
                actionOptions={[
                    {
                        label: (item) =>
                            item?.subscription?.deduct_type === "card"
                                ? "Online"
                                : item?.subscription?.deduct_type === "cash"
                                    ? "Cash"
                                    : "No Method",
                        onClick: (item) => handlePaymentAction(item),
                    },
                    {
                        label: "Extend Subscription",
                        onClick: (item) => handleExtendSubscription(item),
                    },
                ]}
            />
            {Array.isArray(pendingSubscriptionListDisplay) &&
                pendingSubscriptionListDisplay.length > 0 ? (
                <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={allSubscription.last_page}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        itemsPerPageOptions={PAGE_SIZE_OPTIONS}
                        pageKey="subscription"
                    />
                </div>
            ) : null}

            <Modal
                isOpen={isExtendModalOpen}
                onClose={handleModalClose}
                title="Extend Subscription"
                maxWidth="md"
            >
                <AddExtendSubscription
                    initialValue={selectedSubscription || {}}
                    setIsOpen={setIsExtendModalOpen}
                    onSuccess={handleExtensionSuccess}
                />
            </Modal>
        </div>
    );
};

export default PendingSubscription;