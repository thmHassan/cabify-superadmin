import React from "react";
import useAuth from "../../../../../../utils/hooks/useAuth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Password from "../../../../../../components/elements/CustomPassword/Password";
import Button from "../../../../../../components/ui/Button/Button";
import PageSubTitle from "../../../../../../components/ui/PageSubTitle";
import { useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_PATH } from "../../../../../../constants/routes.path.constant/auth.route.path.constant";

const SigninForm = ({ disableSubmit, children, initialValues={} }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSignIn = async (values, setSubmitting) => {
    const { email, password } = values;
    setSubmitting(true);

    const result = await signIn({ email, password });

    if (result?.status === "failed") {
      // setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
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
            >
              <span>login</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;
