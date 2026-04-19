"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAction } from "next-safe-action/hooks";
import { updateOrderStatus } from "@/server/actions/order";
import { toast } from "sonner";

type OrderDropdownProps = {
  id: number;
};
const OrderDropdown = ({ id }: OrderDropdownProps) => {
  const { execute } = useAction(updateOrderStatus, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-slate-400">
        Change Status
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-100 shadow-xl">
        <DropdownMenuLabel className="font-bold text-slate-800">Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem
          className="cursor-pointer font-semibold focus:bg-amber-50 focus:text-amber-700 text-amber-600 rounded-lg py-2 my-1 transition-colors"
          onClick={() => execute({ id, status: "pending" })}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-semibold focus:bg-emerald-50 focus:text-emerald-700 text-emerald-600 rounded-lg py-2 my-1 transition-colors"
          onClick={() => execute({ id, status: "completed" })}
        >
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-semibold focus:bg-rose-50 focus:text-rose-700 text-rose-600 rounded-lg py-2 my-1 transition-colors"
          onClick={() => execute({ id, status: "cancelled" })}
        >
          Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderDropdown;
