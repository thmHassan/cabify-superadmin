import React, { useState, useEffect } from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import {
  PAGE_SIZE_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../../../constants/selectOptions";
import CustomSelect from "../../../../../../components/ui/CustomSelect";
import SearchBar from "../../../../../../components/shared/SearchBar";
import Pagination from "../../../../../../components/ui/Pagination";
import { useAppSelector } from "../../../../../../store";

const CompanyUsage = ({ data }) => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);
  const [companyListRaw, setCompanyListRaw] = useState([]);
  const [companyListDisplay, setCompanyListDisplay] = useState([]);

  const savedPagination = useAppSelector(
    (state) => state?.app?.app?.pagination?.companyUsage
  );
  const [currentPage, setCurrentPage] = useState(
    Number(savedPagination?.currentPage) || 1
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(savedPagination?.itemsPerPage) || 10
  );

  useEffect(() => {
    const rawData = Array.isArray(data) ? data : [];
    setCompanyListRaw(rawData);
  }, [data]);

  useEffect(() => {
    const query = _searchQuery?.toLowerCase?.() ?? "";
    const plan = _selectedPlan?.value ?? "all";

    let filtered = [...companyListRaw];

    if (query) {
      filtered = filtered.filter((c) => {
        const hay = `${c.company_name ?? ""} ${c.email ?? ""} ${c.city ?? ""} ${
          c.phone ?? ""
        }`.toLowerCase();
        return hay.includes(query);
      });
    }

    if (plan !== "all") {
      filtered = filtered.filter(
        (c) => (c.subscription_type ?? "").toLowerCase() === plan.toLowerCase()
      );
    }

    setCompanyListDisplay(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [companyListRaw, _searchQuery, _selectedPlan]);

  // Calculate pagination
  const totalItems = companyListDisplay.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = companyListDisplay.slice(startIndex, endIndex);

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

  return (
    <CardContainer className="p-5">
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
      <DataDetailsTable rowType="usageMonitoring" companies={paginatedData} />
      {Array.isArray(companyListDisplay) && companyListDisplay.length > 0 ? (
        <div className="mt-4 border-t border-[#E9E9E9] pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPageOptions={PAGE_SIZE_OPTIONS}
            pageKey="companyUsage"
          />
        </div>
      ) : null}
    </CardContainer>
  );
};

export default CompanyUsage;
