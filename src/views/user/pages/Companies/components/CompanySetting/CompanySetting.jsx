import React, { useEffect, useState, useCallback } from "react";
import * as Yup from "yup";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormLabel from "../../../../../../components/ui/FormLabel";
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
        <p className="text-gray-500 text-sm sm:text-base">No settings found</p>
      </div>
    );
  }

  // Get API configuration from response
  const apiConfig = companyDetails?.data?.api_configuration || {};

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
          {() => (
            <Form>
              <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-12 lg:mb-[60px]">
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="mapApiProvider">
                    Map API Provider
                  </FormLabel>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="mapApiProvider"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Map API Provider"
                    />
                  </div>
                  <ErrorMessage
                    name="mapApiProvider"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="callApiProvider">
                    Call API Provider
                  </FormLabel>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="callApiProvider"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Call API Provider"
                    />
                  </div>
                  <ErrorMessage
                    name="callApiProvider"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="paymentMethod">Payment Method</FormLabel>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="paymentMethod"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Payment Method"
                    />
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="planType">Plan Type</FormLabel>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="planType"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Plan Type"
                    />
                  </div>
                  <ErrorMessage
                    name="planType"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full sm:w-[calc((100%-20px)/2)]">
                  <FormLabel htmlFor="mapSearchApiProvider">
                    Map Search API Provider
                  </FormLabel>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="mapSearchApiProvider"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter Map Search API Provider"
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
