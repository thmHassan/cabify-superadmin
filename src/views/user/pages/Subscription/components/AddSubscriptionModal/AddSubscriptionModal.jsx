import React, { useState } from "react";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import { apiCreateSubscription } from "../../../../../../services/SubscriptionService";
import SubscriptionModal from "../SubscriptionModal";

const AddSubscriptionModal = ({ setIsOpen, onRefresh }) => {
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("in");
      setSubmitting(true);
      setSubmitError(null);
      const {
        plan_name,
        billing_cycle,
        amount,
        deduct_type,
        billing_cycle_deduct_option,
      } = values;

      const result = await apiCreateSubscription({
        plan_name,
        billing_cycle,
        amount,
        deduct_type,
        billing_cycle_deduct_option,
      });
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
  return (
    <SubscriptionModal
      submitError={submitError}
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
      initialValues={{
        plan_name: "",
        billing_cycle: "",
        amount: "",
        deduct_type: "",
        billing_cycle_deduct_option: "",
      }}
    />
  );
};

export default AddSubscriptionModal;
