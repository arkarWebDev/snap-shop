import Products from "@/components/products";
import SearchBox from "@/components/products/search-box";
import TagFilter from "@/components/products/tag-filter";
import { db } from "@/server";
import { productVariants } from "@/server/schema";

export default async function Home() {
  const productwithVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    // orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-400 dark:from-slate-200 dark:to-slate-600">iStore</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Discover premium Apple products tailored for your lifestyle. Experience innovation like never before.
        </p>
      </div>

      <SearchBox productWithVariants={productwithVariants} />
      
      <div className="mt-8 mb-6">
        <TagFilter />
      </div>
      
      <Products productWithVariants={productwithVariants} />
    </main>
  );
}
