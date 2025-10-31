import RequestComponent from "../RequestComponent";

const PendingRequests = ({ allOnboardings, onRefresh, onEdit }) => {
  return (
    <div className="flex flex-col gap-5">
      {allOnboardings.map((data, index) => (
        <div>
          {/* {index} */}
          <RequestComponent
            onEdit={onEdit}
            key={index}
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
