import React from "react";
import { Card, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AnalyticsProps = {
  count: number;
  title: string;
  icon: React.ReactNode;
  href: string;
};
const AnalyticsCard = ({ count, title, icon, href }: AnalyticsProps) => {
  const isPendingCard = title === "Pending Orders";
  return (
    <Link href={href} className="group h-full">
      <Card className={cn(
        "h-full transition-all duration-300 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-xl group-hover:shadow-slate-200/50 group-hover:-translate-y-1 rounded-3xl overflow-hidden relative",
        isPendingCard ? "bg-slate-900 border-slate-900 text-white" : "bg-white text-slate-900"
      )}>
        <CardHeader className="p-6 h-full flex flex-col justify-between">
          <div className={cn(
            "p-3 w-fit rounded-2xl transition-colors mb-4",
            isPendingCard ? "bg-slate-800 text-white" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-900 border border-slate-100"
          )}>
            {icon}
          </div>
          <div className="mt-auto">
            <h2 className="text-4xl font-extrabold tracking-tight mb-1">{count}</h2>
            <p className={cn(
              "text-sm font-medium",
              isPendingCard ? "text-slate-300" : "text-slate-500"
            )}>{title}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default AnalyticsCard;
