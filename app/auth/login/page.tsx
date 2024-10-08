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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="snapshot@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
                <Link href={"/auth/reset"}>Forgot password?</Link>
              </Button>
            </div>
          )}
          <Button
            className={cn(
              "w-full mb-4 mt-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            {isTwoFactorOn ? "Verify Code" : "Login"}
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
