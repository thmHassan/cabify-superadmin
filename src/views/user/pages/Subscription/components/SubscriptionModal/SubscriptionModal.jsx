import React from "react";
import * as Yup from "yup";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import addSubscriptionIcon from "../../../../../../assets/Images/3d-hand-with-safe-payment-confirmation-bill 1.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import Button from "../../../../../../components/ui/Button/Button";
import FormLabel from "../../../../../../components/ui/FormLabel";
import { SUBSCRIPTION_VALIDATION_SCHEMA } from "../../../../validators/pages/subscription.validation";

const defaultFormValue = import.meta.env.VITE_IS_DEFAULT_VALUES || false;

const SubscriptionModal = ({
  submitError,
  setIsOpen,
  isEdit = false,
  isReadOnly = false,
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
      <div className="flex flex-col gap-3 sm:gap-5 items-center">
        <div className="w-[120px] h-[120px] rounded-full bg-[#EEEEEE] flex items-center justify-center">
          <img src={addSubscriptionIcon} />
        </div>
        <div className="lg:text-[26px] text-xl leading-9 font-semibold text-[#252525] mb-3 sm:mb-7 text-center">
          <span>
            {isReadOnly ? "View Subscription" : isEdit ? "Edit Subscription" : "Add New Subscription"}
          </span>
        </div>
      </div>
      <div>
        <Formik
          initialValues={defaultFormValue
            ? {
              plan_name: "Premuim",
              billing_cycle: "monthly",
              amount: 700,
              deduct_type: "cash",
              billing_cycle_deduct_option: "at_start",
            }
            : initialValues}
          validationSchema={SUBSCRIPTION_VALIDATION_SCHEMA}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <fieldset disabled={isReadOnly} className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mb-6">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <div>
                      <FormLabel htmlFor="plan_name">Plan</FormLabel>
                      <div className="sm:h-16 h-14">
                        <Field
                          type="text"
                          name="plan_name"
                          className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                          placeholder="Name of New Subscription Plan"
                        />
                      </div>
                      <ErrorMessage
                        name="plan_name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="amount">Amount</FormLabel>
                      <div className="sm:h-16 h-14">
                        <Field
                          type="text"
                          name="amount"
                          className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                          placeholder="Subscription Cost for Client"
                        />
                      </div>
                      <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="deduct_type">Deduct type</FormLabel>
                      <div className="sm:h-16 h-14">
                        <FormSelection
                          name="deduct_type"
                          value={values?.deduct_type}
                          onChange={(val) => setFieldValue("deduct_type", val)}
                          placeholder="Deduct Type"
                          options={[
                            { label: "Card", value: "card" },
                            { label: "Cash", value: "cash" },
                          ]}
                        />
                      </div>
                      <ErrorMessage
                        name="deduct_type"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3 sm:gap-5">
                    <div>
                      <FormLabel htmlFor="billing_cycle">Billing Cycle</FormLabel>
                      <div className="sm:h-16 h-14">
                        <FormSelection
                          name="billing_cycle"
                          value={values?.billing_cycle}
                          onChange={(val) => setFieldValue("billing_cycle", val)}
                          placeholder="Billing Cycle"
                          options={[
                            { label: "monthly", value: "monthly" },
                            { label: "yearly", value: "yearly" },
                            { label: "weekly", value: "weekly" },
                          ]}
                        />
                      </div>
                      <ErrorMessage
                        name="billing_cycle"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <FormLabel htmlFor="billing_cycle_deduct_option">
                        Billing Cycle Deduct Option
                      </FormLabel>
                      <div className="sm:h-16 h-14">
                        <FormSelection
                          name="billing_cycle_deduct_option"
                          value={values?.billing_cycle_deduct_option}
                          onChange={(val) =>
                            setFieldValue("billing_cycle_deduct_option", val)
                          }
                          placeholder="Billing Cycle Deduct Option"
                          options={[
                            { label: "At Start", value: "at_start" },
                            { label: "At End", value: "at_end" },
                          ]}
                        />
                      </div>
                      <ErrorMessage
                        name="billing_cycle_deduct_option"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 sm:justify-end">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="w-full sm:w-auto !px-10 !pt-4 pb-[15px] leading-[25px]"
                  onClick={() => {
                    unlockBodyScroll();
                    setIsOpen({ type: "new", isOpen: false });
                  }}
                >
                  <span>Cancel</span>
                </Button>
                {!isReadOnly && (

                  <Button
                    btnType="submit"
                    btnSize="md"
                    type="filled"
                    className="w-full sm:w-auto !px-10 !pt-4 pb-[15px] leading-[25px]"
                  >
                    <span>{isEdit ? 'Update' : 'Create'}</span>
                  </Button>)}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SubscriptionModal;
