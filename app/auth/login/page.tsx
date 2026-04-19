"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Login = () => {
  const [isTwoFactorOn, setIsTwoFactorOn] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { execute, status, result } = useAction(login, {
    onSuccess({ data }) {
      if (data?.error) {
        toast.error(data?.error);
        form.reset();
      }
      if (data?.success) {
        toast.success(data?.success);
      }
      if (data?.twoFactor) {
        toast.success(data?.twoFactor);
        setIsTwoFactorOn(true);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    const { email, password, code } = values;
    execute({ email, password, code });
  };
  return (
    <AuthForm
      formTitle={isTwoFactorOn ? "Place your code" : "Login to your account"}
      footerLabel="Don't have an account?"
      footerHerf="/auth/register"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {isTwoFactorOn && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>We sent a code to your email.</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      disabled={status === "executing"}
                      className=" "
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          {!isTwoFactorOn && (
            <div>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-slate-700 font-semibold ml-1">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="snapshot@gmail.com" className="py-6 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-slate-400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel className="text-slate-700 font-semibold ml-1 mb-0">Password</FormLabel>
                      <Button size={"sm"} variant={"link"} className="h-auto p-0 font-medium text-slate-500 hover:text-slate-800">
                        <Link href={"/auth/reset"}>Forgot password?</Link>
                      </Button>
                    </div>
                    <FormControl>
                      <Input placeholder="•••••••" className="py-6 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-slate-400 font-mono tracking-widest text-lg" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button
            className={cn(
              "w-full mb-2 mt-6 rounded-full py-6 text-base font-bold shadow-md shadow-slate-900/20 bg-slate-900 hover:bg-slate-800 transition-all active:scale-[0.98]",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorOn ? "Verify Secure Code" : "Sign in to iStore"}
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
