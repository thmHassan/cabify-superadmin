import React, { useEffect, useState } from "react";
import CommonTableRowFields from "../CommonTableRowFields/CommonTableRowFields";
import Tag from "../../../../ui/Tag";
import { apiGetStripeKeys } from "../../../../../services/SubscriptionService";

const MapProviderRowField = ({ data, actionOptions }) => {
  const {
    name,
    monthlyMinutes,
    monthlyRequests,
    monthlyCost,
  } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [stripeKeysData, setStripeKeysData] = useState({});

  const getStripeKeys = async () => {
    try {
      setIsLoading(true);
      const result = await apiGetStripeKeys();
      const keys = result.data?.data;
      setStripeKeysData(keys);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStripeKeys();
  }, []);

  return (
    <CommonTableRowFields
      data={{
        name,
        icon: false,
        actionOptions,
      }}
    >
      <td className="w-full">
        <div className="flex justify-end px-[30px] gap-[30px]">
          {!isLoading && stripeKeysData.stripe_key && (
            <Tag
              variant="mediumGray"
              size="md"
              className="!py-2.5 !leading-[19px] !px-5 text-center whitespace-nowrap"
            >
              <span>
                Stripe public key: <br /> {stripeKeysData.stripe_key}
              </span>
            </Tag>
          )}
          {!isLoading && stripeKeysData.stripe_secret && (
            <Tag
              variant="mediumGray"
              size="md"
              className="!py-2.5 !leading-[19px] !px-5 text-center whitespace-nowrap"
            >
              <span>
                Stripe Secret key: <br /> {stripeKeysData.stripe_secret}
              </span>
            </Tag>
          )}
          {!isLoading && stripeKeysData.stripe_webhook_secret && (
            <Tag
              variant="mediumGray"
              size="md"
              className="!py-2.5 !leading-[19px] !px-5 text-center whitespace-nowrap"
            >
              <span>
                stripe webhook secret: <br /> {stripeKeysData.stripe_webhook_secret}
              </span>
            </Tag>
          )}
          {/* {transactions && (
            <div className="flex items-center">
              <Tag
                variant="mediumGray"
                size="md"
                className="!py-2.5 !leading-[19px] !px-5 text-center whitespace-nowrap"
              >
                <span>Transactions: {transactions}</span>
              </Tag>
            </div>
          )}
          {revenue && (
            <div className="flex items-center">
              <Tag
                variant="mediumGray"
                size="md"
                className="!py-2.5 !leading-[19px] !px-5 text-center whitespace-nowrap"
              >
                <span>Revenue: {revenue}</span>
              </Tag>
            </div>
          )} */}
        </div>
      </td>
    </CommonTableRowFields>
  );
};

export default MapProviderRowField;