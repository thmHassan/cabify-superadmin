import React from "react";
import Modal from "../../../../../../components/shared/Modal";
import addSubscriptionIcon from "../../../../../../assets/Images/3d-hand-with-safe-payment-confirmation-bill 1.png";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";

const AddSubscriptionModal = ({ isOpen, setIsOpen }) => {
  const handleSubmit = () => {};
  return (
    <Modal isOpen={isOpen} className="p-10">
      <div>
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
            initialValues={{}}
            // validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="flex flex-wrap gap-5 mb-[60px]">
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="company name"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Subscription
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
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
                      Plan
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
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
                      <Field
                        type="text"
                        name="email"
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
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="px-10 pt-4 pb-[15px] leading-[25px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="px-10 pt-4 pb-[15px] leading-[25px]"
                  >
                    <span>Submit</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
};

export default AddSubscriptionModal;
