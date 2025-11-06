import { ErrorMessage, Field } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import Password from "../../../../../../components/elements/CustomPassword/Password";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import { BASIC_INFORMATION_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const BasicInformation = ({ goToNextTab, setIsOpen, type, formEl }) => {
  const { values, setFieldValue, setTouched, validateForm } = formEl;
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "INR", label: "INR" },
    { value: "CAD", label: "CAD" },
    { value: "AUD", label: "AUD" },
  ];

  const onNext = async () => {
    const fieldsToValidate = Object.keys(BASIC_INFORMATION_VALIDATION_SCHEMA);
    setTouched(
      fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    const formErrors = await validateForm();
    const hasErrors = fieldsToValidate.some((key) => formErrors[key]);
    if (!hasErrors) {
      goToNextTab?.();
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 sm:gap-5 mb-6 sm:mb-[60px]">
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="company name"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Company Name
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="company_name"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter company name"
            />
          </div>
          <ErrorMessage
            name="company_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="company admin"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Company Admin
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="company_admin_name"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter Company admin name"
            />
          </div>
          <ErrorMessage
            name="company_admin_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="username"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Username
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="user_name"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter username"
            />
          </div>
          <ErrorMessage
            name="user_name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="password"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Password
          </label>
          <div className="h-16">
            <Password
              name="password"
              className="px-5 py-[21px] !select-none border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter password"
              autoComplete="off"
              disabled={type === "edit"}
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="company_id"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Company ID
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="company_id"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter company ID"
            />
          </div>
          <ErrorMessage
            name="company_id"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="contact_person"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Contact Person
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="contact_person"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter contact person"
            />
          </div>
          <ErrorMessage
            name="contact_person"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <label
            htmlFor="email"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Email
          </label>
          <div className="h-16">
            <Field
              type="email"
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
            htmlFor="phone"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Phone
          </label>
          <div className="h-16">
            <Field
              type="tel"
              name="phone"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter phone number"
            />
          </div>
          <ErrorMessage
            name="phone"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-[calc((100%-20px)/2)]">
          <label
            htmlFor="address"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Address
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="address"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter company address"
            />
          </div>
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-[calc((100%-20px)/2)]">
          <label
            htmlFor="city"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            City
          </label>
          <div className="h-16">
            <Field
              type="text"
              name="city"
              className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
              placeholder="Enter city"
            />
          </div>
          <ErrorMessage
            name="city"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-[calc((100%-20px)/2)]">
          <label
            htmlFor="currency"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Currency
          </label>
          <div className="h-16">
            <FormSelection
              label="Select Currency"
              name="currency"
              value={values.currency}
              onChange={(val) => setFieldValue("currency", val)}
              placeholder="Select Currency"
              menuPlacement="top"
              options={currencyOptions}
            />
          </div>
          <ErrorMessage
            name="currency"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-end">
        <Button
          btnSize="md"
          type="filledGray"
          className="!px-10 pt-4 pb-[15px] leading-[25px] w-full sm:w-auto"
          onClick={() => {
            unlockBodyScroll();
            setIsOpen({ type: "new", isOpen: false });
          }}
        >
          <span>Cancel</span>
        </Button>
        <Button
          btnSize="md"
          type="filled"
          className="!px-10 pt-4 pb-[15px] leading-[25px] w-full sm:w-auto"
          onClick={onNext}
        >
          <span>Next</span>
        </Button>
      </div>
    </>
  );
};

export default BasicInformation;
