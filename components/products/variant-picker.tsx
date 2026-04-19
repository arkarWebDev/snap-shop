"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type VariantPickerProps = {
  id: number;
  color: string;
  productType: string;
  title: string;
  price: number;
  productId: number;
  image: string;
};
const VariantPicker = ({
  id,
  color,
  productType,
  title,
  price,
  productId,
  image,
}: VariantPickerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedVariantColor = searchParams.get("type") || productType;
  //   console.log(selectedVariantColor);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() =>
              router.push(
                `/products/${id}?vid=${id}&productId=${id}&type=${productType}&image=${image}&title=${title}&price=${price}`,
                { scroll: false }
              )
            }
            style={{ backgroundColor: color }}
            className={cn(
              "w-8 h-8 rounded-full cursor-pointer transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-black/10",
              selectedVariantColor === productType
                ? "ring-2 ring-slate-900 ring-offset-2 scale-110"
                : "opacity-60 hover:opacity-100 hover:scale-105"
            )}
          ></div>
        </TooltipTrigger>
        <TooltipContent>{productType}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VariantPicker;
