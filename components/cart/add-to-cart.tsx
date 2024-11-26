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
      <div className="flex items-center justify-between gap-2 my-2">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          disabled={quantity === 1}
        >
          <Minus size={16} />
        </Button>
        <div className="bg-black text-white text-center font-medium  p-2 rounded-md w-full">
          Quantity: {quantity}
        </div>
        <Button onClick={() => setQuantity(quantity + 1)}>
          <Plus size={16} />
        </Button>
      </div>
      <Button className="w-full" size={"lg"} onClick={addtoCartHandler}>
        Add to cart
      </Button>
    </>
  );
};

export default AddToCart;
