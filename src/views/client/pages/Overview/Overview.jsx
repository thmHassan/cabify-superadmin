import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";

const Overview = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-1 pb-7 border-b border-[#00000033]">
        <PageTitle textColor={1} title="DASHBOARD OVERVIEW" />
        <PageSubTitle
          textColor={1}
          title="Welcome back! Here's what's happening with your transportation business today."
        />
      </div>
    </div>
  );
};

export default Overview;
