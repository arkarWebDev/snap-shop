"use client";

import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const tags = [
  {
    id: 1,
    name: "iPhone",
    tag: "iphone",
  },
  {
    id: 2,
    name: "iPad",
    tag: "ipad",
  },
  {
    id: 3,
    name: "Macbook",
    tag: "macbook",
  },
  {
    id: 4,
    name: "Accessories",
    tag: "accessories",
  },
  {
    id: 5,
    name: "Cover",
    tag: "cover",
  },
];
const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };

  return (
    <div className="flex justify-start sm:justify-center items-center gap-3 text-sm font-medium overflow-x-auto no-scrollbar py-4 px-2 w-full max-w-4xl mx-auto mask-fade-edges">
      {tags.map((t) => (
        <button
          key={t.id}
          className={cn(
            "cursor-pointer rounded-full px-6 py-2.5 transition-all duration-300 ease-out whitespace-nowrap border",
            tagParams === t.tag
              ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
          )}
          onClick={() => handleTagClick(t.tag)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
};

export default TagFilter;
