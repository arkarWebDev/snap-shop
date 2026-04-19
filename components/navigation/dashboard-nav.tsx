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
    <nav className="my-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-1 justify-start sm:justify-center bg-slate-100/80 backdrop-blur-md p-1.5 rounded-[2rem] border border-slate-200 overflow-x-auto no-scrollbar shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] mask-fade-edges">
        {routes.map((route, index) => {
          const isActive = pathname === route.path;
          return (
            <Link href={route.path} key={index} className="shrink-0">
              <span
                className={cn(
                  "flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/50 scale-100"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 hover:scale-95"
                )}
              >
                <div
                  className={cn(
                    "transition-transform duration-300",
                    isActive ? "scale-110" : "scale-100 opacity-70"
                  )}
                >
                  {route.icons}
                </div>
                {route.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DashBoardNavigation;
