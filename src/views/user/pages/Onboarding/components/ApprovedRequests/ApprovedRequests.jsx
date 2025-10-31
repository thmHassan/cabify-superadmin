import RequestComponent from "../RequestComponent";

const ApprovedRequests = ({ allOnboardings, onEdit }) => {
  console.log(allOnboardings, "allOnboardings=====");
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
