import AuthForm from "@/components/auth/auth-form";
import React from "react";

const Login = () => {
  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't have an account?"
      footerHerf="/auth/register"
      showProvider
    >
      <h2>Login form</h2>
    </AuthForm>
  );
};

export default Login;
