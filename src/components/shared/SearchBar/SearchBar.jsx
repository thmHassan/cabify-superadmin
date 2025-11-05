import React, { useState } from "react";
import SearchIcon from "../../svg/SearchIcon";
import classNames from "classnames";

const VARIANT_CONFIG = {
  0: "bg-[#ffffff]",
  1: "bg-[#f3f3f3]",
};

const SearchBar = ({ onSearchChange, variant = 0 }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div
      className={classNames(
        "flex-1 max-w-[400px] h-[54px] relative rounded-[10px]",
        VARIANT_CONFIG[variant]
      )}
    >
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full h-full text-[#6C6C6C] rounded-[10px] focus:outline-none font-medium text-[16px] leading-[22px] py-4 pl-[54px] pr-4 bg-transparent"
        placeholder="Search here..."
      />
      <div className="w-6 h-6 flex items-center justify-center absolute top-[15px] left-[15px]">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
