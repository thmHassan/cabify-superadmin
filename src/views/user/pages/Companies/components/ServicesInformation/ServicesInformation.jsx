import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import RadioButton from "../../../../../../components/ui/RadioButton";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import ApiService from "../../../../../../services/ApiService";
import { SERVICE_INFORMATION_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const ServicesInformation = ({ goToNextTab, formEl, setIsOpen }) => {
  const { values, setFieldValue, setTouched, validateForm } = formEl;

  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState(null);

  const onNext = async () => {
    const fieldsToValidate = Object.keys(SERVICE_INFORMATION_VALIDATION_SCHEMA);
    setTouched(
      fieldsToValidate.reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    const formErrors = await validateForm();
    const hasErrors = fieldsToValidate.some((key) => formErrors[key]);
    if (!hasErrors) {
      goToNextTab?.();
    }
  };

  // Fetch subscription list on component mount
  useEffect(() => {
    const fetchSubscriptionList = async () => {
      setIsLoadingSubscriptions(true);
      setSubscriptionError(null);

      try {
        const response = await ApiService.getSubscriptionList();
        if (response.data.success === 1 && response.data.list.data) {
          const options = response.data.list.data.map((subscription) => ({
            value: subscription.id,
            label: subscription.plan_name,
          }));
          setSubscriptionOptions(options);
        }
      } catch (error) {
        console.error("Error fetching subscription list:", error);
        setSubscriptionError("Failed to load subscription options");

        setSubscriptionOptions([
          { value: "test", label: "Test" },
          { value: "basic", label: "Basic" },
          { value: "premium", label: "Premium" },
          { value: "enterprise", label: "Enterprise" },
        ]);
      } finally {
        setIsLoadingSubscriptions(false);
      }
    };

    fetchSubscriptionList();
  }, []);

  // const handleSubmit = (values) => {
  //   const coerced = {
  //     ...values,
  //     passengers_allowed:
  //       values.passengers_allowed === ""
  //         ? ""
  //         : Number(values.passengers_allowed),
  //     dispatchers_allowed:
  //       values.dispatchers_allowed === ""
  //         ? ""
  //         : Number(values.dispatchers_allowed),
  //     drivers_allowed:
  //       values.drivers_allowed === "" ? "" : Number(values.drivers_allowed),
  //   };
  //   setFormData((prev) => ({ ...prev, ...coerced }));
  //   if (isLastStep) {
  //     onSubmit();
  //   } else {
  //     onNext();
  //   }
  // };

  return (
    <>
      <div className="mb-[60px] flex flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="maps_api"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Maps API
            </label>
            <div className="h-16">
              <Field
                type="text"
                name="maps_api"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter Maps API"
              />
            </div>
            <ErrorMessage
              name="maps_api"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="search_api"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Search API
            </label>
            <div className="h-16">
              <Field
                type="text"
                name="search_api"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enable Search API (Google/ Barikoi)"
              />
            </div>
            <ErrorMessage
              name="search_api"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="passengers_allowed"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Passengers Allowed
            </label>
            <div className="h-16">
              <Field
                type="number"
                name="passengers_allowed"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="passengers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="dispatchers_allowed"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Dispatchers Allowed
            </label>
            <div className="h-16">
              <Field
                type="number"
                name="dispatchers_allowed"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="dispatchers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="drivers_allowed"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Drivers Allowed
            </label>
            <div className="h-16">
              <Field
                type="number"
                name="drivers_allowed"
                className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="drivers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <label
              htmlFor="subscription_type"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Subscription Type
            </label>
            <div className="h-16">
              <FormSelection
                label="Select Subscription Type"
                name="subscription_type"
                value={values.subscription_type}
                onChange={(val) => setFieldValue("subscription_type", val)}
                placeholder={isLoadingSubscriptions ? "Loading..." : "Select"}
                options={subscriptionOptions}
                disabled={isLoadingSubscriptions}
              />
            </div>
            {subscriptionError && (
              <div className="text-red-500 text-sm mt-1">
                {subscriptionError}
              </div>
            )}
            <ErrorMessage
              name="subscription_type"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 py-5 border-y-[0.7px] border-[#6C6C6C]">
          <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
            <label
              htmlFor="log_map_search_result"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Log Google Map Search Results
            </label>
            <Switch name="log_map_search_result" />
          </div>
          <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
            <label
              htmlFor="voip"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              VoIP
            </label>
            <Switch name="voip" />
          </div>
          <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
            <label
              htmlFor="sub_company"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Sub Company
            </label>
            <Switch name="sub_company" />
          </div>
        </div>
        <div className="flex flex-col gap-5 pb-5 border-b-[0.7px] border-[#6C6C6C]">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="uber_plot_hybrid"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                System Type
              </label>
              <div className="flex gap-5">
                <RadioButton
                  name="uber_plot_hybrid"
                  value="uber"
                  label="Uber/Bidding System"
                />
                <RadioButton
                  name="uber_plot_hybrid"
                  value="auto"
                  label="Auto Dispatch System"
                />
                <RadioButton
                  name="uber_plot_hybrid"
                  value="both"
                  label="Both"
                />
              </div>
              <ErrorMessage
                name="uber_plot_hybrid"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="w-[calc((100%-20px)/2)] flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fleet_management"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                Fleet Management
              </label>
              <div className="flex gap-5">
                <RadioButton name="fleet_management" value="yes" label="Yes" />
                <RadioButton name="fleet_management" value="no" label="No" />
              </div>
              <ErrorMessage
                name="fleet_management"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
          <div className="w-[calc((100%-20px)/2)] flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="sos_features"
                className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
              >
                SOS Feature
              </label>
              <div className="flex gap-5">
                <RadioButton name="sos_features" value="yes" label="Yes" />
                <RadioButton name="sos_features" value="no" label="No" />
              </div>
              <ErrorMessage
                name="sos_features"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full">
            <label
              htmlFor="notes"
              className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
            >
              Notes
            </label>
            <div className="h-[130px]">
              <Field
                as="textarea"
                name="notes"
                rows={5}
                className="h-full px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                placeholder="Write Notes"
              />
            </div>
            <ErrorMessage
              name="notes"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
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

export default ServicesInformation;
