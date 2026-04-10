import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import Button from "../../../../../../components/ui/Button/Button";
import Password from "../../../../../../components/elements/CustomPassword/Password";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import FormLabel from "../../../../../../components/ui/FormLabel";
import { BASIC_INFORMATION_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const BasicInformation = ({ goToNextTab, setIsOpen, type, formEl }) => {
  const { values, setFieldValue, setTouched, validateForm } = formEl;
  const [showPasswordField, setShowPasswordField] = useState(type !== "edit");

  const currencyOptions = [
    { value: "USD", label: "USD - United States ($)" },
    { value: "EUR", label: "EUR - Eurozone (€)" },
    { value: "GBP", label: "GBP - United Kingdom (£)" },
    { value: "INR", label: "INR - India (₹)" },
    { value: "CAD", label: "CAD - Canada ($)" },
    { value: "AUD", label: "AUD - Australia ($)" },

    { value: "JPY", label: "JPY - Japan (¥)" },
    { value: "CNY", label: "CNY - China (¥)" },
    { value: "HKD", label: "HKD - Hong Kong ($)" },
    { value: "SGD", label: "SGD - Singapore ($)" },
    { value: "KRW", label: "KRW - South Korea (₩)" },

    { value: "AED", label: "AED - UAE (د.إ)" },
    { value: "SAR", label: "SAR - Saudi Arabia (﷼)" },
    { value: "QAR", label: "QAR - Qatar (﷼)" },
    { value: "KWD", label: "KWD - Kuwait (د.ك)" },
    { value: "OMR", label: "OMR - Oman (﷼)" },

    { value: "CHF", label: "CHF - Switzerland (CHF)" },
    { value: "SEK", label: "SEK - Sweden (kr)" },
    { value: "NOK", label: "NOK - Norway (kr)" },
    { value: "DKK", label: "DKK - Denmark (kr)" },

    { value: "BRL", label: "BRL - Brazil (R$)" },
    { value: "MXN", label: "MXN - Mexico ($)" },
    { value: "ARS", label: "ARS - Argentina ($)" },
    { value: "CLP", label: "CLP - Chile ($)" },

    { value: "ZAR", label: "ZAR - South Africa (R)" },
    { value: "NGN", label: "NGN - Nigeria (₦)" },
    { value: "EGP", label: "EGP - Egypt (£)" },
    { value: "KES", label: "KES - Kenya (KSh)" },

    { value: "THB", label: "THB - Thailand (฿)" },
    { value: "MYR", label: "MYR - Malaysia (RM)" },
    { value: "IDR", label: "IDR - Indonesia (Rp)" },
    { value: "PHP", label: "PHP - Philippines (₱)" },
    { value: "VND", label: "VND - Vietnam (₫)" },

    { value: "TRY", label: "TRY - Turkey (₺)" },
    { value: "PLN", label: "PLN - Poland (zł)" },
    { value: "CZK", label: "CZK - Czech Republic (Kč)" },
    { value: "HUF", label: "HUF - Hungary (Ft)" },
    { value: "ILS", label: "ILS - Israel (₪)" },

    { value: "PKR", label: "PKR - Pakistan (₨)" },
    { value: "BDT", label: "BDT - Bangladesh (৳)" },
    { value: "LKR", label: "LKR - Sri Lanka (₨)" },
    { value: "NPR", label: "NPR - Nepal (₨)" }
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

  const handleChangePassword = () => {
    setShowPasswordField(true);
    setFieldValue("password", "");
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 sm:gap-5 mb-6 sm:mb-[60px]">
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="company name">Company Name</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="company_name"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="company admin">Company Admin</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="company_admin_name"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="username">Username</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="user_name"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="password">Password</FormLabel>
          {type === "edit" && !showPasswordField ? (
            <div className="sm:h-16 h-14">
              <button
                type="button"
                onClick={handleChangePassword}
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold text-left bg-white hover:bg-gray-50 transition-colors"
              >
                Click to change password
              </button>
            </div>
          ) : (
            <div className="sm:h-16 h-14">
              <Password
                name="password"
                className="sm:px-5 px-4 sm:py-[21px] py-4 !select-none border border-[#8D8D8D] rounded-lg w-full h-14 sm:h-16 shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter password"
                autoComplete="off"
              />
            </div>
          )}
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="company_id">Company ID</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="company_id"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="contact_person">Contact Person</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="contact_person"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
          <FormLabel htmlFor="email">Email</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="email"
              name="email"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter email address"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="tel"
              name="phone"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter phone number"
            />
          </div>
          <ErrorMessage
            name="phone"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="address">Address</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="address"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter company address"
            />
          </div>
          <ErrorMessage
            name="address"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="city">City</FormLabel>
          <div className="sm:h-16 h-14">
            <Field
              type="text"
              name="city"
              className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
              placeholder="Enter city"
            />
          </div>
          <ErrorMessage
            name="city"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <FormLabel htmlFor="currency">Currency</FormLabel>
          <div className="sm:h-16 h-14">
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