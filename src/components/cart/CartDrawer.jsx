import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Image } from "@/components/ui/image";
import { formatINR } from "@/lib/products";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { cartOpen, closeCart, items, subtotal, count, setQty, removeItem } =
    useShop();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80]",
        cartOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!cartOpen}
    >
      <button
        type="button"
        tabIndex={cartOpen ? 0 : -1}
        aria-label="Close bag"
        onClick={closeCart}
        className={cn(
          "absolute inset-0 bg-onyx/35 backdrop-blur-[3px] transition-opacity duration-500",
          cartOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-background shadow-[-20px_0_60px_-30px_rgba(26,26,26,0.4)] transition-transform duration-600 ease-silk",
          cartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-xl text-onyx">Your Bag</h2>
            <span className="font-mono text-[11px] text-muted-foreground">
              {count}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="flex h-9 w-9 items-center justify-center text-onyx transition-colors hover:text-[hsl(var(--aurum))]"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-8 w-8 text-onyx/20" strokeWidth={1.2} />
            <p className="mt-5 font-display text-2xl text-onyx">
              Your bag is empty
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Every AURAVEN watch is assembled and regulated by hand.
            </p>
            <Link to="/shop" onClick={closeCart} className="btn-onyx mt-7">
              Shop Watches
            </Link>
          </div>
        ) : (
          <>
            <ul className="no-scrollbar flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-5">
                  <Link
                    to="/product/$slug"
                    params={{ slug: item.slug }}
                    onClick={closeCart}
                    className="relative h-[104px] w-[84px] shrink-0 overflow-hidden bg-[hsl(var(--ivory))]"
                  >
                    <Image
                      src={item.images[0]}
                      alt={`${item.name} by AURAVEN`}
                      className="absolute inset-0 h-full w-full"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[17px] leading-tight text-onyx">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                          {item.reference}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 text-onyx/35 transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.4} />
                      </button>
                    </div>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-8 w-8 items-center justify-center text-onyx transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                        <span
                          aria-live="polite"
                          className="w-8 text-center font-mono text-[12px] text-onyx"
                        >
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          disabled={item.qty >= 10}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-8 w-8 items-center justify-center text-onyx transition-colors hover:bg-muted disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                      </div>
                      <span className="price text-onyx">
                        {formatINR(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  Subtotal
                </span>
                <span className="price text-[15px] text-onyx">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Inclusive of GST · Complimentary insured delivery
              </p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="btn-onyx mt-4 w-full"
              >
                Checkout
              </Link>
              <Link
                to="/cart"
                onClick={closeCart}
                className="mt-3 block text-center text-[10px] uppercase tracking-[0.26em] text-onyx/60 transition-colors hover:text-onyx"
              >
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
