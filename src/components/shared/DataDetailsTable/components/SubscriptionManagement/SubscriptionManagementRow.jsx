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
  const { actionOptions, data, type = "managementsubscription" } = props;
  console.log(data, "data======datadata", type);
  const { company_name, phone, city, payment_method } = data;
  if (type === "company") {
    return <CompanyTableRow {...props} />;
  } else {

    return (
      <CommonTableRowFields
        itemData={data}
        data={{
          name: company_name,
          actionOptions,
        }}
      >
        <td className="min-w-[631px] w-full">
          <div className="min-h-[120px] py-[30px]">
            <div className="flex gap-[30px] items-center min-h-max">
              {/* Show account and next_billing if available */}
              {phone && (
                <Tag size="sm" variant="mediumGray">
                  <span>{phone}</span>
                </Tag>
              )}
              {city && (
                <Tag size="sm" variant="mediumGray">
                  <span>{city}</span>
                </Tag>
              )}
              {
                payment_method && (
                  <Tag size="sm" variant="mediumGray">
                    <span>
                      {payment_method === "stripe"
                        ? "Online"
                        : payment_method === "cash"
                          ? "Cash"
                          : payment_method
                      }
                    </span>
                  </Tag>
                )
              }
            </div>
          </div>
        </td>
      </CommonTableRowFields>
    );
  }
};

export default SubscriptionManagementRow;
