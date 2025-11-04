import { useEffect, useState } from "react";
import SnapshotCard from "../../../../components/shared/SnapshotCard";
import CompaniesIcon from "../../../../components/svg/CompaniesIcon";
import SubscriptionIcon from "../../../../components/svg/SubscriptionIcon";
import RevenueIcon from "../../../../components/svg/RevenueIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PageTitle from "../../../../components/ui/PageTitle";
import RecentCompaniesActivity from "./components/RecentCompaniesActivity";
import PaymentAlerts from "./components/PaymentAlerts/PaymentAlerts";
import ApiStatus from "./components/ApiStatus/ApiStatus";
import { apiGetDashboardDetails } from "../../../../services/DashboardService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import ApiService from "../../../../services/ApiService";

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
];

const Overview = () => {
  const [isDashboardDetailsLoading, setIsDashboardDetailsLoading] =
    useState(false);
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [companies, setCompanies] = useState([]);
  const [companiesLoading, setCompaniesLoading] = useState(false);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        setCompaniesLoading(true);
        const response = await ApiService.getCompanyList({
          page: 1,
          status: "active",
        });
        const list = response?.data?.list;
        const rows = Array.isArray(list?.data) ? list?.data : [];
        setCompanies(rows.slice(0, 3));
      } catch {
        console.log("Failed to load recent companies");
        setCompanies([]);
      } finally {
        setCompaniesLoading(false);
      }
    };
    fetchRecent();
  }, []);
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

  if (isDashboardDetailsLoading || companiesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 min-h-[calc(100vh-85px)]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard
              key={index}
              data={{ ...card, value: dashboardDetails[card.value] || 0 }}
            />
          ))}
        </div>
        <div className="w-full">
          <RecentCompaniesActivity companies={companies} />
          {/* <RecentSystemAlerts /> */}
        </div>
        <PaymentAlerts />
        <ApiStatus data={dashboardDetails} />
      </div>
    </div>
  );
};

export default Overview;
