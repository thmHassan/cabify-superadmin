import React, { useEffect, useState } from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import PaymentAlertIcon from "../../../../../../components/svg/PaymentAlertIcon";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Button from "../../../../../../components/ui/Button/Button";
import WatchIcon from "../../../../../../components/svg/WatchIcon";
import { apiGetPymentReminder } from "../../../../../../services/AccountService";

// Fetch the payment reminder data from the API
const PaymentAlerts = () => {
  const [paymentAlerts, setPaymentAlerts] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchPayment = async () => {
    try {
      setTableLoading(true);
      const response = await apiGetPymentReminder();
      const list = response?.data?.list || [];
      setPaymentAlerts(list);
    } catch (error) {
      console.error("Error fetching payment alerts:", error);
      setPaymentAlerts([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  const isUrgent = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return expiry < now;
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 flex sm:flex-row sm:gap-0 gap-1 flex-col justify-between sm:items-center p-4">
        <CardSubtitle type={1} subtitle="$ Payment Alerts" />
        <CardSubtitle variant={1} type={1} subtitle="Companies requiring immediate attention" />
      </CardContainer>

      {/* Payment Alert List */}
      {paymentAlerts.length === 0 && !tableLoading && (
        <div className="text-center py-4">No payment alerts available.</div>
      )}

      {paymentAlerts.map((alert) => {
        const isPaymentDueSoon = new Date(alert.expiry_date) <= new Date() && alert.payment_status !== "success";

        return (
          <CardContainer
            key={alert.id}
            className={`lg:p-5 sm:px-4 px-3 sm:py-5 py-3 flex lg:flex-row flex-col md:gap-5 sm:gap-3 gap-2 justify-between lg:items-center p-4`}
          >
            <div className="flex gap-5 items-center lg:w-[calc(100%-326.75px)] w-full">
              <div
                className={`w-[60px] h-[60px] ${isPaymentDueSoon ? "bg-[#EF4444]" : "bg-[#F59E0B]"} rounded-full flex justify-center items-center`}
              >
                {isPaymentDueSoon ? <PaymentAlertIcon /> : <WatchIcon />}
              </div>
              <div className="flex flex-col gap-[5px] w-[calc(100%-80px)]">
                <CardSubtitle variant={1} type={1} subtitle={alert.company_name} />
                <ChildText size="md" text={isPaymentDueSoon ? `Payment failed on ${alert.expiry_date}. Account suspended.` : `Payment due in 3 days. Current balance: $${alert.payment_amount}`} />
              </div>
            </div>
            <div className="flex gap-3 lg:ml-0 ml-20 xs:flex-row flex-col">
              <Button type="filled" btnSize="md" className="xs:w-[calc(50%-10px)] md:w-auto w-full">
                Send Reminder
              </Button>
              <Button type="outline" btnSize="md" className="xs:w-[calc(50%-10px)] md:w-auto w-full">
                View Details
              </Button>
            </div>
          </CardContainer>
        );
      })}
    </div>
  );
};

export default PaymentAlerts;
