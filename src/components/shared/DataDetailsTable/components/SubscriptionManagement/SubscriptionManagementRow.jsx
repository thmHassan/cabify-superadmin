import CardSubtitle from "../../../../ui/CardSubtitle";
import Tag from "../../../../ui/Tag";
import ChildText from "../../../../ui/ChildText.jsx/ChildText";
import CommonTableRowFields from "../CommonTableRowFields/CommonTableRowFields";
import WalletIcon from "../../../../svg/WalletIcon";
import DriverVehicleIcon from "../../../../svg/DriverVehicleIcon";
import _ from "lodash";

const ICON_CONFIG = {
  subscription: {
    component: WalletIcon,
    width: 31.82,
    height: 31.82,
    fill: "#1F41BB",
  },
  company: {
    component: DriverVehicleIcon,
    width: 32,
    height: 21,
    fill: "#1F41BB",
  },
};

const CompanyTableRow = (props) => {
  const { actionOptions, data, type } = props;
  const { name, status, location, drivers, contact, revenue } = data;
  return (
    <CommonTableRowFields
      itemData={data}
      data={{
        name,
        status,
        actionOptions,
        icon: ICON_CONFIG[type],
      }}
    >
      <td className="min-w-[631px] w-full">
        <div className="min-h-[120px] py-[30px]">
          <div className="flex gap-[30px] items-center min-h-max">
            <Tag size="md" variant="mediumGray" className="min-w-[210px]">
              <span>{location}</span>
            </Tag>
            <Tag size="md" variant="mediumGray" className="min-w-[210px]">
              <span>{drivers}</span>
            </Tag>
            <Tag size="md" variant="mediumGray" className="min-w-[210px]">
              <span>{contact}</span>
            </Tag>
          </div>
        </div>
      </td>

      <td className="py-[30px] flex pl-[50Px] flex-col justify-center min-w-[199px]">
        <CardSubtitle type={1} subtitle={revenue} />
        <ChildText text="monthly revenue" />
      </td>
    </CommonTableRowFields>
  );
};

const SubscriptionManagementRow = (props) => {
  const { actionOptions, data, type = "subscriptionManagement" } = props;
  console.log(data, "data======datadata", type);
  const { plan_name, amount, billing_cycle, features, account, next_billing, due_date, payment_type, deduct_type, billing_cycle_deduct_option, status } = data;
  if (type === "company") {
    return <CompanyTableRow {...props} />;
  } else {
    // Use status from data if available, otherwise default to Active and Premium
    
    return (
      <CommonTableRowFields
        itemData={data}
        data={{
          name: plan_name,
          actionOptions,
        }}
      >
        <td className="min-w-[631px] w-full">
          <div className="min-h-[120px] py-[30px]">
            <div className="flex gap-[30px] items-center min-h-max">
              {/* Show account and next_billing if available */}
              {account && (
                <Tag size="sm" variant="mediumGray">
                  <span>{account}</span>
                </Tag>
              )}
              {next_billing && (
                <Tag size="sm" variant="mediumGray">
                  <span>{next_billing}</span>
                </Tag>
              )}
              {features && Array.isArray(features) && features.length > 0 && (
                <Tag size="sm" variant="mediumGray">
                  <span>{features.length} features included</span>
                </Tag>
              )}
              {features && !Array.isArray(features) && features !== null && (
                <Tag size="sm" variant="mediumGray">
                  <span>Features included</span>
                </Tag>
              )}
              {/* Show API fields if account/next_billing not available */}
              {!account && !next_billing && (
                <>
                  {billing_cycle && (
                    <Tag size="sm" variant="mediumGray">
                      <span>{billing_cycle}</span>
                    </Tag>
                  )}
                  {deduct_type && (
                    <Tag size="sm" variant="mediumGray">
                      <span>{deduct_type.charAt(0).toUpperCase() + deduct_type.slice(1)}</span>
                    </Tag>
                  )}
                  {billing_cycle_deduct_option && (
                    <Tag size="sm" variant="mediumGray">
                      <span>{billing_cycle_deduct_option.replace("_", " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</span>
                    </Tag>
                  )}
                </>
              )}
            </div>
          </div>
        </td>

        <td className="py-[30px] flex flex-col justify-center min-w-[199px]">
          <CardSubtitle type={1} subtitle={`$${amount}`} />
          <ChildText text={billing_cycle} />
        </td>
      </CommonTableRowFields>
    );
  }
};

export default SubscriptionManagementRow;
