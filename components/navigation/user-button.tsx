"use client";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LayoutDashboard, LogIn, LogOut, Settings, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

const UserButton = ({ user }: Session) => {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div>
      {user?.email ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="ring-0 outline-none">
            <Avatar className="hover:scale-105 transition-transform duration-300 ring-2 ring-transparent hover:ring-slate-200">
              <AvatarImage src={user.image!} />
              <AvatarFallback className="bg-slate-900 text-white font-bold">
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-4">
            <div className="flex gap-2 p-4 border-2 border-black/10 rounded-lg items-center mb-4 cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out">
              <Avatar>
                <AvatarImage src={user.image!} />
                <AvatarFallback className="bg-slate-100 text-slate-900 font-bold">
                  {user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-sm">{user.name}</h3>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            {user.role === "admin" && (
              <DropdownMenuItem
                className="cursor-pointer group hover:bg-slate-50 focus:bg-slate-50 transition-colors rounded-md my-1"
                onClick={() => router.push("/dashboard/analytics")}
              >
                <LayoutDashboard className="w-5 h-5 mr-3 text-slate-500 group-hover:scale-105 group-hover:text-slate-900 transition-all duration-300 ease-in-out" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Dashboard</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-slate-50 focus:bg-slate-50 transition-colors rounded-md my-1"
              onClick={() => router.push("/dashboard/orders")}
            >
              <Truck className="w-5 h-5 mr-3 text-slate-500 group-hover:translate-x-1 group-hover:text-slate-900 transition-all duration-300 ease-in-out" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-slate-50 focus:bg-slate-50 transition-colors rounded-md my-1"
              onClick={() => router.push("/dashboard/settings")}
            >
              <Settings className="w-5 h-5 mr-3 text-slate-500 group-hover:rotate-180 group-hover:text-slate-900 transition-all duration-300 ease-in-out" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group hover:bg-red-50 focus:bg-red-50 transition-colors rounded-md my-1"
              onClick={() => {
                clearCart();
                signOut({ callbackUrl: "/" });
              }}
            >
              <LogOut className="w-5 h-5 mr-3 text-slate-500 group-hover:translate-x-1 group-hover:scale-110 group-hover:text-red-600 transition-all duration-300 ease-in-out" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-red-600 transition-all duration-300">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button asChild className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all px-6">
            <Link href={"/auth/login"} className="flex items-center gap-2">
              <LogIn size={18} /> <span className="font-medium">Login</span>
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default UserButton;
