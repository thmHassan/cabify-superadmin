import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SettingIcon from "../../../../components/svg/SettingIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import MapsConfigurationIcon from "../../../../components/svg/MapsConfigurationIcon";
import Switch from "../../../../components/ui/Switch";
import DataDetailsTable from "../../../../components/shared/DataDetailsTable";

const data = [
  {
    name: "Google Maps",
    monthlyRequests: "850K",
    monthlyCost: "$420",
    status: "Active",
  },
  {
    name: "Mapbox",
    monthlyRequests: "850K",
    monthlyCost: "$420",
    status: "Inactive",
  },
];

const MapsConfiguration = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Maps Configuration" />
          {/* <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <SettingIcon width={24} height={24} fill="#ffffff" />
              <span>Update Setting</span>
            </div>
          </Button> */}
        </div>
        <div>
          <PageSubTitle title="Configure map providers, API settings, and display options" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div>
            <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <MapsConfigurationIcon />
                <CardSubtitle type={1} subtitle="Map Provider Settings" />
              </div>
              {/* <div className="text-[#000000]">
              Manage map service provider and their configurations
            </div> */}
            </div>
            <div>
              <DataDetailsTable
                rowType="MapProvider"
                companies={data}
                isOnActionClick={false}
              />
            </div>
          </div>
          <div className="mt-10 pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-10 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <SettingIcon width={30} height={30} fill="#000000" />
                <CardSubtitle type={1} subtitle="Display Setting" />
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
                    subtitle="Default Zoom Level"
                    className="whitespace-nowrap"
                  />
                  <input
                    type="text"
                    value={12}
                    name=""
                    id=""
                    className="w-[100px] h-[69px] px-5 py-[21px] border border-[#8D8D8D] rounded-lg text-center shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
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
                    subtitle="Traffic Layer"
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
                    subtitle="Satellite View"
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
                    subtitle="Street View"
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

export default MapsConfiguration;
