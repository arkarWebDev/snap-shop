import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="max-w-xl mx-auto mt-10">{children}</main>;
};

export default AuthLayout;
