import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { SYSTEM_INFORMATION_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const SystemInformation = ({ goToNextTab, setIsOpen, formEl }) => {
  const { values, setTouched, validateForm } = formEl;

  const onNext = async () => {
    const fieldsToValidate = Object.keys(SYSTEM_INFORMATION_VALIDATION_SCHEMA);
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
      <div className="mb-6 sm:mb-[60px] flex flex-col gap-5">
        <div className="flex flex-wrap gap-4 sm:gap-5 border-b-[0.7px] border-[#6C6C6C] pb-5">
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <label
              htmlFor="units"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Units
            </label>
            <div className="h-16">
              <Field
                type="text"
                name="units"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter Units km/ miles"
              />
            </div>
            <ErrorMessage
              name="units"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <label
              htmlFor="country_of_use"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Country of Use
            </label>
            <div className="h-16">
              <Field
                type="text"
                name="country_of_use"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter country of use"
              />
            </div>
            <ErrorMessage
              name="country_of_use"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <label
              htmlFor="time_zone"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Time Zone
            </label>
            <div className="h-16">
              <Field
                type="text"
                name="time_zone"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter time zone"
              />
            </div>
            <ErrorMessage
              name="time_zone"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <label
              htmlFor="stripe_enable"
              className="mb-[5px] block text-[18px] w-[calc(100%-63px)] leading-[25px] text-[#252525] font-semibold "
            >
              Stripe/ Paypal
            </label>
            <Switch
              // checked={values.stripe_enable}
              // onChange={(checked) => setFieldValue("stripe_enable", checked)}
              name="stripe_enable"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <label
              htmlFor="enable_smtp"
              className="mb-[5px] block text-[18px] w-[calc(100%-63px)] leading-[25px] text-[#252525] font-semibold "
            >
              Enable SMTP
            </label>
            <Switch
              // checked={values.enable_smtp}
              // onChange={(checked) =>
              //   setFieldValue("enable_smtp", checked)
              // }
              name="enable_smtp"
            />
          </div>
          {values.stripe_enable && (
            <div className="w-full sm:w-[calc((100%-20px)/2)]">
              <label
                htmlFor="stripe_enablement"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Stripe Enablement
              </label>
              <div className="h-16">
                <Field
                  type="text"
                  name="stripe_enablement"
                  className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                  placeholder="Enter stripe enablement"
                />
              </div>
              <ErrorMessage
                name="stripe_enablement"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        <Button
          btnSize="md"
          type="filledGray"
          className="!px-10 pt-4 pb-[15px] leading-[25px]"
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
          className="!px-10 pt-4 pb-[15px] leading-[25px]"
          onClick={onNext}
        >
          <span>Next</span>
        </Button>
      </div>
    </>
  );
};

export default SystemInformation;
