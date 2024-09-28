import React from "react";
import SettingsCard from "./settings-card";
import { KeyRound } from "lucide-react";

const ChangePassword = () => {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Change Password</p>
        <KeyRound className="w-5 h-5" />
      </div>
    </SettingsCard>
  );
};

export default ChangePassword;
