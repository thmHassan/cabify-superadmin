import classNames from "classnames";
import React from "react";

const TEXT_SIZE_CONFIG = {
  sm: "text-[#6C6C6C] text-sm leading-[19px]",
  md: "text-[#333333] text-base leading-[22px]",
  "2xl": "text-[#333333] text-[28px] leading-[38px]",
};

const ChildText = ({ text, size = "sm", className, ...rest }) => {
  return (
    <div
      className={classNames("font-semibold", TEXT_SIZE_CONFIG[size], className)}
      {...rest}
    >
      {text}
    </div>
  );
};

export default ChildText;
