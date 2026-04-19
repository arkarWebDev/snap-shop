import AddToCart from "@/components/cart/add-to-cart";
import ImageSlider from "@/components/products/image-slider";
import VariantPicker from "@/components/products/variant-picker";
import formatCurrency from "@/lib/formatCurrency";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import React from "react";

type SingleProductProps = {
  params: {
    id: number;
  };
};

export async function generateStaticParams() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
  });
  if (data) {
    const idArr = data.map((d) => ({
      id: d.id.toString(),
    }));
    return idArr;
  }
  return [];
}
const SingleProduct = async ({ params }: SingleProductProps) => {
  const productWithVariants = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, params.id),
    with: {
      product: {
        with: {
          productVariants: {
            with: {
              variantImages: true,
              variantTags: true,
            },
          },
        },
      },
    },
  });
  return (
    <>
      {productWithVariants && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 lg:gap-16 py-12">
          <div className="lg:w-1/2 w-full">
            <ImageSlider
              variants={productWithVariants.product.productVariants}
            />
          </div>
          <div className="lg:w-1/2 w-full flex flex-col">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-slate-100/80 text-slate-700 rounded-full text-xs font-bold tracking-wider uppercase mb-4 border border-slate-200">
                {productWithVariants.productType}
              </span>
              <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 mb-2">
                {productWithVariants.product.title}
              </h1>
              <p className="text-2xl font-semibold text-slate-900 mt-4">
                {formatCurrency(productWithVariants.product.price)} USD
              </p>
            </div>
            
            <hr className="border-slate-200 mb-6" />
            
            <div
              className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-8"
              dangerouslySetInnerHTML={{
                __html: productWithVariants.product.description,
              }}
            />
            
            <div className="space-y-6 mt-auto">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-widest">
                  Color
                </p>
                <div className="flex gap-4 items-center">
                  {productWithVariants.product.productVariants.map((v) => (
                    <VariantPicker
                      key={v.id}
                      {...v}
                      title={productWithVariants.product.title}
                      price={productWithVariants.product.price}
                      image={v.variantImages[0].image_url}
                      productId={v.productID}
                    />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <AddToCart />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default SingleProduct;
