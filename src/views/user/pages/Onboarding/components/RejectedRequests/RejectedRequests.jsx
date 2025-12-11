import React, { useState, useEffect } from "react";
import RequestComponent from "../RequestComponent";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import EmptyState from "../../../../../../components/shared/EmptyState";
import { apiEditOnboardingStatus } from "../../../../../../services/OnboardingService";

const RejectedRequests = ({ allOnboardings: initialOnboardings, onEdit, onApprove: parentOnApprove, isOnboardingLoading, onRefresh, getOnboarding }) => {
  const [allOnboardings, setAllOnboardings] = useState(initialOnboardings || []);
  const [isProcessingIds, setIsProcessingIds] = useState([]);

  useEffect(() => {
    setAllOnboardings(initialOnboardings || []);
  }, [initialOnboardings]);

  const setProcessing = (id, value) => {
    setIsProcessingIds(prev => value ? [...prev, id] : prev.filter(x => x !== id));
  };

  const handleLocalDelete = (id) => {
    setAllOnboardings(prev => prev.filter(item => item.id !== id));
  };

  const handleApprove = async (data) => {
    if (!data?.id) return;
    const id = data.id;

    if (isProcessingIds.includes(id)) return;
    setProcessing(id, true);

    try {
      const response = await apiEditOnboardingStatus({ id, status: "approved" });

      if (response?.status === 200) {
        setAllOnboardings(prev => prev.filter(item => item.id !== id));

        if (typeof parentOnApprove === "function") {
          parentOnApprove({ id, ...data, status: "approved" });
        }
        
        // Call getOnboarding immediately after successful status update
        if (getOnboarding && typeof getOnboarding === "function") {
          await getOnboarding();
        }
      } else {
        console.error("Approve API returned non-200:", response);
      }
    } catch (err) {
      console.error("Approve API error:", err);
    } finally {
      setProcessing(id, false);
    }
  };

  if (isOnboardingLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }
  if (!allOnboardings || allOnboardings.length === 0) {
    return <EmptyState title="No rejected requests" description="Rejected onboarding requests will appear here." />;
  }
  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {allOnboardings.map((data) => (
        <RequestComponent
          key={data.id}
          type="rejected"
          data={data}
          onEdit={onEdit}
          onApprove={handleApprove}
          onDelete={handleLocalDelete}
        />
      ))}
    </div>
  );
};

export default RejectedRequests;
