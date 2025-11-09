import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import TotalRequestIcon from "../../../../components/svg/TotalRequestIcon";
import DataTransferIcon from "../../../../components/svg/DataTransferIcon";
import ResponseTimeIcon from "../../../../components/svg/ResponseTimeIcon";
import ErrorRateIcon from "../../../../components/svg/ErrorRateIcon";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
import PerformanceOverview from "./components/PerformanceOverview";
import TrafficAnalytics from "./components/TrafficAnalytics";
import ErrorMonitoring from "./components/ErrorMonitoring";
import ResourceUsage from "./components/ResourceUsage";
import TabView from "../../../../components/shared/TabView/TabView";

const DASHBOARD_CARDS = [
  {
    title: "Total Requests",
    value: "2.4M",
    change: "+15% vs last week",
    icon: {
      component: TotalRequestIcon,
    },
    backgroundColor: "#eeedff",
    color: "#534CB4",
  },
  {
    title: "Data Transfer",
    value: "120ms",
    change: "+8% vs last week",
    icon: {
      component: DataTransferIcon,
    },
    backgroundColor: "#e5f9f0",
    color: "#3E9972",
  },
  {
    title: "Avg Response Time",
    value: "145ms",
    change: "-25ms vs last week",
    icon: {
      component: ResponseTimeIcon,
    },
    backgroundColor: "#fdf3e7",
    color: "#C29569",
  },
  {
    title: "Error Rate",
    value: "0.02%",
    change: "-0.01% vs last week",
    icon: {
      component: ErrorRateIcon,
    },
    backgroundColor: "#FFEDED",
    color: "#FF4747",
  },
];

const SystemAnalytics = () => {
  const TABS_CONFIGS = [
    {
      title: "Performance Overview",
      component: PerformanceOverview,
    },
    {
      title: "Traffic Analytics",
      component: TrafficAnalytics,
    },
    {
      title: "Error Monitoring",
      component: ErrorMonitoring,
    },
    {
      title: "Resource Usage",
      component: ResourceUsage,
    },
  ];
  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="System Analytics" />
          <PageSubTitle title="Comprehensive system performance analytics and monitoring insights" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span className="whitespace-nowrap">Download Report</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:gap-5 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 1.5xl:grid-cols-4 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} className="col-span-1" />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
            <ChildText text="Service Performance Metrics" size="2xl" />
            <PageSubTitle title="Real-time performance data for all system services and components" />
          </div>
          <div>
            <TabView align="left" tabs={TABS_CONFIGS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;
