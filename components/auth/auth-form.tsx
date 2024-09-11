import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProviderLogin from "./provider-login";
import AuthFooter from "./auth-footer";

type AuthFormProps = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHerf: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider,
  footerLabel,
  footerHerf,
}: AuthFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children} {showProvider && <ProviderLogin />}
      </CardContent>
      <CardFooter>
        <AuthFooter footerLabel={footerLabel} footerHerf={footerHerf} />
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
