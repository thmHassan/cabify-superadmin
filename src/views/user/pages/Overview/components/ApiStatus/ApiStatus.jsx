import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";

const ApiStatus = () => {
  return (
    <div className="flex flex-col gap-5">
      <CardContainer className="p-6 flex justify-between">
        <CardSubtitle type={1} subtitle="API Status" />
        <CardSubtitle
          variant={1}
          type={1}
          subtitle="Current API performance and usage"
        />
      </CardContainer>
      <div className="flex gap-5">
        <div className="w-[calc((100%-20px)/2)]">
          <CardContainer type={1} className="p-6 flex flex-col gap-5">
            <CardSubtitle type={1} subtitle="Google Maps API" />
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Requests:" />
              <CardSubtitle variant={1} type={1} subtitle="850K" />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Cost:" />
              <CardSubtitle variant={1} type={1} subtitle="$420" />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Status:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle="Active"
                className="!text-[#10B981]"
              />
            </div>
          </CardContainer>
        </div>
        <div className="w-[calc((100%-20px)/2)]">
          <CardContainer type={1} className="p-6 flex flex-col gap-5">
            <CardSubtitle type={1} subtitle="Twilio API" />
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Minutes:" />
              <CardSubtitle variant={1} type={1} subtitle="1,250" />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Cost:" />
              <CardSubtitle variant={1} type={1} subtitle="$125" />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Status:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle="Active"
                className="!text-[#10B981]"
              />
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  );
};

export default ApiStatus;
