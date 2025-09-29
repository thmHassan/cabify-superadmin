import React from "react";
import CustomSelect from "../CustomSelect";

const VARIANT_CONFIG = {
  0: "bg-[#ffffff] border border-[#ededed]",
  1: "bg-[#f9f9f9]",
};

const Pagination = ({
  variant = 0,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [
    { value: 10, label: "10 / page" },
    { value: 25, label: "25 / page" },
    { value: 50, label: "50 / page" },
    { value: 100, label: "100 / page" },
  ],
  className = "",
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      onPageChange?.(pageNumber);
    }
  };

  const handleItemsPerPageChange = (selectedOption) => {
    onItemsPerPageChange?.(selectedOption.value);
  };

  const getCurrentItemsPerPageOption = () => {
    return (
      itemsPerPageOptions.find((option) => option.value === itemsPerPage) ||
      itemsPerPageOptions[0]
    );
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-medium transition-colors ${
            currentPage === 1
              ? "text-[#B0B0B0] cursor-not-allowed"
              : "text-[#6C6C6C] hover:bg-[#F5F5F5] cursor-pointer"
          }`}
        >
          &lt;
        </button>

        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                pageNumber === currentPage
                  ? "bg-[#1F41BB] text-white"
                  : `text-[#6C6C6C] hover:bg-[#F5F5F5] cursor-pointer ${VARIANT_CONFIG[variant]}`
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-medium transition-colors ${
            currentPage === totalPages
              ? "text-[#B0B0B0] cursor-not-allowed"
              : "text-[#6C6C6C] hover:bg-[#F5F5F5] cursor-pointer"
          }`}
        >
          &gt;
        </button>
      </div>

      <div className="min-w-[120px]">
        <CustomSelect
          variant={variant}
          options={itemsPerPageOptions}
          value={getCurrentItemsPerPageOption()}
          onChange={handleItemsPerPageChange}
          placeholder="Items per page"
          isSearchable={false}
          className="min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default Pagination;
