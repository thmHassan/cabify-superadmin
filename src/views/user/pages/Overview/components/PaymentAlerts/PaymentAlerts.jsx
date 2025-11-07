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
      <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 flex sm:flex-row sm:gap-0 gap-1 flex-col justify-between sm:items-center p-4">
        <CardSubtitle type={1} subtitle="$ Payment Alerts" />
        <CardSubtitle
          variant={1}
          type={1}
          subtitle="Companies requiring immediate attention"
        />
      </CardContainer>
      <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 flex lg:flex-row flex-col md:gap-5 sm:gap-3 gap-2 justify-between lg:items-center p-4">
        <div className="flex gap-5 items-center lg:w-[calc(100%-326.75px)] w-full">
          <div className="w-[60px] h-[60px] bg-[#EF4444] rounded-full flex justify-center items-center">
            <PaymentAlertIcon />
          </div>
          <div className="flex flex-col gap-[5px] w-[calc(100%-80px)]">
            <CardSubtitle variant={1} type={1} subtitle="$ Payment Alerts" />
            <ChildText
              size="md"
              text="Payment failed on Dec 9, 2024. Account suspended."
            />
          </div>
        </div>
        <div className="flex gap-3 lg:ml-0 ml-20 xs:flex-row flex-col">
          <Button
            type="filled"
            btnSize="md"
            className="xs:w-[calc(50%-10px)] md:w-auto w-full"
          >
            Send Reminder
          </Button>
          <Button
            type="outline"
            btnSize="md"
            className="xs:w-[calc(50%-10px)] md:w-auto w-full"
          >
            Send Reminder
          </Button>
        </div>
      </CardContainer>
      <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 flex lg:flex-row flex-col md:gap-5 sm:gap-3 gap-2 justify-between lg:items-center p-4">
        <div className="flex gap-5 items-center lg:w-[calc(100%-326.75px)] w-full">
          <div className="w-[60px] h-[60px] bg-[#F59E0B] rounded-full flex justify-center items-center">
            <WatchIcon />
          </div>
          <div className="flex flex-col gap-[5px] w-[calc(100%-80px)]">
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
        <div className="flex gap-3 lg:ml-0 ml-20 xs:flex-row flex-col">
          <Button
            type="filled"
            btnSize="md"
            className="xs:w-[calc(50%-10px)] md:w-auto w-full"
          >
            Send Reminder
          </Button>
          <Button
            type="outline"
            btnSize="md"
            className="xs:w-[calc(50%-10px)] md:w-auto w-full"
          >
            Send Reminder
          </Button>
        </div>
      </CardContainer>
    </div>
  );
};

export default PaymentAlerts;
