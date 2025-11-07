import React, { useEffect, useState, useCallback } from "react";
import * as Yup from "yup";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import { COMPANY_SETTING_VALIDATION_SCHEMA } from "../../../../validators/pages/companies.validation";

const CompanySetting = ({ companyId }) => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getCompanyDetails(companyId);
      setCompanyDetails(response?.data || null);
    } catch (err) {
      setError(err.message || "Failed to fetch company details");
      console.error("Error fetching company details:", err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId, fetchCompanyDetails]);

  const handleSubmit = () => {};

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12">
        <AppLogoLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 sm:py-8 px-4">
        <p className="text-red-500 text-sm sm:text-base mb-3 sm:mb-4">
          Error: {error}
        </p>
        <button
          onClick={fetchCompanyDetails}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1F41BB] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#1a3599] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-sm sm:text-base">
          No settings found
        </p>
      </div>
    );
  }

  // Get API configuration from response
  const apiConfig = companyDetails?.data?.api_configuration || {};

  // Define options for each field
  const mapApiOptions = [
    { value: "Google Maps", label: "Google Maps" },
    { value: "Mapbox", label: "Mapbox" },
    { value: "OpenStreetMap", label: "OpenStreetMap" },
  ];

  const callApiOptions = [
    { value: "Twilio", label: "Twilio" },
    { value: "Vonage", label: "Vonage" },
    { value: "AWS Connect", label: "AWS Connect" },
  ];

  const paymentMethodOptions = [
    { value: "Online", label: "Online" },
    { value: "Cash", label: "Cash" },
    { value: "Bank Transfer", label: "Bank Transfer" },
  ];

  const planTypeOptions = [
    { value: "Basic", label: "Basic" },
    { value: "Premium", label: "Premium" },
    { value: "Enterprise", label: "Enterprise" },
  ];

  const mapSearchApiOptions = [
    { value: "Google Maps", label: "Google Maps" },
    { value: "Mapbox", label: "Mapbox" },
    { value: "OpenStreetMap", label: "OpenStreetMap" },
  ];

  // Ensure API-provided value appears in the options even if casing/value differs
  const callApiInitial = apiConfig.call_api_provide || "";
  const callApiOptionsSafe =
    callApiInitial && !callApiOptions.some((o) => o.value === callApiInitial)
      ? [{ value: callApiInitial, label: callApiInitial }, ...callApiOptions]
      : callApiOptions;

  return (
    <div>
      <div className="mb-4 sm:mb-5">
        <CardSubtitle type={1} subtitle="API Configuration :" />
      </div>
      <div>
        <Formik
          initialValues={{
            mapApiProvider: apiConfig.map_api_provide || "",
            callApiProvider: apiConfig.call_api_provide || "",
            paymentMethod: apiConfig.payment_method || "",
            planType: apiConfig.plan_type || "",
            mapSearchApiProvider: apiConfig.map_search_api_provider || "",
          }}
          enableReinitialize={true}
          validationSchema={COMPANY_SETTING_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-12 lg:mb-[60px]">
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="mapApiProvider"
                    className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                  >
                    Map API Provider
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Map API Provider"
                      name="mapApiProvider"
                      value={values.mapApiProvider}
                      onChange={(val) => setFieldValue("mapApiProvider", val)}
                      options={mapApiOptions}
                      placeholder="Select Map API Provider"
                    />
                  </div>
                  <ErrorMessage
                    name="mapApiProvider"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="callApiProvider"
                    className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                  >
                    Call API Provider
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Call API Provider"
                      name="callApiProvider"
                      value={values.callApiProvider}
                      onChange={(val) => setFieldValue("callApiProvider", val)}
                      options={callApiOptionsSafe}
                      placeholder="Select Call API Provider"
                    />
                  </div>
                  <ErrorMessage
                    name="callApiProvider"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="paymentMethod"
                    className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                  >
                    Payment Method
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Payment Method"
                      name="paymentMethod"
                      value={values.paymentMethod}
                      onChange={(val) => setFieldValue("paymentMethod", val)}
                      options={paymentMethodOptions}
                      placeholder="Select Payment Method"
                    />
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="planType"
                    className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                  >
                    Plan Type
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Plan Type"
                      name="planType"
                      value={values.planType}
                      onChange={(val) => setFieldValue("planType", val)}
                      options={planTypeOptions}
                      placeholder="Select Plan Type"
                    />
                  </div>
                  <ErrorMessage
                    name="planType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <label
                    htmlFor="mapSearchApiProvider"
                    className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                  >
                    Map Search API Provider
                  </label>
                  <div className="h-16">
                    <FormSelection
                      label="Select Map Search API Provider"
                      name="mapSearchApiProvider"
                      value={values.mapSearchApiProvider}
                      onChange={(val) =>
                        setFieldValue("mapSearchApiProvider", val)
                      }
                      options={mapSearchApiOptions}
                      placeholder="Select Map Search API Provider"
                      menuPlacement="top"
                    />
                  </div>
                  <ErrorMessage
                    name="mapSearchApiProvider"
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
