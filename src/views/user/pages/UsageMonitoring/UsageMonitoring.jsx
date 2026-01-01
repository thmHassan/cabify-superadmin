import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { debounce } from "lodash";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

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

  const debouncedSearchRef = useRef(
    debounce((searchValue) => {
      setDebouncedSearchQuery(searchValue);
    }, 500)
  );

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
    debouncedSearchRef.current(value);
  }, []);

  const TABS_CONFIGS = useMemo(
    () => [
      {
        title: "Company Usage",
        component: CompanyUsage,
        data: allUsageMonitoring.company_list,
        searchQuery: searchQuery,
        onSearchChange: handleSearchChange,
        isLoading: isUsageMonitoringDetailsLoading,
      },
      // {
      //   title: "Service Performance",
      //   component: ServicePerformance,
      // },
    ],
    [
      allUsageMonitoring.company_list,
      searchQuery,
      handleSearchChange,
      isUsageMonitoringDetailsLoading,
    ]
  );

  useEffect(() => {
    const debouncedFn = debouncedSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  const getUsageMonitoringDetails = async (search = "") => {
    try {
      setIsUsageMonitoringDetailsLoading(true);
      const result = await apiGetUsageMonitoringDetails({
        search: search || undefined,
      });
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
    getUsageMonitoringDetails(debouncedSearchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  // Only show full-page loader on initial load (when no data exists)
  if (
    isUsageMonitoringDetailsLoading &&
    allUsageMonitoring.company_list.length === 0
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="Usage Monitoring" />
          <PageSubTitle title="Real-time monitoring of system performance and company usage" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {DASHBOARD_CARDS.map((card, index) => (
            <SnapshotCard key={index} data={card} />
          ))}
        </div>
        <div>
          <div className="flex flex-col gap-2 sm:gap-[9px] mb-4 sm:mb-5">
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
