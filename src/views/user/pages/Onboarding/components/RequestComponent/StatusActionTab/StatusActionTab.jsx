import React, { useState } from "react";
import Button from "../../../../../../../components/ui/Button/Button";
import { apiDeleteOnboarding, apiEditOnboardingStatus } from "../../../../../../../services/OnboardingService";
import Modal from "../../../../../../../components/shared/Modal";

const StatusActionTab = ({ id, onRefresh }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteOnboarding = async () => {
    setIsDeleting(true);
    try {
      const response = await apiDeleteOnboarding({ id });

      if (response?.status === 200) {
        onRefresh();
        setDeleteModalOpen(false);
      } else {
        console.error("Failed to delete onboarding");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onChangeOnboardingStatus = async (status) => {
    try {
      const result = await apiEditOnboardingStatus({
        status,
        id,
      });
      if (result?.status === 200) {
        onRefresh();
        console.log(result, "result======");
      }
    } catch (errors) {
      console.log(errors, "err---");
    }
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] justify-end">
        <Button
          btnSize="md"
          type="filledRed"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px] !leading-5 sm:!leading-6"
          onClick={() => onChangeOnboardingStatus("rejected")}
        >
          <span>Reject</span>
        </Button>
        <Button
          btnSize="md"
          type="filledGreen"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px] !leading-5 sm:!leading-6"
          onClick={() => onChangeOnboardingStatus("approved")}
        >
          <span>Accept</span>
        </Button>
        <Button
          btnSize="md"
          type="filledRed"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
          onClick={openDeleteModal}
        >
          <span>Delete</span>
        </Button>
      </div >

      <Modal isOpen={deleteModalOpen} className="p-6 sm:p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Delete Onboarding?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this onboarding request?
          </p>

          <div className="flex justify-center gap-4">
            <Button
              type="filledGray"
              onClick={() => setDeleteModalOpen(false)}
              className="px-6 py-2"
            >
              Cancel
            </Button>

            <Button
              type="filledRed"
              onClick={handleDeleteOnboarding}
              disabled={isDeleting}
              className="px-6 py-2"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StatusActionTab;
