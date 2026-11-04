import { Link } from "@tanstack/react-router";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductSection({
  eyebrow,
  title,
  products,
  linkLabel = "View All",
  linkSearch = {},
  onQuickView,
  priority = false,
}) {
  return (
    <section className="shell py-16 lg:py-24">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-onyx lg:text-5xl">
            {title}
          </h2>
        </div>
        <Link
          to="/shop"
          search={linkSearch}
          className="hidden border-b border-onyx/30 pb-1 text-[10px] font-medium uppercase tracking-[0.26em] text-onyx transition-colors hover:border-onyx sm:inline-block"
        >
          {linkLabel}
        </Link>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
        {products.map((product, index) => (
          <Reveal key={product.slug} delay={(index % 4) * 80}>
            <ProductCard
              product={product}
              onQuickView={onQuickView}
              priority={priority && index < 2}
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 sm:hidden">
        <Link to="/shop" search={linkSearch} className="btn-ghost w-full">
          {linkLabel}
        </Link>
      </div>
    </section>
  );
}
