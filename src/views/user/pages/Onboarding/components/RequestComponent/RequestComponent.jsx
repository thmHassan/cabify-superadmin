import React, { useState } from "react";
import CardContainer from "../../../../../../components/shared/CardContainer";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import Tag from "../../../../../../components/ui/Tag";
import InfoTableCard from "../../../../../../components/shared/InfoTableCard";
import moment from "moment/moment";
import StatusActionTab from "./StatusActionTab";
import Button from "../../../../../../components/ui/Button/Button";
import { apiDeleteOnboarding } from "../../../../../../services/OnboardingService";
import Modal from "../../../../../../components/shared/Modal";

const TYPE_CONFIG = {
  pending: "yellow",
  accepted: "green",
  rejected: "red",
};

const RequestComponent = ({
  type = "pending",
  data,
  onEdit,
  onApprove,
  onReject,
  onDelete,
  onRefresh,
  onStatusUpdate,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteOnboarding = async () => {
    setIsDeleting(true);
    try {
      const response = await apiDeleteOnboarding({ id: data.id });

      if (response?.status === 200) {
        if (onDelete) onDelete(data.id);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <CardContainer className="lg:p-5 sm:px-4 px-3 sm:py-5 py-3 2xl:p-[30px] flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 sm:gap-5">
        <div className="flex-1">
          <Button
            onClick={() => data.status === "pending" && onEdit(data)}
            disabled={data.status !== "pending"}
          >
            <CardSubtitle subtitle={data?.company_name} type={2} className="capitalize" />
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 mt-2.5">
            <div className="flex flex-col gap-2.5 pr-0 sm:pr-8">
              <PageSubTitle title={data?.company_admin_name} />
              <PageSubTitle title={data?.email} />
            </div>

            <div className="flex flex-col gap-2.5">
              <PageSubTitle title={data?.contact_person} />
              <PageSubTitle title={`Submitted: ${moment(data?.created_at).format("YYYY-MM-DD")}`} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3">
          <Tag variant={TYPE_CONFIG[type]} size="lg" className="w-full sm:w-auto capitalize">
            {type}
          </Tag>

          {type === "accepted" && (
            <Button btnSize="md" type="filled" className="!px-6 !py-3" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
          )}

          {type === "rejected" && (
            <div className="flex gap-3">
              <Button
                btnSize="md"
                type="filledGreen"
                className="!px-6 !py-3"
                onClick={() => onApprove(data)}
              >
                Approve
              </Button>

              <Button btnSize="md" type="filled" className="!px-6 !py-3" onClick={() => setDeleteModalOpen(true)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <InfoTableCard
            title="Services Configuration"
            details={[
              { label: "Maps", value: "Google Maps API" },
              { label: "Phone", value: "Twilio" },
              { label: "Payment", value: "Online + Cash" },
            ]}
          />
        </div>

        <div className="w-full md:w-1/3">
          <InfoTableCard
            title="Fleet Information"
            details={[
              { label: "Dispatchers", value: "05" },
              { label: "Drivers", value: "25" },
              { label: "Cars", value: "20" },
            ]}
          />
        </div>

        <div className="w-full md:w-1/3">
          <InfoTableCard
            title="Pricing & Commission"
            details={[
              { label: "Route Rates", value: "Standard" },
              { label: "Commission", value: "15%" },
            ]}
          />
        </div>
      </div>
      {type === "pending" && (
        <StatusActionTab
          id={data.id}
          onDelete={onDelete}
          onApprove={onApprove}
          onReject={onReject}
          onRefresh={onStatusUpdate}
        />
      )}
      <Modal isOpen={deleteModalOpen} className="p-10">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Delete Onboarding?</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this onboarding request?</p>

          <div className="flex justify-center gap-4">
            <Button type="filledGray" className="px-6 py-2 rounded-md" 
            onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>

            <Button type="filledRed" className="px-6 py-2 rounded-md" disabled={isDeleting} onClick={handleDeleteOnboarding}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </CardContainer>
  );
};

export default RequestComponent;