import React, { useState } from "react";
import {
  convertToFormData,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";
import { apiCreateSubAdmin } from "../../../../../../services/SubAdminService";
import SubAdminModal from "../SubAdminModal";
import _ from "lodash";

const isDefaultValue = import.meta.env.VITE_IS_DEFAULT_VALUES || false;

const PERMISSION_CONFIG = [
  { label: "Users", value: "users" },
  { label: "Drivers", value: "drivers" },
  { label: "Packages", value: "packages" },
  { label: "Rides", value: "rides" },
  { label: "Users1", value: "users1" },
  { label: "Drivers1", value: "drivers1" },
  { label: "Packages1", value: "packages1" },
  { label: "Rides1", value: "rides1" },
  { label: "Packages2", value: "packages2" },
  { label: "Rides2", value: "rides2" },
];

const PERMISSION_KEYS = _.chain(PERMISSION_CONFIG)
  .map("value")
  .uniq() // optional: remove duplicates; remove this line if you want to keep duplicates
  .reduce((acc, value) => {
    acc[value] = [];
    return acc;
  }, {})
  .value();

const AddSubAdminModal = ({ setIsDocumentModalOpen, onRefresh }) => {
  const [formData, setFormData] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      console.log("in");
      setSubmitting(true);
      setSubmitError(null);
      const { name, email, password, cPassword, permissions } = values;
      if (password === cPassword) {
        setFormData((prev) => ({
          ...prev,
          name,
          email,
          password,
          permissions,
        }));
        console.log(formData, "formData=====");
        const formDataToSend = convertToFormData({
          ...formData,
          name,
          email,
          password,
          permissions,
        });
        const result = await apiCreateSubAdmin(formDataToSend);
        if (result?.status === 200) {
          console.log("innnnnnnnn");
          onRefresh();
          unlockBodyScroll();
          setIsDocumentModalOpen({ type: "new", isOpen: false });
          console.log(result, "res====");
        }
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
  return (
    <SubAdminModal
      submitError={submitError}
      setFormData={setFormData}
      onSubmit={onSubmit}
      type="new"
      setIsDocumentModalOpen={setIsDocumentModalOpen}
      initialValues={
        isDefaultValue
          ? {
              name: "Jaya",
              email: "jaya@mailinator.comm",
              password: "123456",
              cPassword: "123456",
              permissions: PERMISSION_KEYS,
            }
          : {
              name: "",
              email: "",
              password: "",
              cPassword: "",
              permissions: PERMISSION_KEYS,
            }
      }
    />
  );
};

export default AddSubAdminModal;
