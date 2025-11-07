import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import classNames from "classnames";
import RightIcon from "../../../../../../components/svg/RightIcon";

const BaseFareConfigurationForm = ({ formEl }) => {
  const { values, setFieldValue } = formEl;
  return (
    <CardContainer type={1} className="2xl:py-8 2xl:px-7 lg:py-5 lg:px-4 sm:px-4 px-3 sm:py-5 py-3">
      <CardContainer type={1} className="2xl:px-6 2xl:py-7 lg:px-4 lg:py-5 sm:px-4 px-3 sm:py-5 py-3">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-16 sm:pr-[30px] mb-4 sm:mb-0">
            <div
              className={classNames(
                "w-[34px] h-[34px] rounded flex justify-center items-center",
                values.base_fare_system_status
                  ? "bg-[#1F41BB]"
                  : "border border-[#1F41BB] cursor-pointer"
              )}
              onClick={() => {
                setFieldValue(
                  "base_fare_system_status",
                  !values.base_fare_system_status
                );
              }}
            >
              {values.base_fare_system_status && (
                <RightIcon height={28} width={28} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare Less Than (x) Miles*
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="base_fare_less_than_x_miles"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="$0"
                />
              </div>
              <ErrorMessage
                name="base_fare_less_than_x_miles"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare Less Than (x) Miles Price*
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="base_fare_less_than_x_price"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="$0"
                />
              </div>
              <ErrorMessage
                name="base_fare_less_than_x_price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare From (x) Miles to (x) Miles*
              </label>
              <div className="h-16 flex gap-3 sm:gap-5">
                <div className="w-[calc((100%-12px)/2)] sm:w-[calc((100%-20px)/2)]">
                  <Field
                    type="text"
                    name="base_fare_from_x_miles"
                    className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                    placeholder="$0"
                  />
                  <ErrorMessage
                    name="base_fare_from_x_miles"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-12px)/2)] sm:w-[calc((100%-20px)/2)]">
                  <Field
                    type="text"
                    name="base_fare_to_x_miles"
                    className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                    placeholder="$0"
                  />
                  <ErrorMessage
                    name="base_fare_to_x_miles"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare From (x) Miles to (x) Miles Price*
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="base_fare_from_to_price"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="$0"
                />
              </div>
              <ErrorMessage
                name="base_fare_from_to_price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare Greater Than (x) Miles*
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="base_fare_greater_than_x_miles"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="$0"
                />
              </div>
              <ErrorMessage
                name="base_fare_greater_than_x_miles"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="Map API Provider"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Base Fare Greater Than (x) Miles Price*
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="base_fare_greater_than_x_price"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="$0"
                />
              </div>
              <ErrorMessage
                name="base_fare_greater_than_x_price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        </div>
      </CardContainer>
    </CardContainer>
  );
};

export default BaseFareConfigurationForm;
