import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import Password from "../../../../../../components/elements/CustomPassword/Password";

const BasicInformation = ({ setIsOpen }) => {
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
                Company Name
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter company name"
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
                htmlFor="company admin"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Company Admin
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter admin name"
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
                htmlFor="username"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Username
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter username"
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
                htmlFor=""
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Password
              </label>
              <div className="h-16">
                <Password
                  name="password"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter your password"
                  autoComplete="off"
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
                htmlFor="username"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Company ID (Cannot be changed later)
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter company ID"
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
                htmlFor=""
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Contact Person
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter contact person"
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
                htmlFor="username"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Email
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter email address"
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
                htmlFor=""
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Phone
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter contact person"
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
                htmlFor="username"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Address
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter company address"
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
                htmlFor=""
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                City
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter city"
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
                htmlFor=""
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Currency
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Select Currency"
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

export default BasicInformation;
