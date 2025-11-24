import React, { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
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
import {
  lockBodyScroll,
  unlockBodyScroll,
} from "../../../../utils/functions/common.function";
import Modal from "../../../../components/shared/Modal";
import {
  apiGetSubscriptionCardDetails,
  apiGetSubscriptionManagement,
  apiGetSubscriptions,
} from "../../../../services/SubscriptionService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import EditSubscriptionModal from "./components/EditSubscriptionModal";
import Loading from "../../../../components/shared/Loading/Loading";
import { useAppSelector } from "../../../../store";
import Base from "../../../../components/animations/Base";
import Tag from "../../../../components/ui/Tag";
import CardSubtitle from "../../../../components/ui/CardSubtitle";

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
    id: 1,
    plan_name: "Subscription 1 : 100$",
    status: ["Active", "Premium"],
    account: "AC001",
    next_billing: "Dec 15, 2024",
    features_count: "3 features included",
    amount: "4500",
    billing_cycle: "monthly",
  },
];

// Static data for Subscription Management
const subscriptionManagementData = [
  {
    id: 1,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    account: "AC001",
    next_billing: "Dec 15, 2024",
    due_date: "Dec 15, 2024",
    payment_type: "Cash",
    amount: "4500",
    billing_cycle: "monthly",
  },
  {
    id: 2,
    plan_name: "Metro Taxi Co.",
    status: ["Suspended", "Basic"],
    account: "AC001",
    next_billing: "Dec 15, 2024",
    due_date: null,
    payment_type: "Card",
    amount: "4500",
    billing_cycle: "monthly",
  },
  {
    id: 3,
    plan_name: "Metro Taxi Co.",
    status: ["Pending", "Premium"],
    account: "AC001",
    next_billing: "Dec 15, 2024",
    due_date: null,
    payment_type: "Cash",
    amount: "4500",
    billing_cycle: "monthly",
  },
  {
    id: 4,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    account: "AC001",
    next_billing: "Dec 15, 2024",
    due_date: null,
    payment_type: "Cash",
    amount: "4500",
    billing_cycle: "monthly",
  },
  {
    id: 5,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Basic"],
    account: "AC002",
    next_billing: "Dec 20, 2024",
    due_date: null,
    payment_type: "Card",
    amount: "3500",
    billing_cycle: "monthly",
  },
  {
    id: 6,
    plan_name: "Metro Taxi Co.",
    status: ["Suspended", "Premium"],
    account: "AC003",
    next_billing: "Dec 25, 2024",
    due_date: null,
    payment_type: "Cash",
    amount: "5000",
    billing_cycle: "monthly",
  },
  {
    id: 7,
    plan_name: "Metro Taxi Co.",
    status: ["Pending", "Basic"],
    account: "AC004",
    next_billing: "Jan 1, 2025",
    due_date: null,
    payment_type: "Card",
    amount: "3000",
    billing_cycle: "monthly",
  },
  {
    id: 8,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    account: "AC005",
    next_billing: "Jan 5, 2025",
    due_date: null,
    payment_type: "Cash",
    amount: "4800",
    billing_cycle: "monthly",
  },
  {
    id: 9,
    plan_name: "Metro Taxi Co.",
    status: ["Suspended", "Basic"],
    account: "AC006",
    next_billing: "Jan 10, 2025",
    due_date: null,
    payment_type: "Card",
    amount: "3200",
    billing_cycle: "monthly",
  },
  {
    id: 10,
    plan_name: "Metro Taxi Co.",
    status: ["Pending", "Premium"],
    account: "AC007",
    next_billing: "Jan 15, 2025",
    due_date: null,
    payment_type: "Cash",
    amount: "4600",
    billing_cycle: "monthly",
  },
  {
    id: 11,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Basic"],
    account: "AC008",
    next_billing: "Jan 20, 2025",
    due_date: null,
    payment_type: "Card",
    amount: "3400",
    billing_cycle: "monthly",
  },
  {
    id: 12,
    plan_name: "Metro Taxi Co.",
    status: ["Active", "Premium"],
    account: "AC009",
    next_billing: "Jan 25, 2025",
    due_date: null,
    payment_type: "Cash",
    amount: "4900",
    billing_cycle: "monthly",
  },
];

