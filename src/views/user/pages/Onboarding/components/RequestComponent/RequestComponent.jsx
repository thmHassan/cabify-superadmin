import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Tag from "../../../../../../components/ui/Tag";
import WebsiteIcon from "../../../../../../components/svg/WebsiteIcon";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard/InfoTableCard";
import Button from "../../../../../../components/ui/Button/Button";

const TYPE_CONFIG = {
  pending: "yellow",
  accepted: "green",
  rejected: "red",
};

const RequestComponent = ({ type = "pending" }) => {
  return (
    <CardContainer className="p-[30px]">
      <div className="flex justify-between">
        <div>
          <CardSubtitle subtitle="Swift Taxi Services" type={2} />
          <div className="flex gap-[15px] mt-2.5 mb-[22px]">
            <div className="flex flex-col gap-[15px] pr-[32px]">
              <PageSubTitle title="Ahmed Hassan" />
              <PageSubTitle title="ahmed@swifttaxi.ae" />
            </div>
            <div className="flex flex-col gap-[15px]">
              <PageSubTitle title="+971-50-123-4567" />
              <PageSubTitle title="Submitted: 2025-01-29" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-[15px]">
          <Tag
            variant={TYPE_CONFIG[type]}
            size="lg"
            className="min-w-[186px] text-center capitalize"
          >
            <span>{type}</span>
          </Tag>
          <div className="flex gap-[15px]">
            <Tag
              variant="white"
              size="lg"
              className="text-center !px-5 !rounded-[10px]"
            >
              <PageSubTitle title="REQ-001" className="!text-[#6C6C6C]" />
            </Tag>
            <Tag
              variant="white"
              size="lg"
              className="text-center !px-5 !rounded-[10px]"
            >
              <div className="flex gap-2.5 items-center">
                <div>
                  <WebsiteIcon />
                </div>
                <PageSubTitle
                  title="Website Form"
                  className="!text-[#6C6C6C]"
                />
              </div>
            </Tag>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mb-5">
        <div className="w-[calc((100%-40px)/3)]">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)]"
            title="Services Configuration"
            details={[
              { label: "Maps", value: "Google Maps API" },
              { label: "Phone", value: "Twilio" },
              { label: "Payment", value: "Online + Cash" },
            ]}
          />
        </div>
        <div className="w-[calc((100%-40px)/3)]">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)]"
            title="Fleet Information"
            details={[
              { label: "Dispatchers", value: "05" },
              { label: "Drivers:", value: "25" },
              { label: "Cars:", value: "20" },
            ]}
          />
        </div>
        <div className="w-[calc((100%-40px)/3)]">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)]"
            title="Pricing & Commission"
            details={[
              { label: "Route Rates", value: "Standard" },
              { label: "Commission:", value: "15%" },
            ]}
          />
        </div>
      </div>
      {type === "pending" && (
        <div className="flex gap-[15px] justify-end">
          <Button
            btnSize="md"
            type="filledRed"
            className="!px-[30px] !py-[13px] !leading-6"
          >
            <span>Reject</span>
          </Button>
          <Button
            btnSize="md"
            type="filledGreen"
            className="!px-[30px] !py-[13px] !leading-6"
          >
            <span>Accept</span>
          </Button>
        </div>
      )}
    </CardContainer>
  );
};

export default RequestComponent;
