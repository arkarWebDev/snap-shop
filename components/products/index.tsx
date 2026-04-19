"use client";
import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/inter-types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProductsProps = {
  productWithVariants: VariantsWithProduct[];
};
const Products = ({ productWithVariants }: ProductsProps) => {
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const [filteredProducts, setFilteredProducts] = useState<
    VariantsWithProduct[]
  >([]);

  useEffect(() => {
    const filteredItems = productWithVariants.filter(
      (item) => item.variantTags[0].tag.toLocaleLowerCase() === tagParams
    );
    setFilteredProducts(filteredItems);
  }, [tagParams]);

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 px-4 mt-8 pb-20">
      {filteredProducts.map((p, index) => {
        return (
          <Link
            key={p.id}
            className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1.5 animate-in fade-in zoom-in-95 fill-mode-both"
            style={{ animationDelay: `${index * 75}ms` }}
            href={`/products/${p.id}?vid=${p.id}&productId=${p.productID}&type=${p.productType}&image=${p.variantImages[0].image_url}&title=${p.product.title}&price=${p.product.price}`}
          >
            <div className="relative aspect-[4/3] sm:aspect-square w-full bg-slate-50/50 overflow-hidden border-b border-slate-100/60 flex items-center justify-center p-8">
              <Image
                src={p.variantImages[0].image_url}
                alt={p.product.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] p-8"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow bg-white/60 backdrop-blur-sm relative z-10">
              <h3 className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight line-clamp-1 mb-2">
                {p.product.title}
              </h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="font-semibold text-lg text-slate-700">
                  {formatCurrency(p.product.price)}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] uppercase font-bold tracking-widest border border-slate-200">
                  {p.productType}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </main>
  );
};

export default Products;
