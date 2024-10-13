"use client";

import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import SettingsCard from "./settings-card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { UserRoundPen } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";

import useMediaQuery from "@/hooks/useMediaQuery";
import ProfileForm from "./profile-form";
import AvatarUploadForm from "./avatar-upload-form";

type ProfileCardProps = {
  session: Session;
};
const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleisOpen = () => {
    setIsOpen(false);
  };

  return (
    <SettingsCard>
      <div className="flex items-start gap-2 justify-between">
        <div className="flex items-start gap-2 flex-col lg:flex-row">
          <AvatarUploadForm
            name={session.user?.name}
            image={session.user?.image}
            email={session.user.email}
          />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Display Name
            </p>
            <h2 className=" font-medium text-sm lg:text-base">
              @{session?.user?.name}
            </h2>
            <p className="text-sm font-medium text-muted-foreground mt-2">
              Email:
            </p>
            <p className="text-sm lg:text-base font-medium">
              {session.user?.email}
            </p>
          </div>
        </div>
        {isDesktop ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="mx-4 lg:mx-0">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  This will be your public display name.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={handleisOpen}
              />
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  This will be your public display name.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={handleisOpen}
              />
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
