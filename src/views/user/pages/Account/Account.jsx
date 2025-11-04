import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ImageUploadIcon from "../../../../components/svg/ImageUploadIcon";
import Password from "../../../../components/elements/CustomPassword/Password";
import {
  apiChangePassword,
  apiProfileUpdate,
} from "../../../../services/AccountService";
import { useAppSelector } from "../../../../store";
import { useRef, useState } from "react";
import { convertToFormData } from "../../../../utils/functions/common.function";
import AppLogoLoader from "../../../../components/shared/AppLogoLoader";
import { CHANGE_PASSWORD_SCHEMA, PROFILE_SCHEMA } from "../../validators/pages/account.validation";

const Account = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const user = useAppSelector((state) => state.auth.user) || null;

  const fileInputRef = useRef(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Optionally, validate file type/size here
    setFormData((prev) => ({ ...prev, profile_picture: file }));
    const objectUrl = URL.createObjectURL(file);
    setImagePreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return objectUrl;
    });
  };

  console.log(user, "user=====");
  const onPasswordChange = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { old_password, new_password } = values;
      const result = await apiChangePassword({ old_password, new_password });
      if (result?.status === 200) {
        console.log("innnnnnnnn");
        console.log(result, "res====");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
    }
  };

  const onProfileUpdate = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { name, email } = values;
      const formDataToSend = convertToFormData({ name, email, ...formData });
      const result = await apiProfileUpdate(formDataToSend);
      if (result?.status === 200) {
        console.log("innnnnnnnn");
        console.log(result, "res====");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setSubmitting(false);
    }
  };

  

  if (!user.name || !user.email) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <AppLogoLoader />
      </div>
    );
  }


  return (
    <div className="p-10 flex flex-col gap-5">
      <CardContainer className="p-[30px]">
        <div className="flex justify-between mb-[33px]">
          <PageTitle title="Update Profile" />
        </div>
        <Formik
          enableReinitialize
          initialValues={{ name: user.name || "", email: user.email || "" }}
          validationSchema={PROFILE_SCHEMA}
          onSubmit={onProfileUpdate}
        >
          {() => (
            <Form>
              <div className="flex gap-5 mb-[25px]">
                <div className="w-[calc(100%-398px)]">
                  <div className="flex gap-5">
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
                          placeholder="Enter company name"
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
                  </div>
                </div>
                <div className="w-[378px] h-[152px] shadow-[-4px_4px_6px_0px_#0000001F] bg-[#ffffff] rounded-lg flex items-center px-5 gap-5">
                  <div
                    className="w-[102px] h-[102px] bg-[#f2f2f2] rounded-[15px] overflow-hidden flex justify-center items-center cursor-pointer"
                    onClick={handlePickImage}
                    title="Click to upload"
                  >
                    {imagePreviewUrl ? (
                      <img
                        src={imagePreviewUrl}
                        alt="Company"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageUploadIcon />
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="w-[calc(100%-122px)] flex gap-[15px]">
                    <Button
                      type="filledGray"
                      className="rounded-lg w-[calc((100%-15px)/2)] !pt-4 !pb-[15px]"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          profile_picture: null,
                        }));
                        setImagePreviewUrl(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      <span>Remove</span>
                    </Button>
                    <Button
                      type="filled"
                      className="rounded-lg w-[calc((100%-15px)/2)] !pt-4 !pb-[15px]"
                      onClick={handlePickImage}
                    >
                      <span>Change</span>
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                btnType="submit"
                type="filled"
                className="rounded-lg !pt-4 !pb-[15px] !px-10"
              >
                <PageSubTitle title="Save" className="!text-[#ffffff]" />
              </Button>
            </Form>
          )}
        </Formik>
      </CardContainer>
      <CardContainer className="p-[30px]">
        <div className="flex justify-between mb-[33px]">
          <PageTitle title="Change Password" />
        </div>
        <Formik
          initialValues={{ old_password: "", new_password: "" }}
          validationSchema={CHANGE_PASSWORD_SCHEMA}
          onSubmit={onPasswordChange}
        >
          {() => (
            <Form>
              <div className="flex gap-5 mb-[25px]">
                <div className="w-[calc(100%-398px)]">
                  <div className="flex gap-5">
                    <div className="w-[calc((100%-20px)/2)]">
                      <label
                        htmlFor="company name"
                        className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                      >
                        Old Password
                      </label>
                      <div className="h-16">
                        <Password
                          name="old_password"
                          className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                          placeholder="Enter Old Password"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage
                        name="old_password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="w-[calc((100%-20px)/2)]">
                      <label
                        htmlFor="company name"
                        className="mb-[5px] block text-[18px] leading-[25px] text-[#252525] font-semibold "
                      >
                        New Password
                      </label>
                      <div className="h-16">
                        <Password
                          name="new_password"
                          className="px-5 py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-base leading-[22px] font-semibold"
                          placeholder="Enter your password"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage
                        name="new_password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                btnType="submit"
                type="filled"
                className="rounded-lg !pt-4 !pb-[15px] !px-10"
              >
                <PageSubTitle title="Save" className="!text-[#ffffff]" />
              </Button>
            </Form>
          )}
        </Formik>
      </CardContainer>
    </div>
  );
};

export default Account;
