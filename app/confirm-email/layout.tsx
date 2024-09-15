import React from "react";

const ConfirmEmailLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="max-w-xl mx-auto mt-10">{children}</main>;
};

export default ConfirmEmailLayout;
