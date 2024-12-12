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
    <main className="my-6 relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search products..."
          className="ps-8"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Search size={20} className="absolute top-2 left-2" />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-md rounded-md p-2 w-full max-h-80 overflow-y-scroll mt-4">
          <p className="my-2 text-sm font-medium ps-4">
            <span className="font-bold">{searchResults.length}</span> results
            found.
          </p>
          {searchResults.map((item) => (
            <ul key={item.id}>
              <li>
                <Link
                  href={`/products/${item.id}?vid=${item.id}&productId=${item.productID}&type=${item.productType}&image=${item.variantImages[0].image_url}&title=${item.product.title}&price=${item.product.price}`}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <Image
                    src={item.variantImages[0].image_url!}
                    alt={item.product.title}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <h2>{item.product.title}</h2>
                  <p>{formatCurrency(item.product.price)} USD</p>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
      {searchResults.length === 0 && searchKey !== "" && (
        <p className="my-2 text-sm font-medium ps-4 absolute mt-4 p-2 text-red-500 bg-white rounded-md shadow-sm w-full">
          No results found with this product name.
        </p>
      )}
    </main>
  );
};

export default SearchBox;
