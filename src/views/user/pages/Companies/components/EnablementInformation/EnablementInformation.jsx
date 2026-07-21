import Button from "../../../../../../components/ui/Button/Button";
import Switch from "../../../../../../components/ui/Switch";
import FormLabel from "../../../../../../components/ui/FormLabel";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import ApiService from "../../../../../../services/ApiService";
import { useState } from "react";

const EnablementInformation = ({
  setIsOpen,
  setFormData,
  modalType,
  companyCreated,
  createdCompanyId,
  isCreatingCompany,
  newSubscriptionCreated,
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
      paymentData.append("billing_mode", values.billing_mode || "one_time");

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
      
      // NEW: Get amount from subscription object with fallback
      const subscriptionAmount = values?.subscription?.amount || 
                                 values?.subscription?.price || 
                                 0;
      
      if (!subscriptionAmount || subscriptionAmount <= 0) {
        setPaymentError("Subscription amount is not set. Please select a valid subscription.");
        setIsProcessingPayment(false);
        return;
      }
      
      paymentData.append("amount", Number(subscriptionAmount));
      paymentData.append("billing_mode", values.billing_mode || "one_time");

      console.log("Payment Data:", {
        id: createdCompanyId,
        amount: subscriptionAmount,
        subscription: values?.subscription,
        billing_mode: values.billing_mode || "one_time"
      });

      const response = await ApiService.createStripePaymentUrl(paymentData);

      if (response.status === 200 || response.status === 201) {
        if (response.data.url) {
          window.open(response.data.url, "_blank");
          
          // NEW: Show success message
          setPaymentError(null);
          
          // Optional: Close modal after short delay
          setTimeout(() => {
            setFormData({});
            setIsOpen(false);
          }, 2000);
        } else {
          setPaymentError("Payment URL not received from server");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Online payment failed. Please try again.";
      setPaymentError(errorMessage);
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
    (paymentStatus === "pending" || (paymentStatus === "success" && isExpired)) ||
    newSubscriptionCreated;
  const shouldShowOnlinePayment =
    values.subscription?.deduct_type === "card" || newSubscriptionCreated;
  const shouldShowCashPayment =
    !newSubscriptionCreated && values.subscription?.deduct_type === "cash";
  const billingMode = values.billing_mode || "one_time";

  const billingModeOptions = [
    {
      value: "one_time",
      title: "One-time Payment",
      description: "No auto renew. Send a new link on renewal.",
    },
    {
      value: "auto_renew",
      title: "Auto-renew Subscription",
      description: "Use only for trusted clients with their card.",
    },
  ];

  return (
    <>
      <div className="flex flex-wrap gap-4 sm:gap-5 mb-6 sm:mb-[60px]">
        {[
          "dispatcher",
          // "map",
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
      
      {/* NEW: Better error/success display */}
      {paymentError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {paymentError}
        </div>
      )}

      {/* NEW: Debug info (remove in production) */}
      {/* {process.env.NODE_ENV === 'development' && newSubscriptionCreated && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded text-sm">
          <strong>Debug Info:</strong>
          <div>Company ID: {createdCompanyId}</div>
          <div>Subscription Amount: {values?.subscription?.amount || 'Not Set'}</div>
          <div>Deduct Type: {values?.subscription?.deduct_type || 'Not Set'}</div>
        </div>
      )} */}

      {modalType === "company" &&
        (companyCreated || newSubscriptionCreated) &&
        shouldShowPaymentButtons &&
        shouldShowOnlinePayment && (
          <div className="mb-6 rounded-lg border border-[#E9E9E9] bg-white p-4">
            <FormLabel htmlFor="billing_mode">Online Billing Mode</FormLabel>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {billingModeOptions.map((option) => {
                const isSelected = billingMode === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFieldValue("billing_mode", option.value)}
                    className={`min-h-[92px] rounded-lg border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-[#1F41BB] bg-[#F5F7FF]"
                        : "border-[#E2E4E5] bg-white hover:border-[#1F41BB66]"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          isSelected ? "border-[#1F41BB]" : "border-[#9CA3AF]"
                        }`}
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#1F41BB]" />
                        )}
                      </span>
                      <span>
                        <span className="block text-base font-semibold leading-6 text-[#252525]">
                          {option.title}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-[#6C6C6C]">
                          {option.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-5">
        <Button
          btnSize="md"
          type="filledGray"
          className="w-full !px-10 pt-4 pb-[15px] leading-[25px] sm:w-auto"
          onClick={() => {
            unlockBodyScroll();
            setIsOpen({ type: "new", isOpen: false });
          }}
          disabled={isCreatingCompany || isProcessingPayment}
        >
          <span>Cancel</span>
        </Button>
        
      {modalType === "company" && (companyCreated || newSubscriptionCreated) && shouldShowPaymentButtons ? (
          <>
            {/* Show Cash Payment button only if subscription is cash AND not a new subscription change */}
            {shouldShowCashPayment && (
              <Button
                btnSize="md"
                type="filled"
                className="w-full !px-10 pt-4 pb-[15px] leading-[25px] sm:w-auto"
                onClick={handleCashPayment}
                disabled={isProcessingPayment}
              >
                <span>{isProcessingPayment ? "Processing..." : "Cash Payment"}</span>
              </Button>
            )}
            
            {/* Show Online Payment button if subscription is card OR if subscription changed from cash to card */}
            {shouldShowOnlinePayment && (
              <Button
                btnSize="md"
                type="filled"
                className="w-full !px-10 pt-4 pb-[15px] leading-[25px] sm:w-auto"
                onClick={handleOnlinePayment}
                disabled={isProcessingPayment}
              >
                <span>{isProcessingPayment ? "Processing..." : "Online Payment"}</span>
              </Button>
            )}
          </>
        ) : (
          <Button
            btnSize="md"
            type="filled"
            className="w-full !px-10 pt-4 pb-[15px] leading-[25px] sm:w-auto"
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
