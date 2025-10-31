import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardTitle from "../../../../../../components/ui/CardTitle";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import WarningIcon from "../../../../../../components/svg/WarningIcon";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import CloseIcon from "../../../../../../components/svg/CloseIcon";
import Button from "../../../../../../components/ui/Button/Button";

const RecentSystemAlerts = () => {
  return (
    <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-[calc((100%-20px)/2)]">
      <div className="mb-2.5">
        <CardTitle title="System Alerts" />
        <CardSubtitle subtitle="Important notifications and system status" />
      </div>
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="rounded-[15px] bg-[#ffffff] p-5 flex justify-between h-[120px] gap-5 hover:scale-[1.01] transition-all duration-300 hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
          >
            <div className="w-6 pt-[7px]">
              <div className="w-6 h-6 flex justify-center items-center">
                <WarningIcon />
              </div>
            </div>
            <div className="w-[calc(100%-94px)] pl-2.5">
              <div className="max-w-[408px] mb-2.5">
                <ChildText
                  size="md"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                />
              </div>
              <ChildText text="Plan: Premium" />
            </div>
            <div className="w-[30px] h-[30px] flex justify-center items-center bg-[#E6E6E6] rounded-full">
              <CloseIcon />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button btnSize="2xl" type="bgOutlined">
          <span>See All</span>
        </Button>
      </div>
    </CardContainer>
  );
};

export default RecentSystemAlerts;