const Subscription = () => {
  // Existing Subscription Types - static
  const [_searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
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

  // Pending Subscription - Static data (same as Subscription Management)

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.subscription
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

  const debouncedSearchRef = useRef(
    debounce((searchValue) => {
      setDebouncedSearchQuery(searchValue);
    }, 500)
  );

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    debouncedSearchRef.current(value);
  }, []);

  useEffect(() => {
    const debouncedFn = debouncedSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

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

  const getSubscriptions = async (search = "") => {
    try {
      setIsSubscriptionsLoading(true);
      const result = await apiGetSubscriptions({
        page: currentPage,
        perPage: itemsPerPage, // Use itemsPerPage for Existing Subscription Types
        search: search || undefined,
      });
      if (result?.status === 200) {
        const list = result?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setAllSubscription(list);
        setSubscriptionListRaw(rows);
        setSubscriptionListDisplay(rows);
      }
    } catch (errors) {
      console.log(errors, "err---");
      setSubscriptionListRaw([]);
      setSubscriptionListDisplay([]);
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsSubscriptionsLoading(false);
    }
  };

  const getSubscriptionManagement = async (search = "") => {
    try {
      setIsSubscriptionsLoading(true);
      const result = await apiGetSubscriptionManagement({
        page: currentPage,
        perPage: itemsPerPage,
        search: search || undefined,
      });

      if (result?.status === 200) {
        const list = result?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setSubscriptionManagementDisplay(list);
        setSubscriptionListRaw(rows);
        setSubscriptionManagementDisplay(rows);
      }
    } catch (errors) {
      setSubscriptionListRaw([]);
      setSubscriptionListDisplay([]);
    } finally {
      setIsSubscriptionsLoading(false);
    }
  };

  const getSubscriptionCardDetails = async () => {
    try {
      setIsSubscriptionCardDetailsLoading(true);
      const result = await apiGetSubscriptionCardDetails();
      if (result?.status === 200) {
        setSubscriptionCardDetails(result?.data?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsSubscriptionCardDetailsLoading(false);
    }
  };

  // Pending Subscription - Static data with search and filters
  const [pendingSearchQuery, setPendingSearchQuery] = useState("");
  const [debouncedPendingSearchQuery, setDebouncedPendingSearchQuery] =
    useState("");
  const [pendingSelectedStatus, setPendingSelectedStatus] = useState(
    STATUS_OPTIONS[0]
  );
  const [pendingSelectedPlan, setPendingSelectedPlan] = useState(
    PLAN_OPTIONS[0]
  );
  const [pendingSelectedPaymentType, setPendingSelectedPaymentType] = useState({
    value: "all",
    label: "Cash/Card",
  });
  const [pendingSubscriptionDisplay, setPendingSubscriptionDisplay] = useState(
    []
  );
  const [pendingSubscriptionCurrentPage, setPendingSubscriptionCurrentPage] =
    useState(1);
  const [pendingItemsPerPage, setPendingItemsPerPage] = useState(4);
  const [allPendingSubscription, setAllPendingSubscription] = useState({
    data: [],
    last_page: 1,
  });
  const [isPendingFilterOpen, setIsPendingFilterOpen] = useState(false);

  const debouncedPendingSearchRef = useRef(
    debounce((searchValue) => {
      setDebouncedPendingSearchQuery(searchValue);
    }, 500)
  );

  const handlePendingSearchChange = useCallback((value) => {
    setPendingSearchQuery(value);
    debouncedPendingSearchRef.current(value);
  }, []);

  useEffect(() => {
    const debouncedFn = debouncedPendingSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  useEffect(() => {
    // Filter and search logic for pending subscriptions
    let filteredData = [...subscriptionManagementData];

    // Search filter
    if (debouncedPendingSearchQuery && debouncedPendingSearchQuery.trim()) {
      const searchLower = debouncedPendingSearchQuery.toLowerCase().trim();
      filteredData = filteredData.filter(
        (sub) =>
          sub.plan_name?.toLowerCase().includes(searchLower) ||
          sub.account?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (pendingSelectedStatus?.value && pendingSelectedStatus.value !== "all") {
      filteredData = filteredData.filter((sub) =>
        sub.status?.some(
          (s) => s.toLowerCase() === pendingSelectedStatus.value.toLowerCase()
        )
      );
    }

    // Plan filter
    if (pendingSelectedPlan?.value && pendingSelectedPlan.value !== "all") {
      filteredData = filteredData.filter((sub) =>
        sub.status?.some(
          (s) => s.toLowerCase() === pendingSelectedPlan.value.toLowerCase()
        )
      );
    }

    // Payment type filter
    if (
      pendingSelectedPaymentType?.value &&
      pendingSelectedPaymentType.value !== "all"
    ) {
      filteredData = filteredData.filter(
        (sub) =>
          sub.payment_type?.toLowerCase() ===
          pendingSelectedPaymentType.value.toLowerCase()
      );
    }

    // Pagination - show items per page
    const startIndex =
      (pendingSubscriptionCurrentPage - 1) * pendingItemsPerPage;
    const endIndex = startIndex + pendingItemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Update total pages
    const totalPages = Math.ceil(filteredData.length / pendingItemsPerPage);
    setAllPendingSubscription({
      data: filteredData,
      last_page: totalPages || 1,
    });

    setPendingSubscriptionDisplay(paginatedData);
  }, [
    pendingSubscriptionCurrentPage,
    pendingItemsPerPage,
    debouncedPendingSearchQuery,
    pendingSelectedStatus,
    pendingSelectedPlan,
    pendingSelectedPaymentType,
  ]);

  const handlePendingSubscriptionPageChange = (pageNumber) => {
    setPendingSubscriptionCurrentPage(pageNumber);
  };

  const handlePendingSubscriptionItemsPerPageChange = (newItemsPerPage) => {
    // Fixed at 4 items per page for Pending Subscription
    setPendingItemsPerPage(4);
    setPendingSubscriptionCurrentPage(1);
  };

  const handlePendingStatusChange = (option) => {
    setPendingSelectedStatus(option);
    setPendingSubscriptionCurrentPage(1);
  };

  const handlePendingPlanChange = (option) => {
    setPendingSelectedPlan(option);
    setPendingSubscriptionCurrentPage(1);
  };

  const handlePendingPaymentTypeChange = (option) => {
    setPendingSelectedPaymentType(option);
    setPendingSubscriptionCurrentPage(1);
  };

  const openPendingFilter = () => {
    setIsPendingFilterOpen(true);
    lockBodyScroll();
  };

  const closePendingFilter = () => {
    setIsPendingFilterOpen(false);
    unlockBodyScroll();
  };

  useEffect(() => {
    getSubscriptionCardDetails();
  }, []);

  // Initial mount - call API once for Existing Subscription Types
  const prevSearchRef = useRef(debouncedSearchQuery);
  const prevItemsPerPageRef = useRef(itemsPerPage);
  const prevCurrentPageRef = useRef(currentPage);
  const hasCalledInitial = useRef(false);

  useEffect(() => {
    if (!hasCalledInitial.current) {
      hasCalledInitial.current = true;
      getSubscriptions(debouncedSearchQuery);
      prevSearchRef.current = debouncedSearchQuery;
      prevItemsPerPageRef.current = itemsPerPage;
      prevCurrentPageRef.current = currentPage;
    }

    if (!hasCalledInitial.current) {
      hasCalledInitial.current = true;
      getSubscriptionManagement(debouncedSearchQuery);
      prevSearchRef.current = debouncedSearchQuery;
      prevItemsPerPageRef.current = itemsPerPage;
      prevCurrentPageRef.current = currentPage;
    }
  }, []);

  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }
    getSubscriptions(debouncedSearchQuery);
    getSubscriptionManagement(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }
    const searchChanged = prevSearchRef.current !== debouncedSearchQuery;
    const itemsPerPageChanged = prevItemsPerPageRef.current !== itemsPerPage;
    if (searchChanged || itemsPerPageChanged) {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery, itemsPerPage]);

  useEffect(() => {
    if (!hasCalledInitial.current) {
      return;
    }
    const pageChanged = prevCurrentPageRef.current !== currentPage;
    const searchChanged = prevSearchRef.current !== debouncedSearchQuery;
    const itemsPerPageChanged = prevItemsPerPageRef.current !== itemsPerPage;
    if (pageChanged || searchChanged || itemsPerPageChanged) {
      getSubscriptions(debouncedSearchQuery);
      getSubscriptionManagement(debouncedSearchQuery);
      prevCurrentPageRef.current = currentPage;
      prevSearchRef.current = debouncedSearchQuery;
      prevItemsPerPageRef.current = itemsPerPage;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, debouncedSearchQuery]);

  // Pagination for Subscription Management (static data, no filters/search)
  const [subscriptionManagementDisplay, setSubscriptionManagementDisplay] =
    useState([]);
  const [
    subscriptionManagementCurrentPage,
    setSubscriptionManagementCurrentPage,
  ] = useState(1);

  useEffect(() => {
    // Pagination - show 4 items per page for Subscription Management
    const startIndex = (subscriptionManagementCurrentPage - 1) * 4;
    const endIndex = startIndex + 4;
    const paginatedData = subscriptionManagementData.slice(
      startIndex,
      endIndex
    );

    setSubscriptionManagementDisplay(paginatedData);
  }, [subscriptionManagementCurrentPage]);

  const handleSubscriptionManagementPageChange = (pageNumber) => {
    setSubscriptionManagementCurrentPage(pageNumber);
  };

  const handleSubscriptionManagementItemsPerPageChange = (newItemsPerPage) => {
    // Items per page is fixed at 4 for Subscription Management
    setSubscriptionManagementCurrentPage(1);
  };

  if (isSubscriptionCardDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

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
                value: `${card?.valuePreAssets || ""}${subscriptionCardDetails[card?.value] ?? 0
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
              {/* Existing Subscription Types - Dynamic, show all items from API */}
              <Loading loading={isSubscriptionsLoading} type="cover">
                <div>
                  <DataDetailsTable
                    rowType="subscription"
                    companies={subscriptionListDisplay}
                    actionOptions={[
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
                      {
                        label: "View",
                        onClick: (item) => {
                          setSelectedId(item?.id);
                          setIsSubscriptionModalOpen({
                            type: "view",
                            isOpen: true,
                          });
                        },
                      },
                    ]}
                  />
                </div>
              </Loading>
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
              {/* Subscription Management - Static data, show 4 items per page, no search/filters */}
              <div>
                {/* <DataDetailsTable
                  rowType="subscription"
                  companies={subscriptionManagementDisplay}
                  actionOptions={[
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
                    {
                      label: "View",
                      onClick: (item) => {
                        setSelectedId(item?.id);
                        setIsSubscriptionModalOpen({
                          type: "view",
                          isOpen: true,
                        });
                      },
                    },
                  ]}
                /> */}
              </div>
              {/* {Array.isArray(subscriptionManagementDisplay) &&
                subscriptionManagementDisplay.length > 0 ? (
                <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
                  <Pagination
                    currentPage={subscriptionManagementCurrentPage}
                    totalPages={Math.ceil(
                      subscriptionManagementData.length / 4
                    )}
                    itemsPerPage={4}
                    onPageChange={handleSubscriptionManagementPageChange}
                    onItemsPerPageChange={
                      handleSubscriptionManagementItemsPerPageChange
                    }
                    itemsPerPageOptions={PAGE_SIZE_OPTIONS}
                    pageKey="subscriptionManagement"
                  />
                </div>
              ) : null} */}
            </div>
            {/* Pending Subscription Section - Static data with search/filters */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-[#1F41BB]">
              <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
                <ChildText text="Pending Subscription" size="2xl" />
              </div>
              <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
                <div className="md:w-full w-[calc(100%-54px)] sm:flex-1">
                  <SearchBar
                    value={pendingSearchQuery}
                    onSearchChange={handlePendingSearchChange}
                    className="w-full md:max-w-[400px] max-w-full"
                  />
                </div>
                {/* Mobile filter trigger */}
                <div className="flex justify-end md:hidden">
                  <button
                    type="button"
                    className="inline-flex w-[54px] h-[54px] items-center justify-center rounded-lg bg-[#ffffff] border border-[#E9E9E9] text-[#333] text-sm font-medium shadow-sm"
                    onClick={openPendingFilter}
                  >
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
                <div className="hidden md:flex flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                  <CustomSelect
                    variant={2}
                    options={[
                      { value: "all", label: "Cash/Card" },
                      { value: "cash", label: "Cash" },
                      { value: "card", label: "Card" },
                    ]}
                    value={pendingSelectedPaymentType}
                    onChange={handlePendingPaymentTypeChange}
                    placeholder="Cash/Card"
                  />
                  <CustomSelect
                    variant={2}
                    options={STATUS_OPTIONS}
                    value={pendingSelectedStatus}
                    onChange={handlePendingStatusChange}
                    placeholder="All Status"
                  />
                  <CustomSelect
                    variant={2}
                    options={PLAN_OPTIONS}
                    value={pendingSelectedPlan}
                    onChange={handlePendingPlanChange}
                    placeholder="All Subscription"
                  />
                </div>
              </div>
              <div>
                <DataDetailsTable
                  rowType="subscription"
                  companies={pendingSubscriptionDisplay}
                  actionOptions={[
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
                  ]}
                />
              </div>
              {Array.isArray(pendingSubscriptionDisplay) &&
                pendingSubscriptionDisplay.length > 0 ? (
                <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
                  <Pagination
                    currentPage={pendingSubscriptionCurrentPage}
                    totalPages={allPendingSubscription.last_page}
                    itemsPerPage={4}
                    onPageChange={handlePendingSubscriptionPageChange}
                    onItemsPerPageChange={
                      handlePendingSubscriptionItemsPerPageChange
                    }
                    itemsPerPageOptions={[4]}
                    pageKey="pendingSubscription"
                  />
                </div>
              ) : null}
              {/* Mobile Filter Bottom Sheet */}
              <AnimatePresence>
                {isPendingFilterOpen && (
                  <div className="fixed inset-0 z-[2000] md:hidden">
                    <div
                      className="absolute inset-0 bg-black/40"
                      onClick={closePendingFilter}
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
                          onClick={closePendingFilter}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18M6 6L18 18"
                              stroke="#333"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <CustomSelect
                          variant={2}
                          options={[
                            { value: "all", label: "Cash/Card" },
                            { value: "cash", label: "Cash" },
                            { value: "card", label: "Card" },
                          ]}
                          value={pendingSelectedPaymentType}
                          onChange={handlePendingPaymentTypeChange}
                          placeholder="Cash/Card"
                        />
                        <CustomSelect
                          variant={2}
                          options={STATUS_OPTIONS}
                          value={pendingSelectedStatus}
                          onChange={handlePendingStatusChange}
                          placeholder="All Status"
                        />
                        <CustomSelect
                          variant={2}
                          options={PLAN_OPTIONS}
                          value={pendingSelectedPlan}
                          onChange={handlePendingPlanChange}
                          placeholder="All Subscription"
                        />
                      </div>
                    </Base>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </CardContainer>
        </div>
      </div>
      <Modal
        isOpen={isSubscriptionModalOpen.isOpen}
        className="p-4 sm:p-6 lg:p-10"
      >
        {isSubscriptionModalOpen.type === "new" ? (
          <AddSubscriptionModal
            setIsOpen={setIsSubscriptionModalOpen}
            onRefresh={handleRefresh}
          />
        ) : (
          <EditSubscriptionModal
            id={selectedId}
            setIsOpen={setIsSubscriptionModalOpen}
            onRefresh={isSubscriptionModalOpen.type === "edit" ? handleRefresh : null}
            isReadOnly={isSubscriptionModalOpen.type === "view"}
          />
        )}
      </Modal>
    </div>
  );
};

export default Subscription;
