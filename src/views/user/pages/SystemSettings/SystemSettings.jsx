import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SettingIcon from "../../../../components/svg/SettingIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import ConfigSmallCard from "../../../../components/shared/ConfigSmallCard";
import SystemInformationIcon from "../../../../components/svg/SystemInformationIcon";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";

const SETTING_INFORMATION = [
  {
    label: "Add SMTP",
    value: "v2.4.1",
  },
  {
    label: "System Version",
    value: "v2.4.1",
  },
  {
    label: "Database Version",
    value: "PostgreSQL 14.2",
  },
  {
    label: "Last Backup",
    value: "2024-12-10 03:00 AM",
  },
  {
    label: "Privacy Policy",
    value: "2.4 TB / 5 TB",
  },
  {
    label: "FAQs",
    value: "156",
  },
];

const SystemSettings = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="System Settings" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <SettingIcon width={24} height={24} fill="#ffffff" />
              <span>Save Changes</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Configure system-wide settings and maintenance options" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <SettingIcon height={24} width={24} fill="#000000" />
              <CardSubtitle type={1} subtitle="Payment Providers" />
            </div>
            <div className="text-[#000000]">
              Manage system-wide settings and preferences
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <ConfigSmallCard title="MAINTENANCE MODE">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="DEBUG MODE">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="AUTO BACKUP">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="EMAIL NOTIFICATIONS">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="SMS NOTIFICATION">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="DATA RETENTION (DAYS)">
              <input
                type="text"
                value={12}
                name=""
                id=""
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
          </div>
        </CardContainer>
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <SystemInformationIcon width={30} height={30} fill="#000000" />
              <CardSubtitle type={1} subtitle="System Information" />
            </div>
            <div className="text-[#000000]">
              Manage map service provider and their configurations
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            {SETTING_INFORMATION.map(({ label, value }, index) => (
              <CardContainer
                key={index}
                type={1}
                className="py-6 px-8 h-[84px] flex items-center justify-between"
              >
                <CardSubtitle
                  variant={1}
                  subtitle={label}
                  className="!text-[#000000]"
                />
                <ChildText size="md" className="!text-[#000000]" text={value} />
              </CardContainer>
            ))}
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default SystemSettings;
