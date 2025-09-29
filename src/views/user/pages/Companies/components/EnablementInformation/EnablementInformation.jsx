import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";

const EnablementInformation = ({ setIsOpen }) => {
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
                Dispatcher
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
                Map
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enable / Disbale"
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
                Push Notification
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
                Usage Monitoring
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
                Revenue & Statements
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
                Zone
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
                Manage Zones
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
                CMS
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="email"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enable  / Disable "
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
                Lost & Found
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
                Accounts
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
              <span>Submit</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EnablementInformation;
