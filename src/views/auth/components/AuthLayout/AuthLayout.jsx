import React from "react";

const AuthLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 xl:py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-[728px] w-full border-2 border-[#1F41BB4D] rounded-xl sm:rounded-2xl lg:rounded-[20px] px-4 sm:px-6 lg:px-8 xl:px-10 pb-8 sm:pb-12 lg:pb-16 xl:pb-[75px] pt-6 sm:pt-10 lg:pt-14 xl:pt-20 shadow-[-4px_8px_20px_0px_#0000000D]">
        <div>
          <h2 className="font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] leading-7 sm:leading-9 lg:leading-[50px] xl:leading-[55px] pb-6 sm:pb-8 lg:pb-12 xl:pb-[59px] text-center">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
