"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ImageSliderProps = {
  variants: VariantsWithImagesTags[];
};
const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);
  const searchParams = useSearchParams();
  const currentVariantType = searchParams.get("type");

  const updateSlider = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveIndex(e.slidesInView());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img) => (
              <CarouselItem key={img.image_url}>
                {img.image_url ? (
                  <div className="w-full relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-50/50 border border-slate-100 rounded-3xl overflow-hidden flex items-center justify-center cursor-crosshair">
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      fill
                      className="object-contain hover:scale-110 transition-transform duration-700 ease-out p-8"
                      priority
                    />
                  </div>
                ) : null}
              </CarouselItem>
            ))
        )}
      </CarouselContent>
      <div className="flex py-6 gap-4 overflow-x-auto no-scrollbar justify-start sm:justify-center">
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img, index) => (
              <div key={img.image_url} className="shrink-0 px-1 py-1">
                {img.image_url ? (
                  <div
                    onClick={() => updateSlider(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out bg-slate-50",
                      index === activeIndex[0]
                        ? "opacity-100 ring-2 ring-slate-900 ring-offset-2 scale-105 shadow-md"
                        : "opacity-60 hover:opacity-100 border border-slate-200"
                    )}
                  >
                    <Image
                      src={img.image_url}
                      alt={img.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : null}
              </div>
            ))
        )}
      </div>
    </Carousel>
  );
};

export default ImageSlider;
