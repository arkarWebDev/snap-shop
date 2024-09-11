"use client";
import React from "react";
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

const ProviderLogin = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("google", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <p className="gap-3 flex items-center">
          Login with google <FcGoogle />
        </p>
      </Button>
      <Button
        variant={"outline"}
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "/",
          })
        }
      >
        <p className="gap-3 flex items-center">
          Login with github <FaGithub />
        </p>
      </Button>
    </div>
  );
};

export default ProviderLogin;
