import RequestComponent from "../RequestComponent";

const ApprovedRequests = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 2 }, (_, i) => (
        <RequestComponent key={i} type="accepted" />
      ))}
    </div>
  );
};

export default ApprovedRequests;
