import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import FormLabel from "../../../../../../components/ui/FormLabel";
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
        <div className="flex flex-wrap gap-3 sm:gap-5 border-b-[0.7px] border-[#6C6C6C] pb-5">
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="units">
              Units
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="text"
                name="units"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
            <FormLabel htmlFor="country_of_use">
              Country of Use
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="text"
                name="country_of_use"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
            <FormLabel htmlFor="time_zone">
              Time Zone
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="text"
                name="time_zone"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
            <FormLabel htmlFor="stripe_enable" className="w-[calc(100%-63px)]">
              Stripe/ Paypal
            </FormLabel>
            <Switch
              // checked={values.stripe_enable}
              // onChange={(checked) => setFieldValue("stripe_enable", checked)}
              name="stripe_enable"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <FormLabel htmlFor="enable_smtp" className="w-[calc(100%-63px)]">
              Enable SMTP
            </FormLabel>
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
              <FormLabel htmlFor="stripe_enablement">
                Stripe Enablement
              </FormLabel>
              <div className="sm:h-16 h-14">
                <Field
                  type="text"
                  name="stripe_enablement"
                  className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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

export default SystemInformation;
