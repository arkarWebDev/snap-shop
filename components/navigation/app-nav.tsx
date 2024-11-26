import React from "react";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";
import { auth } from "@/server/auth";
import CartBtn from "../cart/cart-btn";

const AppNav = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartBtn />
        <UserButton user={session?.user} expires={session?.expires!} />
      </div>
    </nav>
  );
};

export default AppNav;
