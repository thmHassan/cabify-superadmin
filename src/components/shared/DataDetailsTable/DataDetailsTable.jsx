import React from "react";
import DataDetailsRow from "./components/DataDetailsRow";

const DataDetailsTable = ({
  rowType,
  companies,
  itemsPerPage = 6,
  onActionClick,
  isOnActionClick = true,
}) => {
  return (
    <div className="pt-5 overflow-auto">
      <table className="w-full">
        <tbody>
          {companies?.slice(0, itemsPerPage).map((company, i) => (
            <DataDetailsRow
              key={i}
              {...company}
              type={rowType}
              onActionClick={
                isOnActionClick ? () => onActionClick(company) : false
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDetailsTable;
