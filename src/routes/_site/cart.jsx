import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatINR } from "@/lib/products";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/_site/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — AURAVEN" },
      {
        name: "description",
        content: "Review the watches in your AURAVEN bag.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, count, setQty, removeItem } = useShop();

  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-10 lg:py-14">
          <p className="eyebrow">Shopping Bag</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-onyx lg:text-6xl">
            Your Bag
          </h1>
          <p className="mt-3 text-[15px] text-muted-foreground">
            {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <ShoppingBag
              className="mx-auto h-8 w-8 text-onyx/20"
              strokeWidth={1.2}
            />
            <p className="mt-5 font-display text-3xl text-onyx">
              Your bag is empty
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Twelve references, one standard. Start with the bestsellers.
            </p>
            <Link to="/shop" className="btn-onyx mt-7">
              Shop Watches
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16">
            <div>
              <ul className="divide-y divide-border border-y border-border">
                {items.map((item) => (
                  <li key={item.slug} className="flex gap-5 py-6">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.slug }}
                      className="relative h-[140px] w-[112px] shrink-0 overflow-hidden bg-[hsl(var(--ivory))]"
                    >
                      <Image
                        src={item.images[0]}
                        alt={`${item.name} by AURAVEN`}
                        className="absolute inset-0 h-full w-full"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                            {item.reference}
                          </p>
                          <h2 className="mt-1 font-display text-[22px] leading-tight text-onyx">
                            <Link
                              to="/product/$slug"
                              params={{ slug: item.slug }}
                              className="link-underline"
                            >
                              {item.name}
                            </Link>
                          </h2>
                          <p className="mt-1 text-[12px] text-muted-foreground">
                            {item.tagline}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          aria-label={`Remove ${item.name}`}
                          className="text-onyx/35 transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(item.slug, item.qty - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-onyx transition-colors hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.6} />
                          </button>
                          <span className="w-9 text-center font-mono text-[12px] text-onyx">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(item.slug, item.qty + 1)}
                            disabled={item.qty >= 10}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-onyx transition-colors hover:bg-muted disabled:opacity-30"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.6} />
                          </button>
                        </div>
                        <span className="price text-[15px] text-onyx">
                          {formatINR(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-onyx/60 transition-colors hover:text-onyx"
              >
                Continue shopping
              </Link>
            </div>

            <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
              <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
                Order Summary
              </p>
              <dl className="mt-5 space-y-3 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="price text-onyx">{formatINR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Insured delivery</dt>
                  <dd className="text-onyx">Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">GST</dt>
                  <dd className="text-muted-foreground">Included</dd>
                </div>
              </dl>
              <div className="mt-5 flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-[11px] uppercase tracking-[0.22em] text-onyx">
                  Total
                </span>
                <span className="price text-lg text-onyx">
                  {formatINR(subtotal)}
                </span>
              </div>
              <Link to="/checkout" className="btn-onyx mt-5 w-full">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
                Demonstration storefront — no payment is taken.
              </p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
