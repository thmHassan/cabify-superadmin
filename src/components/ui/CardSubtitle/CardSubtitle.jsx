import classNames from "classnames";
import React from "react";

const COLOR_CONFIG = {
  0: "text-[#6C6C6C]",
  1: "text-[#333333]",
  2: "text-[#252525]",
};

const VARIANT_CONFIG = {
  0: "text-2xl leading-[33px]",
  1: "text-xl leading-[27px]",
};

const CardSubtitle = ({ type = 0, variant = 0, subtitle, className }) => {
  return (
    <p
      className={classNames(
        "font-semibold",
        VARIANT_CONFIG[variant],
        COLOR_CONFIG[type],
        className
      )}
    >
      {subtitle}
    </p>
  );
};

export default CardSubtitle;
