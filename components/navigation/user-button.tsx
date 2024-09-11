"use client";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

const UserButton = ({ user }: Session) => {
  console.log(user);

  return (
    <div>
      {user?.email}
      {user?.email ? (
        <Button variant={"destructive"} onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href={"/auth/login"} className="space-x-4">
            <LogIn size={16} /> <span>Login</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserButton;
