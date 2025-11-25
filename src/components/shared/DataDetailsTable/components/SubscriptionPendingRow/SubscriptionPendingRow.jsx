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


const SubscriptionPendingRow = (props) => {
  const { actionOptions, data, type = "SubscriptionPending" } = props;
  const { company_name, phone, email, company_id, payment_amount } = data;
  if (type === "company") {
    return <CompanyTableRow {...props} />;
  } else {
    return (
      <CommonTableRowFields
        itemData={data}
        data={{
          name: company_name,
          icon: false,
          actionOptions: false,
        }}
      >
        <td className="min-w-[631px] w-full">
          <div className="min-h-[120px] py-[30px]">
            <div className="flex gap-[30px] items-center min-h-max">
              {phone && (
                <Tag size="sm" variant="mediumGray" className="min-w-[200px] max-w-[150px]">
                  <span>{phone}</span>
                </Tag>
              )}
              {email && (
                <Tag size="sm" variant="mediumGray" className="min-w-[200px] max-w-[150px]">
                  <span>{email}</span>
                </Tag>
              )}
              {company_id && (
                <Tag size="sm" variant="mediumGray" className="min-w-[200px] max-w-[150px]">
                  <span>{company_id}</span>
                </Tag>
              )}
            </div>
          </div>
        </td>

        <td className="py-[30px] flex flex-col justify-center min-w-[199px]">
          <CardSubtitle type={1} subtitle={`$${payment_amount}`} />
        </td>
      </CommonTableRowFields>
    );
  }
};

export default SubscriptionPendingRow;
