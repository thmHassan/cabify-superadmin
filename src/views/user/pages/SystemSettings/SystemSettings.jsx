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
import Switch from "../../../../components/ui/Switch";
import PhoneOutlineIcon from "../../../../components/svg/PhoneOutlineIcon";

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
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="System Settings" />
          <PageSubTitle title="Configure system-wide settings and maintenance options" />
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
                <PhoneOutlineIcon width={24} height={24} fill="#ffffff" />
              </span>
              <span className="sm:hidden">
                <PhoneOutlineIcon width={16} height={16} fill="#ffffff" />
              </span>
              <span>Add VoIP</span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[30px]">
        <CardContainer className="p-3 sm:p-4 lg:p-5">
          <div className="bg-[#006FFF1A] mb-6 sm:mb-8 lg:mb-10 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex gap-3 sm:gap-4 items-center">
              <span className="hidden sm:inline-block">
                <SettingIcon width={30} height={30} fill="#000000" />
              </span>
              <span className="sm:hidden">
                <SettingIcon width={24} height={24} fill="#000000" />
              </span>
              <CardSubtitle type={1} subtitle="System Configuration" />
            </div>
            <div className="text-sm sm:text-base text-[#000000]">
              Manage system-wide settings and preferences
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 flex-wrap">
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="Maintenance Mode"
                  className="whitespace-nowrap"
                />
                <Switch
                  isFormik={false}
                  value={true}
                  onChange={(val) => console.log(val)}
                />
              </CardContainer>
            </div>
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="Debug Mode"
                  className="whitespace-nowrap"
                />
                <Switch
                  isFormik={false}
                  value={true}
                  onChange={(val) => console.log(val)}
                />
              </CardContainer>
            </div>
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="Auto Backup"
                  className="whitespace-nowrap"
                />
                <Switch
                  isFormik={false}
                  value={true}
                  onChange={(val) => console.log(val)}
                />
              </CardContainer>
            </div>
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="Email Notification"
                  className="whitespace-nowrap"
                />
                <Switch
                  isFormik={false}
                  value={true}
                  onChange={(val) => console.log(val)}
                />
              </CardContainer>
            </div>
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="SMS Notification"
                  className="whitespace-nowrap"
                />
                <Switch
                  isFormik={false}
                  value={true}
                  onChange={(val) => console.log(val)}
                />
              </CardContainer>
            </div>
            <div className="w-full sm:w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 min-h-20 h-auto sm:h-[104px]"
              >
                <CardSubtitle
                  type={1}
                  subtitle="Data Retention Days"
                  className="whitespace-nowrap"
                />
                <input
                  type="text"
                  value={0}
                  name=""
                  id=""
                  className="w-full sm:w-[100px] h-12 sm:h-14 lg:h-[69px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-[21px] border border-[#8D8D8D] rounded-lg sm:text-center text-left shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-6 lg:leading-[22px] font-semibold"
                />
              </CardContainer>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 lg:pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-6 sm:mb-8 lg:mb-10 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex gap-3 sm:gap-4 items-center">
                <span className="hidden sm:inline-block">
                  <SystemInformationIcon width={30} height={30} fill="#000000" />
                </span>
                <span className="sm:hidden">
                  <SystemInformationIcon width={24} height={24} fill="#000000" />
                </span>
                <CardSubtitle type={1} subtitle="System Information" />
              </div>
              {/* <div className="text-[#000000]">
                Manage map service provider and their configurations
              </div> */}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 flex-wrap">
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Add SMTP"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="System Version"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Database Version"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="PostgreSQL 14.2"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="2024-12-10 03:00 AM"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Yes"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="FAQs"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-3 sm:p-4 lg:p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="156"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default SystemSettings;
