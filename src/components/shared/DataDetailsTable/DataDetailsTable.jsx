import React from "react";
import DataDetailsRow from "./components/DataDetailsRow";

const DataDetailsTable = ({
  rowType,
  companies,
  itemsPerPage = 6,
  actionOptions,
  ...rest
}) => {
  return (
    <div className="pt-5 overflow-auto">
      <table className="w-full border-collapse table-auto">
        <tbody>
          {companies?.slice(0, itemsPerPage).map((data, i) => (
            <DataDetailsRow
              key={i}
              data={data}
              type={rowType}
              actionOptions={actionOptions}
              {...rest}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDetailsTable;
