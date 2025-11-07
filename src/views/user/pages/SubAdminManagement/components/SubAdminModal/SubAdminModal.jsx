import _ from "lodash";
import React, { useState } from "react";
import * as Yup from "yup";
import { unlockBodyScroll } from "../../../../../../utils/functions/common.function";
import CommonImageUploader from "../../../../../../components/shared/CommonImageUploader";
import ImageUploadIcon from "../../../../../../components/svg/ImageUploadIcon";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Password from "../../../../../../components/elements/CustomPassword";
import CardContainer from "../../../../../../components/shared/CardContainer";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import FormikCheckbox from "../../../../../../components/ui/FormikCheckbox";
import Button from "../../../../../../components/ui/Button/Button";
import ViewPermissions from "../ViewPermissions";
import {
  SUB_ADMIN_EDIT_VALIDATION_SCHEMA,
  SUB_ADMIN_NEW_VALIDATION_SCHEMA,
} from "../../../../validators/pages/subAdmin.validation";

const SubAdminModal = ({
  submitError,
  setFormData,
  onSubmit,
  setIsDocumentModalOpen,
  initialValues,
  type,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const handleImageChange = (file, previewUrl) => {
    console.log("in");
    if (!file) return;
    console.log(file, "file=====");
    // Optionally, validate file type/size here
    setFormData((prev) => ({ ...prev, profile_picture: file }));
    if (previewUrl) {
      setImagePreviewUrl((prevUrl) => {
        if (prevUrl && prevUrl.startsWith('blob:')) URL.revokeObjectURL(prevUrl);
        return previewUrl;
      });
    } else {
      const objectUrl = URL.createObjectURL(file);
      setImagePreviewUrl((prevUrl) => {
        if (prevUrl && prevUrl.startsWith('blob:')) URL.revokeObjectURL(prevUrl);
        return objectUrl;
      });
    }
  };

  return (
    <>
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      <CommonImageUploader
        onChange={handleImageChange}
        defaultImage={imagePreviewUrl}
        label="Add Sub Admin"
        icon={<ImageUploadIcon />}
        className="w-20 h-20 sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
      />
      <div className="pt-6 sm:pt-8 lg:pt-[35px]">
        {/** Validation schema **/}
        {/** name/email always required; password fields only when creating new **/}
        {/** Keep schema in render to read `type` prop without extra hooks **/}
        {(() => {
          return null;
        })()}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={
            type === "new"
              ? SUB_ADMIN_NEW_VALIDATION_SCHEMA
              : SUB_ADMIN_EDIT_VALIDATION_SCHEMA
          }
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-12 lg:mb-[60px]">
                  <div className="w-full sm:w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="name"
                      className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                    >
                      Name
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="name"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Enter Name"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="email"
                      className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                    >
                      Email
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {type === "new" && (
                    <>
                      <div className="w-full sm:w-[calc((100%-20px)/2)]">
                        <label
                          htmlFor="password"
                          className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                        >
                          Password
                        </label>
                        <div className="h-16">
                          <Password
                            name="password"
                            className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                            placeholder="Enter password"
                            autoComplete="off"
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="w-full sm:w-[calc((100%-20px)/2)]">
                        <label
                          htmlFor="cPassword"
                          className="mb-[5px] block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                        >
                          Confirm Password
                        </label>
                        <div className="h-16">
                          <Password
                            name="cPassword"
                            className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                            placeholder="Re-enter Password"
                            autoComplete="off"
                          />
                        </div>
                        <ErrorMessage
                          name="cPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </>
                  )}
                  <div className="w-full border-t mt-4 sm:mt-5 pt-4 sm:pt-5 border-[#6C6C6C]">
                    <label
                      htmlFor="permissions"
                      className="mb-4 sm:mb-5 block text-base sm:text-[18px] leading-[22px] sm:leading-[25px] text-[#252525] font-semibold"
                    >
                      Permissions
                    </label>
                    <ViewPermissions
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage
                      name="permissions"
                      component="div"
                      className="text-red-500 text-sm mt-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-5 sm:justify-end mt-6 sm:mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="w-full sm:w-auto !px-6 sm:!px-8 pt-3 sm:pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
                    onClick={() => {
                      unlockBodyScroll();
                      setIsDocumentModalOpen({
                        type: "new",
                        isOpen: false,
                      });
                    }}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    btnType="submit"
                    btnSize="md"
                    type="filled"
                    className="w-full sm:w-auto !px-6 sm:!px-8 pt-3 sm:pt-4 pb-3 sm:pb-[15px] leading-5 sm:leading-[25px]"
                  >
                    <span>{type === "new" ? "Create" : "Update"}</span>
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default SubAdminModal;
