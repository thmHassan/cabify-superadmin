import React, { useEffect, useState, useCallback, useRef } from "react";
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
import { lockBodyScroll } from "../../../../utils/functions/common.function";
import ApiService from "../../../../services/ApiService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import Modal from "../../../../components/shared/Modal";
import { useAppSelector } from "../../../../store";

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
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
  const [companyCards, setCompanyCards] = useState(null);
  const [companyListRaw, setCompanyListRaw] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [companyListDisplay, setCompanyListDisplay] = useState([]);
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

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

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
      value: "$6,800",
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
        search: search || undefined,
      });
      const list = response?.data?.list;
      console.log(list, "list");
      const rows = Array.isArray(list?.data) ? list?.data : [];

      console.log(rows, "rows");

      setCompanyListRaw(rows);

      const nextPerPage = list?.per_page ?? itemsPerPage;
      const total = list?.total ?? rows.length;
      const lastPage = list?.last_page ?? 1;

      setItemsPerPage(nextPerPage);
      setTotalItems(total);
      setTotalPages(lastPage);
    } catch (error) {
      console.log("err--", error);
      setCompanyListRaw([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyCards();
    const statusParam = _selectedStatus?.value ?? "all";

    console.log(statusParam, "statusparam");
    fetchCompanyList(1, statusParam, itemsPerPage, debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const mapToTableRows = (companies) => {
    console.log(companies, "companies");
    return companies.map((c) => ({
      id: c.id ?? c.company_id, // Include company ID
      name: c.company_name ?? "-",
      status: [c.status ?? "-", c.subscription_type ?? "-"],
      location: c.city ?? "-",
      drivers: `${c.drivers_allowed ?? 0} Drivers`,
      contact: c.phone ?? c.email ?? "-",
      revenue: "-",
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

    setCompanyListDisplay(mapToTableRows(filtered));
  }, [companyListRaw, _selectedPlan]);

  useEffect(() => {
    const statusParam = _selectedStatus?.value ?? "all";
    setCurrentPage(1); // Reset to page 1 when search or status changes
    fetchCompanyList(1, statusParam, itemsPerPage, debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, _selectedStatus, itemsPerPage]);

  useEffect(() => {
    const statusParam = _selectedStatus?.value ?? "all";
    fetchCompanyList(
      currentPage,
      statusParam,
      itemsPerPage,
      debouncedSearchQuery
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (cardsLoading || tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  console.log(totalItems, "totalItems===");

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="Companies" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsCompanyModalOpen({ type: "new", isOpen: true });
            }}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add Company</span>
            </div>
          </Button>
        </div>
        <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} isChange={false} data={card} />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-[9px] mb-5">
            <ChildText size="2xl" text="Company Directory" />
            <PageSubTitle title="Manage taxi companies, their services, and subscriptions" />
          </div>
          <div>
            <CardContainer className="p-5 bg-[#F5F5F5]">
              {Array.isArray(companyListRaw) && companyListRaw.length > 0 ? (
                <div className="flex items-center gap-5 justify-between">
                  <SearchBar onSearchChange={handleSearchChange} />
                  <div className="flex gap-5">
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
                ]}
              />
              {Array.isArray(companyListDisplay) &&
              companyListDisplay.length > 0 ? (
                <div className="mt-4 border-t border-[#E9E9E9] pt-4">
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
            <CompanyInformationModal
              isOpen={isCompanyInformationModalOpen}
              setIsOpen={setIsCompanyInformationModalOpen}
              companyId={selectedCompanyId}
              onEdit={() => {
                lockBodyScroll();
                setIsCompanyModalOpen({ type: "edit", isOpen: true });
              }}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isCompanyModalOpen.isOpen} className="p-10">
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
