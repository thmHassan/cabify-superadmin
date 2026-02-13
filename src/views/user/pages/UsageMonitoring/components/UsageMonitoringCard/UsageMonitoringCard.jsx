import classNames from "classnames";
import WalletIcon from "../../../../../../components/svg/WalletIcon";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Tag from "../../../../../../components/ui/Tag/Tag";

const UsageMonitoringCard = ({ company }) => {
    const {
        company_name,
        api_calls_today,
        map_request,
        voip_minutes,
        dispatchers,
    } = company;

    const metrics = [
        { label: "API Calls Today", value: api_calls_today },
        { label: "Map Requests", value: map_request },
        { label: "VoIP Minutes", value: voip_minutes },
        { label: "Dispatchers", value: dispatchers },
    ];

    return (
        <div className="bg-white rounded-[15px] p-5 flex items-center justify-between hover:shadow-md transition-shadow duration-200 overflow-x-auto">

            <div className="flex items-center gap-4 min-w-[260px]">
                <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#EEF2FF] rounded-full">
                    <WalletIcon width={24} height={24} fill="#1F41BB" />
                </div>

                <div className="">
                    <h3 className="font-semibold text-[16px] text-[#333] whitespace-nowrap">
                        {company_name}
                    </h3>
                    <span className="text-xs text-white bg-[#10B981] rounded-[25px] px-3 py-1">Active</span>
                </div>
            </div>

            <div className="flex gap-[20px] items-center">
                {metrics.map(({ label, value }, index) => (
                    <Tag key={index} variant="mediumGray" size="lg">
                        <div className="flex flex-col gap-1 items-center px-2">
                            <span className="text-xs font-semibold whitespace-nowrap">
                                {label}
                            </span>

                            <ChildText
                                text={value}
                                className={classNames(
                                    "whitespace-nowrap",
                                    label === "Dispatchers"
                                        ? "!text-[#F59E0B]"
                                        : "!text-[#333333]"
                                )}
                            />
                        </div>
                    </Tag>
                ))}

                <Tag variant="blue" size="lg">
                    <div className="flex flex-col gap-1 items-center px-2">
                        <span className="text-xs font-semibold opacity-75 whitespace-nowrap">
                            Last Seen
                        </span>
                        <ChildText
                            text="2 minutes ago"
                            className="!text-[#FFFFFF] whitespace-nowrap"
                        />
                    </div>
                </Tag>
            </div>
        </div>
    );
};

export default UsageMonitoringCard;
