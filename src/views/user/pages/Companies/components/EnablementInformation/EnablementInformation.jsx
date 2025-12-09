import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import FormLabel from "../../../../../../components/ui/FormLabel";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import ApiService from "../../../../../../services/ApiService";
import { useState } from "react";
import { ErrorMessage, Field } from "formik";

const EnablementInformation = ({
  setIsOpen,
  setFormData,
  modalType,
  companyCreated,
  createdCompanyId,
  isCreatingCompany,
  formEl
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const { values, setFieldValue } = formEl;

  const handleCashPayment = async () => {
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const paymentData = new FormData();
      paymentData.append("id", createdCompanyId);

      const response = await ApiService.cashPayment(paymentData);

      if (response.status === 200 || response.status === 201) {
        setIsOpen(false);
      }
    } catch (error) {
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
      paymentData.append("amount", Number(formEl.values?.subscription?.amount));

      const response = await ApiService.createStripePaymentUrl(paymentData);

      if (response.status === 200 || response.status === 201) {
        if (response.data.url) {
          window.open(response.data.url, "_blank");
        }
        setFormData({});
        setIsOpen(false);
      }
    } catch (error) {
      setPaymentError(error.response?.data?.message || "Online payment failed");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const company =
    companyCreated && typeof companyCreated === "object"
      ? companyCreated
      : formEl?.values?.company || {};

  const paymentStatus = company?.payment_status;
  const expiryDate = company?.expiry_date;

  const isExpired = expiryDate ? new Date(expiryDate) <= new Date() : false;

  const shouldShowPaymentButtons =
    paymentStatus === "pending" || (paymentStatus === "success" && isExpired);

  console.log("company", company);
  console.log("paymentStatus", paymentStatus);
  console.log("shouldShowPaymentButtons", shouldShowPaymentButtons);

  return (
    <>
      <div className="flex flex-wrap gap-4 sm:gap-5 mb-6 sm:mb-[60px]">
        {[
          "dispatcher",
          "map",
          "push_notification",
          "usage_monitoring",
          "revenue_statements",
          "zone",
          "manage_zones",
          "cms",
          "lost_found",
          "accounts"
        ].map((feature) => (
          <div
            key={feature}
            className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center"
          >
            <FormLabel htmlFor={feature} className="w-[calc(100%-63px)]">
              {feature
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </FormLabel>
            <Switch name={feature} />
          </div>
        ))}
      </div>

      {/* {values.map && (
        <div className="flex flex-wrap gap-4 sm:gap-5 mb-6">

          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="google_api_key">Google API Key</FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="text"
                name="google_api_key"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter Google API Key"
              />
            </div>
            <ErrorMessage
              name="google_api_key"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="w-full sm:w-[calc((100%-20px)/2)]">
            <FormLabel htmlFor="barikoi_api_key">Barikoi API Key</FormLabel>
            <div className="sm:h-16 h-14">
              <Field
                type="text"
                name="barikoi_api_key"
                className="sm:px-5 px-4 sm:py-[21px] py-4 border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] sm:text-base text-sm leading-[22px] font-semibold"
                placeholder="Enter Barikoi API Key"
              />
            </div>
            <ErrorMessage
              name="barikoi_api_key"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

        </div>
      )} */}

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
            setIsOpen({ type: "new", isOpen: false });
          }}
          disabled={isCreatingCompany || isProcessingPayment}
        >
          <span>Cancel</span>
        </Button>
        {modalType === "company" && companyCreated && shouldShowPaymentButtons ? (
          <>
            <Button
              btnSize="md"
              type="filled"
              className="!px-10 pt-4 pb-[15px] leading-[25px]"
              onClick={handleCashPayment}
              disabled={isProcessingPayment}
            >
              <span>{isProcessingPayment ? "Processing..." : "Cash Payment"}</span>
            </Button>
            <Button
              btnSize="md"
              type="filled"
              className="!px-10 pt-4 pb-[15px] leading-[25px]"
              onClick={handleOnlinePayment}
              disabled={isProcessingPayment}
            >
              <span>{isProcessingPayment ? "Processing..." : "Online Payment"}</span>
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
            <span>{isCreatingCompany ? "Creating Company..." : "Submit"}</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default EnablementInformation;
