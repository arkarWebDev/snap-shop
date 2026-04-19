"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";

const AddToCart = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const searchParams = useSearchParams();
  const variantId = searchParams.get("vid");
  const productId = Number(searchParams.get("productId"));
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const image = searchParams.get("image");

  if (!variantId || !productId || !title || !price || !image) {
    return redirect("/");
  }

  const addtoCartHandler = () => {
    addToCart({
      id: productId,
      image,
      name: title,
      price,
      variant: {
        variantId: Number(variantId),
        quantity,
      },
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 py-2">
        <div className="flex items-center justify-between w-full sm:w-auto bg-slate-100 border border-slate-200 rounded-full p-1 shadow-inner">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-200 transition-colors h-10 w-10 disabled:opacity-50"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
            disabled={quantity === 1}
          >
            <Minus size={16} className="text-slate-700" />
          </Button>
          <div className="w-12 text-center font-bold text-slate-900 text-lg">
            {quantity}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-200 transition-colors h-10 w-10"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={16} className="text-slate-700" />
          </Button>
        </div>
        <Button 
          className="w-full sm:flex-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-lg shadow-slate-900/20 py-7 text-lg transition-all active:scale-[0.98]" 
          onClick={addtoCartHandler}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
