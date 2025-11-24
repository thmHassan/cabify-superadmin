import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Tag from "../../../../../../components/ui/Tag";
import WebsiteIcon from "../../../../../../components/svg/WebsiteIcon";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard";
import moment from "moment/moment";
import StatusActionTab from "./StatusActionTab";
import Button from "../../../../../../components/ui/Button/Button";

const TYPE_CONFIG = {
  pending: "yellow",
  accepted: "green",
  rejected: "red",
};

const RequestComponent = ({ type = "pending", data, onRefresh, onEdit }) => {
  return (
    <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 2xl:p-[30px] flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 sm:gap-5">
        <div className="flex-1">
          <Button
            onClick={() => {
              if (data.status === "pending") {
                onEdit(data);
              }
            }}
            disabled={data.status !== "pending"}
          >
            <CardSubtitle
              subtitle={data?.company_name}
              type={2}
              className="capitalize"
            />
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] mt-2.5 sm:mt-2.5 sm:mb-[22px]">
            <div className="flex flex-col gap-2.5 sm:gap-[15px] pr-0 sm:pr-[32px]">
              <PageSubTitle title={data?.company_admin_name}></PageSubTitle>
              <PageSubTitle title={data?.email} />
            </div>
            <div className="flex flex-col gap-2.5 sm:gap-[15px]">
              <PageSubTitle title={data?.contact_person} />
              <PageSubTitle
                title={`Submitted: ${moment(data?.created_at).format(
                  "YYYY-MM-DD"
                )}`}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-3 sm:gap-[15px]">
          <Tag
            variant={TYPE_CONFIG[type]}
            size="lg"
            className="w-full sm:w-auto sm:min-w-[186px] text-center capitalize"
          >
            <span>{type}</span>
          </Tag>
          <div className="flex flex-wrap gap-2.5 sm:gap-[15px] w-full sm:w-auto">
            <Tag
              variant="white"
              size="lg"
              className="text-center !px-4 sm:!px-5 !rounded-[10px] flex-1 sm:flex-none"
            >
              <PageSubTitle title="REQ-001" className="!text-[#6C6C6C]" />
            </Tag>
            <Tag
              variant="white"
              size="lg"
              className="text-center !px-4 sm:!px-5 !rounded-[10px] flex-1 sm:flex-none"
            >
              <div className="flex gap-2 sm:gap-2.5 items-center justify-center">
                <div>
                  <WebsiteIcon />
                </div>
                <PageSubTitle
                  title="Website Form"
                  className="!text-[#6C6C6C] whitespace-nowrap"
                />
              </div>
            </Tag>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-5">
        <div className="w-full md:w-[calc((100%-40px)/3)] rounded">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)] md:rounded-[20px] !rounded-xl"
            title="Services Configuration"
            details={[
              { label: "Maps", value: "Google Maps API" },
              { label: "Phone", value: "Twilio" },
              { label: "Payment", value: "Online + Cash" },
            ]}
          />
        </div>
        <div className="w-full md:w-[calc((100%-40px)/3)]">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)] md:rounded-[20px] !rounded-xl"
            title="Fleet Information"
            details={[
              { label: "Dispatchers", value: "05" },
              { label: "Drivers:", value: "25" },
              { label: "Cars:", value: "20" },
            ]}
          />
        </div>
        <div className="w-full md:w-[calc((100%-40px)/3)]">
          <InfoTableCard
            innerCardContainerClassNames="min-h-[calc(100%-45px)] md:rounded-[20px] !rounded-xl"
            title="Pricing & Commission"
            details={[
              { label: "Route Rates", value: "Standard" },
              { label: "Commission:", value: "15%" },
            ]}
          />
        </div>
      </div>
      {type === "pending" && (
        <StatusActionTab id={data?.id} onRefresh={onRefresh} />
      )}
    </CardContainer>
  );
};

export default RequestComponent;
