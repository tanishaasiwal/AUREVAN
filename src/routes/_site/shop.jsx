import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import QuickView from "@/components/product/QuickView";
import Reveal from "@/components/Reveal";
import {
  PRODUCTS,
  GENDERS,
  COLLECTIONS,
  STYLES,
  PRICE_BANDS,
  formatINR,
} from "@/lib/products";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "new", label: "Newest First" },
];

const priceBandMatches = (product, bandValue) => {
  const band = PRICE_BANDS.find((item) => item.value === bandValue);
  if (!band) return true;
  return product.price >= band.min && product.price < band.max;
};

export const Route = createFileRoute("/_site/shop")({
  validateSearch: (search) => ({
    gender: typeof search.gender === "string" ? search.gender : undefined,
    collection:
      typeof search.collection === "string" ? search.collection : undefined,
    style: typeof search.style === "string" ? search.style : undefined,
    price: typeof search.price === "string" ? search.price : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
    new: typeof search.new === "string" ? search.new : undefined,
    sale: typeof search.sale === "string" ? search.sale : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop All Watches — AURAVEN" },
      {
        name: "description",
        content:
          "Browse every AURAVEN reference: chronographs, automatics, dress watches and dive watches. Filter by category, price and strap.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickProduct, setQuickProduct] = useState(null);

  const activeFilters = [
    search.gender &&
      GENDERS.find((item) => item.value === search.gender)?.label,
    search.collection &&
      COLLECTIONS.find((item) => item.value === search.collection)?.label,
    search.style && STYLES.find((item) => item.value === search.style)?.label,
    search.price &&
      PRICE_BANDS.find((item) => item.value === search.price)?.label,
    search.new === "true" && "New Arrivals",
    search.sale === "true" && "On Sale",
    search.q && `“${search.q}”`,
  ].filter(Boolean);

  const update = (key, value) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: value || undefined }),
      replace: true,
    });
  };

  const clearAll = () => navigate({ search: {}, replace: true });

  const results = useMemo(() => {
    const query = (search.q || "").trim().toLowerCase();
    let list = PRODUCTS.filter((product) => {
      if (
        search.gender &&
        product.gender !== search.gender &&
        product.gender !== "unisex"
      ) {
        return false;
      }
      if (search.collection && !product.collections.includes(search.collection))
        return false;
      if (search.style && !product.styles.includes(search.style)) return false;
      if (search.price && !priceBandMatches(product, search.price))
        return false;
      if (search.new === "true" && !product.isNew) return false;
      if (search.sale === "true" && !product.compareAt) return false;
      if (
        query &&
        ![
          product.name,
          product.tagline,
          ...product.collections,
          ...product.styles,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      ) {
        return false;
      }
      return true;
    });

    const sort = search.sort || "featured";
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "new")
      list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return list;
  }, [search]);

  const priceRange = results.length
    ? `${formatINR(Math.min(...results.map((p) => p.price)))} – ${formatINR(
        Math.max(...results.map((p) => p.price)),
      )}`
    : null;

  const heading =
    search.new === "true"
      ? "New Arrivals"
      : search.sale === "true"
        ? "Sale"
        : search.gender === "men"
          ? "Men's Watches"
          : search.gender === "women"
            ? "Women's Watches"
            : search.collection
              ? COLLECTIONS.find((item) => item.value === search.collection)
                  ?.label
              : search.style
                ? STYLES.find((item) => item.value === search.style)?.label
                : "All Watches";

  const FilterGroup = ({ title, options, paramKey, current }) => (
    <div className="border-b border-border py-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-onyx">
        {title}
      </p>
      <ul className="mt-3.5 space-y-2.5">
        {options.map((option) => {
          const active = current === option.value;
          return (
            <li key={option.value}>
              <button
                type="button"
                onClick={() =>
                  update(paramKey, active ? undefined : option.value)
                }
                aria-pressed={active}
                className="group flex w-full items-center justify-between gap-3 text-left text-[14px] text-onyx/70 transition-colors hover:text-onyx"
              >
                <span className={cn(active && "text-onyx")}>
                  {option.label}
                </span>
                <span
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors",
                    active
                      ? "border-onyx bg-onyx text-background"
                      : "border-onyx/25",
                  )}
                >
                  {active && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const filters = (
    <>
      <FilterGroup
        title="Category"
        options={GENDERS}
        paramKey="gender"
        current={search.gender}
      />
      <FilterGroup
        title="Collection"
        options={COLLECTIONS}
        paramKey="collection"
        current={search.collection}
      />
      <FilterGroup
        title="Strap & Style"
        options={STYLES}
        paramKey="style"
        current={search.style}
      />
      <FilterGroup
        title="Price"
        options={PRICE_BANDS}
        paramKey="price"
        current={search.price}
      />
    </>
  );

  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-10 lg:py-14">
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
          >
            <Link to="/" className="transition-colors hover:text-onyx">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-onyx">{heading}</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl leading-tight text-onyx lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">
            {results.length} {results.length === 1 ? "watch" : "watches"}
            {priceRange ? ` · ${priceRange}` : ""} · Free insured delivery
          </p>
        </div>
      </div>

      <div className="shell grid gap-10 py-10 lg:grid-cols-[240px_1fr] lg:gap-14 lg:py-14">
        <aside aria-label="Filters" className="hidden lg:block">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Filters</p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--aurum))] hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="mt-2 border-t border-border">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-onyx lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
              Filters
              {activeFilters.length > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-onyx px-1 font-mono text-[9px] text-[hsl(var(--ivory))]">
                  {activeFilters.length}
                </span>
              )}
            </button>

            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              {activeFilters.map((label) => (
                <span
                  key={label}
                  className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-onyx/70"
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="relative ml-auto flex items-center">
              <label
                htmlFor="sort"
                className="mr-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Sort
              </label>
              <div className="relative">
                <select
                  id="sort"
                  value={search.sort || "featured"}
                  onChange={(event) =>
                    update(
                      "sort",
                      event.target.value === "featured"
                        ? undefined
                        : event.target.value,
                    )
                  }
                  className="appearance-none border border-border bg-background py-2 pl-3 pr-8 text-[11px] uppercase tracking-[0.14em] text-onyx outline-none focus:border-onyx"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-onyx/50"
                  strokeWidth={1.6}
                />
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-3xl text-onyx">
                No watches match those filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your price range or removing a filter.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="btn-onyx mt-7"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
              {results.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 3) * 70}>
                  <ProductCard
                    product={product}
                    onQuickView={setQuickProduct}
                    priority={index < 3}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-[75] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-onyx/40 backdrop-blur-[2px]"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-display text-xl text-onyx">Filters</p>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center text-onyx"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">{filters}</div>
            <div className="flex gap-2.5 border-t border-border p-4">
              <button
                type="button"
                onClick={clearAll}
                className="btn-ghost flex-1"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="btn-onyx flex-1"
              >
                Show {results.length}
              </button>
            </div>
          </div>
        </div>
      )}

      <QuickView
        product={quickProduct}
        open={Boolean(quickProduct)}
        onOpenChange={(open) => !open && setQuickProduct(null)}
      />
    </>
  );
}
