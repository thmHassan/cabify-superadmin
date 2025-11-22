import React, { useEffect, useState } from "react";
import SubscriptionModal from "../SubscriptionModal";
import {
  apiEditSubscription,
  apiGetSubscriptionById,
} from "../../../../../../services/SubscriptionService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";

const EditSubscriptionModal = ({ setIsOpen, id, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const getSubscriptionById = async () => {
    try {
      setIsLoading(true);
      
      const result = await apiGetSubscriptionById({ id });

      if (result?.status === 200) {
        const {
          amount,
          billing_cycle,
          plan_name,
          deduct_type,
          billing_cycle_deduct_option,
        } = result?.data?.data || {};

        setInitialValues({
          amount,
          billing_cycle,
          plan_name,
          deduct_type,
          billing_cycle_deduct_option,
        });
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const payload = {
        ...values,
        id,
      };

      const result = await apiEditSubscription({}, payload);

      if (result?.status === 200) {
        onRefresh();
        unlockBodyScroll();
        setIsOpen({ type: "new", isOpen: false });
      }
    } catch (error) {
      setSubmitError(
        error.response?.data?.message || "Failed to update subscription"
      );
    } finally {
      setSubmitting(false); 
    }
  };

  useEffect(() => {
    getSubscriptionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !initialValues) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <SubscriptionModal
      submitError={submitError}
      setIsOpen={setIsOpen}
      isEdit={true}
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
};

export default EditSubscriptionModal;
