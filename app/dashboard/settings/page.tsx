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
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-2">Manage your personal preferences and system security.</p>
      </div>
      <SettingsCard title="General Preferences" description="Review or update your account details below.">
        <main className="flex flex-col gap-6">
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
    </div>
  );
};

export default Settings;
