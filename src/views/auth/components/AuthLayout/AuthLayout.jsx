import React from "react";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen py-10 px-8 flex justify-center items-center">
      <div className="max-w-[728px] w-full border-2 border-[#1F41BB4D] rounded-[20px] px-10 pb-[75px] pt-20 shadow-[-4px_8px_20px_0px_#0000000D]">
        <div>
          <h2 className="font-semibold text-[40px] leading-[55px] pb-[59px] text-center">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
