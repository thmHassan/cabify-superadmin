import classNames from "classnames";
import React from "react";

const VARIANT_CONFIG = {
  blue: "bg-[#1F41BB] text-[#ffffff]",
  gray: "bg-[#EEEEEE] text-[#6C6C6C]",
  mediumGray: "bg-[#EFEFEF] text-[#6C6C6C]",
  green: "bg-[#10B981] text-[#ffffff]",
  purple: "bg-[#8B5CF6] text-[#ffffff]",
  lightBlue: "bg-[#E9F2FF] text-[#3C71B7]",
  yellow: "bg-[#F5C60B] text-[#FFFFFF]",
  white: "bg-[#FFFFFF] text-[#6C6C6C]",
  red: "bg-[#EF4444] text-[#ffffff]",
};

const SIZE_CONFIG = {
  sm: "px-5 pt-1.5 pb-[5px] text-sm leading-[19px] rounded-[25px]",
  md: "px-[30px] py-1.5 text-base leading-[22px] rounded-[35px]",
  lg: "px-[35px] pt-[11px] pb-2.5 text-[18px] leading-[25px] rounded-[35px]",
};

const Tag = ({ children, variant = "gray", size = "sm", className }) => {
  return (
    <div
      className={classNames(
        "font-semibold",
        VARIANT_CONFIG[variant],
        SIZE_CONFIG[size],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Tag;
