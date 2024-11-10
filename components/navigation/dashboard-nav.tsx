"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Route = {
  label: string;
  path: string;
  icons: JSX.Element;
};
type DashBoardNavigationProps = {
  routes: Route[];
};

const DashBoardNavigation = ({ routes }: DashBoardNavigationProps) => {
  const pathname = usePathname();
  return (
    <nav className="mt-2 mb-6 border-b border-b-slate-300 pb-2">
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <span
              className={cn(
                "flex items-center gap-1 text-gray-400 font-medium text-sm",
                pathname === route.path &&
                  "text-white bg-primary px-2 py-1 rounded-md"
              )}
            >
              {route.icons} {route.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DashBoardNavigation;
