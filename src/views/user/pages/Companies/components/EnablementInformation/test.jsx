import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { enablementInformationSchema } from "../../validators/companyValidation";
import ApiService from "../../../../../../services/ApiService";

const EnablementInformation = ({
  setIsOpen,
  formData,
  setFormData,
  onNext,
  onPrevious,
  onSubmit,
  isLastStep,
  isFirstStep,
  registerStepValidation,
  stepIndex,
  defaultFormValue,
  modalType,
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
//   const [isCreatingCompany, setIsCreatingCompany] = useState(false);
//   const [companyCreated, setCompanyCreated] = useState(false);
//   const [createdCompanyId, setCreatedCompanyId] = useState(null);

  const handleSubmit = async (values) => {
    console.log("values", values);
    setFormData((prev) => ({ ...prev, ...values }));

    if (isLastStep && modalType === "company") {
      await handleCreateCompany(values);
    } else if (isLastStep) {
      onSubmit();
    } else {
      onNext();
    }
  };

//   const handleCreateCompany = async (values) => {
//     try {
//       setIsCreatingCompany(true);
//       setPaymentError(null);

//       const companyData = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (formData[key] !== null && formData[key] !== undefined) {
//           if (key === "picture" && formData[key] instanceof File) {
//             companyData.append(key, formData[key]);
//           } else {
//             companyData.append(key, formData[key]);
//           }
//         }
//       });

//       // Add enablement values
//       Object.keys(values).forEach((key) => {
//         companyData.append(key, values[key]);
//       });

//       const response = await ApiService.createCompany(companyData);

//       if (response.status === 200 || response.status === 201) {
//         console.log("Company created successfully:", response.data);
//         setCompanyCreated(true);

//         const companyId =
//           response.data.tenant.id ||
//           response.data.company_id ||
//           response.data.data?.id;
//         setCreatedCompanyId(companyId);
//       }
//     } catch (error) {
//       console.error("Company creation error:", error);
//       setPaymentError(
//         error.response?.data?.message || "Failed to create company"
//       );
//     } finally {
//       setIsCreatingCompany(false);
//     }
//   };

  const handleCashPayment = async () => {
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const paymentData = new FormData();
      paymentData.append("id", createdCompanyId);

      const response = await ApiService.cashPayment(paymentData);

      if (response.status === 200 || response.status === 201) {
        console.log("Cash payment successful:", response.data);
        setFormData({});
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Cash payment error:", error);
      setPaymentError(error.response?.data?.message || "Cash payment failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleOnlinePayment = async () => {
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const paymentData = new FormData();
      paymentData.append("id", createdCompanyId);

      const response = await ApiService.createStripePaymentUrl(paymentData);

      if (response.status === 200 || response.status === 201) {
        console.log("Stripe payment URL created:", response.data);

        if (response.data.url) {
          window.open(response.data.url, "_blank");
        }
        setFormData({});
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Online payment error:", error);
      setPaymentError(error.response?.data?.message || "Online payment failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <Formik
      initialValues={{
        dispatcher: formData.dispatcher || (defaultFormValue ?? false),
        map: formData.map || (defaultFormValue ?? false),
        push_notification:
          formData.push_notification || (defaultFormValue ?? false),
        usage_monitoring:
          formData.usage_monitoring || (defaultFormValue ?? false),
        revenue_statements:
          formData.revenue_statements || (defaultFormValue ?? false),
        zone: formData.zone || (defaultFormValue ?? false),
        manage_zones: formData.manage_zones || (defaultFormValue ?? false),
        cms: formData.cms || (defaultFormValue ?? false),
        lost_found: formData.lost_found || (defaultFormValue ?? false),
        accounts: formData.accounts || (defaultFormValue ?? false),
      }}
      validationSchema={enablementInformationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ values, setFieldValue, validateForm }) => {
        const validateFormRef = useRef(validateForm);
        validateFormRef.current = validateForm;

        // Register validation function with parent
        React.useEffect(() => {
          if (registerStepValidation) {
            const validationFunction = async () => {
              const validationErrors = await validateFormRef.current();
              return Object.keys(validationErrors).length === 0;
            };
            registerStepValidation(stepIndex, validationFunction);
          }
        }, [registerStepValidation, stepIndex]);

        return (
          <Form>
            <div className="flex flex-wrap gap-5 mb-[60px]">
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="dispatcher"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Dispatcher
                </label>
                <Switch
                  // checked={values.dispatcher}
                  // onChange={(checked) => setFieldValue("dispatcher", checked)}
                  name="dispatcher"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="map"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Map
                </label>
                <Switch
                  // checked={values.map}
                  // onChange={(checked) => setFieldValue("map", checked)}
                  name="map"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="push_notification"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Push Notification
                </label>
                <Switch
                  // checked={values.push_notification}
                  // onChange={(checked) =>
                  //   setFieldValue("push_notification", checked)
                  // }
                  name="push_notification"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="usage_monitoring"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Usage Monitoring
                </label>
                <Switch
                  // checked={values.usage_monitoring}
                  // onChange={(checked) =>
                  //   setFieldValue("usage_monitoring", checked)
                  // }
                  name="usage_monitoring"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="revenue_statements"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Revenue & Statements
                </label>
                <Switch
                  // checked={values.revenue_statements}
                  // onChange={(checked) =>
                  //   setFieldValue("revenue_statements", checked)
                  // }
                  name="revenue_statements"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="zone"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Zone
                </label>
                <Switch
                  // checked={values.zone}
                  // onChange={(checked) => setFieldValue("zone", checked)}
                  name="zone"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="manage_zones"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Manage Zones
                </label>
                <Switch
                  // checked={values.manage_zones}
                  // onChange={(checked) => setFieldValue("manage_zones", checked)}
                  name="manage_zones"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="cms"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  CMS
                </label>
                <Switch
                  // checked={values.cms}
                  // onChange={(checked) => setFieldValue("cms", checked)}
                  name="cms"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="lost_found"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Lost & Found
                </label>
                <Switch
                  // checked={values.lost_found}
                  // onChange={(checked) => setFieldValue("lost_found", checked)}
                  name="lost_found"
                />
              </div>
              <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
                <label
                  htmlFor="accounts"
                  className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                >
                  Accounts
                </label>
                <Switch
                  // checked={values.accounts}
                  // onChange={(checked) => setFieldValue("accounts", checked)}
                  name="accounts"
                />
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {paymentError}
              </div>
            )}

            <div className="flex gap-5 justify-end">
              <Button
                btnSize="md"
                type="filledGray"
                className="!px-10 pt-4 pb-[15px] leading-[25px]"
                onClick={() => {
                  unlockBodyScroll();
                  setIsOpen(false);
                }}
                disabled={isCreatingCompany || isProcessingPayment}
              >
                <span>Cancel</span>
              </Button>

              {modalType === "company" && isLastStep && companyCreated ? (
                <>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="!px-10 pt-4 pb-[15px] leading-[25px]"
                    onClick={handleCashPayment}
                    disabled={isProcessingPayment}
                  >
                    <span>
                      {isProcessingPayment ? "Processing..." : "Cash Payment"}
                    </span>
                  </Button>
                  <Button
                    btnSize="md"
                    type="filled"
                    className="!px-10 pt-4 pb-[15px] leading-[25px]"
                    onClick={handleOnlinePayment}
                    disabled={isProcessingPayment}
                  >
                    <span>
                      {isProcessingPayment ? "Processing..." : "Online Payment"}
                    </span>
                  </Button>
                </>
              ) : (
                <Button
                  btnSize="md"
                  type="filled"
                  className="!px-10 pt-4 pb-[15px] leading-[25px]"
                  btnType="submit"
                  disabled={isCreatingCompany || isProcessingPayment}
                >
                  <span>
                    {isCreatingCompany ? "Creating Company..." : "Submit"}
                  </span>
                </Button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EnablementInformation;
