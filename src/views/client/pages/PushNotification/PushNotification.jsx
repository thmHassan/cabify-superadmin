import React from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import PageSubTitle from "../../../../components/ui/PageSubTitle";

const PushNotification = () => {
  return (
    <div className="p-8">
      <div className="flex flex-col gap-1 pb-7 border-b border-[#00000033]">
        <PageTitle textColor={1} title="Push Notification" />
        <PageSubTitle
          textColor={1}
          title="Push Notifications To Enhance User Engagement"
        />
      </div>
    </div>
  );
};

export default PushNotification;
