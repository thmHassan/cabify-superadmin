import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Button from "../../../../../../components/ui/Button/Button";
import classNames from "classnames";

const MileageRateSettingsForm = ({ formEl }) => {
  const { values, setFieldValue } = formEl;
  return (
    <CardContainer type={1} className="py-8 px-7">
      <div>
        <CardContainer type={1} className="px-6 py-7 mb-[25px]">
          <div className="flex">
            <div className="w-16 pr-[30px]">
              <div className="h-[94px] flex items-center">
                <div
                  className={classNames(
                    "min-w-[34px] h-[34px] rounded-full border border-[#1F41BB] p-1.5 cursor-pointer"
                  )}
                  onClick={() => {
                    setFieldValue("mileage_system", "fixed");
                  }}
                >
                  <div
                    className={classNames("w-full h-full rounded-full", {
                      "bg-[#1F41BB]": values.mileage_system === "fixed",
                    })}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-[calc(100%-64px)]">
              <div className="flex flex-wrap gap-5">
                <div className="w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    First Mile / Km*
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="first_mile_km"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Second Mile / Km*
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="second_mile_km"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="0"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContainer>
        <CardContainer type={1} className="px-6 py-7 mb-[25px] flex">
          <div className="w-16 pr-[30px]">
            <div className="h-[94px] flex items-center">
              <div
                className={classNames(
                  "min-w-[34px] h-[34px] rounded-full border border-[#1F41BB] p-1.5 cursor-pointer"
                )}
                onClick={() => {
                  setFieldValue("mileage_system", "dynamic");
                }}
              >
                <div
                  className={classNames("w-full h-full rounded-full", {
                    "bg-[#1F41BB]": values.mileage_system === "dynamic",
                  })}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-[calc(100%-64px)] flex flex-col gap-[30px]">
            <div className="flex">
              <div className="w-[calc(100%-157px)] flex gap-5">
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    From
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter First Mile / Km*"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    To
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Second Mile / Km*"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Fare
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Fare"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="w-[157px] pl-5 pt-[30px]">
                <Button className=" text-[#1F41BB] border border-[#1F41BB] h-16 w-full rounded-lg">
                  <PageSubTitle title="Add Range" className="!text-[#1F41BB]" />
                </Button>
              </div>
            </div>
            <div className="flex">
              <div className="w-[calc(100%-157px)] flex gap-5">
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    From
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter First Mile / Km*"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    To
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Second Mile / Km*"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-[calc((100%-40px)/3)]">
                  <label
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Fare
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Fare"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="w-[157px] pl-5 pt-[30px]">
                <Button className=" text-[#FF4747] border border-[#FF4747] h-16 w-full rounded-lg">
                  <PageSubTitle title="Remove" className="!text-[#FF4747]" />
                </Button>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </CardContainer>
  );
};

export default MileageRateSettingsForm;
