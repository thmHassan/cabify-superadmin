import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import ConfigSmallCard from "../../../../components/shared/ConfigSmallCard";
import SettingIcon from "../../../../components/svg/SettingIcon";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";
import Switch from "../../../../components/ui/Switch";
import PhoneOutlineIcon from "../../../../components/svg/PhoneOutlineIcon";

const data = [
  {
    name: "Twilio",
    monthlyMinutes: "850",
    monthlyCost: "$420",
    status: "Active",
  },
  {
    name: "Vonage",
    monthlyMinutes: "1050",
    monthlyCost: "$420",
    status: "Inactive",
  },
  {
    name: "RingCentral",
    monthlyMinutes: "2102",
    monthlyCost: "$420",
    status: "Active",
  },
];

const VoIPSettings = () => {
  return (
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex justify-between sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-1 sm:w-[calc(100%-240px)] w-full">
          <PageTitle title="VoIP Settings" />
          <PageSubTitle title="Configure voice communication providers and call settings" />
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
          <div className="bg-[#006FFF1A] mb-4 sm:mb-5 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex gap-3 sm:gap-4 items-center">
              <span className="hidden sm:inline-block">
                <PhoneOutlineIcon height={24} width={24} fill="#000000" />
              </span>
              <span className="sm:hidden">
                <PhoneOutlineIcon height={20} width={20} fill="#000000" />
              </span>
              <CardSubtitle type={1} subtitle="VoIP Provider Settings" />
            </div>
            {/* <div className="text-[#000000]">
              Manage voice communication service providers
            </div> */}
          </div>
          <div>
            <DataDetailsTable
              rowType="MapProvider"
              companies={data}
              isOnActionClick={() => console.log("object")}
            />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 lg:pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-6 sm:mb-8 lg:mb-10 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex gap-3 sm:gap-4 items-center">
                <span className="hidden sm:inline-block">
                  <SettingIcon width={30} height={30} fill="#000000" />
                </span>
                <span className="sm:hidden">
                  <SettingIcon width={24} height={24} fill="#000000" />
                </span>
                <CardSubtitle type={1} subtitle="Call Settings" />
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
                    subtitle="Record Calls"
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
                    subtitle="Call Forwarding"
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
                    subtitle="Voicemail"
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
                    subtitle="Conference Call"
                    className="whitespace-nowrap"
                  />
                  <Switch
                    isFormik={false}
                    value={true}
                    onChange={(val) => console.log(val)}
                  />
                </CardContainer>
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default VoIPSettings;
