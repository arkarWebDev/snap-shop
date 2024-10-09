import ChangePassword from "@/components/settings/change-password";
import LogOutBtn from "@/components/settings/log-out";
import ProfileCard from "@/components/settings/profile-card";
import SettingsCard from "@/components/settings/settings-card";
import TwoFactor from "@/components/settings/two-factor";
import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";

import { redirect } from "next/navigation";
import React from "react";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");

  return (
    <SettingsCard title="Settings" description="Manage your account settings">
      <main className=" flex flex-col gap-4">
        <ProfileCard session={session} />

        {!session.user.isOauth && (
          <>
            <ChangePassword email={session.user.email} />{" "}
            <TwoFactor
              isTwoFactorEnabled={session.user.isTwofactorEnabled}
              email={session.user.email}
            />
          </>
        )}
        <LogOutBtn />
      </main>
    </SettingsCard>
  );
};

export default Settings;
