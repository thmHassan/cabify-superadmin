import React, { useState } from "react";
import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import EditPaperPencilIcon from "../../../../components/svg/EditPaperPencilIcon";
import CardContainer from "../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PlusIcon from "../../../../components/svg/PlusIcon";
import Modal from "../../../../components/shared/Modal";
import ImageUploadIcon from "../../../../components/svg/ImageUploadIcon";
import AccountIcon from "../../../../components/svg/AccountIcon";
import AccountActiveIcon from "../../../../components/svg/AccountActiveIcon";
import CameraIcon from "../../../../components/svg/CameraIcon";

const Account = () => {
  const [isOpenUpdatePasswordModal, setIsOpenUpdatePasswordModal] =
    useState(false);
  return (
    <div className="p-10">
      <div className="flex flex-col gap-2.5 mb-[30px] px-4 pt-2">
        <div className="flex justify-between">
          <PageTitle title="User Profile" />
        </div>
        <div>
          <PageSubTitle title="Manage vehicle related documents across all panels" />
        </div>
      </div>
      <CardContainer className="p-5">
        <Formik
          initialValues={{}}
          // validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
          // onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="flex gap-6">
                <div className="w-80 h-80">
                  <CardContainer
                    type={1}
                    className="p-5 h-full flex justify-center items-center"
                  >
                    <div className="flex justify-center items-center border-2 border-[#e9e9e9] rounded-xl flex-col gap-2 p-8">
                      <CameraIcon width={55} height={55} fill="#ededed" />
                      <p className="text-xs max-w-[120px] text-center">
                        Upload your image in png, jpg, jpeg format.
                      </p>
                    </div>
                  </CardContainer>
                </div>
                <div className="flex flex-col gap-5 w-[calc(100%-344px)] pt-2">
                  <div className="w-full">
                    <label
                      htmlFor="company name"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Name
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Enter company name"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="company name"
                      className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                    >
                      Email
                    </label>
                    <div className="h-16">
                      <Field
                        type="text"
                        name="email"
                        className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                        placeholder="Enter company name"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="pt-2 gap-5 flex justify-start">
                    <Button
                      type="filled"
                      btnSize="2xl"
                      // onClick={() => navigate(DRIVER_VEHICLE_NEW_PATH)}
                    >
                      <div className="flex gap-[15px] items-center">
                        <EditPaperPencilIcon />
                        <span>Update Profile</span>
                      </div>
                    </Button>
                    <Button
                      type="bgOutlined"
                      btnSize="2xl"
                      className="!w-auto"
                      onClick={() => setIsOpenUpdatePasswordModal(true)}
                    >
                      <div className="flex gap-[15px] items-center">
                        <EditPaperPencilIcon fill="#1F41BB" />
                        <span>Change Password</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CardContainer>
      <Modal size="sm" isOpen={isOpenUpdatePasswordModal} className="p-10">
        <div className="w-[120px] h-[120px] rounded-full bg-[#EEEEEE] flex justify-center items-center mx-auto mb-5">
          <AccountActiveIcon width={40} height={40} />
        </div>
        <div className="text-[26px] leading-9 font-semibold text-[#252525] mb-7 text-center">
          <span>Update Password</span>
        </div>
        <Formik
          initialValues={{}}
          // validationSchema={FORGOT_PASSWORD_VALIDATION_SCHEMA}
          // onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="flex flex-col gap-5 mb-7">
                <div className="w-full">
                  <label
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Old Password
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter company name"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    New Password
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter company name"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="company name"
                    className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                  >
                    Password Confirmation
                  </label>
                  <div className="h-16">
                    <Field
                      type="text"
                      name="email"
                      className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                      placeholder="Enter company name"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button
                  btnSize="md"
                  type="filledGray"
                  className="!px-8 pt-4 pb-[15px] leading-[25px] w-[calc((100%-20px)/2)]"
                  onClick={() => setIsOpenUpdatePasswordModal(false)}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  btnSize="md"
                  type="filled"
                  className="!px-8 pt-4 pb-[15px] leading-[25px] w-[calc((100%-20px)/2)]"
                >
                  <span>Update Password</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default Account;
