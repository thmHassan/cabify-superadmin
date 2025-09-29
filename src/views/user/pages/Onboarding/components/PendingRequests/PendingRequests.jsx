import RequestComponent from "../RequestComponent";

const PendingRequests = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 2 }, (_, i) => (
        <RequestComponent key={i} type="pending" />
      ))}
    </div>
  );
};

export default PendingRequests;
