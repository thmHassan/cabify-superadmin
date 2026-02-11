import React, { useState } from "react";
import PageSubTitle from "../../ui/PageSubTitle";
import ChildText from "../../ui/ChildText.jsx/ChildText";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/selectOptions";
import SearchBar from "../SearchBar";

const PaymentTable = ({ columns, data, onSearch, onDateChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [_searchQuery, setSearchQuery] = useState("");
  const [_selectedDate, setSelectedDate] = useState("");

  const totalItems = 25;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="border-[0.5px] border-[#00000050] rounded-[10px] overflow-hidden">
      <div className="overflow-x-auto ">
        <div className="flex flex-row items-stretch sm:items-center gap-3 sm:gap-5 justify-between mb-4 sm:mb-0 bg-[#F5F7F9] p-3 border-b">
          <div className="md:w-full w-[calc(100%-54px)] sm:flex-1">
            {/* <SearchBar
              value={_searchQuery}
              onSearchChange={(value) => {
                setSearchQuery(value);
                onSearch?.(value);
              }}
              className="w-full md:max-w-[400px] max-w-full"
            /> */}
          </div>
          <div className="hidden md:flex flex-row gap-3 sm:gap-5 w-full sm:w-auto">
            <input
              type="date"
              className="border rounded px-3 py-2"
              value={_selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                onDateChange?.(e.target.value);
              }}
            />
          </div>
        </div>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-left bg-[#F5F7F9] pt-4 sm:pt-5 pb-3 sm:pb-[15px] px-3 sm:px-5 lg:px-[30px]"
                >
                  <PageSubTitle
                    title={col.header}
                    className="!text-[#00000080] text-xs sm:text-sm lg:text-base"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b-[0.5px] border-[#00000050] last:border-0"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-3 sm:px-5 lg:px-[30px] pt-4 sm:pt-[26px] pb-4 sm:pb-6">
                    {col.render ? (
                      col.render(row[col.accessor], row)
                    ) : (
                      <ChildText
                        size="md"
                        text={row[col.accessor]}
                        className="!text-[#444444]"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="border-t border-[#E9E9E9] py-3 sm:py-3.5 px-3 sm:px-5"> 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={PAGE_SIZE_OPTIONS}
        />
      </div> */}
    </div>
  );
};

export default PaymentTable;
