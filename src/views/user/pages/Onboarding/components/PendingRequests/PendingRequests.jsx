import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import EmptyState from "../../../../../../components/shared/EmptyState";
import RequestComponent from "../RequestComponent";

const PendingRequests = ({
  allOnboardings,
  onRefresh,
  onEdit,
  isOnboardingLoading,
}) => {
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
        title="No pending requests found"
        description="There are currently no onboarding requests awaiting approval."
        actionLabel={typeof onRefresh === "function" ? "Refresh" : undefined}
        onAction={typeof onRefresh === "function" ? onRefresh : undefined}
      />
    );
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {allOnboardings.map((data, index) => (
        <div key={index}>
          {/* {index} */}
          <RequestComponent
            onEdit={onEdit}
            type="pending"
            data={data}
            onRefresh={onRefresh}
          />
        </div>
      ))}
    </div>
  );
};

export default PendingRequests;
