import React, { useState } from "react";
import PageSubTitle from "../../ui/PageSubTitle";
import ChildText from "../../ui/ChildText.jsx/ChildText";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../constants/selectOptions";

const PaymentTable = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-left bg-[#F5F7F9] pt-5 pb-[15px] px-[30px]"
              >
                <PageSubTitle
                  title={col.header}
                  className="!text-[#00000080]"
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
                <td key={colIndex} className="px-[30px] pt-[26px] pb-6">
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
      <div className="border-t border-[#E9E9E9] py-3.5 px-5"> 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={PAGE_SIZE_OPTIONS}
        />
      </div>
    </div>
  );
};

export default PaymentTable;
