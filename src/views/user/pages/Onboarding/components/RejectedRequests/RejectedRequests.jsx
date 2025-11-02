import React from "react";
import RequestComponent from "../RequestComponent";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const RejectedRequests = ({ allOnboardings, onEdit, isOnboardingLoading }) => {
  if (isOnboardingLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5">
      {allOnboardings.map((data, index) => (
        <RequestComponent key={index} type="rejected" onEdit={onEdit} />
      ))}
    </div>
  );
};

export default RejectedRequests;
