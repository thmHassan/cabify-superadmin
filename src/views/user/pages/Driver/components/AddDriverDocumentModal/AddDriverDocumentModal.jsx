import React from "react";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import FieldTitle from "../../../../../../components/ui/FieldTitle";
import { Field, Form, Formik } from "formik";
import FormikCheckbox from "../../../../../../components/ui/FormikCheckbox";
import Button from "../../../../../../components/ui/Button/Button";
import {
  toYesNo,
  unlockBodyScroll,
} from "../../../../../../utils/functions/common.function";
import { apiCreateDriversDocument } from "../../../../../../services/DriverService";
import DriverDocumentModal from "../DriverDocumentModal";

const AddDriverDocumentModal = ({ setIsOpen, onRefresh }) => {
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const {
        document_name,
        front_photo,
        back_photo,
        profile_photo,
        has_issue_date,
        has_expiry_date,
      } = values;
      const result = await apiCreateDriversDocument({
        document_name,
        front_photo: toYesNo(front_photo),
        back_photo: toYesNo(back_photo),
        profile_photo: toYesNo(profile_photo),
        has_issue_date: toYesNo(has_issue_date),
        has_expiry_date: toYesNo(has_expiry_date),
      });
      if (result?.status === 200) {
        console.log(result, "ress=======");
        onRefresh();
        unlockBodyScroll();
        setIsOpen({ isOpen: false, type: "new" });
      }
      setSubmitting(false);
    } catch (err) {
      console.log(err, "err---");
    }
  };

  return (
    <>
      <DriverDocumentModal
        onSubmit={onSubmit}
        initialValues={{
          document_name: "",
          front_photo: false,
          back_photo: false,
          profile_photo: false,
          has_issue_date: false,
          has_expiry_date: false,
        }}
        type="new"
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default AddDriverDocumentModal;
