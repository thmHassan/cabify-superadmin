import React from "react";
import RequestComponent from "../RequestComponent";

const RejectedRequests = ({ allOnboardings, onEdit }) => {
  return (
    <div className="flex flex-col gap-5">
      {allOnboardings.map((data, index) => (
        <RequestComponent key={index} type="rejected" onEdit={onEdit} />
      ))}
    </div>
  );
};

export default RejectedRequests;
