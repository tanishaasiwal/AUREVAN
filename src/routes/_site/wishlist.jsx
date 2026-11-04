import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import QuickView from "@/components/product/QuickView";
import Reveal from "@/components/Reveal";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/_site/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — AURAVEN" },
      { name: "description", content: "The AURAVEN watches you have saved." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlistProducts } = useShop();
  const [quickProduct, setQuickProduct] = useState(null);

  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-10 lg:py-14">
          <p className="eyebrow">Saved</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-onyx lg:text-6xl">
            Wishlist
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            {wishlistProducts.length}{" "}
            {wishlistProducts.length === 1 ? "watch saved" : "watches saved"}
          </p>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        {wishlistProducts.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <Heart className="mx-auto h-8 w-8 text-onyx/20" strokeWidth={1.2} />
            <p className="mt-5 font-display text-3xl text-onyx">
              Nothing saved yet
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any watch to keep it here for later.
            </p>
            <Link to="/shop" className="btn-onyx mt-7">
              Browse Watches
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            {wishlistProducts.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 4) * 70}>
                <ProductCard
                  product={product}
                  onQuickView={setQuickProduct}
                  priority={index < 2}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <QuickView
        product={quickProduct}
        open={Boolean(quickProduct)}
        onOpenChange={(open) => !open && setQuickProduct(null)}
      />
    </>
  );
}
