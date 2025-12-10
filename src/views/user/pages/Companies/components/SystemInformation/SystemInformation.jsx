import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import FormLabel from "../../../../../../components/ui/FormLabel";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { SYSTEM_INFORMATION_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import { useEffect } from "react";

const SystemInformation = ({ goToNextTab, setIsOpen, formEl }) => {
  const { values, setTouched, validateForm, setFieldValue } = formEl;

  // ⭐ Auto-clear stripe_enablement when stripe_enable = false
  useEffect(() => {
    if (!values.stripe_enable) {
      setFieldValue("stripe_enablement", "");
    }
  }, [values.stripe_enable, setFieldValue]);

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

  const unitsApiOptions = [
    { value: "km", label: "KM" },
    { value: "miles", label: "Miles" },
  ];

  const timeZoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
    { value: "Asia/Dubai", label: "Asia/Dubai" },
    { value: "Europe/London", label: "Europe/London" },
    { value: "Europe/Paris", label: "Europe/Paris" },
    { value: "America/New_York", label: "America/New_York" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles" },
  ];

  return (
    <>
      <div className="mb-6 sm:mb-[60px] flex flex-col gap-5">
        <div className="flex flex-wrap gap-3 sm:gap-5 border-b-[0.7px] border-[#6C6C6C] pb-5">
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="units">Units</FormLabel>
            <div className="sm:h-16 h-14 md:absolute md:w-[calc((90%)/2)]">
              <FormSelection
                name="units"
                options={unitsApiOptions}
                value={values.units}
                onChange={(val) => setFieldValue("units", val)}
                placeholder="Select Units"
              />
            </div>
            <ErrorMessage
              name="units"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="country_of_use">Country of Use</FormLabel>
            <div className="sm:h-16 h-14">
              <div className="md:absolute md:w-[calc((90%)/2)]">
                <Field
                  type="text"
                  name="country_of_use"
                  className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full 
                  shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] 
                  sm:text-base text-sm leading-[22px] font-semibold"
                  placeholder="Enter country of use"
                />
              </div>
            </div>
            <ErrorMessage
              name="country_of_use"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="time_zone">Time Zone</FormLabel>
            <div className="sm:h-16 h-14">
              <div className="md:absolute md:w-[calc((90%)/2)]">
                <FormSelection
                  name="time_zone"
                  options={timeZoneOptions}
                  value={values.time_zone}
                  onChange={(val) => setFieldValue("time_zone", val)}
                  placeholder="Select Time Zone"
                />
              </div>
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
              Stripe / Paypal
            </FormLabel>
            <Switch
              checked={values.stripe_enable}
              onChange={(checked) => setFieldValue("stripe_enable", checked)}
              name="stripe_enable"
            />
          </div>

          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <FormLabel htmlFor="enable_smtp" className="w-[calc(100%-63px)]">
              Enable SMTP
            </FormLabel>
            <Switch name="enable_smtp" />
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
                  className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] 
                  rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] 
                  placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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
