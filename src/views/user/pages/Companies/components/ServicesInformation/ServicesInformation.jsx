import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Button from "../../../../../../components/ui/Button/Button";

const ServicesInformation = ({ setIsOpen }) => {
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
                Maps API
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter Maps API"
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
                Search API
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enable Search API (Google/ Barikoi)"
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
                Log Google Map Search Results
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="ON / OFF"
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
                VoIP
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enable VoIP"
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
                Drivers Allowed
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter Allowed Drivers"
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
                Sub Company
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Yes / No"
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
                Passengers Allowed
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter number of passenger allow"
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
                Uber/ Plot/Hybrid
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Bidding / Plot / Hybrid"
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
                ⁠Dispatchers Allowed
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter allowed ⁠dispatchers"
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
                Subscription Type
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Select Type"
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
                Fleet Management
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Allowed Yes/ No"
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
                SOS Feature
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Yes / No"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="company name"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Notes
              </label>
              <div className="h-[130px]">
                <Field
                  as="textarea"
                  name="email"
                  rows={5}
                  className="h-full px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Write Notes"
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

export default ServicesInformation;
