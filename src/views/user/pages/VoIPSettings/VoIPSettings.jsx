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
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between items-start">
          <PageTitle title="VoIP Settings" />
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
          <PageSubTitle title="Configure voice communication providers and call settings" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <PhoneOutlineIcon height={24} width={24} fill="#000000" />
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
          <div className="mt-10 pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-10 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <SettingIcon width={30} height={30} fill="#000000" />
                <CardSubtitle type={1} subtitle="Call Settings" />
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
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
              <div className="w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-5 py-[18px] flex justify-between items-center h-[104px]"
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
