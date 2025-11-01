import React from "react";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import CardSubtitle from "../../../../../../components/ui/CardSubtitle";
import FieldTitle from "../../../../../../components/ui/FieldTitle";
import { Field, Form, Formik } from "formik";
import FormikCheckbox from "../../../../../../components/ui/FormikCheckbox";
import Button from "../../../../../../components/ui/Button/Button";

const isDefaultValue = import.meta.env.VITE_IS_DEFAULT_VALUES || false;

const DriverDocumentModal = ({
  submitError,
  setIsOpen,
  type,
  onSubmit,
  initialValues,
}) => {
  return (
    <>
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      <CardSubtitle
        subtitle="Add Document Type"
        className="!text-[#252525] !text-center"
      />
      <div className="pt-[35px]">
        <FieldTitle label="Document Name" />
        <Formik
          initialValues={
            isDefaultValue
              ? {
                  document_name: "Test",
                  front_photo: true,
                  back_photo: false,
                  profile_photo: true,
                  has_issue_date: false,
                  has_expiry_date: true,
                }
              : initialValues
          }
          //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
          //   onSubmit={(values, { setSubmitting }) => {
          //     if (!disableSubmit) {
          //       onSignIn(values, setSubmitting);
          //     } else {
          //       setSubmitting(false);
          //     }
          //   }}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <div className="pt-2 flex flex-col gap-5">
                <div className="h-16">
                  <Field
                    type="text"
                    name="document_name"
                    className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                    placeholder="Enter Document"
                  />
                </div>
                <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox name="front_photo" label="Front Photo" />
                </div>
                <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox name="back_photo" label="Back Photo" />
                </div>
                <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox name="profile_photo" label="Profile Photo" />
                </div>
                <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox name="has_issue_date" label="Issue Date" />
                </div>
                <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox name="has_expiry_date" label="Expiry Date" />
                </div>
                {/* <div className="flex justify-between items-center px-5 py-4 border border-[#8D8D8D] rounded-lg w-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold h-16">
                  <FormikCheckbox
                    name="agree"
                    label="Number Field" //(PHC, License, Bank Account etc.)
                  />
                </div> */}
              </div>
              <div className="flex gap-5 justify-end mt-10">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="!px-8 pt-4 pb-[15px] leading-[25px]"
                  onClick={() => {
                    unlockBodyScroll();
                    setIsOpen({ isOpen: false, type: "new" });
                  }}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  btnType="submit"
                  btnSize="md"
                  type="filled"
                  className="!px-8 pt-4 pb-[15px] leading-[25px]"
                >
                  <span>{type === "new" ? "Create" : "Update"}</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default DriverDocumentModal;
