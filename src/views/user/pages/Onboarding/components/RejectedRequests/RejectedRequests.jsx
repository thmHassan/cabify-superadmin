import React from 'react'
import RequestComponent from '../RequestComponent';

const RejectedRequests = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 2 }, (_, i) => (
        <RequestComponent key={i} type="rejected" />
      ))}
    </div>
  );
}

export default RejectedRequests