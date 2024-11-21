import Products from "@/components/products";
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
    <main>
      <h2>Nav</h2>
      <Products productWithVariants={productwithVariants} />
    </main>
  );
}
