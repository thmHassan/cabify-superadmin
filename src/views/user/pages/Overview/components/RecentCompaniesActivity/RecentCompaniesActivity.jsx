import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardTitle from "../../../../../../components/ui/CardTitle";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Tag from "../../../../../../components/ui/Tag";
import Button from "../../../../../../components/ui/Button/Button";

const RecentCompaniesActivity = () => {
  return (
    // <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-[calc((100%-20px)/2)]">
    <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-full">
      <div className="mb-2.5">
        <CardTitle title="Recent Companies Activity" />
        <CardSubtitle subtitle="Latest company registrations and subscription changes" />
      </div>
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="rounded-[15px] bg-[#ffffff] p-5 flex justify-between h-[120px] hover:scale-[1.01] transition-all duration-300 hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
          >
            <div>
              <div className="mb-[5px]">
                <CardSubtitle type={1} subtitle="Metro Taxi Co." />
              </div>
              <p className="text-[#6C6C6C] text-sm leading-[19px] font-semibold mb-[5px]">
                New company registered
              </p>
              <div className="flex gap-10">
                <ChildText text="Plan: Premium" />
                <ChildText text="2 min ago" />
              </div>
            </div>
            <div className="flex flex-col gap-[15px] items-center">
              <CardSubtitle variant={1} type={1} subtitle="$199" />
              <Tag variant="green">Completed</Tag>
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

export default RecentCompaniesActivity;
