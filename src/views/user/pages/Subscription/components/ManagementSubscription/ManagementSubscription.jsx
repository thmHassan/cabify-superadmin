import { useEffect, useState } from "react";
import { apiGetSubscriptionManagement } from "../../../../../../services/SubscriptionService";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import Pagination from "../../../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS, PLAN_OPTIONS, STATUS_OPTIONS } from "../../../../../../constants/selectOptions";
import { useAppSelector } from "../../../../../../store";
import Modal from "../../../../../../components/shared/Modal";
import AddExtendSubscription from "../PendingSubscription/component/AddExtendSubscription/AddExtendSubscription";
import CardContainer from "../../../../../../components/shared/CardContainer";


const ManagementSubscription = () => {
    const [ManagementSubscriptionListDisplay, setManagementSubscriptionListDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
    const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
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
        fetchManagementSubscriptions();
    }, []);

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

    const fetchManagementSubscriptions = async () => {
        setIsLoading(true);
        try {
            const result = await apiGetSubscriptionManagement({
                page: currentPage,
                perPage: itemsPerPage,
            });
            if (result?.status === 200) {
                const data = result?.data?.list?.data || [];
                setManagementSubscriptionListDisplay(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div>
            <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
                <ChildText text="Subscription Management" size="2xl" />
            </div>
            <CardContainer className="p-3 sm:p-4 lg:p-5">
                <div className="mb-4 sm:mb-7 pb-4 sm:pb-6 border-b-2 border-[#E9E9E9]">
                    <div>
                        <DataDetailsTable
                            rowType="managementsubscription"
                            companies={ManagementSubscriptionListDisplay}
                            actionOptions={[
                                // {
                                //     label: "View Details",
                                //     onClick: (item) => handlePaymentAction(item),
                                // },
                                {
                                    label: "Extend Subscription",
                                    onClick: (item) => handleExtendSubscription(item),
                                },
                            ]}
                        />
                    </div>
                    {Array.isArray(ManagementSubscriptionListDisplay) &&
                        ManagementSubscriptionListDisplay.length > 0 ? (
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

export default ManagementSubscription;
