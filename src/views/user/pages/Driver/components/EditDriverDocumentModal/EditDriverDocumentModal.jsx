import React, { useEffect, useState } from "react";
import DriverDocumentModal from "../DriverDocumentModal";
import {
  apiEditDriversDocument,
  apiGetDriversDocumentById,
} from "../../../../../../services/DriverService";
import {
  toBoolean,
  toYesNo,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const EditDriverDocumentModal = ({ setIsOpen, onRefresh, id }) => {
  const [isDriversDocumentDetailsLoading, setIsDriversDocumentDetailsLoading] =
    useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const getDriversDocumentById = async () => {
    try {
      setIsDriversDocumentDetailsLoading(true);
      console.log("object");
      const result = await apiGetDriversDocumentById({ id });
      if (result?.status === 200) {
        console.log(result, "res-driver");
        const {
          document_name,
          front_photo,
          back_photo,
          profile_photo,
          has_issue_date,
          has_expiry_date,
        } = result?.data?.document || {};
        setInitialValues({
          document_name,
          front_photo: toBoolean(front_photo),
          back_photo: toBoolean(back_photo),
          profile_photo: toBoolean(profile_photo),
          has_issue_date: toBoolean(has_issue_date),
          has_expiry_date: toBoolean(has_expiry_date),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDriversDocumentDetailsLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("in");
      setSubmitting(true);
      setSubmitError(null);
      const {
        document_name,
        front_photo,
        back_photo,
        profile_photo,
        has_issue_date,
        has_expiry_date,
      } = values;
      const result = await apiEditDriversDocument(
        {},
        {
          document_name,
          front_photo: toYesNo(front_photo),
          back_photo: toYesNo(back_photo),
          profile_photo: toYesNo(profile_photo),
          has_issue_date: toYesNo(has_issue_date),
          has_expiry_date: toYesNo(has_expiry_date),
          id,
        }
      );
      if (result?.status === 200) {
        console.log("innnnnnnnn");
        onRefresh();
        unlockBodyScroll();
        setIsOpen({ type: "new", isOpen: false });
        console.log(result, "res====");
      }
    } catch (error) {
      console.error("Error creating company:", error);
      if (error.name === "ValidationError" && Array.isArray(error.errors)) {
        setSubmitError(error.errors.join(", "));
      } else {
        setSubmitError(
          error.response?.data?.message || "Failed to create company"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getDriversDocumentById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isDriversDocumentDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <DriverDocumentModal
      type="edit"
      submitError={submitError}
      onSubmit={onSubmit}
      initialValues={initialValues}
      setIsOpen={setIsOpen}
    />
  );
};

export default EditDriverDocumentModal;
