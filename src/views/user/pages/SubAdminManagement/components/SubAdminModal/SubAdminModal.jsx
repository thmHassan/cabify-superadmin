import _ from "lodash";
import React, { useState } from "react";
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

const SubAdminModal = ({
  submitError,
  setFormData,
  onSubmit,
  setIsDocumentModalOpen,
  initialValues,
  type,
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const handleImageChange = (file) => {
    console.log("in");
    if (!file) return;
    console.log(file, "file=====");
    // Optionally, validate file type/size here
    setFormData((prev) => ({ ...prev, profile_picture: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return objectUrl;
    });
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
      />
      <div className="pt-[35px]">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
          //   onSubmit={(values, { setSubmitting }) => {
          //     if (!disableSubmit) {
          //       onSignIn(values, setSubmitting);
          //     } else {
          //       setSubmitting(false);
          //     }
          //   }}
          enableReinitialize={true}
        >
          {({ values, setFieldValue }) => {
            // console.log(values, "valu===");
            return (
              <Form>
                <div className="flex flex-wrap gap-5 mb-[60px]">
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="company name"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
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
                  <div className="w-[calc((100%-20px)/2)]">
                    <label
                      htmlFor="Email"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
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
                      <div className="w-[calc((100%-20px)/2)]">
                        <label
                          htmlFor=""
                          className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
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
                      <div className="w-[calc((100%-20px)/2)]">
                        <label
                          htmlFor=""
                          className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
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
                  <div className="w-full border-t mt-5 pt-5 border-[#6C6C6C]">
                    <label
                      htmlFor=""
                      className="mb-5 block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Permissions
                    </label>
                    <ViewPermissions
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-10">
                  <Button
                    btnSize="md"
                    type="filledGray"
                    className="!px-8 pt-4 pb-[15px] leading-[25px]"
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
                    className="!px-8 pt-4 pb-[15px] leading-[25px]"
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
