import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import RequestComponent from "../RequestComponent";

const ApprovedRequests = ({ allOnboardings, onEdit, isOnboardingLoading }) => {
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
