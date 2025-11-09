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
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 sm:mb-[30px] mb-4">
        <PageTitle title="Maps Configuration" />
        <PageSubTitle title="Configure map providers, API settings, and display options" />
      </div>
      <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[30px]">
        <CardContainer className="p-3 sm:p-4 lg:p-5">
          <div>
            <div className="bg-[#006FFF1A] mb-4 sm:mb-5 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex gap-3 sm:gap-4 items-center">
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
          <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 lg:pt-10 border-t border-[#00000033]">
            <div className="bg-[#006FFF1A] mb-6 sm:mb-8 lg:mb-10 border border-[#00000033] py-4 sm:py-5 lg:py-6 px-4 sm:px-6 lg:px-10 rounded-[15px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex gap-3 sm:gap-4 items-center">
                <span className="hidden sm:inline-block">
                  <SettingIcon width={30} height={30} fill="#000000" />
                </span>
                <span className="sm:hidden">
                  <SettingIcon width={24} height={24} fill="#000000" />
                </span>
                <CardSubtitle type={1} subtitle="Display Setting" />
              </div>
              {/* <div className="text-[#000000]">
                Manage map service provider and their configurations
              </div> */}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2.5 flex-wrap">
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 min-h-[104px] h-auto sm:h-[104px]"
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
                    className="w-full sm:w-[100px] h-12 sm:h-14 lg:h-[69px] px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-[21px] border border-[#8D8D8D] rounded-lg sm:text-center shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-left text-sm sm:text-base leading-5 sm:leading-6 lg:leading-[22px] font-semibold"
                  />
                </CardContainer>
              </div>
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between items-center sm:items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px]"
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
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between sm:items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px] items-center"
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
              <div className="w-full sm:w-[calc((100%-10px)/2)]">
                <CardContainer
                  type={1}
                  className="px-4 sm:px-5 py-3 sm:py-4 lg:py-[18px] flex flex-row justify-between sm:items-center gap-3 sm:gap-0 min-h-20 h-20 sm:h-[104px] items-center"
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
