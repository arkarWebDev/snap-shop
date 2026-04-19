"use client";

import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import SettingsCard from "./settings-card";
import { signOut } from "next-auth/react";
import { useCartStore } from "@/store/cart-store";

const LogOutBtn = () => {
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <SettingsCard>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold mb-2 text-red-600">Danger Zone</h2>
        <Button variant={"destructive"} onClick={() => {
          clearCart();
          signOut({ callbackUrl: "/" });
        }}>
          <LogOut className="me-2" />
          Logout
        </Button>
      </div>
    </SettingsCard>
  );
};

export default LogOutBtn;
