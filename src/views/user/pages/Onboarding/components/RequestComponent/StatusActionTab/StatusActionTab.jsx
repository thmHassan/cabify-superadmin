import React, { useState } from "react";
import Button from "../../../../../../../components/ui/Button/Button";
import { apiDeleteOnboarding, apiEditOnboardingStatus } from "../../../../../../../services/OnboardingService";
import Modal from "../../../../../../../components/shared/Modal";

const StatusActionTab = ({ id, onDelete, onApprove, onReject, onRefresh }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeleteOnboarding = async () => {
    setIsDeleting(true);
    try {
      const response = await apiDeleteOnboarding({ id });
      if (response?.status === 200) {
        if (onDelete) onDelete(id);
        setDeleteModalOpen(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const onChangeOnboardingStatus = async (status) => {
    setIsUpdating(true);
    try {
      const response = await apiEditOnboardingStatus({ id, status });

      if (response?.status === 200) {
        if (status === "approved" && onApprove) onApprove({ id, status });
        if (status === "rejected" && onReject) onReject({ id, status });
        // Call getOnboarding immediately after successful status update
        if (onRefresh && typeof onRefresh === "function") {
          await onRefresh();
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] justify-end">
        <Button
          btnSize="md"
          type="filledRed"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
          onClick={() => onChangeOnboardingStatus("rejected")}
          disabled={isUpdating}
        >
          Reject
        </Button>

        <Button
          btnSize="md"
          type="filledGreen"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
          onClick={() => onChangeOnboardingStatus("approved")}
          disabled={isUpdating}
        >
          Accept
        </Button>

        <Button
          btnSize="md"
          type="filled"
          className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
          onClick={() => setDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>

      <Modal isOpen={deleteModalOpen} className="p-6 sm:p-8 w-full max-w-md">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-3">Delete Onboarding?</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this onboarding request?
          </p>

          <div className="flex justify-center gap-4">
            <Button type="filledGray" onClick={() => setDeleteModalOpen(false)} className="px-6 py-2">
              Cancel
            </Button>

            <Button type="filledRed" onClick={handleDeleteOnboarding} disabled={isDeleting} className="px-6 py-2">
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StatusActionTab;

// import React, { useState } from "react";
// import Button from "../../../../../../../components/ui/Button/Button";
// import { apiDeleteOnboarding, apiEditOnboardingStatus } from "../../../../../../../services/OnboardingService";
// import Modal from "../../../../../../../components/shared/Modal";

// const StatusActionTab = ({ id, onDelete, onApprove, onReject }) => {
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const handleDeleteOnboarding = async () => {
//     setIsDeleting(true);
//     try {
//       const response = await apiDeleteOnboarding({ id });
//       if (response?.status === 200) {
//         if (onDelete) onDelete(id);
//         setDeleteModalOpen(false);
//       } else {
//         console.error("Failed to delete onboarding");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const onChangeOnboardingStatus = async (status) => {
//     setIsUpdating(true);
//     try {
//       const response = await apiEditOnboardingStatus({ id, status });
//       if (response?.status === 200) {
//         if (status === "approved" && onApprove) onApprove({ id });
//         if (status === "rejected" && onReject) onReject({ id });
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col sm:flex-row gap-3 sm:gap-[15px] justify-end">
//         <Button
//           btnSize="md"
//           type="filledRed"
//           className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
//           onClick={() => onChangeOnboardingStatus("rejected")}
//           disabled={isUpdating}
//         >
//           Reject
//         </Button>

//         <Button
//           btnSize="md"
//           type="filledGreen"
//           className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
//           onClick={() => onChangeOnboardingStatus("approved")}
//           disabled={isUpdating}
//         >
//           Accept
//         </Button>

//         <Button
//           btnSize="md"
//           type="filled"
//           className="w-full sm:w-auto !px-6 sm:!px-[30px] !py-3 sm:!py-[13px]"
//           onClick={() => setDeleteModalOpen(true)}
//         >
//           Delete
//         </Button>
//       </div>

//       <Modal isOpen={deleteModalOpen} className="p-6 sm:p-8 w-full max-w-md">
//         <div className="text-center">
//           <h2 className="text-xl font-semibold mb-3">Delete Onboarding?</h2>
//           <p className="text-gray-600 mb-6">
//             Are you sure you want to delete this onboarding request?
//           </p>

//           <div className="flex justify-center gap-4">
//             <Button
//               type="filledGray"
//               onClick={() => setDeleteModalOpen(false)}
//               className="px-6 py-2"
//             >
//               Cancel
//             </Button>

//             <Button
//               type="filledRed"
//               onClick={handleDeleteOnboarding}
//               disabled={isDeleting}
//               className="px-6 py-2"
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default StatusActionTab;

