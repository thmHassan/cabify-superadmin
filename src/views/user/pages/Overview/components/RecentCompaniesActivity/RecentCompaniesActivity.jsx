import CardContainer from "../../../../../../components/shared/CardContainer";
import CardTitle from "../../../../../../components/ui/CardTitle";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import ChildText from "../../../../../../components/ui/ChildText.jsx/ChildText";
import Tag from "../../../../../../components/ui/Tag";
import Button from "../../../../../../components/ui/Button/Button";
import ApiService from "../../../../../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { COMPANIES_PATH } from "../../../../../../constants/routes.path.constant/user.route.path.constant";

const RecentCompaniesActivity = ({ companies }) => {
  const navigate = useNavigate();
  return (
    // <CardContainer className="px-5 pb-5 pt-[30px] flex flex-col gap-5 w-[calc((100%-20px)/2)]">
    <CardContainer className="lg:px-5 sm:px-4 px-3 sm:pb-5 pb-3 sm:pt-[30px] pt-5 flex flex-col gap-5 w-full">
      <div className="mb-2.5 flex flex-col 2xl:gap-0 sm:gap-[1px]">
        <CardTitle title="Recent Companies Activity" />
        <CardSubtitle subtitle="Latest company registrations and subscription changes" />
      </div>
      <div className="flex flex-col gap-2.5">
        {companies.map((c) => (
          <div
            key={c.id ?? c.company_id}
            className="rounded-[15px] bg-[#ffffff] p-5 flex justify-between 2xl:h-[120px] over:scale-[1.01] transition-all duration-300 hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px]"
          >
            <div>
              <div className="mb-[5px]">
                <CardSubtitle type={1} subtitle={c.company_name ?? "-"} />
              </div>
              <p className="text-[#6C6C6C] text-sm leading-[19px] font-semibold mb-[5px]">
                New company registered
              </p>
              <div className="flex gap-x-10 gap-y-1 flex-wrap">
                <ChildText text={`Plan: ${c.subscription_type ?? "-"}`} />
                {c.created_at && (
                  <ChildText text={new Date(c.created_at).toLocaleString()} />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[15px] items-center">
              {/* If an amount exists, show it */}
              <CardSubtitle
                variant={1}
                type={1}
                subtitle={c.amount ? `$${c.amount}` : "-"}
              />
              <Tag variant="green">Completed</Tag>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button
          btnSize="2xl"
          type="bgOutlined"
          ripple
          onClick={() => navigate(COMPANIES_PATH)}
        >
          <span>See All</span>
        </Button>
      </div>
    </CardContainer>
  );
};

export default RecentCompaniesActivity;
