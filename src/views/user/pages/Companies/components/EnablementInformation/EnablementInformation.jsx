import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
// import { enablementInformationSchema } from "../../validators/companyValidation";
import ApiService from "../../../../../../services/ApiService";
import { useState } from "react";

const EnablementInformation = ({
  setIsOpen,
  setFormData,
  modalType,
  companyCreated,
  createdCompanyId,
  isCreatingCompany,
}) => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

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
    <>
      <div className="flex flex-wrap gap-5 mb-[60px]">
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="dispatcher"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Dispatcher
          </label>
          <Switch name="dispatcher" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="map"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Map
          </label>
          <Switch name="map" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="push_notification"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Push Notification
          </label>
          <Switch name="push_notification" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="usage_monitoring"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Usage Monitoring
          </label>
          <Switch name="usage_monitoring" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="revenue_statements"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Revenue & Statements
          </label>
          <Switch name="revenue_statements" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="zone"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Zone
          </label>
          <Switch name="zone" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="manage_zones"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Manage Zones
          </label>
          <Switch name="manage_zones" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="cms"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            CMS
          </label>
          <Switch name="cms" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="lost_found"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Lost & Found
          </label>
          <Switch name="lost_found" />
        </div>
        <div className="w-[calc((100%-20px)/2)] flex justify-between h-[31px] items-center">
          <label
            htmlFor="accounts"
            className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
          >
            Accounts
          </label>
          <Switch name="accounts" />
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
            setIsOpen({ type: "new", isOpen: false });
          }}
          disabled={isCreatingCompany || isProcessingPayment}
        >
          <span>Cancel</span>
        </Button>
        {modalType === "company" && companyCreated ? (
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
            <span>{isCreatingCompany ? "Creating Company..." : "Submit"}</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default EnablementInformation;
