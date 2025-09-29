import React from "react";

const DriverIcon = ({ width = 24, height = 24, fill = "#333333" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 13.875C14.6924 13.875 16.875 11.6924 16.875 9C16.875 6.30761 14.6924 4.125 12 4.125C9.30761 4.125 7.125 6.30761 7.125 9C7.125 11.6924 9.30761 13.875 12 13.875Z"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.125 21.375C4.125 17.625 7.125 13.875 12 13.875C16.875 13.875 19.875 17.625 19.875 21.375"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DriverIcon;
