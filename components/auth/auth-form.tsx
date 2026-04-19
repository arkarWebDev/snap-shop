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
import { Info } from "lucide-react";

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
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="bg-amber-50/80 backdrop-blur-md border border-amber-200/60 rounded-3xl p-5 flex gap-4 text-sm text-amber-800 shadow-sm transition-all hover:shadow-md">
        <Info className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
        <div className="flex flex-col gap-1.5 leading-relaxed">
          <p className="font-bold text-amber-900 tracking-tight text-base">iStore Demo Access</p>
          <div className="space-y-1 mt-1 bg-amber-100/50 p-3 rounded-2xl border border-amber-200/50">
            <p><span className="font-semibold text-amber-900 w-16 inline-block">Admin:</span> tester4dmin@gmail.com</p>
            <p><span className="font-semibold text-amber-900 w-16 inline-block">User:</span> tester0ser@gmail.com</p>
            <p><span className="font-semibold text-amber-900 w-16 inline-block">Pass:</span> abcdefg</p>
          </div>
          <p className="text-xs text-amber-700/80 mt-2 font-medium">⚠️ Notice: Google and GitHub OAuth logins may be currently disconnected.</p>
        </div>
      </div>
      
      <Card className="border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[2rem] overflow-hidden bg-white/90 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center pb-8 pt-10">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">{formTitle}</CardTitle>
        </CardHeader>
        <CardContent className="px-8 sm:px-10 flex flex-col gap-6">
          {children} 
          {showProvider && <ProviderLogin />}
        </CardContent>
        <CardFooter className="px-8 sm:px-10 pb-10 pt-2 justify-center">
          <AuthFooter footerLabel={footerLabel} footerHerf={footerHerf} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
