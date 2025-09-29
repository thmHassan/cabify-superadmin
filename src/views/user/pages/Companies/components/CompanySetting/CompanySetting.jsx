import React from "react";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field, Form, Formik } from "formik";

const CompanySetting = () => {
  const handleSubmit = () => {};
  return (
    <div>
      <div className="mb-5">
        <CardSubtitle type={1} subtitle="API Configuration :" />
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
                    htmlFor="Map API Provider"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Map API Provider
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Google Maps"
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
                    Call API Provider
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Twilio"
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
                    Payment Method
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Online"
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
                    Plan Type
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Premium"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanySetting;
