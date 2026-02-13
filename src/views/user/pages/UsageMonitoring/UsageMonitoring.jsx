import {
  useEffect,
  useState,
  useRef,
} from "react";
import { debounce } from "lodash";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import { apiGetUsageMonitoringDetails } from "../../../../services/UsageMonitoringService";
import DownloadIcon from "../../../../components/svg/DownloadIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import UsageMonitoringCard from "./components/UsageMonitoringCard";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const debouncedSearchRef = useRef(
    debounce((searchValue) => {
      setDebouncedSearchQuery(searchValue);
    }, 500)
  );

  useEffect(() => {
    const debouncedFn = debouncedSearchRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  const getUsageMonitoringDetails = async (
    search = "",
    page = 1,
    perPage = 10
  ) => {
    try {
      setIsUsageMonitoringDetailsLoading(true);

      const result = await apiGetUsageMonitoringDetails({
        search: search || undefined,
        page: page,
        per_page: perPage,
      });

      if (result?.status === 200) {
        setAllUsageMonitoring(result?.data);

        setCurrentPage(result?.data?.pagination?.current_page);
        setTotalPages(result?.data?.pagination?.last_page);
        setItemsPerPage(result?.data?.pagination?.per_page);
      }
    } catch (errors) {
      console.log(errors, "err---");
    } finally {
      setIsUsageMonitoringDetailsLoading(false);
    }
  };

  useEffect(() => {
    getUsageMonitoringDetails(
      debouncedSearchQuery,
      currentPage,
      itemsPerPage
    );
  }, [debouncedSearchQuery, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (perPage) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  const handleDownloadReport = async () => {
    try {
      setIsUsageMonitoringDetailsLoading(true);

      // 🔥 Fetch all data (large limit)
      const result = await apiGetUsageMonitoringDetails({
        search: debouncedSearchQuery || undefined,
        page: 1,
        per_page: 10000, // Large number to get all data
      });

      if (result?.status === 200) {
        const companyList = result?.data?.company_list || [];

        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Usage Monitoring Report", 14, 15);

        const tableColumn = [
          "Company Name",
          "API Calls Today",
          "Map Requests",
          "VoIP Minutes",
          "Dispatchers",
        ];

        const tableRows = companyList.map((company) => [
          company.company_name,
          company.api_calls_today,
          company.map_request,
          company.voip_minutes,
          company.dispatchers,
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 25,
        });

        doc.save("Usage_Monitoring_Report.pdf");
      }
    } catch (error) {
      console.log("Download error:", error);
    } finally {
      setIsUsageMonitoringDetailsLoading(false);
    }
  };

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
            onClick={handleDownloadReport}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex sm:gap-[15px] items-center justify-center">
              <span className="hidden sm:inline-block">
                <DownloadIcon />
              </span>
              <span className="sm:hidden">
                <DownloadIcon />
              </span>
              <span className="whitespace-nowrap">Download Report</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[30px]">
        <CardContainer className="p-3 sm:p-4 lg:p-5">
          <div className="space-y-4 mt-6">
            {isUsageMonitoringDetailsLoading ? (
              <div className="flex justify-center py-10">
                <AppLogoLoader />
              </div>
            ) : allUsageMonitoring?.company_list?.length > 0 ? (
              allUsageMonitoring.company_list.map((company, index) => (
                <UsageMonitoringCard
                  key={index}
                  company={company}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">
                No company usage data found
              </p>
            )}
          </div>
          <div className="mt-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={PAGE_SIZE_OPTIONS}
              pageKey="usageMonitoring"
            />
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default UsageMonitoring;