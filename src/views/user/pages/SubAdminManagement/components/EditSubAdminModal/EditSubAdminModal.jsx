import React, { useEffect, useState } from "react";
import SubAdminModal from "../SubAdminModal";
import {
  apiEditSubAdmin,
  apiGetSubAdminById,
} from "../../../../../../services/SubAdminService";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";
import {
  convertToFormData,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";

const DEFAULT_INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
  permissions: {},
};

const EditSubAdminModal = ({
  setIsDocumentModalOpen,
  onRefresh,
  id,
}) => {
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubAdminDetailsLoading, setIsSubAdminDetailsLoading] =
    useState(false);
  const [initialValues, setInitialValues] = useState(DEFAULT_INITIAL_VALUES);

  const getSubAdminById = async () => {
    try {
      setIsSubAdminDetailsLoading(true);
      console.log("object");
      const result = await apiGetSubAdminById({ id });
      if (result?.status === 200) {
        console.log(result, "res-admin");
        const { name, email, permissions } = result?.data?.subadmin || {};
        let parsedPermissions = {};
        try {
          parsedPermissions = permissions
            ? JSON.parse(JSON.parse(permissions))
            : {};
        } catch (err) {
          parsedPermissions = {};
        }
        setInitialValues((prev) => ({
          ...prev,
          name: name || "",
          email: email || "",
          permissions: parsedPermissions || {},
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubAdminDetailsLoading(false);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("in");
      setSubmitting(true);
      setSubmitError(null);
      const { name, email, permissions } = values;
      setFormData((prev) => ({
        ...prev,
        name,
        email,
        permissions,
        id,
      }));
      console.log(formData, "formData=====");
      const formDataToSend = convertToFormData({
        ...formData,
        name,
        email,
        permissions,
        id,
      });
      const result = await apiEditSubAdmin({}, formDataToSend);
      if (result?.status === 200) {
        console.log("innnnnnnnn");
        onRefresh();
        unlockBodyScroll();
        setIsDocumentModalOpen({ type: "new", isOpen: false });
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
    getSubAdminById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isSubAdminDetailsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }

  return (
    <SubAdminModal
      submitError={submitError}
      setFormData={setFormData}
      onSubmit={onSubmit}
      type="edit"
      setIsDocumentModalOpen={setIsDocumentModalOpen}
      initialValues={initialValues}
    />
  );
};

export default EditSubAdminModal;
