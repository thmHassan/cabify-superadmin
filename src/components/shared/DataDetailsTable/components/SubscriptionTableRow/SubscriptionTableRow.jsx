import CardSubtitle from "../../../../ui/CardSubtitle";
import Tag from "../../../../ui/Tag";
import ChildText from "../../../../ui/ChildText.jsx/ChildText";
import CommonTableRowFields from "../CommonTableRowFields/CommonTableRowFields";
import WalletIcon from "../../../../svg/WalletIcon";

const SubscriptionTableRow = (props) => {
  const { name, status, location, drivers, contact, revenue, onActionClick } =
    props;
  return (
    <CommonTableRowFields
      data={{
        name,
        status,
        onActionClick,
        icon: {
          component: WalletIcon,
          width: 31.82,
          height: 31.82,
          fill: "#1F41BB",
        },
      }}
    >
      <td className="min-w-[631px] w-full">
        <div className="min-h-[120px] py-[30px]">
          <div className="flex gap-[30px] items-center min-h-max">
            <Tag size="md" variant="mediumGray">
              <span>{location}</span>
            </Tag>
            <Tag size="md" variant="mediumGray">
              <span>{drivers}</span>
            </Tag>
            <Tag size="md" variant="mediumGray">
              <span>{contact}</span>
            </Tag>
          </div>
        </div>
      </td>

      <td className="py-[30px] flex flex-col justify-center min-w-[199px]">
        <CardSubtitle type={1} subtitle={revenue} />
        <ChildText text="monthly revenue" />
      </td>
    </CommonTableRowFields>
  );
};

export default SubscriptionTableRow;
