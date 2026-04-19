"use client";

import { useAction } from "next-safe-action/hooks";
import AuthForm from "@/components/auth/auth-form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/types/register-schema";
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
import { register } from "@/server/actions/register-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { execute, status, result } = useAction(register, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success, {
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com", "_blank");
            },
          },
        });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    const { name, email, password } = values;
    execute({ name, email, password });
  };
  return (
    <AuthForm
      formTitle="Create an account"
      footerLabel="Already have an account?"
      footerHerf="/auth/login"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="text-slate-700 font-semibold ml-1">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="snapshot" className="py-6 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-slate-400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
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
                  <FormItem className="mb-4">
                    <FormLabel className="text-slate-700 font-semibold ml-1">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="•••••••" className="py-6 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-slate-400 font-mono tracking-widest text-lg" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
          </div>
          <Button
            className={cn(
              "w-full mb-2 mt-6 rounded-full py-6 text-base font-bold shadow-md shadow-slate-900/20 bg-slate-900 hover:bg-slate-800 transition-all active:scale-[0.98]",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Create your account
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Register;
