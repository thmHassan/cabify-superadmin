import { useEffect, useState } from "react";
import { apiGetPendingSubscriptionlist } from "../../../../../../services/SubscriptionService";
import SearchBar from "../../../../../../components/shared/SearchBar";
import CustomSelect from "../../../../../../components/ui/CustomSelect";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Modal from "../../../../../../components/shared/Modal";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import AddExtendSubscription from "./component/AddExtendSubscription/AddExtendSubscription";
import { PLAN_OPTIONS, STATUS_OPTIONS } from "../../../../../../constants/selectOptions";

const PendingSubscription = () => {
    const [pendingSubscriptionListDisplay, setPendingSubscriptionListDisplay] = useState([]);
    const [pendingSearchQuery, setPendingSearchQuery] = useState("");
    const [pendingSelectedPaymentType, setPendingSelectedPaymentType] = useState("all");
    const [pendingSelectedStatus, setPendingSelectedStatus] = useState("all");
    const [pendingSelectedPlan, setPendingSelectedPlan] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

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

    return (
        <div className="mt-6 pt-6 border-t-2 border-[#1F41BB]">
            <ChildText text="Pending Subscription" size="2xl" />

            <div className="flex flex-row items-center gap-5 justify-between mb-5">
                <SearchBar
                    value={pendingSearchQuery}
                    onSearchChange={setPendingSearchQuery}
                    className="w-full md:max-w-[400px]"
                />

                <div className="hidden md:flex gap-5">
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
                </div>
            </div>

            <DataDetailsTable
                rowType="pendingsubscription"
                companies={pendingSubscriptionListDisplay}
                actionOptions={[
                    {
                        label: (item) => item.payment_method || "No Method",
                        onClick: (item) => console.log("Payment Method →", item),
                    },
                    {
                        label: "Extend Subscription",
                        onClick: (item) => handleExtendSubscription(item),
                    },
                ]}
            />

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
