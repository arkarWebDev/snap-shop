"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";

import { CirclePlus, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import VariantDialog from "@/components/products/variant-dialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
  variants: VariantsWithImagesTags[];
};

const ActionsCell = (row: Row<Product>) => {
  const product = row.original;

  const { execute } = useAction(deleteProduct, {
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
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 border-slate-100 shadow-xl">
        <DropdownMenuLabel className="font-bold text-slate-800">Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem className="cursor-pointer font-semibold focus:bg-slate-50 focus:text-slate-900 text-slate-700 rounded-lg py-2 my-1 transition-colors">
          <Link href={`/dashboard/create-product?edit_id=${product.id}`} className="w-full">
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer font-semibold focus:bg-rose-50 focus:text-rose-700 text-rose-600 rounded-lg py-2 my-1 transition-colors"
          onClick={() => execute({ id: product.id })}
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const title = row.getValue("title") as string;

      return (
        <div className="w-12 h-12 relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];

      return (
        <div className="flex gap-1.5 flex-wrap items-center">
          {variants.map((v, i) => {
            return (
              <VariantDialog
                editMode={true}
                productID={row.original.id}
                variant={v}
                key={i}
              >
                <div
                  className="w-6 h-6 rounded-full border border-black/10 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: v.color }}
                />
              </VariantDialog>
            );
          })}
          <VariantDialog editMode={false} productID={row.original.id}>
            <div className="w-6 h-6 flex items-center justify-center rounded-full border border-dashed border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100 transition-colors cursor-pointer group">
              <CirclePlus className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
            </div>
          </VariantDialog>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="text-sm font-medium">{title}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <span className="text-sm font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return ActionsCell(row);
    },
  },
];
