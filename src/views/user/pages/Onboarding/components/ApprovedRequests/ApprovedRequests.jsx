import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import EmptyState from "../../../../../../components/shared/EmptyState";
import RequestComponent from "../RequestComponent";

const ApprovedRequests = ({ allOnboardings, onEdit, isOnboardingLoading }) => {
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
        title="No approved requests"
        description="Approved onboarding requests will appear here."
      />
    );
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {allOnboardings.map((data, index) => (
        <RequestComponent
          key={index}
          type="accepted"
          data={data}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ApprovedRequests;
