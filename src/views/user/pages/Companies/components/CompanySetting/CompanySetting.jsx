import React, { useEffect, useState } from "react";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormSelection from "../../../../../../components/ui/FormSelection/FormSelection";
import ApiService from "../../../../../../services/ApiService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const CompanySetting = ({ companyId }) => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanyDetails = async () => {
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
  };

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  const handleSubmit = () => {};

  if (loading) {
    return <AppLogoLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error: {error}</p>
        <button
          onClick={fetchCompanyDetails}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No settings found</p>
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

  return (
    <div>
      <div className="mb-5">
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
          // validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
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
                    <FormSelection
                      label="Select Call API Provider"
                      name="callApiProvider"
                      value={values.callApiProvider}
                      onChange={(val) => setFieldValue("callApiProvider", val)}
                      options={callApiOptions}
                      placeholder="Select Call API Provider"
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
