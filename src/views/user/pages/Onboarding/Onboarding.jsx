import React, { useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import TabView from "../../../../components/shared/TabView/TabView";
import PendingRequests from "./components/PendingRequests";
import ApprovedRequests from "./components/ApprovedRequests";
import RejectedRequests from "./components/RejectedRequests";
import AddCompanyModal from "../Companies/components/AddCompanyModal";

const Onboarding = () => {
  const [isManualRequestModal, setIsManualRequestModal] = useState(false);

  const TABS_CONFIGS = [
    {
      title: "Pending (03)",
      component: PendingRequests,
    },
    {
      title: "Approved (1)",
      component: ApprovedRequests,
    },
    {
      title: "Rejected (2)",
      component: RejectedRequests,
    },
  ];

  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Onboarding Requests" />
          <Button
            type="filled"
            btnSize="2xl"
            onClick={() => setIsManualRequestModal(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Add Manual Request</span>
            </div>
          </Button>
        </div>
        <PageSubTitle title="Manage company onboarding requests, configure services, and approve new partners" />
      </div>
      <div>
        <TabView align="left" tabs={TABS_CONFIGS} />
      </div>
      <AddCompanyModal
        isOpen={isManualRequestModal}
        setIsOpen={setIsManualRequestModal}
      />
    </div>
  );
};

export default Onboarding;
