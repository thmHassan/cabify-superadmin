import React, { useState, useEffect } from "react";
import SearchIcon from "../../svg/SearchIcon";
import classNames from "classnames";

const VARIANT_CONFIG = {
  0: "bg-[#ffffff]",
  1: "bg-[#f3f3f3]",
};

const SearchBar = ({ onSearchChange, value, variant = 0, className }) => {
  const [searchValue, setSearchValue] = useState(value || "");

  useEffect(() => {
    if (value !== undefined) {
      setSearchValue(value);
    }
  }, [value]);

  const handleSearchChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onSearchChange) {
      onSearchChange(newValue);
    }
  };

  return (
    <div
      className={classNames(
        "max-w-[400px] h-[54px] relative rounded-[10px]",
        VARIANT_CONFIG[variant],
        className
      )}
    >
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        className="w-full h-full text-[#6C6C6C] rounded-[10px] focus:outline-none font-medium sm:text-[16px] text-[14px] leading-[22px] py-4 pl-[54px] pr-4 bg-transparent"
        placeholder="Search here..."
      />
      <div className="w-6 h-6 flex items-center justify-center absolute top-[15px] left-[15px]">
        <span className="hidden sm:block">
          <SearchIcon />
        </span>
        <span className="sm:hidden block">
          <SearchIcon width={18} height={18} />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
