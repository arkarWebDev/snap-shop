import { Session } from "next-auth";
import React from "react";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { UserRoundPen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type ProfileCardProps = {
  session: Session;
};
const ProfileCard = ({ session }: ProfileCardProps) => {
  console.log(session);

  return (
    <SettingsCard>
      <div className="flex items-start gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src={session?.user?.image!} alt="profile" />
            <AvatarFallback className="bg-primary text-white font-bold">
              {session?.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className=" font-semibold text-lg">{session?.user?.name}</h2>
            <p className="text-sm font-medium text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="mx-4 lg:mx-0">
            <DialogHeader>
              <DialogTitle>Wanna updaye your profile?</DialogTitle>
              <input type="text" className="w-full my-6" />
              <Button>Save Changes</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
