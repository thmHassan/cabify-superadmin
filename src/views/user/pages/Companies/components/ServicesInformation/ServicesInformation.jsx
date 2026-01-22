import { ErrorMessage, Field } from "formik";
import { useEffect, useState } from "react";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import RadioButton from "../../../../../../components/ui/RadioButton";
import FormLabel from "../../../../../../components/ui/FormLabel";
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
  const mapsApiOptions = [
    { value: "google", label: "Google" },
    { value: "barikoi", label: "Barikoi" },
    // { value: "both", label: "Both" },
  ];

  const searchApiOptions = [
    { value: "google", label: "Google" },
    { value: "barikoi", label: "Barikoi" },
    // { value: "both", label: "Both" },
  ];

  useEffect(() => {
    const fetchSubscriptionList = async () => {
      setIsLoadingSubscriptions(true);
      setSubscriptionError(null);

      try {
        const response = await ApiService.getSubscriptionList();
        if (response.data.success === 1 && response.data.list.data) {
          const options = response.data.list.data.map((subscription) => ({
            value: Number(subscription.id),
            label: subscription.plan_name,
            fullData: subscription,
          }));

          setSubscriptionOptions(options);
        }
      } catch (error) {
        setSubscriptionError("Failed to load subscription options");

        // setSubscriptionOptions([
        //   { value: "test", label: "Test" },
        //   { value: "basic", label: "Basic" },
        //   { value: "premium", label: "Premium" },
        //   { value: "enterprise", label: "Enterprise" },
        // ]);
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
  // const options = response.data.list.data.map((subscription) => ({
  //   value: Number(subscription.id),
  //   label: subscription.plan_name,
  //   fullData: subscription,
  // }));

  return (
    <>
      <div className="mb-6 sm:mb-[60px] flex flex-col gap-5">
        <div className="flex flex-wrap gap-3 sm:gap-5">
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="maps_api">Maps API</FormLabel>
            <div className="sm:h-16 h-14 md:absolute md:w-[calc((90%)/2)]">
              <FormSelection
                name="maps_api"
                options={mapsApiOptions}
                value={values.maps_api}
                onChange={(val) => setFieldValue("maps_api", val)}
                placeholder="Select Maps API"
                className="w-full absolute"
              />
            </div>
            <ErrorMessage
              name="maps_api"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="search_api">Search API</FormLabel>
            <div className="sm:h-16 h-14">
              <div className="md:absolute md:w-[calc((90%)/2)]">
                <FormSelection
                  name="search_api"
                  options={searchApiOptions}
                  value={values.search_api}
                  onChange={(val) => setFieldValue("search_api", val)}
                  placeholder="Select Search API"
                />
              </div>
            </div>
            <ErrorMessage
              name="search_api"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="passengers_allowed">
              Passengers Allowed
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="number"
                name="passengers_allowed"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="passengers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="dispatchers_allowed">
              Dispatchers Allowed
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="number"
                name="dispatchers_allowed"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="dispatchers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="drivers_allowed">
              Drivers Allowed
            </FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="number"
                name="drivers_allowed"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter number"
              />
            </div>
            <ErrorMessage
              name="drivers_allowed"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="subscription_type">
              Subscription Type
            </FormLabel>
            <div className="sm:h-16 h-14 md:absolute md:w-[calc((90%)/2)]">
              <FormSelection
                label="Select Subscription Type"
                name="subscription_type"
                value={
                  subscriptionOptions.length > 0
                    ? Number(values.subscription_type)
                    : ""
                }
                onChange={(val) => {
                  const selectedObj = subscriptionOptions.find(
                    (item) => item.value === val
                  );

                  setFieldValue("subscription_type", val);
                  setFieldValue("subscription", selectedObj?.fullData || null);
                }}
                placeholder={isLoadingSubscriptions ? "Loading..." : "Select"}
                options={subscriptionOptions.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
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
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <FormLabel htmlFor="log_map_search_result" className="w-[calc(100%-63px)]">
              Log Google Map Search Results
            </FormLabel>
            <Switch name="log_map_search_result" />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <FormLabel htmlFor="voip" className="w-[calc(100%-63px)]">
              VoIP
            </FormLabel>
            <Switch name="voip" />
          </div>
          <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
            <FormLabel htmlFor="sub_company" className="w-[calc(100%-63px)]">
              Sub Company
            </FormLabel>
            <Switch name="sub_company" />
          </div>
        </div>
        <div className="flex flex-col gap-5 pb-5 border-b-[0.7px] border-[#6C6C6C]">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="uber_plot_hybrid">
                System Type
              </FormLabel>
              <div className="flex sm:flex-row flex-col sm:gap-5 gap-3">
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
          <div className="w-full sm:w-[calc((100%-20px)/2)] flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="fleet_management">
                Fleet Management
              </FormLabel>
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
          <div className="w-full sm:w-[calc((100%-20px)/2)] flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <FormLabel htmlFor="sos_features">
                SOS Feature
              </FormLabel>
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
            <FormLabel htmlFor="notes">
              Notes
            </FormLabel>
            <div className="h-[130px]">
              <Field
                as="textarea"
                name="notes"
                rows={5}
                className="h-full sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
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

export default ServicesInformation;
