import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import Base from "../../../../../../components/animations/Base";
import {
  lockBodyScroll,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const openFilter = () => {
    setIsFilterOpen(true);
    lockBodyScroll();
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    unlockBodyScroll();
  };

  return (
    <>
      <CardContainer className="p-3 sm:p-4 lg:p-5 bg-[#F5F5F5]">
        <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0">
          <div className="md:w-full w-[calc(100%-54px)] sm:flex-1">
            <SearchBar
              value={_searchQuery}
              onSearchChange={handleSearchChange}
              className="w-full md:max-w-[400px] max-w-full"
            />
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
        <DataDetailsTable
          rowType="systemAnalytics"
          companies={systemAnalyticsData}
          isOnActionClick={false}
        />
        <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
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
              </div>
            </Base>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PerformanceOverview;
