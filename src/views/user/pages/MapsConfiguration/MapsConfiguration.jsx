import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import SettingIcon from "../../../../components/svg/SettingIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import MapsConfigurationIcon from "../../../../components/svg/MapsConfigurationIcon";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import ThreeDots from "../../../../components/svg/ThreeDots";
import ConfigSmallCard from "../../../../components/shared/ConfigSmallCard";

const MapsConfiguration = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="Maps Configuration" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <SettingIcon width={24} height={24} fill="#ffffff" />
              <span>Update Setting</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Configure map providers, API settings, and display options" />
        </div>
      </div>
      <div className="flex flex-col gap-[30px]">
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <MapsConfigurationIcon />
              <CardSubtitle type={1} subtitle="Map Provider Settings" />
            </div>
            <div className="text-[#000000]">
              Manage map service provider and their configurations
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }, (_, i) => (
              <CardContainer key={i} type={1} className="p-5">
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <div className="min-w-14">
                      <div className="w-full h-14 bg-[#1F41BB] rounded-md"></div>
                    </div>
                    <div className="max-w-[606px] w-full flex flex-col gap-2.5">
                      <PageSubTitle
                        title="Google Maps"
                        className="!text-[#000000]"
                      />
                      <ChildText text="Monthly requests: 850K   Monthly cost: $420" />
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <Button btnSize="md" type="filledGreen">
                        <span>Active</span>
                      </Button>
                    </div>
                    <div className="px-5">
                      <Button>
                        <span className="rotate-90 block">
                          <ThreeDots />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </CardContainer>
        <CardContainer className="p-5">
          <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <SettingIcon width={30} height={30} fill="#000000" />
              <CardSubtitle type={1} subtitle="Display Setting" />
            </div>
            <div className="text-[#000000]">
              Manage map service provider and their configurations
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <ConfigSmallCard title="DEFUALT ZOOM LEVEL">
              <input
                type="text"
                value={12}
                name=""
                id=""
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="ENABLE TRAFFIC LAYER">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="ENABLE  SATTELITE VIEW">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="ENABLE  STREET VIEW">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};

export default MapsConfiguration;
