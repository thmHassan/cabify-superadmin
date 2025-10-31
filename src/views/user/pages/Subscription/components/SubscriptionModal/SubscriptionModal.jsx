import React from "react";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import addSubscriptionIcon from "../../../../../../assets/Images/3d-hand-with-safe-payment-confirmation-bill 1.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import Button from "../../../../../../components/ui/Button/Button";

const SubscriptionModal = ({
  submitError,
  setIsOpen,
  onSubmit,
  initialValues,
}) => {
  return (
    <div>
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      <div className="flex flex-col gap-5 items-center">
        <div className="w-[120px] h-[120px] rounded-full bg-[#EEEEEE] flex items-center justify-center">
          <img src={addSubscriptionIcon} />
        </div>
        <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-7 text-center">
          <span>Add New Subscription</span>
        </div>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          // validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-wrap gap-5 mb-[60px]">
                <div className="w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Plan
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="plan_name"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enable / Disable"
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
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Billing Cycle
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Bid Backup Vehicle type"
                      name="billing_cycle"
                      value={values?.billing_cycle}
                      onChange={(val) => setFieldValue("billing_cycle", val)}
                      placeholder="Billing Cycle"
                      options={[{ label: "monthly", value: "monthly" }]}
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
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Amount
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="amount"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Subscription Cost for Client"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full">
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="company name"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Features
                    </label>
                    <div className="h-16">
                      <FormSelection
                        isMulti={true}
                        label="Select Bid Backup Vehicle type"
                        name="features"
                        value={values?.features}
                        onChange={(val) => setFieldValue("features", val)}
                        placeholder="Select Features"
                        menuPlacement="top"
                        options={[
                          { label: "API Access", value: "API Access" },
                          {
                            label: "Real Time Tracking",
                            value: "Real Time Tracking",
                          },
                          {
                            label: "text",
                            value: "text",
                          },
                        ]}
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
              <div className="flex gap-5 justify-end">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                  onClick={() => {
                    unlockBodyScroll();
                    setIsOpen({ type: "new", isOpen: false });
                  }}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  btnType="submit"
                  btnSize="md"
                  type="filled"
                  className="!px-10 !pt-4 pb-[15px] leading-[25px]"
                >
                  <span>Submit</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubscriptionModal;
