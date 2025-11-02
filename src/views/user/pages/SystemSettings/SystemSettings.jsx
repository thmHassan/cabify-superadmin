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
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="System Settings" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
            className="-mb-3"
          >
            <div className="flex gap-[15px] items-center">
              <PhoneOutlineIcon width={24} height={24} fill="#ffffff" />
              <span>Add VoIP</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Configure system-wide settings and maintenance options" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-10 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <SettingIcon width={30} height={30} fill="#000000" />
              <CardSubtitle type={1} subtitle="System Configuration" />
            </div>
            <div className="text-[#000000]">
              Manage system-wide settings and preferences
            </div>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
            <div className="w-[calc((100%-10px)/2)]">
              <CardContainer
                type={1}
                className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
                  className="w-[100px] h-[69px] px-5 py-[21px] border border-[#8D8D8D] rounded-lg text-center shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                />
              </CardContainer>
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-10 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <SystemInformationIcon width={30} height={30} fill="#000000" />
                <CardSubtitle type={1} subtitle="System Information" />
              </div>
              {/* <div className="text-[#000000]">
                Manage map service provider and their configurations
              </div> */}
            </div>
            <div className="flex gap-2.5 flex-wrap">
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Add SMTP"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="System Version"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Database Version"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="PostgreSQL 14.2"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="2024-12-10 03:00 AM"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="Yes"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
                    <CardSubtitle
                      type={1}
                      subtitle="v2.4.1"
                      className="whitespace-nowrap"
                    />
                  </div>
                </CardContainer>
              </div>
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
                >
                  <CardSubtitle
                    type={1}
                    subtitle="FAQs"
                    className="whitespace-nowrap"
                  />
                  <div className="bg-[#006FFF1A] p-5 rounded-lg">
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
