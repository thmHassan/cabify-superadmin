import React, { useEffect, useState } from "react";
import PlusIcon from "../../../../components/svg/PlusIcon";
import Button from "../../../../components/ui/Button/Button";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
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
import RecentCompaniesActivity from "./components/RecentCompaniesActivity";
import RecentSystemAlerts from "./components/RecentSystemAlerts";
import PaymentAlerts from "./components/PaymentAlerts/PaymentAlerts";
import ApiStatus from "./components/ApiStatus/ApiStatus";
import { apiGetDashboardDetails } from "../../../../services/DashboardService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";

const DASHBOARD_CARDS = [
  {
    title: "Total Companies",
    value: "totalCompanies",
    change: "+3 from last hour",
    icon: {
      component: CompaniesIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Active Subscriptions",
    value: "activeSubscription",
    change: "+3 from last hour",
    icon: {
      component: SubscriptionIcon,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Monthly Revenue",
    value: "monthlyRevenue",
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
  const [isDashboardDetailsLoading, setIsDashboardDetailsLoading] =
    useState(false);
  const [dashboardDetails, setDashboardDetails] = useState({});
  const getDashboardDetails = async () => {
    try {
      setIsDashboardDetailsLoading(true);
      const result = await apiGetDashboardDetails();
      if (result?.status === 200) {
        console.log(result, "res======");
        setDashboardDetails(result?.data?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsDashboardDetailsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  if (isDashboardDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Admin Dashboard" />
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
            <SnapshotCard
              key={index}
              data={{ ...card, value: dashboardDetails[card.value] || 0 }}
            />
          ))}
        </div>
        <div className="flex gap-5">
          <RecentCompaniesActivity />
          {/* <RecentSystemAlerts /> */}
        </div>
        <PaymentAlerts />
        <ApiStatus />
      </div>
    </div>
  );
};

export default Overview;
