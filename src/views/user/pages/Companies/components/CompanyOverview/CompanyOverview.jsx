import React from "react";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../../../components/shared/CardContainer";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import ActiveDoneIcon from "../../../../../../components/svg/ActiveDoneIcon";
import Tag from "../../../../../../components/ui/Tag";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard/InfoTableCard";

const CompanyOverview = () => {
  return (
    <div>
      <div className="flex gap-2.5 mb-5">
        <div className="w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Map API Usage"
            serviceName="Google Maps"
            status={{
              text: "Active",
              color: "#10B981",
              icon: (
                <ActiveDoneIcon width={12.19} height={12.19} fill="#10B981" />
              ),
            }}
            details={[
              { label: "Monthly Requests:", value: "850K" },
              { label: "Monthly Cost:", value: "$420" },
              { label: "Last Used:", value: "2024-12-10 14:30" },
            ]}
            features={[
              "Real-time Traffic",
              "Satellite View",
              "Street View",
              "Geocoding",
            ]}
          />
        </div>
        <div className="w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Call API Usage"
            serviceName="Twilio"
            status={{
              text: "Active",
              color: "#10B981",
              icon: (
                <ActiveDoneIcon width={12.19} height={12.19} fill="#10B981" />
              ),
            }}
            details={[
              { label: "Monthly Minutes:", value: "1,250" },
              { label: "Monthly Cost:", value: "$125" },
              { label: "Last Call:", value: "2024-12-10 15:45" },
            ]}
            features={["Call Recording", "Call Forwarding", "Voicemail", "SMS"]}
          />
        </div>
        <div className="w-[calc((100%-20px)/3)]">
          <InfoTableCard
            title="Payment Information"
            serviceName="Online"
            status={{
              text: "PAID",
              color: "#10B981",
              icon: (
                <ActiveDoneIcon width={12.19} height={12.19} fill="#10B981" />
              ),
            }}
            details={[
              { label: "Last Payment:", value: "2024-12-01" },
              { label: "Next Payment:", value: "2025-01-01" },
              { label: "Amount:", value: "$199" },
            ]}
          />
        </div>
      </div>
      <div>
        <div className="mb-5">
          <h4 className="text-[#000000] text-[22px] leading-[30px] font-semibold text-center">
            Usage Statistics
          </h4>
        </div>
        <div className="border-[0.5px] border-[#00000050] rounded-[10px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left bg-[#F5F7F9] pt-5 pb-[18px] px-[30px]">
                  <ChildText
                    size="md"
                    text="Monthly Growth"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-5 pb-[18px] px-[30px]">
                  <ChildText
                    size="md"
                    text="Total Booking"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-5 pb-[18px] px-[30px]">
                  <ChildText
                    size="md"
                    text="Active Drivers"
                    className="!text-[#00000080]"
                  />
                </th>
                <th className="text-left bg-[#F5F7F9] pt-5 pb-[18px] px-[30px]">
                  <ChildText
                    size="md"
                    text="Customer Rating"
                    className="!text-[#00000080]"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-[30px] py-5">
                  <ChildText
                    size="md"
                    text="+12%"
                    className="!text-[#10B981]"
                  />
                </td>
                <td className="px-[30px] py-5">
                  <ChildText
                    size="md"
                    text="1247"
                    className="!text-[#3D3D3D]"
                  />
                </td>
                <td className="px-[30px] py-5">
                  <ChildText size="md" text="42" className="!text-[#3D3D3D]" />
                </td>
                <td className="px-[30px] py-5">
                  <ChildText
                    size="md"
                    text="4.8/5"
                    className="!text-[#3D3D3D]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
