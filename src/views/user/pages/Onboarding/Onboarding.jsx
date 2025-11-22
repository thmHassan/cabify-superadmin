import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import TabView from "../../../../components/shared/TabView/TabView";
import PendingRequests from "./components/PendingRequests";
import ApprovedRequests from "./components/ApprovedRequests";
import RejectedRequests from "./components/RejectedRequests";
import AddCompanyModal from "../Companies/components/AddCompanyModal";
import {
  lockBodyScroll,
  toBoolean,
} from "../../../../utils/functions/common.function";
import {
  apiGetOnboarding,
  apiGetOnboardingById,
} from "../../../../services/OnboardingService";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import Modal from "../../../../components/shared/Modal";
import _ from "lodash";
import Pagination from "../../../../components/ui/Pagination";
import { PAGE_SIZE_OPTIONS } from "../../../../constants/selectOptions";

const Onboarding = () => {
  const [isManualRequestModal, setIsManualRequestModal] = useState({
    isOpen: false,
    type: "new",
  });
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(false);
  const [allOnboardings, setAllOnboardings] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isOnboardingEditLoading, setIsOnboardingEditLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(3)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const TABS_CONFIGS = [
    {
      title: "Pending (0)",
      component: PendingRequests,
      status: "pending",
      count: 0,
    },
    {
      title: "Approved (0)",
      component: ApprovedRequests,
      status: "approved",
      count: 0,
    },
    {
      title: "Rejected (0)",
      component: RejectedRequests,
      status: "rejected",
      count: 0,
    },
  ];

  const [tabConfig, setTabConfig] = useState(TABS_CONFIGS);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const onEdit = async (data) => {
    try {
      setIsOnboardingEditLoading(true);
      setIsManualRequestModal({ isOpen: true, type: "edit" });
      const result = await apiGetOnboardingById({ id: data?.id });
      if (result?.status === 200 && result?.data?.onboardingRequest) {
        const {
          log_map_search_result,
          accounts,
          dispatcher,
          map,
          push_notification,
          usage_monitoring,
          revenue_statements,
          zone,
          manage_zones,
          cms,
          lost_found,
          voip,
          enable_smtp,
          sub_company,
        } =
          result?.data?.onboardingRequest |
          {
            log_map_search_result: false,
            accounts: false,
            dispatcher: false,
            map: false,
            push_notification: false,
            usage_monitoring: false,
            revenue_statements: false,
            zone: false,
            manage_zones: false,
            cms: false,
            lost_found: false,
            voip: false,
            enable_smtp: false,
            sub_company: false,
          };
        const formattedValues = {
          ...result?.data?.onboardingRequest,
          log_map_search_result: toBoolean(log_map_search_result, 3),
          accounts: toBoolean(accounts, 2),
          enable_smtp: toBoolean(enable_smtp),
          sub_company: toBoolean(sub_company),
          dispatcher: toBoolean(dispatcher, 2),
          map: toBoolean(map, 2),
          push_notification: toBoolean(push_notification, 2),
          usage_monitoring: toBoolean(usage_monitoring, 2),
          revenue_statements: toBoolean(revenue_statements, 2),
          zone: toBoolean(zone, 2),
          manage_zones: toBoolean(manage_zones, 2),
          cms: toBoolean(cms, 2),
          lost_found: toBoolean(lost_found, 2),
          voip: toBoolean(voip, 2),
        };
        setInitialValues(formattedValues);
      }
    } catch (error) {
      console.log("err--", error);
    } finally {
      setIsOnboardingEditLoading(false);
    }
  };

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  const getOnboarding = async () => {
    try {
      setIsOnboardingLoading(true);
      const result = await apiGetOnboarding({
        status: tabConfig[currentTabIndex].status,
        page: currentPage,
        perPage: itemsPerPage,
      });
      if (result?.status === 200) {
        const list = result?.data?.list;
        setAllOnboardings(list?.data || []);
        setLastPage(list?.last_page);
        setCurrentPage(list?.current_page || 1)
        setItemsPerPage(list?.per_page || itemsPerPage)
        if (currentTabIndex === 0) {
          const { pendingCount, rejectedCount, approvedCount } =
            result?.data || {
              pendingCount: 0,
              rejectedCount: 0,
              approvedCount: 0,
            };
          const [pending, approved, rejected] = _.cloneDeep(tabConfig);
          setTabConfig([
            {
              ...pending,
              title: `${pending.title.split(" ")[0]} (${pendingCount})`,
              count: pendingCount,
            },
            {
              ...approved,
              title: `${approved.title.split(" ")[0]} (${approvedCount})`,
              count: approvedCount,
            },
            {
              ...rejected,
              title: `${rejected.title.split(" ")[0]} (${rejectedCount})`,
              count: rejectedCount,
            },
          ]);
        }
      }
    } catch (errors) {
      console.log(errors, "err---");
      // ErrorNotification(
      //   errors?.response?.data?.message ||
      //     "Failed to fetch booking list. Please reload."
      // );
    } finally {
      setIsOnboardingLoading(false);
    }
  };

  useEffect(() => {
    getOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTabIndex, refreshTrigger]);

  useEffect(() => {
    getOnboarding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsPerPage, currentTabIndex]);

  // console.log(currentTabIndex, "currentTabIndex=====");

  // console.log(allOnboardings, "allOnboardings====");

  if (
    (currentTabIndex === 0 && isOnboardingLoading) ||
    isOnboardingEditLoading
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
          <PageTitle title="Onboarding Requests" />
          <PageSubTitle title="Manage company onboarding requests, configure services, and approve new partners" />
        </div>
        <div className="sm:w-auto xs:w-auto w-full sm:mb-[50px] mb-8">
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => {
              lockBodyScroll();
              setIsManualRequestModal({ isOpen: true, type: "new" });
            }}
            className="w-full sm:w-auto -mb-2 sm:-mb-3 lg:-mb-3 !py-3.5 sm:!py-3 lg:!py-3"
          >
            <div className="flex gap-2 sm:gap-[15px] items-center justify-center whitespace-nowrap">
              <span className="hidden sm:inline-block">
                <PlusIcon />
              </span>
              <span className="sm:hidden">
                <PlusIcon height={16} width={16} />
              </span>
              <span>Add Manual Request</span>
            </div>
          </Button>
        </div>
      </div>
      <div>
        <TabView
          align="left"
          tabs={tabConfig}
          onTabChange={(index) => setCurrentTabIndex(index)}
          allOnboardings={allOnboardings}
          isOnboardingLoading={isOnboardingLoading}
          onRefresh={handleRefresh}
          onEdit={onEdit}
        />
      </div>

      <div className="mt-4 sm:mt-4 border-t border-[#E9E9E9] pt-3 sm:pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={lastPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPageOptions={PAGE_SIZE_OPTIONS}
          pageKey="onBoarding"
        />
      </div>
      <Modal
        isOpen={isManualRequestModal.isOpen}
        className="p-4 sm:p-6 lg:p-10"
      >
        <AddCompanyModal
          modalType="onboarding"
          isCompanyModalOpen={isManualRequestModal}
          setIsOpen={setIsManualRequestModal}
          onRefresh={handleRefresh}
          initialValue={initialValues}
        />
      </Modal>
    </div>
  );
};

export default Onboarding;
