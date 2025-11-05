import React from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";

const ApiStatus = ({ data }) => {
  return (
    <div className="flex flex-col sm:gap-5 gap-4">
      <CardContainer className="sm:p-5 flex sm:flex-row sm:gap-0 gap-1 flex-col justify-between sm:items-center p-4">
        <CardSubtitle type={1} subtitle="API Status" />
        <CardSubtitle
          variant={1}
          type={1}
          subtitle="Current API performance and usage"
        />
      </CardContainer>
      <div className="flex sm:gap-5 gap-4 sm:flex-row flex-col">
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <CardContainer type={1} className="sm:p-5 flex flex-col md:gap-5 sm:gap-3 gap-2 p-4">
            <CardSubtitle type={1} subtitle="Google Maps API" />
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Requests:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle={
                  data?.apiStatus?.google_map?.requests
                    ? `${data?.apiStatus?.google_map?.requests}k`
                    : "0"
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Cost:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle={
                  data?.apiStatus?.google_map?.cost
                    ? `$${data?.apiStatus?.google_map?.cost}`
                    : "0"
                }
              />
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
        <div className="w-full sm:w-[calc((100%-20px)/2)]">
          <CardContainer type={1} className="sm:p-5 flex flex-col md:gap-5 sm:gap-3 gap-2 p-4">
            <CardSubtitle type={1} subtitle="Twilio API" />
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Minutes:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle={
                  data?.apiStatus?.twillio_api?.minutes
                    ? `${data?.apiStatus?.twillio_api?.minutes}`
                    : "0"
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <CardSubtitle variant={1} type={1} subtitle="Cost:" />
              <CardSubtitle
                variant={1}
                type={1}
                subtitle={
                  data?.apiStatus?.twillio_api?.cost
                    ? `$${data?.apiStatus?.twillio_api?.cost}`
                    : "0"
                }
              />
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
