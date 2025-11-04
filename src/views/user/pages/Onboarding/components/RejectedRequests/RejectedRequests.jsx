import React from "react";
import RequestComponent from "../RequestComponent";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import EmptyState from "../../../../../../components/shared/EmptyState";

const RejectedRequests = ({ allOnboardings, onEdit, isOnboardingLoading }) => {
  if (isOnboardingLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }
  if (!allOnboardings || allOnboardings.length === 0) {
    return (
      <EmptyState
        title="No rejected requests"
        description="Rejected onboarding requests will appear here."
      />
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
