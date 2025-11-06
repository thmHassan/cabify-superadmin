import React from "react";
import Button from "../../../../../../../components/ui/Button/Button";
import { apiEditOnboardingStatus } from "../../../../../../../services/OnboardingService";

const StatusActionTab = ({ id, onRefresh }) => {
  const onChangeOnboardingStatus = async (status) => {
    try {
      const result = await apiEditOnboardingStatus({
        status,
        id,
      });
      if (result?.status === 200) {
        onRefresh();
        console.log(result, "result======");
      }
    } catch (errors) {
      console.log(errors, "err---");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] justify-end">
      <Button
        btnSize="md"
        type="filledRed"
        className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px] !leading-5 sm:!leading-6"
        onClick={() => onChangeOnboardingStatus("rejected")}
      >
        <span>Reject</span>
      </Button>
      <Button
        btnSize="md"
        type="filledGreen"
        className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px] !leading-5 sm:!leading-6"
        onClick={() => onChangeOnboardingStatus("approved")}
      >
        <span>Accept</span>
      </Button>
    </div>
  );
};

export default StatusActionTab;
