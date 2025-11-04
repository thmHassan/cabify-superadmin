import React, { useEffect, useState } from "react";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import CompaniesIcon from "../../../../components/svg/CompaniesIcon";
import APIKeysIcon from "../../../../components/svg/APIKeysIcon";
import TabView from "../../../../components/shared/TabView/TabView";
import CompanyUsage from "./components/CompanyUsage";
import ServicePerformance from "./components/ServicePerformance";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import { apiGetUsageMonitoringDetails } from "../../../../services/UsageMonitoringService";

const UsageMonitoring = () => {
  const [isUsageMonitoringDetailsLoading, setIsUsageMonitoringDetailsLoading] =
    useState(false);
  const [allUsageMonitoring, setAllUsageMonitoring] = useState({
    company_list: [],
    data: {
      activeCompanies: 0,
      totalAPICalls: 0,
    },
  });

  const DASHBOARD_CARDS = [
    {
      title: "Active Companies",
      value: allUsageMonitoring.data.activeCompanies,
      change: "+3 vs last hour",
      icon: {
        component: CompaniesIcon,
        width: 28,
        height: 28,
        fill: "#C29569",
      },
      backgroundColor: "#fdf3e7",
      color: "#C29569",
    },
    {
      title: "Total API Calls",
      value: `${allUsageMonitoring.data.totalAPICalls}k`,
      change: "+12% vs Last hour",
      icon: {
        width: 24,
        height: 24,
        component: APIKeysIcon,
      },
      backgroundColor: "#FFEDED",
      color: "#FF4747",
    },
  ];

  const TABS_CONFIGS = [
    {
      title: "Company Usage",
      component: CompanyUsage,
      data: allUsageMonitoring.company_list,
    },
    {
      title: "Service Performance",
      component: ServicePerformance,
    },
  ];

  const getUsageMonitoringDetails = async () => {
    try {
      setIsUsageMonitoringDetailsLoading(true);
      const result = await apiGetUsageMonitoringDetails();
      if (result?.status === 200) {
        setAllUsageMonitoring(result?.data);
      }
    } catch (errors) {
      console.log(errors, "err---");
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsUsageMonitoringDetailsLoading(false);
    }
  };

  useEffect(() => {
    getUsageMonitoringDetails();
  }, []);

  if (isUsageMonitoringDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="Usage Monitoring" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Download Report</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Real-time monitoring of system performance and company usage" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-[5px] mb-5">
            <ChildText text="Subscription Management" size="2xl" />
            <PageSubTitle title="Overview of all company subscriptions and billing status" />
          </div>
          <div>
            <TabView align="left" tabs={TABS_CONFIGS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageMonitoring;
