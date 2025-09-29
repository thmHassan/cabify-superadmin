import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import PhoneOutline from "../../../../components/svg/PhoneOutline";
import CardContainer from "../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import ThreeDots from "../../../../components/svg/ThreeDots";
import ConfigSmallCard from "../../../../components/shared/ConfigSmallCard";
import SettingIcon from "../../../../components/svg/SettingIcon";

const VoIPSettings = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="VoIP Settings" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PhoneOutline width={24} height={24} fill="#ffffff" />
              <span>Test Connection</span>
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
              <PhoneOutline height={24} width={24} fill="#000000" />
              <CardSubtitle type={1} subtitle="VoIP Provider Settings" />
            </div>
            <div className="text-[#000000]">
              Manage voice communication service providers
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
                        title="Twilio"
                        className="!text-[#000000]"
                      />
                      <ChildText text="Monthly minutes: 1,250   Monthly cost: $125" />
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
              <CardSubtitle type={1} subtitle="Call Settings" />
            </div>
            <div className="text-[#000000]">
              Manage map service provider and their configurations
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <ConfigSmallCard title="RECORD CALLS">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="CALL FORWARDING">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="VOICEMAIL">
              <input
                type="checkbox"
                className="bg-[#000000] text-xl leading-[27px] rounded-[10px] py-2.5 px-11 text-[#ffffff] text-center max-w-[112px]"
              />
            </ConfigSmallCard>
            <ConfigSmallCard title="CONFERENCE CALLS">
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

export default VoIPSettings;
