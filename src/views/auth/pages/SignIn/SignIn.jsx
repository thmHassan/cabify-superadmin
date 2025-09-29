import React from "react";
import SigninForm from "./components/SigninForm";
import AuthLayout from "../../components/AuthLayout";
import SigninFormFields from "./components/SigninFormFields";

const SignIn = () => {
  const initialValues = {
    email: "admin@gmail.com",
    password: "Text@123",
  };

  return (
    <AuthLayout title="Admin Dashboard Login">
      <SigninForm initialValues={initialValues}>
        <SigninFormFields />
      </SigninForm>
    </AuthLayout>
  );
};

export default SignIn;
