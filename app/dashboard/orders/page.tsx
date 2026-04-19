import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server";
import { desc, eq, or } from "drizzle-orm";
import { orders } from "@/server/schema";
import formatCurrency from "@/lib/formatCurrency";
import Image from "next/image";

import { format } from "date-fns";
import OrderDropdown from "./order-dropdown";

const Orders = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/");

  const orderArray = await db.query.orders.findMany({
    where:
      session.user.role === "admin"
        ? undefined
        : eq(orders.userID, session.user.id),
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: { with: { variantImages: true } },
          order: true,
        },
      },
    },
    orderBy: [desc(orders.id)],
  });
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border border-slate-100 shadow-sm rounded-3xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <CardTitle className="text-2xl text-slate-800">Your Orders</CardTitle>
          <CardDescription className="text-slate-500 mt-1">Review your recent purchases and their fulfillment status</CardDescription>
        </CardHeader>
        <CardContent className="p-0 border-none">
          <Table className="overflow-x-auto min-w-[800px]">
            <TableCaption className="pb-4">A complete list of your transaction history.</TableCaption>
            <TableHeader className="bg-slate-50 border-b border-slate-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-4 pl-6 font-semibold text-slate-600">ID</TableHead>
                <TableHead className="font-semibold text-slate-600">Total</TableHead>
                <TableHead className="text-center font-semibold text-slate-600">Ordered On</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="font-semibold text-slate-600">Action</TableHead>
                {session?.user?.role === "admin" && (
                  <TableHead className="text-right pr-6 font-semibold text-slate-600">Admin</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
            {orderArray.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="pl-6 font-medium text-slate-900 border-b border-slate-100">#{order.id}</TableCell>
                  <TableCell className="font-semibold text-slate-700 border-b border-slate-100">{formatCurrency(order.total)}</TableCell>
                  <TableCell className="text-center text-slate-500 font-medium border-b border-slate-100">
                    {format(new Date(order.created?.toString()!), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="border-b border-slate-100">
                    {order.status === "pending" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        {order.status}
                      </span>
                    )}
                    {order.status === "completed" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {order.status}
                      </span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="border-b border-slate-100">
                    <Dialog>
                      <DialogTrigger className="text-sm font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-2 transition-colors">
                        View Details
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl rounded-3xl p-8 border-slate-100 shadow-xl overflow-hidden">
                        <DialogHeader className="mb-6">
                          <DialogTitle className="text-2xl font-bold text-slate-800">
                            Details for Order #{order.id}
                          </DialogTitle>
                          <DialogDescription className="text-base text-slate-500">
                            Total transaction value: <span className="font-bold text-slate-800">{formatCurrency(order.total)}</span>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="rounded-2xl border border-slate-100 overflow-hidden">
                          <Table>
                            <TableHeader className="bg-slate-50">
                              <TableRow className="hover:bg-transparent border-slate-100">
                                <TableHead className="w-[100px] pl-6 py-4">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Variant</TableHead>
                                <TableHead className="text-right pr-6">
                                  Quantity
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.orderProduct.map(
                                ({ product, productVariants, quantity }) => (
                                  <TableRow key={product.id} className="border-slate-50">
                                    <TableCell className="font-medium pl-6 py-3">
                                      <div className="w-12 h-12 relative rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                                        <Image
                                          fill
                                          src={
                                            productVariants.variantImages[0]
                                              .image_url
                                          }
                                          alt={product.title}
                                          className="object-cover"
                                        />
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-semibold text-slate-800">{product.title}</TableCell>
                                    <TableCell className="text-slate-600 font-medium">
                                      {formatCurrency(product.price)}
                                    </TableCell>
                                    <TableCell>
                                      <div
                                        className="w-6 h-6 rounded-full border border-black/10 shadow-sm"
                                        style={{
                                          backgroundColor: productVariants.color,
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell className="text-right pr-6 font-bold text-slate-700">
                                      x{quantity}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>

                  {session.user.role === "admin" && (
                    <TableCell className="text-right pr-6 border-b border-slate-100">
                       <OrderDropdown id={order.id} />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );
};

export default Orders;
