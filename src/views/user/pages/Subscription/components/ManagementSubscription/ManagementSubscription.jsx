import { useEffect, useState } from "react";
import { apiGetSubscriptionManagement } from "../../../../../../services/SubscriptionService";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import Pagination from "../../../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS, PLAN_OPTIONS, STATUS_OPTIONS } from "../../../../../../constants/selectOptions";
import { useAppSelector } from "../../../../../../store";


const ManagementSubscription = () => {
    const [ManagementSubscriptionListDisplay, setManagementSubscriptionListDisplay] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        fetchManagementSubscriptions();
    }, []);

    const fetchManagementSubscriptions = async () => {
        setIsLoading(true);
        try {
            const result = await apiGetSubscriptionManagement({});
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
        <div className="mt-6 pt-6 border-t-2 border-[#1F41BB]">
            <ChildText text="Subscription Management" size="2xl" />

            <DataDetailsTable
                rowType="managementsubscription"
                companies={ManagementSubscriptionListDisplay}
                actionOptions={[
                    // {
                    //     label: (item) =>
                    //         item.payment_method === "stripe"
                    //             ? "Online"
                    //             : item.payment_method === "cash"
                    //                 ? "Cash"
                    //                 : "No Method",
                    //     onClick: (item) => handlePaymentAction(item),
                    // },
                    // {
                    //     label: "Extend Subscription",
                    //     onClick: (item) => handleExtendSubscription(item),
                    // },
                ]}
            />
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
    );
};

export default ManagementSubscription;
