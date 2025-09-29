import React from "react";
import PlusIcon from "../../../../components/svg/PlusIcon";
import Button from "../../../../components/ui/Button/Button";
import SnapshotCard from "../../../../components/shared/SnapshotCard/SnapshotCard";
import CompaniesIcon from "../../../../components/svg/CompaniesIcon";
import SubscriptionIcon from "../../../../components/svg/SubscriptionIcon";
import RevenueIcon from "../../../../components/svg/RevenueIcon";
import UptimeIcon from "../../../../components/svg/UptimeIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import CardTitle from "../../../../components/ui/CardTitle";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import CloseIcon from "../../../../components/svg/CloseIcon";
import WarningIcon from "../../../../components/svg/WarningIcon";
import PaymentAlertIcon from "../../../../components/svg/PaymentAlertIcon";
import WatchIcon from "../../../../components/svg/WatchIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PageTitle from "../../../../components/ui/PageTitle";
import Tag from "../../../../components/ui/Tag";

const DASHBOARD_CARDS = [
  {
    title: "Total Companies",
    value: 26,
    change: "+3 from last hour",
    icon: {
      component: CompaniesIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Active Subscriptions",
    value: 24,
    change: "+3 from last hour",
    icon: {
      component: SubscriptionIcon,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Monthly Revenue",
    value: 24,
    change: "+3 from last hour",
    icon: {
      component: RevenueIcon,
    },
    backgroundColor: "#fdf3e7",
    color: "#C29569",
  },
  {
    title: "System Uptime",
    value: 24,
    change: "+3 from last hour",
    icon: {
      component: UptimeIcon,
    },
    backgroundColor: "#e9f2ff",
    color: "#3C71B7",
  },
];

const Overview = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Admin Dashboard" />
          <Button type="filled" btnSize="2xl">
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add Company</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle
            title="Welcome to Taxi Dispatch by Mapifyit - Manage companies,
            subscriptions, and monitor system performance."
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} />
          ))}
        </div>
        <div className="flex gap-5">
          <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-[calc((100%-20px)/2)]">
            <div className="mb-2.5">
              <CardTitle title="Recent Companies Activity" />
              <CardSubtitle subtitle="Latest company registrations and subscription changes" />
            </div>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-[15px] bg-[#ffffff] p-5 flex justify-between h-[120px] hover:scale-[1.01] transition-all duration-300 hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
                >
                  <div>
                    <div className="mb-[5px]">
                      <CardSubtitle type={1} subtitle="Metro Taxi Co." />
                    </div>
                    <p className="text-[#6C6C6C] text-sm leading-[19px] font-semibold mb-[5px]">
                      New company registered
                    </p>
                    <div className="flex gap-10">
                      <ChildText text="Plan: Premium" />
                      <ChildText text="2 min ago" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-[15px] items-center">
                    <CardSubtitle variant={1} type={1} subtitle="$199" />
                    <Tag variant="green">Completed</Tag>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button btnSize="2xl" type="bgOutlined">
                <span>See All</span>
              </Button>
            </div>
          </CardContainer>
          <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-[calc((100%-20px)/2)]">
            <div className="mb-2.5">
              <CardTitle title="System Alerts" />
              <CardSubtitle subtitle="Important notifications and system status" />
            </div>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 3 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-[15px] bg-[#ffffff] p-5 flex justify-between h-[120px] gap-5 hover:scale-[1.01] transition-all duration-300 hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
                >
                  <div className="w-6 pt-[7px]">
                    <div className="w-6 h-6 flex justify-center items-center">
                      <WarningIcon />
                    </div>
                  </div>
                  <div className="w-[calc(100%-94px)] pl-2.5">
                    <div className="max-w-[408px] mb-2.5">
                      <ChildText
                        size="md"
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      />
                    </div>
                    <ChildText text="Plan: Premium" />
                  </div>
                  <div className="w-[30px] h-[30px] flex justify-center items-center bg-[#E6E6E6] rounded-full">
                    <CloseIcon />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button btnSize="2xl" type="bgOutlined">
                <span>See All</span>
              </Button>
            </div>
          </CardContainer>
        </div>
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
        <CardContainer className="p-6 flex justify-between">
          <CardSubtitle type={1} subtitle="API Status" />
          <CardSubtitle
            variant={1}
            type={1}
            subtitle="Current API performance and usage"
          />
        </CardContainer>
        <div className="flex gap-5">
          <div className="w-[calc((100%-20px)/2)]">
            <CardContainer type={1} className="p-6 flex flex-col gap-5">
              <CardSubtitle type={1} subtitle="Google Maps API" />
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Requests:" />
                <CardSubtitle variant={1} type={1} subtitle="850K" />
              </div>
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Cost:" />
                <CardSubtitle variant={1} type={1} subtitle="$420" />
              </div>
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Status:" />
                <CardSubtitle
                  variant={1}
                  type={1}
                  subtitle="Active"
                  className="!text-[#10B981]"
                />
              </div>
            </CardContainer>
          </div>
          <div className="w-[calc((100%-20px)/2)]">
            <CardContainer type={1} className="p-6 flex flex-col gap-5">
              <CardSubtitle type={1} subtitle="Twilio API" />
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Minutes:" />
                <CardSubtitle variant={1} type={1} subtitle="1,250" />
              </div>
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Cost:" />
                <CardSubtitle variant={1} type={1} subtitle="$125" />
              </div>
              <div className="flex items-center justify-between">
                <CardSubtitle variant={1} type={1} subtitle="Status:" />
                <CardSubtitle
                  variant={1}
                  type={1}
                  subtitle="Active"
                  className="!text-[#10B981]"
                />
              </div>
            </CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
