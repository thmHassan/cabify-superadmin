import PageTitle from "../../../../components/ui/PageTitle";
import Button from "../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../components/ui/PageSubTitle";
import CardContainer from "../../../../components/shared/CardContainer";
import FormLabel from "../../../../components/ui/FormLabel";
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
    <div className="px-4 py-5 sm:p-6 lg:p-7 2xl:p-10 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-85px)] flex flex-col gap-4 sm:gap-5">
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        <div className="flex justify-between mb-6 sm:mb-8 lg:mb-[33px]">
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
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 mb-6 sm:mb-[25px]">
                <div className="w-full lg:w-[calc(100%-398px)]">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="w-full sm:w-[calc((100%-20px)/2)]">
                      <FormLabel htmlFor="name">
                        Name
                      </FormLabel>
                      <div className="h-14 sm:h-16">
                        <Field
                          type="text"
                          name="name"
                          className="px-4 sm:px-5 py-4 sm:py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-[22px] font-semibold"
                          placeholder="Enter company name"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      />
                    </div>
                    <div className="w-full sm:w-[calc((100%-20px)/2)]">
                      <FormLabel htmlFor="email">
                        Email
                      </FormLabel>
                      <div className="h-14 sm:h-16">
                        <Field
                          type="text"
                          name="email"
                          className="px-4 sm:px-5 py-4 sm:py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-[22px] font-semibold"
                          placeholder="Enter company name"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[378px] h-auto lg:h-[152px] shadow-[-4px_4px_6px_0px_#0000001F] bg-[#ffffff] rounded-lg flex flex-col sm:flex-row items-center px-4 sm:px-5 gap-3 sm:gap-5 py-4 sm:py-0">
                  <div
                    className="w-[80px] h-[80px] sm:w-[102px] sm:h-[102px] bg-[#f2f2f2] rounded-[15px] overflow-hidden flex justify-center items-center cursor-pointer flex-shrink-0"
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
                  <div className="w-full sm:w-[calc(100%-122px)] flex flex-col sm:flex-row gap-3 sm:gap-[15px]">
                    <Button
                      type="filledGray"
                      className="rounded-lg w-full sm:w-[calc((100%-15px)/2)] !pt-3 sm:!pt-4 !pb-3 sm:!pb-[15px]"
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
                      className="rounded-lg w-full sm:w-[calc((100%-15px)/2)] !pt-3 sm:!pt-4 !pb-3 sm:!pb-[15px]"
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
                className="rounded-lg !pt-3 sm:!pt-4 !pb-3 sm:!pb-[15px] !px-8 sm:!px-10 w-full sm:w-auto"
              >
                <PageSubTitle title="Save" className="!text-[#ffffff]" />
              </Button>
            </Form>
          )}
        </Formik>
      </CardContainer>
      <CardContainer className="p-3 sm:p-4 lg:p-5">
        <div className="flex justify-between mb-6 sm:mb-8 lg:mb-[33px]">
          <PageTitle title="Change Password" />
        </div>
        <Formik
          initialValues={{ old_password: "", new_password: "" }}
          validationSchema={CHANGE_PASSWORD_SCHEMA}
          onSubmit={onPasswordChange}
        >
          {() => (
            <Form>
              <div className="flex gap-3 sm:gap-5 mb-6 sm:mb-[25px]">
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <div className="w-full sm:w-[calc((100%-20px)/2)]">
                      <FormLabel htmlFor="old_password">
                        Old Password
                      </FormLabel>
                      <div className="h-14 sm:h-16">
                        <Password
                          name="old_password"
                          className="px-4 sm:px-5 py-4 sm:py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-[22px] font-semibold"
                          placeholder="Enter Old Password"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage
                        name="old_password"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      />
                    </div>
                    <div className="w-full sm:w-[calc((100%-20px)/2)]">
                      <FormLabel htmlFor="new_password">
                        New Password
                      </FormLabel>
                      <div className="h-14 sm:h-16">
                        <Password
                          name="new_password"
                          className="px-4 sm:px-5 py-4 sm:py-[21px] border border-[#8D8D8D] rounded-lg w-full h-full shadow-[-4px_4px_6px_0px_#0000001F] placeholder:text-[#6C6C6C] text-sm sm:text-base leading-5 sm:leading-[22px] font-semibold"
                          placeholder="Enter your password"
                          autoComplete="off"
                        />
                      </div>
                      <ErrorMessage
                        name="new_password"
                        component="div"
                        className="text-red-500 text-xs sm:text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                btnType="submit"
                type="filled"
                className="rounded-lg !pt-3 sm:!pt-4 !pb-3 sm:!pb-[15px] !px-8 sm:!px-10 w-full sm:w-auto"
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
