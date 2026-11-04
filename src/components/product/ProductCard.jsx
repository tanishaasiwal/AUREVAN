import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatINR, isOnSale, discountPercent } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  onQuickView,
  priority = false,
  className,
}) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wished = wishlist.includes(product.slug);
  const sale = isOnSale(product);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative overflow-hidden bg-[hsl(var(--ivory))]">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
          className="block"
        >
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.images[0]}
              alt={`${product.name} by AURAVEN`}
              loading={priority ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full transition-transform duration-1400 ease-silk group-hover:scale-[1.045]"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt=""
                loading="lazy"
                aria-hidden="true"
                className="absolute inset-0 hidden h-full w-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 sm:block"
              />
            )}
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col items-start gap-1.5">
          {sale && (
            <span className="bg-[hsl(var(--aurum))] px-2 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-onyx">
              −{discountPercent(product)}%
            </span>
          )}
          {product.isNew && !sale && (
            <span className="bg-onyx px-2 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-[hsl(var(--ivory))]">
              New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={
            wished
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={wished}
          className="absolute right-2.5 top-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-onyx backdrop-blur-sm transition-all duration-300 hover:bg-onyx hover:text-[hsl(var(--ivory))]"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              wished &&
                "scale-110 fill-[hsl(var(--aurum))] text-[hsl(var(--aurum))]",
            )}
            strokeWidth={1.4}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-0 items-stretch opacity-100 transition-all duration-500 ease-silk lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex flex-1 items-center justify-center gap-2 bg-white/92 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-onyx backdrop-blur-sm transition-colors hover:bg-white"
            >
              <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
              Quick View
            </button>
          )}
          <button
            type="button"
            onClick={() => addToCart(product.slug, 1)}
            className="flex flex-1 items-center justify-center gap-2 bg-onyx py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[hsl(var(--ivory))] transition-colors hover:bg-[hsl(var(--aurum))] hover:text-onyx"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add
          </button>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground">
          Auraven
        </p>
        <h3 className="mt-1.5 font-display text-[19px] leading-tight text-onyx">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="link-underline"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2.5">
          <span className="price text-onyx">{formatINR(product.price)}</span>
          {sale && (
            <span className="price text-muted-foreground line-through decoration-1">
              {formatINR(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
