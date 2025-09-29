import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import MonthlyRevenueIcon from "../../../../components/svg/MonthlyRevenueIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import PaymentProviderIcon from "../../../../components/svg/PaymentProviderIcon";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import ThreeDots from "../../../../components/svg/ThreeDots";

const Payments = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Payments" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <MonthlyRevenueIcon width={24} height={24} fill="#ffffff" />
              <span>Test Connection</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage payment providers, transactions, and billing settings" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <PaymentProviderIcon height={24} width={24} fill="#000000" />
              <CardSubtitle type={1} subtitle="Payment Providers" />
            </div>
            <div className="text-[#000000]">
              Configure payment processing services
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }, (_, i) => (
              <CardContainer key={i} type={1} className="p-5">
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <div className="min-w-14">
                      <div className="w-full h-14 bg-[#1F41BB] rounded-md"></div>
                    </div>
                    <div className="max-w-[606px] w-full flex flex-col gap-2.5">
                      <PageSubTitle
                        title="Twilio"
                        className="!text-[#000000]"
                      />
                      <ChildText text="Monthly minutes: 1,250   Monthly cost: $125" />
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <Button btnSize="md" type="filledGreen">
                        <span>Active</span>
                      </Button>
                    </div>
                    <div className="px-5">
                      <Button>
                        <span className="rotate-90 block">
                          <ThreeDots />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </CardContainer>
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <MonthlyRevenueIcon width={30} height={30} fill="#000000" />
              <CardSubtitle type={1} subtitle="Recent Transactions" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }, (_, i) => (
              <CardContainer key={i} type={1} className="p-5 flex justify-between items-center">
                <div className="flex flex-col gap-3">
                  <PageSubTitle className="!text-[#00000066]" title="TXN001" />
                  <PageSubTitle
                    className="!text-[#000000]"
                    title="Metro Taxi Co."
                  />
                  <PageSubTitle
                    className="!text-[#00000066]"
                    title="2024-12-10"
                  />
                </div>
                <div className="leading-[30px] text-[22px] text-[#000000] font-semibold">
                  <span>$199</span>
                </div>
                <div>
                  <Button btnSize="md" type="filledGreen">
                    <span>COMPLETED</span>
                  </Button>
                </div>
              </CardContainer>
            ))}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default Payments;
