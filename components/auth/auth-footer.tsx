import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type AuthFooterProps = {
  footerLabel: string;
  footerHerf: string;
};
const AuthFooter = ({ footerLabel, footerHerf }: AuthFooterProps) => {
  return (
    <Button variant={"link"} asChild>
      <Link href={footerHerf}>{footerLabel}</Link>
    </Button>
  );
};

export default AuthFooter;
