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
      <DropdownMenuTrigger className="underline">
        Change Status
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Order Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-orange-500 font-medium"
          onClick={() => execute({ id, status: "pending" })}
        >
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-green-500 font-medium"
          onClick={() => execute({ id, status: "completed" })}
        >
          Completed
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-500 font-medium"
          onClick={() => execute({ id, status: "cancelled" })}
        >
          Cancelled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderDropdown;
