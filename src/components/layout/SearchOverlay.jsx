import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { PRODUCTS, formatINR } from "@/lib/products";

export default function SearchOverlay({ open, onClose }) {
  const [term, setTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setTerm("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const query = term.trim().toLowerCase();
    if (!query) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter((product) =>
      [
        product.name,
        product.tagline,
        product.gender,
        ...product.collections,
        ...product.styles,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    ).slice(0, 6);
  }, [term]);

  const submit = (event) => {
    event.preventDefault();
    const query = term.trim();
    onClose();
    navigate({ to: "/shop", search: query ? { q: query } : {} });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-background/97 backdrop-blur-md">
      <div className="shell flex h-full flex-col">
        <div className="flex items-center justify-between py-6">
          <p className="eyebrow">Search Auraven</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 items-center justify-center text-onyx transition-colors hover:text-[hsl(var(--aurum))]"
          >
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <form onSubmit={submit} className="border-b border-onyx/20 pb-4">
          <div className="flex items-center gap-4">
            <Search
              className="h-5 w-5 shrink-0 text-onyx/40"
              strokeWidth={1.4}
            />
            <input
              ref={inputRef}
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Chronograph, gold, leather strap…"
              aria-label="Search watches"
              className="w-full bg-transparent font-display text-2xl text-onyx outline-none placeholder:text-onyx/30 sm:text-3xl"
            />
            <button
              type="submit"
              className="btn-onyx hidden shrink-0 sm:inline-flex"
            >
              Search
            </button>
          </div>
        </form>

        <div className="no-scrollbar mt-10 flex-1 overflow-y-auto pb-16">
          <p className="eyebrow">
            {term.trim()
              ? `${results.length} result${results.length === 1 ? "" : "s"}`
              : "Suggested"}
          </p>
          {results.length === 0 ? (
            <p className="mt-6 font-display text-2xl text-onyx/70">
              Nothing matched “{term}”. Try “steel” or “gold”.
            </p>
          ) : (
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    onClick={onClose}
                    className="group flex items-center gap-4"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-[hsl(var(--ivory))]">
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} by AURAVEN`}
                        className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg text-onyx">
                        {product.name}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
                        {product.tagline}
                      </p>
                      <p className="price mt-1.5 text-onyx">
                        {formatINR(product.price)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
