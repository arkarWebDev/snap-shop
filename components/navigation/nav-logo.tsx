import { Apple } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLogo = () => {
  return (
    <Link
      href={"/"}
      className="text-3xl font-bold text-primary font-mono text-bold flex gap-1"
    >
      <Apple size={46} className="fill-primary" />
      <span className="text-5xl">iCore</span>
    </Link>
  );
};

export default NavLogo;
