"use client";
import { VariantsWithProduct } from "@/lib/inter-types";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import formatCurrency from "@/lib/formatCurrency";
import Link from "next/link";

type SearchBoxProps = {
  productWithVariants: VariantsWithProduct[];
};

const SearchBox = ({ productWithVariants }: SearchBoxProps) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<VariantsWithProduct[]>([]);

  useEffect(() => {
    if (searchKey !== "") {
      const filteredProducts = productWithVariants.filter((item) => {
        const searchTerm = searchKey.toLowerCase();
        const itemName = item.product.title.toLocaleLowerCase();
        return itemName.includes(searchTerm);
      });
      setSearchResults(filteredProducts);
    }
    if (searchKey === "") {
      setSearchResults([]);
    }
  }, [searchKey]);

  return (
    <main className="relative max-w-2xl mx-auto z-50 mb-12">
      <div className="relative group drop-shadow-sm transition-all duration-300 focus-within:drop-shadow-md">
        <Search size={22} className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 group-focus-within:text-slate-700 transition-colors" />
        <Input
          type="text"
          placeholder="Search premium products..."
          className="ps-12 py-6 text-lg rounded-full border-slate-200 bg-white/80 backdrop-blur-md focus-visible:ring-slate-300 transition-all shadow-sm w-full"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-xl rounded-2xl p-2 w-full max-h-80 overflow-y-auto mt-2 border border-slate-100 z-50 animate-in fade-in slide-in-from-top-2">
          <p className="my-2 text-sm font-medium px-4 text-slate-500">
            <span className="font-bold text-slate-900">{searchResults.length}</span> results found
          </p>
          <ul className="flex flex-col gap-1">
            {searchResults.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products/${item.id}?vid=${item.id}&productId=${item.productID}&type=${item.productType}&image=${item.variantImages[0].image_url}&title=${item.product.title}&price=${item.product.price}`}
                  className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-shrink-0 relative w-14 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
                    <Image
                      src={item.variantImages[0].image_url!}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-base font-semibold text-slate-900 truncate">{item.product.title}</h2>
                    <p className="text-sm font-medium text-slate-500">{formatCurrency(item.product.price)} USD</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.length === 0 && searchKey !== "" && (
        <div className="absolute mt-2 p-4 text-red-500 text-sm font-medium bg-red-50/90 backdrop-blur-md border border-red-100 rounded-2xl shadow-lg w-full text-center z-50 animate-in fade-in slide-in-from-top-2">
          No results found with this product name.
        </div>
      )}
    </main>
  );
};

export default SearchBox;
