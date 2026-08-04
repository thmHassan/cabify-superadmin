import { useCallback, useEffect, useState } from "react";
import { apiGetSubscriptionManagement } from "../../../../../../services/SubscriptionService";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Pagination from "../../../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../../../constants/selectOptions";
import { useAppSelector } from "../../../../../../store";
import Modal from "../../../../../../components/shared/Modal";
import AddExtendSubscription from "../PendingSubscription/component/AddExtendSubscription/AddExtendSubscription";
import CardContainer from "../../../../../../components/shared/CardContainer";
import SubscriptionManagementTable from "./SubscriptionManagementTable";

const ManagementSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [pagination, setPagination] = useState({ last_page: 1, total: 0 });

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.subscription
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

  const fetchManagementSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const result = await apiGetSubscriptionManagement({
        page: currentPage,
        perPage: itemsPerPage,
        search: search.trim() || undefined,
      });
      const list = result?.data?.list || {};
      setSubscriptions(Array.isArray(list.data) ? list.data : []);
      setPagination({ last_page: list.last_page || 1, total: list.total || 0 });
    } catch (err) {
      setSubscriptions([]);
      setError(err?.response?.data?.message || "Unable to load subscriptions.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    const timeout = setTimeout(fetchManagementSubscriptions, 350);
    return () => clearTimeout(timeout);
  }, [fetchManagementSubscriptions]);

  const handleExtendSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setIsExtendModalOpen(true);
  };

  const handleModalClose = () => {
    setIsExtendModalOpen(false);
    setSelectedSubscription(null);
  };

  const handleExtensionSuccess = () => {
    handleModalClose();
    fetchManagementSubscriptions();
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:gap-[9px]">
        <ChildText text="Subscription Management" size="2xl" />
        <p className="text-sm text-[#6C6C6C]">
          Track company plans, payment details, expiry dates, and remaining subscription time.
        </p>
      </div>

      <CardContainer className="p-3 sm:p-4 lg:p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#E5E7EB] pb-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-[#252525]">Active company subscriptions</h3>
            <p className="mt-1 text-xs text-[#6C6C6C]">{pagination.total} subscription{pagination.total === 1 ? "" : "s"}</p>
          </div>
          <input
            value={search}
            onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
            placeholder="Search company, email, or phone..."
            className="h-11 w-full rounded-lg border border-[#C5C5C5] px-4 text-sm outline-none focus:border-[#1F41BB] sm:max-w-sm"
          />
        </div>

        {error && <div className="mb-4 rounded-md border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">{error}</div>}

        <SubscriptionManagementTable
          items={subscriptions}
          loading={isLoading}
          onExtend={handleExtendSubscription}
        />

        {subscriptions.length > 0 && (
          <div className="mt-5 border-t border-[#E9E9E9] pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(value) => { setItemsPerPage(value); setCurrentPage(1); }}
              itemsPerPageOptions={PAGE_SIZE_OPTIONS}
              pageKey="subscription"
            />
          </div>
        )}
      </CardContainer>

      <Modal isOpen={isExtendModalOpen} size="md" className="w-full p-4 sm:p-6">
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
