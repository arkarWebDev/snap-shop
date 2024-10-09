"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <SettingsCard>
      <h2 className="text-sm font-semibold mb-2 text-red-600">Danger Zone</h2>
      <Button variant={"destructive"} onClick={() => signOut()}>
        <LogOut className="me-2" />
        Logout
      </Button>
    </SettingsCard>
  );
};

export default LogOutBtn;
