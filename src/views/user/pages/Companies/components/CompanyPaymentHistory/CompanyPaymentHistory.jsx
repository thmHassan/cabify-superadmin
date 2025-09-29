import React from "react";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Tag from "../../../../../../components/ui/Tag";

const CompanyPaymentHistory = () => {
  return (
    <div className="border-[0.5px] border-[#00000050] rounded-[10px] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left bg-[#F5F7F9] pt-5 pb-[15px] px-[30px]">
              <PageSubTitle title="Date" className="!text-[#00000080]" />
            </th>
            <th className="text-left bg-[#F5F7F9] pt-5 pb-[15px] px-[30px]">
              <PageSubTitle title="Amount" className="!text-[#00000080]" />
            </th>
            <th className="text-left bg-[#F5F7F9] pt-5 pb-[15px] px-[30px]">
              <PageSubTitle title="Status" className="!text-[#00000080]" />
            </th>
            <th className="text-left bg-[#F5F7F9] pt-5 pb-[15px] px-[30px]">
              <PageSubTitle title="Method" className="!text-[#00000080]" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }, (_, i) => (
            <tr
              key={i}
              className="border-b-[0.5px] border-[#00000050] last:border-0"
            >
              <td className="px-[30px] pt-[26px] pb-6">
                <ChildText
                  size="md"
                  text="2024-12-01"
                  className="!text-[#444444]"
                />
              </td>
              <td className="px-[30px] pt-[26px] pb-6">
                <ChildText size="md" text="$199" className="!text-[#444444]" />
              </td>
              <td className="px-[30px] pt-[26px] pb-6 flex">
                <Tag variant="green" className="!pt-1 !pb-[3px]">
                  <ChildText text="Paid" className="!text-[#ffffff]" />
                </Tag>
              </td>
              <td className="px-[30px] pt-[26px] pb-6">
                <ChildText
                  size="md"
                  text="online"
                  className="!text-[#444444]"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyPaymentHistory;
