import classNames from "classnames";
import React from "react";

const variant = {
  filled: "bg-[#1F41BB] text-[#ffffff] font-semibold",
  bgOutlined:
    "w-full border-2 border-[#1F41BB4D] bg-[#E9F2FF] pt-4 pb-[15px] flex justify-center rounded-lg text-[#1F41BB] font-semibold text-[24px] leading-[33px]",
  filledGray: "bg-[#EEEEEE] text-[#252525] font-semibold",
  filledGreen:
    "bg-[#10B981] text-[#FFFFFF] font-semibold leading-6 text-[18px]",
  filledRed: "bg-[#FF4747] text-[#FFFFFF] font-semibold",
  filledOrange: "bg-[#F59E0B] text-[#ffffff] font-semibold",
  outline: "border border-[#C5C5C5] bg-[#ffffff] text-[#6C6C6C] font-semibold",
  custom: "",
};

const SIZE_CONFIG = {
  "2xl": "text-2xl leading-[33px] px-[25px] pt-3.5 pb-[13px] rounded-[10px]",
  md: "text-base leading-[22px] px-[18px] py-[9px] rounded-lg",
  sm: "text-sm",
};

const Button = ({
  btnType = "button",
  type = "custom",
  btnSize = "sm",
  className,
  children,
  onClick,
  ...rest
}) => {
  return (
    <button
      type={btnType}
      className={classNames(
        "font-poppins-semibold",
        variant[type],
        SIZE_CONFIG[btnSize],
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
