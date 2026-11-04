import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default function FeaturedCarousel({ products, onQuickView }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-y border-border bg-[hsl(var(--ivory))]/60 py-16 lg:py-24">
      <div className="shell">
        <Reveal className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Featured Products</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-onyx lg:text-5xl">
              Selected by the house
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Scroll featured products left"
              className="flex h-11 w-11 items-center justify-center border border-onyx/20 text-onyx transition-all duration-300 hover:border-onyx hover:bg-onyx hover:text-[hsl(var(--ivory))]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Scroll featured products right"
              className="flex h-11 w-11 items-center justify-center border border-onyx/20 text-onyx transition-all duration-300 hover:border-onyx hover:bg-onyx hover:text-[hsl(var(--ivory))]"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0"
        >
          {products.map((product) => (
            <div
              key={product.slug}
              className="w-[76%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] xl:w-[23.5%]"
            >
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
