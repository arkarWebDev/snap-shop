import { Apple } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 group transition-all duration-300"
    >
      <div className="bg-slate-900 text-white p-1.5 rounded-xl group-hover:scale-105 transition-transform shadow-md">
        <Apple size={26} className="fill-white" />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-slate-900">iStore</span>
    </Link>
  );
};

export default NavLogo;
