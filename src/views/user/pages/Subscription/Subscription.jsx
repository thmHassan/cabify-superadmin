import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import WalletIcon from "../../../../components/svg/WalletIcon";
import WatchIcon from "../../../../components/svg/WatchIcon";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
import MonthlyRevenueIcon from "../../../../components/svg/MonthlyRevenueIcon";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import CardContainer from "../../../../components/shared/CardContainer";
import AddSubscriptionModal from "./components/AddSubscriptionModal";
import {
  PAGE_SIZE_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../constants/selectOptions";
import Pagination from "../../../../components/ui/Pagination";
import SearchBar from "../../../../components/shared/SearchBar";
import CustomSelect from "../../../../components/ui/CustomSelect";
import { lockBodyScroll, unlockBodyScroll } from "../../../../utils/functions/common.function";
import Modal from "../../../../components/shared/Modal";
import {
  apiGetSubscriptionCardDetails,
  apiGetSubscriptions,
} from "../../../../services/SubscriptionService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import EditSubscriptionModal from "./components/EditSubscriptionModal";
import { useAppSelector } from "../../../../store";
import Base from "../../../../components/animations/Base";

const DASHBOARD_CARDS = [
  {
    title: "Active Subscriptions",
    value: "active_subscription",
    change: "+3 from last hour",
    icon: {
      component: WalletIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Monthly Revenue",
    value: "monthly_revenue",
    valuePreAssets: "$",
    change: "42% from last hour",
    icon: {
      component: MonthlyRevenueIcon,
      width: 24,
      height: 30,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Pending Renewals",
    value: "pending_renewals",
    change: "Due this week",
    icon: {
      component: WatchIcon,
      width: 25,
      height: 25,
      fill: "#C29569",
    },
    backgroundColor: "#fdf3e7",
    color: "#C29569",
  },
];

const companiesData = [
  {
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    features: "New York,45 Drivers,+1-555-0101",
    amount: "4500",
  },
];

const Subscription = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isSubscriptionsLoading, setIsSubscriptionsLoading] = useState(false);
  const [
    isSubscriptionCardDetailsLoading,
    setIsSubscriptionCardDetailsLoading,
  ] = useState(false);
  const [allSubscription, setAllSubscription] = useState({
    data: [],
    last_page: 1,
  });
  const [subscriptionListRaw, setSubscriptionListRaw] = useState([]);
  const [subscriptionListDisplay, setSubscriptionListDisplay] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [subscriptionCardDetails, setSubscriptionCardDetails] = useState({});
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState({
    isOpen: false,
    type: "new",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.subscription
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleStatusChange = (option) => {
    setSelectedStatus(option);
    setCurrentPage(1);
  };

  const handlePlanChange = (option) => {
    setSelectedPlan(option);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const openFilter = () => {
    setIsFilterOpen(true);
    lockBodyScroll();
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    unlockBodyScroll();
  };

  const getSubscriptions = async () => {
    try {
      setIsSubscriptionsLoading(true);
      const result = await apiGetSubscriptions({
        page: currentPage,
        perPage: itemsPerPage,
      });
      if (result?.status === 200) {
        const list = result?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setAllSubscription(list);
        setSubscriptionListRaw(rows);
      }
    } catch (errors) {
      console.log(errors, "err---");
      setSubscriptionListRaw([]);
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsSubscriptionsLoading(false);
    }
  };

  const getSubscriptionCardDetails = async () => {
    try {
      setIsSubscriptionCardDetailsLoading(true);
      const result = await apiGetSubscriptionCardDetails();
      if (result?.status === 200) {
        console.log(result, "res======");
        setSubscriptionCardDetails(result?.data?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsSubscriptionCardDetailsLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionCardDetails();
  }, []);

  useEffect(() => {
    getSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger, currentPage, itemsPerPage]);

  useEffect(() => {
    const query = _searchQuery?.toLowerCase?.() ?? "";
    const plan = _selectedPlan?.value ?? "all";

    let filtered = [...subscriptionListRaw];

    if (query) {
      filtered = filtered.filter((s) => {
        const hay = `${s.plan_name ?? ""} ${s.billing_cycle ?? ""} ${
          s.features ?? ""
        } ${s.amount ?? ""}`.toLowerCase();
        return hay.includes(query);
      });
    }

    if (plan !== "all") {
      filtered = filtered.filter(
        (s) => (s.plan_name ?? "").toLowerCase() === plan.toLowerCase()
      );
    }

    setSubscriptionListDisplay(filtered);
  }, [subscriptionListRaw, _searchQuery, _selectedPlan]);

  if (isSubscriptionsLoading || isSubscriptionCardDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  console.log(allSubscription, "allSubscription=====");

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Subscriptions" />
          <PageSubTitle title="Manage company subscriptions, billing, and plan changes" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsSubscriptionModalOpen({ type: "new", isOpen: true });
            }}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span className="whitespace-nowrap">GC Subscription</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:gap-5 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 1.5xl:grid-cols-3 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard
              key={index}
              data={{
                ...card,
                value: `${card?.valuePreAssets || ""}${
                  subscriptionCardDetails[card?.value] ?? 0
                }`,
              }}
              className={
                DASHBOARD_CARDS.length - 1 === index
                  ? "sm:col-span-2 1.5xl:col-span-1"
                  : "col-span-1"
              }
            />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
            <ChildText text="Existing Subscription Types" size="2xl" />
            <PageSubTitle title="Overview of all company subscriptions and billing status" />
          </div>
          <CardContainer className="p-3 sm:p-4 lg:p-5">
            <div className="mb-4 sm:mb-7 pb-4 sm:pb-6 border-b-2 border-[#E9E9E9]">
              <div>
                {Array.isArray(subscriptionListRaw) &&
                subscriptionListRaw.length > 0 ? (
                  <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
                    <div className="md:w-full w-[calc(100%-54px)] sm:flex-1">
                      <SearchBar onSearchChange={handleSearchChange} className="w-full md:max-w-[400px] max-w-full" />
                    </div>
                    {/* Mobile filter trigger */}
                    <div className="flex justify-end md:hidden">
                      <button
                        type="button"
                        className="inline-flex w-[54px] h-[54px] items-center justify-center rounded-lg bg-[#ffffff] border border-[#E9E9E9] text-[#333] text-sm font-medium shadow-sm"
                        onClick={openFilter}
                      >
                        {/* simple filter funnel icon */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 5H21L14 13V20L10 18V13L3 5Z" stroke="#333333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className="hidden md:flex flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                      <CustomSelect
                        variant={2}
                        options={STATUS_OPTIONS}
                        value={_selectedStatus}
                        onChange={handleStatusChange}
                        placeholder="All Status"
                      />
                      <CustomSelect
                        variant={2}
                        options={PLAN_OPTIONS}
                        value={_selectedPlan}
                        onChange={handlePlanChange}
                        placeholder="All Plans"
                      />
                    </div>
                  </div>
                ) : null}
                <div>
                  <DataDetailsTable
                    companies={subscriptionListDisplay}
                    actionOptions={[
                      // {
                      //   label: "View",
                      //   onClick: (data) => {
                      //     // setSelectedViewData(data);
                      //     // setIsViewPermissionModal(true);
                      //   },
                      // },
                      {
                        label: "Edit",
                        onClick: (item) => {
                          if (item) {
                            setSelectedId(item?.id);
                            setIsSubscriptionModalOpen({
                              type: "edit",
                              isOpen: true,
                            });
                          }
                        },
                      },
                      // {
                      //   label: "Delete",
                      //   onClick: () => {
                      //     console.log("Delete clicked");
                      //   },
                      // },
                    ]}
                  />
                </div>
                {Array.isArray(subscriptionListDisplay) &&
                subscriptionListDisplay.length > 0 ? (
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
            </div>
            {/* Mobile Filter Bottom Sheet */}
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
                      <span className="text-base font-semibold text-[#333]">Filter</span>
                      <button
                        type="button"
                        aria-label="Close filter"
                        className="w-8 h-8 grid place-items-center rounded-full hover:bg-[#f3f3f3]"
                        onClick={closeFilter}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 6L18 18" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M18 6L6 18" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <CustomSelect
                        variant={2}
                        options={STATUS_OPTIONS}
                        value={_selectedStatus}
                        onChange={(opt) => {
                          handleStatusChange(opt);
                        }}
                        placeholder="All Status"
                        className="min-w-0"
                        mobileBgColor="#F3F6FF"
                        mobileBorder="#D6DBF5"
                        forceMobile
                        menuPlacement="top"
                        menuPosition="fixed"
                      />
                      <CustomSelect
                        variant={2}
                        options={PLAN_OPTIONS}
                        value={_selectedPlan}
                        onChange={(opt) => {
                          handlePlanChange(opt);
                        }}
                        placeholder="All Plans"
                        className="min-w-0"
                        mobileBgColor="#F3F6FF"
                        mobileBorder="#D6DBF5"
                        forceMobile
                        menuPlacement="top"
                        menuPosition="fixed"
                      />
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
            <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
              <ChildText text="Subscription Management" size="2xl" />
              <PageSubTitle title="Overview of all company subscriptions and billing status" />
            </div>
            <div>
              {Array.isArray(allSubscription.data) &&
              allSubscription.data.length > 0 ? (
                <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
                  <div className="md:w-full w-[calc(100%-54px)] sm:flex-1">
                    <SearchBar onSearchChange={handleSearchChange} className="w-full md:max-w-[400px] max-w-full" />
                  </div>
                  {/* Mobile filter trigger */}
                  <div className="flex justify-end md:hidden">
                    <button
                      type="button"
                      className="inline-flex w-[54px] h-[54px] items-center justify-center rounded-lg bg-[#ffffff] border border-[#E9E9E9] text-[#333] text-sm font-medium shadow-sm"
                      onClick={openFilter}
                    >
                      {/* simple filter funnel icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5H21L14 13V20L10 18V13L3 5Z" stroke="#333333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="hidden md:flex flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                    <CustomSelect
                      variant={2}
                      options={STATUS_OPTIONS}
                      value={_selectedStatus}
                      onChange={handleStatusChange}
                      placeholder="All Status"
                    />
                    <CustomSelect
                      variant={2}
                      options={PLAN_OPTIONS}
                      value={_selectedPlan}
                      onChange={handlePlanChange}
                      placeholder="All Plans"
                    />
                  </div>
                </div>
              ) : null}
              <div>
                <DataDetailsTable
                  companies={companiesData}
                  onActionClick={() => console.log("object")}
                />
              </div>
              {Array.isArray(allSubscription.data) &&
              allSubscription.data.length > 0 ? (
                <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={1}
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
        </div>
      </div>
      <Modal isOpen={isSubscriptionModalOpen.isOpen} className="p-4 sm:p-6 lg:p-10">
        {isSubscriptionModalOpen.type === "new" ? (
          <AddSubscriptionModal
            setIsOpen={setIsSubscriptionModalOpen}
            onRefresh={handleRefresh}
          />
        ) : (
          <EditSubscriptionModal
            id={selectedId}
            setIsOpen={setIsSubscriptionModalOpen}
            onRefresh={handleRefresh}
          />
        )}
      </Modal>
    </div>
  );
};

export default Subscription;
