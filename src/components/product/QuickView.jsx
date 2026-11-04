import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatINR, isOnSale } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export default function QuickView({ product, open, onOpenChange }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  if (!product) return null;
  const wished = wishlist.includes(product.slug);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 border-none bg-background p-0 sm:rounded-none">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid gap-0 sm:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[hsl(var(--ivory))]">
            <Image
              src={product.images[0]}
              alt={`${product.name} by AURAVEN`}
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="eyebrow">Auraven · {product.reference}</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-onyx">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.tagline}
            </p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="price text-base text-onyx">
                {formatINR(product.price)}
              </span>
              {isOnSale(product) && (
                <span className="price text-muted-foreground line-through">
                  {formatINR(product.compareAt)}
                </span>
              )}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-onyx/70">
              {product.description}
            </p>
            <dl className="mt-6 divide-y divide-border border-y border-border text-[13px]">
              {Object.entries(product.specs)
                .slice(0, 3)
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="text-right text-onyx">{value}</dd>
                  </div>
                ))}
            </dl>
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  addToCart(product.slug, 1);
                  onOpenChange(false);
                }}
                className="btn-onyx w-full"
              >
                Add to Bag
              </button>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.slug)}
                  className="btn-ghost flex-1"
                >
                  {wished ? "Saved" : "Wishlist"}
                </button>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  onClick={() => onOpenChange(false)}
                  className="btn-ghost flex-1"
                >
                  Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
