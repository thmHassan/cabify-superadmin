import React, { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import CompaniesIcon from "../../../../components/svg/CompaniesIcon";
import ActiveCompaniesIcon from "../../../../components/svg/ActiveCompaniesIcon";
import MonthlyRevenueIcon from "../../../../components/svg/MonthlyRevenueIcon";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PageTitle from "../../../../components/ui/PageTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import AddCompanyModal from "./components/AddCompanyModal";
import SearchBar from "../../../../components/shared/SearchBar";
import CustomSelect from "../../../../components/ui/CustomSelect";
import {
  STATUS_OPTIONS,
  PLAN_OPTIONS,
  PAGE_SIZE_OPTIONS,
} from "../../../../constants/selectOptions";
import Pagination from "../../../../components/ui/Pagination";
import CompanyInformationModal from "./components/CompanyInformationModal";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import {
  lockBodyScroll,
  unlockBodyScroll,
} from "../../../../utils/functions/common.function";
import Base from "../../../../components/animations/Base";
import ApiService from "../../../../services/ApiService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import Modal from "../../../../components/shared/Modal";
import Loading from "../../../../components/shared/Loading/Loading";
import { useAppSelector } from "../../../../store";
import { apiDeleteCompany } from "../../../../services/CompanyService";

const Companies = () => {
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState({
    type: "new",
    isOpen: false,
  });
  const [isCompanyInformationModalOpen, setIsCompanyInformationModalOpen] =
    useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(
    STATUS_OPTIONS.find((o) => o.value === "all") ?? STATUS_OPTIONS[0]
  );
  const [_selectedPlan, setSelectedPlan] = useState({
    value: "all",
    label: "All Plans"
  });
  const [companyCards, setCompanyCards] = useState(null);
  const [companyListRaw, setCompanyListRaw] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [companyListDisplay, setCompanyListDisplay] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.companies
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [upcomingSubscription, setUpcomingSubscription] = useState(null);
  const [expiredSubscription, setExpiredSubscription] = useState(null);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const upcomingSubOptions = Array.from({ length: 30 }, (_, i) => ({
    value: String(i + 1),
    label: `${i + 1} Day${i + 1 > 1 ? "s" : ""}`,
  }));

  const DASHBOARD_CARDS = [
    {
      title: "Total Companies",
      value: companyCards?.total_companies || "0",
      change: "+3 from last hour",
      icon: {
        component: CompaniesIcon,
      },
      backgroundColor: "#eeedff",
      color: "#534CB4",
    },
    {
      title: "Active Companies",
      value: companyCards?.active_companies || "0",
      change: "+3 from last hour",
      icon: {
        component: ActiveCompaniesIcon,
      },
      backgroundColor: "#e5f9f0",
      color: "#3E9972",
    },
    {
      title: "Monthly Revenue",
      value: companyCards?.monthly_revenue,
      change: "+3 from last hour",
      icon: {
        component: MonthlyRevenueIcon,
      },
      backgroundColor: "#fdf3e7",
      color: "#C29569",
    },
  ];

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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

  const openFilter = () => {
    setIsFilterOpen(true);
    lockBodyScroll();
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    unlockBodyScroll();
  };

  const fetchCompanyCards = async () => {
    try {
      setCardsLoading(true);
      const response = await ApiService.getCompanyCards();
      setCompanyCards(response?.data ?? null);
    } catch (error) {
      console.log("err--", error);
      setCompanyCards(null);
    } finally {
      setCardsLoading(false);
    }
  };

  const fetchCompanyList = async (
    page = 1,
    status = "active",
    perPage = itemsPerPage,
    search = ""
  ) => {
    try {
      setTableLoading(true);
      const response = await ApiService.getCompanyList({
        page,
        status,
        perPage,
        search,
        upcoming_subscription: upcomingSubscription,
        expired_subscription: expiredSubscription ? 1 : 0,
      });
      const list = response?.data?.list;
      const rows = Array.isArray(list?.data) ? list?.data : [];

      setCompanyListRaw(rows);
      setItemsPerPage(list?.per_page ?? perPage);
      setTotalItems(list?.total ?? 0);
      setTotalPages(list?.last_page ?? 1);

    } catch (error) {
      setCompanyListRaw([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setTableLoading(false);
    }
  };

  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState(null);

  const handleDeleteCompany = async () => {
    if (!companyToDelete) return;
    setIsDeleting(true);
    try {
      const response = await apiDeleteCompany({ id: companyToDelete.id });
      if (response?.status === 200) {
        handleRefresh();
        setDeleteModalOpen(false);
        setCompanyToDelete(null);
      } else {
        console.error("Failed to delete sub admin");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchSubscriptionList = async () => {
      setIsLoadingSubscriptions(true);
      setSubscriptionError(null);

      try {
        const response = await ApiService.getSubscriptionList();
        if (response.data.success === 1 && response.data.list.data) {
          const options = response.data.list.data.map((subscription) => ({
            value: subscription.plan_name.toLowerCase(),
            label: subscription.plan_name,
          }));
          setSubscriptionOptions([{ value: "all", label: "All Plans" }, ...options]);
        }
      } catch (error) {
        console.error("Error fetching subscription list:", error);
        setSubscriptionError("Failed to load subscription options");

        setSubscriptionOptions([
          { value: "all", label: "All Plans" },
          { value: "basic", label: "Basic" },
          { value: "premium", label: "Premium" },
          { value: "enterprise", label: "Enterprise" },
        ]);
      } finally {
        setIsLoadingSubscriptions(false);
      }
    };
    fetchSubscriptionList();
  }, [])

  useEffect(() => {
    fetchCompanyCards();
  }, [refreshTrigger]);

  useEffect(() => {
    const statusParam = _selectedStatus?.value ?? "all";
    fetchCompanyList(
      currentPage,
      statusParam,
      itemsPerPage,
      debouncedSearchQuery
    );
  }, [
    currentPage,
    _selectedStatus,
    itemsPerPage,
    debouncedSearchQuery,
    upcomingSubscription,
    expiredSubscription,
    refreshTrigger,
  ]);

  const mapToTableRows = (companies) => {
    return companies.map((c) => ({
      id: c.id ?? c.company_id,
      picture: c.picture ? c.picture : null,
      name: c.company_name ?? "-",
      status: [c.status ?? "-", c.subscription_type ?? "-"],
      location: c.city ?? "-",
      drivers: `${c.drivers_allowed ?? 0} Drivers`,
      contact: c.phone ?? c.email ?? "-",
      revenue: c.monthly_revenue ? `$${c.monthly_revenue}` : "0",
    }));
  };


  useEffect(() => {
    const plan = _selectedPlan?.value ?? "all";
    let filtered = [...companyListRaw];

    // Only filter by plan on client-side if needed
    if (plan !== "all") {
      filtered = filtered.filter(
        (c) => (c.subscription_type ?? "").toLowerCase() === plan.toLowerCase()
      );
    }
    console.log("companyListRaw====", companyListRaw);


    setCompanyListDisplay(mapToTableRows(filtered));
  }, [companyListRaw, _selectedPlan]);



  // useEffect(() => {
  //   const statusParam = _selectedStatus?.value ?? "all";
  //   setCurrentPage(1); // Reset to page 1 when search or status changes
  //   fetchCompanyList(1, statusParam, itemsPerPage, debouncedSearchQuery);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debouncedSearchQuery, _selectedStatus, itemsPerPage]);

  // useEffect(() => {
  //   const statusParam = _selectedStatus?.value ?? "all";
  //   fetchCompanyList(
  //     currentPage,
  //     statusParam,
  //     itemsPerPage,
  //     debouncedSearchQuery
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage]);

  if (cardsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  // console.log(totalItems, "totalItems===");

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Companies" />
          <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsCompanyModalOpen({ type: "new", isOpen: true });
            }}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3 2xl:!text-xl 2xl:!leading-6 2xl:!px-6"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span>Add Company</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:gap-5 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 1.5xl:grid-cols-3 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard
              key={index}
              isChange={false}
              data={card}
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
            <ChildText size="2xl" text="Company Directory" />
            <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
          </div>
          <div>
            <CardContainer className="p-3 sm:p-4 lg:p-5 bg-[#F5F5F5]">
              <div className="flex lg:flex-row md:flex-col items-stretch gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
                <div className="flex gap-2 w-full justify-between">
                  <div className="md:w-full sm:flex-1">
                    <SearchBar
                      value={_searchQuery}
                      onSearchChange={handleSearchChange}
                      className="w-full md:max-w-[400px] max-w-full"
                    />
                  </div>
                  <div className="w-48 flex justify-end hidden md:block">
                    <CustomSelect
                      variant={2}
                      options={STATUS_OPTIONS}
                      value={_selectedStatus}
                      onChange={handleStatusChange}
                      placeholder="All Status"
                      className="w-48"
                    />
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
                <div className="hidden md:flex lg:flex-row flex-col gap-3 sm:gap-5 w-full">
                  <div className="flex gap-2 w-full">
                    <CustomSelect
                      variant={2}
                      options={subscriptionOptions}
                      value={_selectedPlan}
                      onChange={handlePlanChange}
                      placeholder="All Plans"
                    />
                    <CustomSelect
                      variant={2}
                      options={upcomingSubOptions}
                      value={upcomingSubOptions.find(
                        (o) => o.value === upcomingSubscription
                      )}
                      onChange={(opt) => {
                        setUpcomingSubscription(opt?.value || null);
                        setCurrentPage(1);
                      }}
                      placeholder="Upcoming Subscription"
                    />
                    <label className="flex items-center cursor-pointer bg-white text-[#6C6C6C] font-semibold w-full p-2 gap-1 rounded-md">
                      <input
                        type="checkbox"
                        checked={expiredSubscription}
                        onChange={(e) => {
                          setExpiredSubscription(e.target.checked);
                          setCurrentPage(1);
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-[#333]">Expired Subscription</span>
                    </label>
                  </div>
                </div>
              </div>
              <Loading loading={tableLoading} type="cover">
                <DataDetailsTable
                  rowType="company"
                  companies={companyListDisplay}
                  actionOptions={[
                    {
                      label: "View",
                      onClick: (item) => {
                        setSelectedCompanyId(item.id);
                        setIsCompanyInformationModalOpen(true);
                      },
                    },
                    {
                      label: "Edit",
                      onClick: (item) => {
                        if (item) {
                          setSelectedCompanyId(item?.id);
                          setIsCompanyModalOpen({ type: "edit", isOpen: true });
                        }
                      },
                    },
                    {
                      label: "Delete",
                      onClick: (item) => {
                        setCompanyToDelete(item);
                        setDeleteModalOpen(true);
                      },
                    },
                  ]}
                />
                <Modal isOpen={deleteModalOpen} className="p-10">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-3">Delete Company?</h2>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to delete company
                    </p>

                    <div className="flex justify-center gap-4">
                      <Button
                        type="filledGray"
                        onClick={() => {
                          setDeleteModalOpen(false);
                          setCompanyToDelete(null);
                        }}
                        className="px-6 py-2 rounded-md"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="filledRed"
                        onClick={handleDeleteCompany}
                        disabled={isDeleting}
                        className="px-6 py-2 rounded-md"
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>
                </Modal>
              </Loading>
              {Array.isArray(companyListDisplay) &&
                companyListDisplay.length > 0 ? (
                <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    itemsPerPageOptions={PAGE_SIZE_OPTIONS}
                    pageKey="companies"
                  />
                </div>
              ) : null}
            </CardContainer>
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
                      <CustomSelect
                        variant={2}
                        options={upcomingSubOptions}
                        value={upcomingSubOptions.find(
                          (o) => o.value === upcomingSubscription
                        )}
                        onChange={(opt) => {
                          setUpcomingSubscription(opt?.value || null);
                          setCurrentPage(1);
                        }}
                        placeholder="Upcoming Subscription (Days)"
                        className="min-w-0"
                        mobileBgColor="#F3F6FF"
                        mobileBorder="#D6DBF5"
                        forceMobile
                        menuPlacement="top"
                        menuPosition="fixed"
                      />
                      <label className="flex items-center gap-2 p-3 rounded-md cursor-pointer bg-[#F3F6FF] border border-[#D6DBF5]">
                        <input
                          type="checkbox"
                          checked={expiredSubscription}
                          onChange={(e) => {
                            setExpiredSubscription(e.target.checked);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 "
                          mobileBgColor="#F3F6FF"
                          mobileBorder="#D6DBF5"
                          forceMobile
                          menuPlacement="top"
                          menuPosition="fixed"
                        />
                        <span className="text-sm text-[#333]">Expired Subscription</span>
                      </label>
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
            <Modal
              isOpen={isCompanyInformationModalOpen}
              size="xl"
              className="max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden"
            >
              <div className="overflow-y-auto flex-1">
                <CompanyInformationModal
                  setIsOpen={setIsCompanyInformationModalOpen}
                  companyId={selectedCompanyId}
                  onEdit={() => {
                    lockBodyScroll();
                    setIsCompanyModalOpen({ type: "edit", isOpen: true });
                  }}
                  onRefresh={handleRefresh}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <Modal isOpen={isCompanyModalOpen.isOpen} className="p-4 sm:p-6 lg:p-10">
        <AddCompanyModal
          isCompanyModalOpen={isCompanyModalOpen}
          setIsOpen={setIsCompanyModalOpen}
          onRefresh={handleRefresh}
          id={selectedCompanyId}
        />
      </Modal>
    </div>
  );
};

export default Companies;
