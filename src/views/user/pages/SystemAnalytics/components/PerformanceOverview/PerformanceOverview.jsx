import React, { useState } from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import DataDetailsTable from "../../../../../../components/shared/DataDetailsTable";
import SearchBar from "../../../../../../components/shared/SearchBar";
import {
  PAGE_SIZE_OPTIONS,
  PLAN_OPTIONS,
  STATUS_OPTIONS,
} from "../../../../../../constants/selectOptions";
import Pagination from "../../../../../../components/ui/Pagination";
import CustomSelect from "../../../../../../components/ui/CustomSelect";

const systemAnalyticsData = [
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
  {
    name: "Metro Taxi Co.",
    status: ["Active"],
    metrics: [
      { label: "Requests", value: "1.2M" },
      { label: "Avg Response", value: "120ms" },
      { label: "Errors", value: "24" },
    ],
    uptime: "99.8%",
  },
];

const PerformanceOverview = () => {
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS[0]);
  const [_selectedPlan, setSelectedPlan] = useState(PLAN_OPTIONS[0]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleStatusChange = (option) => {
    setSelectedStatus(option);
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
      <DataDetailsTable
        rowType="systemAnalytics"
        companies={systemAnalyticsData}
        isOnActionClick={false}
      />
      <div className="mt-4 border-t border-[#E9E9E9] pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={PAGE_SIZE_OPTIONS}
        />
      </div>
    </CardContainer>
  );
};

export default PerformanceOverview;
