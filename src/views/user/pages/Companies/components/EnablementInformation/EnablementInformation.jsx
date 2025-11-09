import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import FormLabel from "../../../../../../components/ui/FormLabel";
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
      <div className="flex flex-wrap gap-4 sm:gap-5 mb-6 sm:mb-[60px]">
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="dispatcher" className="w-[calc(100%-63px)]">
            Dispatcher
          </FormLabel>
          <Switch name="dispatcher" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="map" className="w-[calc(100%-63px)]">
            Map
          </FormLabel>
          <Switch name="map" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="push_notification" className="w-[calc(100%-63px)]">
            Push Notification
          </FormLabel>
          <Switch name="push_notification" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="usage_monitoring" className="w-[calc(100%-63px)]">
            Usage Monitoring
          </FormLabel>
          <Switch name="usage_monitoring" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="revenue_statements" className="w-[calc(100%-63px)]">
            Revenue & Statements
          </FormLabel>
          <Switch name="revenue_statements" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="zone" className="w-[calc(100%-63px)]">
            Zone
          </FormLabel>
          <Switch name="zone" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="manage_zones" className="w-[calc(100%-63px)]">
            Manage Zones
          </FormLabel>
          <Switch name="manage_zones" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="cms" className="w-[calc(100%-63px)]">
            CMS
          </FormLabel>
          <Switch name="cms" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="lost_found" className="w-[calc(100%-63px)]">
            Lost & Found
          </FormLabel>
          <Switch name="lost_found" />
        </div>
        <div className="w-full sm:w-[calc((100%-20px)/2)] gap-3 flex justify-between h-[31px] items-center">
          <FormLabel htmlFor="accounts" className="w-[calc(100%-63px)]">
            Accounts
          </FormLabel>
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
