import { useEffect, useState } from "react";
import { apiGetPendingSubscriptionlist } from "../../../../../../services/SubscriptionService";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Modal from "../../../../../../components/shared/Modal";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import AddExtendSubscription from "./component/AddExtendSubscription/AddExtendSubscription";
import ApiService from "../../../../../../services/ApiService";
import Pagination from "../../../../../../components/ui/Pagination";
import { CASH_CARD, PAGE_SIZE_OPTIONS, PLAN_OPTIONS, STATUS_OPTIONS, SUBSCRIPTION_OPTIONS } from "../../../../../../constants/selectOptions";
import { useAppSelector } from "../../../../../../store";
import CardContainer from "../../../../../../components/shared/CardContainer";
import SearchBar from "../../../../../../components/shared/SearchBar";
import CustomSelect from "../../../../../../components/ui/CustomSelect";
import { lockBodyScroll, unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { AnimatePresence } from "framer-motion";
import Base from "../../../../../../components/animations/Base";

const PendingSubscription = () => {
    const [pendingSubscriptionListDisplay, setPendingSubscriptionListDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [_selectedStatus, setSelectedStatus] = useState(
        STATUS_OPTIONS.find((o) => o.value === "all") ?? STATUS_OPTIONS[0]
    );
    const [_subscription, setSubscription] = useState(
        SUBSCRIPTION_OPTIONS.find((o) => o.value === "all") ?? SUBSCRIPTION_OPTIONS[0]
    );

    const [_cashCard, setCashCard] = useState(
        CASH_CARD.find((o) => o.value === "all") ?? CASH_CARD[0]
    );

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

    const fetchPendingSubscriptions = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: currentPage,
                perPage: itemsPerPage,
                search: searchQuery || undefined,
                status: _selectedStatus?.value !== "all" ? _selectedStatus.value : undefined,
                subscription: _subscription?.value !== "all" ? _subscription.value : undefined,
                payment_type: _cashCard?.value !== "all" ? _cashCard.value : undefined,
            };

            const result = await apiGetPendingSubscriptionlist(params);

            if (result?.status === 200) {
                setPendingSubscriptionListDisplay(result?.data?.list?.data || []);
                setAllSubscription({
                    data: result?.data?.list?.data || [],
                    last_page: result?.data?.list?.last_page || 1,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingSubscriptions();
    }, [
        currentPage,
        itemsPerPage,
        searchQuery,
        _selectedStatus,
        _subscription,
        _cashCard,
    ]);

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

    const openFilter = () => {
        setIsFilterOpen(true);
        lockBodyScroll();
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
        unlockBodyScroll();
    };

    return (
        <div>
            <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
                <ChildText text="Pending Subscription" size="2xl" />
            </div>
            <CardContainer className="p-3 sm:p-4 lg:p-5">
                <div className="flex lg:flex-row md:flex-col items-stretch gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
                    <div className="flex gap-4 lg:flex-row md:flex-col w-full justify-between ">
                        <div className="md:w-full sm:flex-1">
                            <SearchBar
                                value={searchQuery}
                                onSearchChange={(value) => {
                                    setSearchQuery(value);
                                    setCurrentPage(1);
                                }}
                                className="w-full md:max-w-[400px]"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="w-48 flex flex-row justify-end hidden md:block">
                                <CustomSelect
                                    variant={2}
                                    options={CASH_CARD}
                                    value={_cashCard}
                                    onChange={(val) => {
                                        setCashCard(val);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Cash/Card"
                                    className="w-48"
                                />
                            </div>
                            <div className="w-48 flex justify-end hidden md:block">
                                <CustomSelect
                                    variant={2}
                                    options={STATUS_OPTIONS}
                                    value={_selectedStatus}
                                    onChange={(val) => {
                                        setSelectedStatus(val);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="All Status"
                                    className="w-48"
                                />
                            </div>
                            {/* <div className="w-48 flex justify-end hidden md:block">
                                <CustomSelect
                                    variant={2}
                                    options={SUBSCRIPTION_OPTIONS}
                                    value={_subscription}
                                    onChange={(val) => {
                                        setSubscription(val);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="All Subscription"
                                    className="w-48"
                                />
                            </div> */}
                        </div>
                    </div>
                    {/* Mobile filter trigger */}
                    <div className="flex justify-end md:hidden">
                        <button
                            type="button"
                            className="inline-flex w-[54px] h-[54px] items-center justify-center rounded-lg bg-[#ffffff] border border-[#E9E9E9] text-[#333] text-sm font-medium shadow-sm"
                            onClick={openFilter}
                        >
                            {/* simple filter funnel icon */}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 5H21L14 13V20L10 18V13L3 5Z"
                                    stroke="#333333"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <AnimatePresence>
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-[2000] md:hidden">
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={closeFilter}
                            ></div>
                            <Base
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="absolute left-0 right-0 bottom-0 bg-white rounded-t-2xl shadow-[-4px_8px_20px_0px_#0000000D] p-4"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-base font-semibold text-[#333]">
                                        Filter
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Close filter"
                                        className="w-8 h-8 grid place-items-center rounded-full hover:bg-[#f3f3f3]"
                                        onClick={closeFilter}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 6L18 18"
                                                stroke="#111111"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M18 6L6 18"
                                                stroke="#111111"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <SearchBar
                                        value={searchQuery}
                                        onSearchChange={(value) => {
                                            setSearchQuery(value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full md:max-w-[400px]"
                                    />
                                    <CustomSelect
                                        variant={2}
                                        options={CASH_CARD}
                                        value={_cashCard}
                                        onChange={(val) => {
                                            setCashCard(val);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="Cash/Card"
                                        className="w-full"
                                        mobileBgColor="#F3F6FF"
                                        mobileBorder="#D6DBF5"
                                        forceMobile
                                        menuPlacement="top"
                                        menuPosition="fixed"
                                    />
                                    <CustomSelect
                                        variant={2}
                                        options={STATUS_OPTIONS}
                                        value={_selectedStatus}
                                        onChange={(val) => {
                                            setSelectedStatus(val);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="All Status"
                                        className="w-full"
                                        mobileBgColor="#F3F6FF"
                                        mobileBorder="#D6DBF5"
                                        forceMobile
                                        menuPlacement="top"
                                        menuPosition="fixed"
                                    />
                                    {/* <CustomSelect
                                        variant={2}
                                        options={SUBSCRIPTION_OPTIONS}
                                        value={_subscription}
                                        onChange={(val) => {
                                            setSubscription(val);
                                            setCurrentPage(1);
                                        }}
                                        placeholder="All Subscription"
                                        className="w-full"
                                        mobileBgColor="#F3F6FF"
                                        mobileBorder="#D6DBF5"
                                        forceMobile
                                        menuPlacement="top"
                                        menuPosition="fixed"

                                    /> */}
                                    <button
                                        type="button"
                                        className="mt-1 w-full py-3 rounded-lg bg-[#1F41BB] text-white font-medium"
                                        onClick={closeFilter}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </Base>
                        </div>
                    )}
                </AnimatePresence>
                <div className="mb-4 sm:mb-7 pb-4 sm:pb-6 border-b-2 border-[#E9E9E9]">
                    <div>
                        <DataDetailsTable
                            rowType="pendingsubscription"
                            companies={pendingSubscriptionListDisplay}
                            actionOptions={[
                                // {
                                //     label: "View Details",
                                //     onClick: (item) => handleExtendSubscription(item),
                                // },
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
                    </div>
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
                </div>
            </CardContainer>
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