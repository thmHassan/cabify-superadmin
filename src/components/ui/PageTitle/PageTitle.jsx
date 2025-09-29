import classNames from "classnames";
import React from "react";

const COLOR_CONFIG = {
  0: "text-[#252525]",
  1: "text-[#1F41BB]",
};

const PageTitle = ({ title, textColor = 0, className }) => {
  return (
    <h2
      className={classNames(
        "font-semibold text-[40px] leading-[55px]",
        COLOR_CONFIG[textColor],
        className
      )}
    >
      {title}
    </h2>
  );
};

export default PageTitle;
