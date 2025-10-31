import React from "react";
import SigninForm from "./components/SigninForm";
import AuthLayout from "../../components/AuthLayout";
import SigninFormFields from "./components/SigninFormFields";

const SignIn = () => {
  const initialValues = {
    email: "superadmin@taxidispatch.com",
    password: "taxidispatch@123",
    role: "superadmin",
  };

  return (
    <AuthLayout title="Admin Dashboard Login">
      <SigninForm initialValues={initialValues} isAdminLogin={true}>
        <SigninFormFields />
      </SigninForm>
    </AuthLayout>
  );
};

export default SignIn;
