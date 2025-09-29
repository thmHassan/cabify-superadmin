import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Button from "../../../../../../components/ui/Button/Button";

const SystemInformation = ({ setIsOpen }) => {
  const handleSubmit = () => {};
  return (
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
                ⁠Stripe/ Paypal
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enabled in Client Panel Yes/No "
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
                Stripe Enablement:
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter (Stripe Enablement) Customer App"
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
                Stripe Enablement:
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter Stripe Enablement (Driver App)"
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
                Stripe Sub Company
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
                Units
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter Units km/ miles"
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
                Country of Use
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter country of use"
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
                Time Zone
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter time zone"
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
                ⁠Enable SMTP
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enable  / Disable SMTP"
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
              className="!px-10 pt-4 pb-[15px] leading-[25px]"
              onClick={() => setIsOpen(false)}
            >
              <span>Cancel</span>
            </Button>
            <Button
              btnSize="md"
              type="filled"
              className="!px-10 pt-4 pb-[15px] leading-[25px]"
            >
              <span>Next</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SystemInformation;
