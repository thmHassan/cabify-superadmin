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
    <div className="flex gap-[15px] justify-end">
      <Button
        btnSize="md"
        type="filledRed"
        className="!px-[30px] !py-[13px] !leading-6"
        onClick={() => onChangeOnboardingStatus("rejected")}
      >
        <span>Reject</span>
      </Button>
      <Button
        btnSize="md"
        type="filledGreen"
        className="!px-[30px] !py-[13px] !leading-6"
        onClick={() => onChangeOnboardingStatus("approved")}
      >
        <span>Accept</span>
      </Button>
    </div>
  );
};

export default StatusActionTab;
