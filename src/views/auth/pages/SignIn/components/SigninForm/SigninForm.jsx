import React from "react";
import useAuth from "../../../../../../utils/hooks/useAuth";
import useApiLoader from "../../../../../../utils/hooks/useApiLoader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Password from "../../../../../../components/elements/CustomPassword/Password";
import Button from "../../../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import { useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_PATH } from "../../../../../../constants/routes.path.constant/auth.route.path.constant";
import Loading from "../../../../../../components/shared/Loading/Loading";
import AppLogoLoader from "../../../../../../components/shared/AppLogoLoader";

const SigninForm = ({
  disableSubmit,
  children,
  initialValues = {},
  isAdminLogin = false,
}) => {
  const { signIn, adminSignIn } = useAuth();
  const navigate = useNavigate();
  const { isLoading, executeWithLoader } = useApiLoader();

  const onSignIn = async (values, setSubmitting) => {
    const { email, password, role } = values;

    setSubmitting(true);

    try {
      await executeWithLoader(
        () =>
          isAdminLogin
            ? adminSignIn({ email, password, role: role || "superadmin" })
            : signIn({ email, password }),
        {
          onSuccess: (result) => {
            if (result?.status === "failed") {
              // setMessage(result.message);
            }
          },
          onError: (error) => {
            console.error("Login error:", error);
          },
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Loading
      loading={isLoading}
      type="fullscreen"
      customLoader={<AppLogoLoader size={80} />}
    >
      <Formik
        initialValues={initialValues}
        //   validationSchema={SIGNIN_VALIDATION_SCHEMA}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-[15px]">{children}</div>
            <div className="pt-2.5 pb-5">
              <Button onClick={() => navigate(FORGOT_PASSWORD_PATH)}>
                <PageSubTitle
                  title="Forgot Password?"
                  className="!text-[#1F41BB] underline underline-offset-2"
                />
              </Button>
            </div>
            <div>
              <Button
                btnType="submit"
                type="filled"
                className="py-4 w-full rounded-lg text-[18px] leading-6 capitalize"
                disabled={isLoading}
              >
                <span>{isLoading ? "Logging in..." : "login"}</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Loading>
  );
};

export default SigninForm;
