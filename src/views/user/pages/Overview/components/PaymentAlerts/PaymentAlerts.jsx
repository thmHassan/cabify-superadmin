import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import PaymentAlertIcon from "../../../../../../components/svg/PaymentAlertIcon";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Button from "../../../../../../components/ui/Button/Button";
import WatchIcon from "../../../../../../components/svg/WatchIcon";

const PaymentAlerts = () => {
  return (
    <div className="flex flex-col gap-5">
      <CardContainer className="p-6 flex justify-between">
        <CardSubtitle type={1} subtitle="$ Payment Alerts" />
        <CardSubtitle
          variant={1}
          type={1}
          subtitle="Companies requiring immediate attention"
        />
      </CardContainer>
      <CardContainer className="p-5 flex gap-5 justify-between items-center">
        <div className="flex gap-5">
          <div className="w-[60px] h-[60px] bg-[#EF4444] rounded-full flex justify-center items-center">
            <PaymentAlertIcon />
          </div>
          <div className="flex flex-col gap-[5px]">
            <CardSubtitle variant={1} type={1} subtitle="$ Payment Alerts" />
            <ChildText
              size="md"
              text="Payment failed on Dec 9, 2024. Account suspended."
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="filled" btnSize="md">
            Send Reminder
          </Button>
          <Button type="outline" btnSize="md">
            Send Reminder
          </Button>
        </div>
      </CardContainer>
      <CardContainer className="p-5 flex gap-5 justify-between items-center">
        <div className="flex gap-5">
          <div className="w-[60px] h-[60px] bg-[#F59E0B] rounded-full flex justify-center items-center">
            <WatchIcon />
          </div>
          <div className="flex flex-col gap-[5px]">
            <CardSubtitle
              variant={1}
              type={1}
              subtitle="City Cabs Ltd - Payment Due Soon"
            />
            <ChildText
              size="md"
              text="Payment due in 3 days. Current balance: $99"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button type="filled" btnSize="md">
            Send Reminder
          </Button>
          <Button type="outline" btnSize="md">
            Send Reminder
          </Button>
        </div>
      </CardContainer>
    </div>
  );
};

export default PaymentAlerts;
