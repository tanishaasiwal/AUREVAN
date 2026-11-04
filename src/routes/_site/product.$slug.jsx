import { useState } from "react";
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  Heart,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Check,
} from "lucide-react";
import { Image } from "@/components/ui/image";
import ProductCard from "@/components/product/ProductCard";
import QuickView from "@/components/product/QuickView";
import Reveal from "@/components/Reveal";
import {
  getProduct,
  PRODUCTS,
  formatINR,
  isOnSale,
  discountPercent,
} from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Watch"} — AURAVEN` },
      {
        name: "description",
        content: loaderData?.description ?? "An AURAVEN watch.",
      },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [quickProduct, setQuickProduct] = useState(null);

  const wished = wishlist.includes(product.slug);
  const sale = isOnSale(product);

  const related = PRODUCTS.filter(
    (item) =>
      item.slug !== product.slug &&
      (item.collections.some((c) => product.collections.includes(c)) ||
        item.gender === product.gender),
  ).slice(0, 4);

  return (
    <>
      <div className="shell py-6">
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
        >
          <Link to="/" className="transition-colors hover:text-onyx">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/shop" className="transition-colors hover:text-onyx">
            Watches
          </Link>
          <span className="px-2">/</span>
          <span className="text-onyx">{product.name}</span>
        </nav>
      </div>

      <div className="shell grid gap-10 pb-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="group relative aspect-[4/5] w-full overflow-hidden bg-[hsl(var(--ivory))]">
            {product.images.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${product.name} by AURAVEN — view ${index + 1}`}
                loading={index === 0 ? "eager" : "lazy"}
                className={cn(
                  "absolute inset-0 h-full w-full transition-all duration-700 ease-silk group-hover:scale-[1.03]",
                  index === activeImage ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            {sale && (
              <span className="absolute left-4 top-4 bg-[hsl(var(--aurum))] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-onyx">
                Save {discountPercent(product)}%
              </span>
            )}
          </div>

          <div className="mt-3 flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={index === activeImage}
                className={cn(
                  "relative h-24 w-20 overflow-hidden border bg-[hsl(var(--ivory))] transition-colors",
                  index === activeImage
                    ? "border-onyx"
                    : "border-transparent hover:border-border",
                )}
              >
                <Image
                  src={image}
                  alt=""
                  className="absolute inset-0 h-full w-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Auraven · {product.reference}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-onyx lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            {product.tagline}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star < Math.round(product.rating)
                      ? "fill-[hsl(var(--aurum))] text-[hsl(var(--aurum))]"
                      : "text-onyx/20",
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="price text-xl text-onyx">
              {formatINR(product.price)}
            </span>
            {sale && (
              <span className="price text-[13px] text-muted-foreground line-through">
                {formatINR(product.compareAt)}
              </span>
            )}
            <span className="text-[11px] text-muted-foreground">incl. GST</span>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-onyx/70">
            {product.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between border border-border sm:w-auto">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="flex h-12 w-12 items-center justify-center text-onyx transition-colors hover:bg-muted disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
              <span
                aria-live="polite"
                className="w-10 text-center font-mono text-[13px] text-onyx"
              >
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((value) => Math.min(10, value + 1))}
                disabled={qty >= 10}
                aria-label="Increase quantity"
                className="flex h-12 w-12 items-center justify-center text-onyx transition-colors hover:bg-muted disabled:opacity-30"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product.slug, qty)}
              className="btn-onyx flex-1"
            >
              Add to Bag — {formatINR(product.price * qty)}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              aria-pressed={wished}
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-onyx transition-colors hover:border-onyx"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  wished && "fill-[hsl(var(--aurum))] text-[hsl(var(--aurum))]",
                )}
                strokeWidth={1.4}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              addToCart(product.slug, qty, { open: false });
              navigate({ to: "/checkout" });
            }}
            className="btn-ghost mt-3 w-full"
          >
            Buy Now
          </button>

          <ul className="mt-7 grid gap-2.5 border-y border-border py-5 text-[13px] text-onyx/75">
            <li className="flex items-center gap-2.5">
              <Truck
                className="h-4 w-4 text-[hsl(var(--aurum))]"
                strokeWidth={1.5}
              />
              Free insured delivery, 2–4 business days
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck
                className="h-4 w-4 text-[hsl(var(--aurum))]"
                strokeWidth={1.5}
              />
              3-year movement warranty
            </li>
            <li className="flex items-center gap-2.5">
              <RotateCcw
                className="h-4 w-4 text-[hsl(var(--aurum))]"
                strokeWidth={1.5}
              />
              14-day returns, collection arranged
            </li>
          </ul>

          <div className="mt-7">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
              Specification
            </p>
            <dl className="mt-3 divide-y divide-border text-[13px]">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-6 py-2.5">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="text-right text-onyx">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[12px] text-muted-foreground">
            <Check
              className="h-3.5 w-3.5 text-[hsl(var(--aurum))]"
              strokeWidth={2}
            />
            In stock · ships from our Mumbai studio
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="shell py-16 lg:py-20">
            <Reveal>
              <p className="eyebrow">You may also like</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-onyx lg:text-4xl">
                More from the collection
              </h2>
            </Reveal>
            <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 70}>
                  <ProductCard product={item} onQuickView={setQuickProduct} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuickView
        product={quickProduct}
        open={Boolean(quickProduct)}
        onOpenChange={(open) => !open && setQuickProduct(null)}
      />
    </>
  );
}
