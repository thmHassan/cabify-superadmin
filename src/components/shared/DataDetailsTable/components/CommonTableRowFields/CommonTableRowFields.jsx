import React from "react";
import CardSubtitle from "../../../../ui/CardSubtitle";
import Tag from "../../../../ui/Tag";
import Button from "../../../../ui/Button/Button";
import ThreeDots from "../../../../svg/ThreeDots";

const CommonTableRowFields = ({
  children,
  data: {
    icon: { component, ...props },
    name,
    status,
    onActionClick,
  },
}) => {
  const Icon = component;
  return (
    <div className="bg-white border border-y border-[#E9E9E9] rounded-[15px] mb-2.5 last:mb-0">
      <tr>
        <td className="min-w-[368px] w-[368px] pr-20">
          <div className="p-[30px] flex gap-[15px] items-center">
            <div className="h-[60px] min-w-[60px] bg-[#F9F9F9] rounded-lg flex justify-center items-center">
              <Icon {...props} />
            </div>
            <div className="flex flex-col gap-2.5">
              <CardSubtitle
                type={1}
                subtitle={name}
                className="whitespace-nowrap"
              />
              <div className="flex gap-[15px]">
                {status.map((s, i) => (
                  <Tag
                    key={i}
                    size="sm"
                    variant={s === "Active" ? "green" : "purple"}
                  >
                    <span>{s}</span>
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </td>
        {children}
        {onActionClick && (
          <td className="py-[30px] pr-[30px]">
            <Button
              className="w-10 h-10 bg-[#EFEFEF] rounded-full flex justify-center items-center"
              onClick={onActionClick}
            >
              <ThreeDots />
            </Button>
          </td>
        )}
      </tr>
    </div>
  );
};

export default CommonTableRowFields;
