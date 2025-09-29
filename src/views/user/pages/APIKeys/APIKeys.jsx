import React from "react";
import CardContainer from "../../../../components/shared/CardContainer";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PlusIcon from "../../../../components/svg/PlusIcon";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import KeyIcon from "../../../../components/svg/KeyIcon";
import CardSubtitle from "../../../../components/ui/CardSubtitle";
import ChildText from "../../../../components/ui/ChildText.jsx/ChildText";
import ThreeDots from "../../../../components/svg/ThreeDots";

const APIKeys = () => {
  return (
    <div className="p-10 min-h-[calc(100vh-85px)]">
      <div className="flex flex-col gap-2.5 mb-[30px]">
        <div className="flex justify-between">
          <PageTitle title="API Keys" />
          <Button
            type="filled"
            btnSize="2xl"
            // onClick={() => setIsAddSubscriptionModalOpen(true)}
          >
            <div className="flex gap-[15px] items-center">
              <PlusIcon />
              <span>Generate New Key</span>
            </div>
          </Button>
        </div>
        <div>
          <PageSubTitle title="Manage API keys for system access and authentication" />
        </div>
      </div>
      <CardContainer className="p-5">
        <div className="bg-[#006FFF1A] mb-5 border border-[#00000033] py-6 px-10 rounded-[15px] flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <KeyIcon />
            <CardSubtitle type={1} subtitle="API Key Management" />
          </div>
          <div className="text-[#000000]">
            Secure API keys for system integration and access control
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
                      title="Production API Key"
                      className="!text-[#000000]"
                    />
                    <div className="bg-[#D3D3D3] py-1.5 px-2.5 rounded-md text-sm leading-[17px]">
                      <p>pk_live_51H7...</p>
                    </div>
                    <ChildText text="Created: 2024-01-15 Last used: 2 minutes ago" />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-end gap-5">
                    <div className="flex gap-5">
                      <Button btnSize="md" type="filledGreen">
                        <span>Read</span>
                      </Button>
                      <Button btnSize="md" type="filledOrange">
                        <span>Write</span>
                      </Button>
                      <Button btnSize="md" type="filledRed">
                        <span>Admin</span>
                      </Button>
                    </div>
                    <div>
                      <Button btnSize="md" type="filledGreen">
                        <span>Active</span>
                      </Button>
                    </div>
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
    </div>
  );
};

export default APIKeys;
