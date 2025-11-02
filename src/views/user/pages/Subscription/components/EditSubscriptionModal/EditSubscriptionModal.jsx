import React, { useEffect, useState } from "react";
import SubscriptionModal from "../SubscriptionModal";
import {
  apiEditSubscription,
  apiGetSubscriptionById,
} from "../../../../../../services/SubscriptionService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";

const EditSubscriptionModal = ({ setIsOpen, id, onRefresh }) => {
  const [isSubscriptionDetailsLoading, setIsSubscriptionDetailsLoading] =
    useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const getSubscriptionById = async () => {
    try {
      setIsSubscriptionDetailsLoading(true);
      console.log("object");
      const result = await apiGetSubscriptionById({ id });
      if (result?.status === 200) {
        console.log(result, "res-admin");
        const { amount, billing_cycle, features, plan_name } =
          result?.data?.data || {};
        setInitialValues({
          amount,
          billing_cycle,
          features,
          plan_name,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubscriptionDetailsLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("in");
      setSubmitting(true);
      setSubmitError(null);
      const { plan_name, billing_cycle, amount, features } = values;
      const result = await apiEditSubscription(
        {},
        { plan_name, billing_cycle, amount, features, id }
      );
      if (result?.status === 200) {
        console.log("innnnnnnnn");
        onRefresh();
        unlockBodyScroll();
        setIsOpen({ type: "new", isOpen: false });
        console.log(result, "res====");
      }
    } catch (error) {
      console.error("Error creating company:", error);
      if (error.name === "ValidationError" && Array.isArray(error.errors)) {
        setSubmitError(error.errors.join(", "));
      } else {
        setSubmitError(
          error.response?.data?.message || "Failed to create company"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getSubscriptionById();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSubscriptionDetailsLoading) {
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
      onSubmit={onSubmit}
      initialValues={initialValues}
    />
  );
};

export default EditSubscriptionModal;
