import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, ChevronRight } from "lucide-react";

const SECTIONS = [
  {
    title: "Men",
    links: [
      { label: "All Men's Watches", to: "/shop", search: { gender: "men" } },
      {
        label: "Chronograph",
        to: "/shop",
        search: { gender: "men", collection: "chronograph" },
      },
      {
        label: "Automatic",
        to: "/shop",
        search: { gender: "men", collection: "automatic" },
      },
      {
        label: "Dive",
        to: "/shop",
        search: { gender: "men", collection: "diver" },
      },
      {
        label: "Leather",
        to: "/shop",
        search: { gender: "men", style: "leather" },
      },
      {
        label: "Stainless Steel",
        to: "/shop",
        search: { gender: "men", style: "steel" },
      },
    ],
  },
  {
    title: "Women",
    links: [
      {
        label: "All Women's Watches",
        to: "/shop",
        search: { gender: "women" },
      },
      {
        label: "Gold",
        to: "/shop",
        search: { gender: "women", style: "gold" },
      },
      {
        label: "Leather",
        to: "/shop",
        search: { gender: "women", style: "leather" },
      },
      {
        label: "Minimal",
        to: "/shop",
        search: { gender: "women", style: "minimal" },
      },
    ],
  },
  {
    title: "Collections",
    links: [
      {
        label: "Chronograph",
        to: "/shop",
        search: { collection: "chronograph" },
      },
      { label: "Classic", to: "/shop", search: { collection: "classic" } },
      { label: "Automatic", to: "/shop", search: { collection: "automatic" } },
      { label: "Dive", to: "/shop", search: { collection: "diver" } },
    ],
  },
];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <span className="font-display text-xl tracking-[0.42em] text-onyx">
          AURAVEN
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center text-onyx"
        >
          <X className="h-5 w-5" strokeWidth={1.4} />
        </button>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-8">
        <Link
          to="/shop"
          onClick={onClose}
          className="flex items-center justify-between border-b border-border py-4 font-display text-2xl text-onyx"
        >
          Shop All Watches
          <ChevronRight className="h-4 w-4 text-onyx/40" />
        </Link>

        {SECTIONS.map((section) => (
          <div key={section.title} className="border-b border-border py-5">
            <p className="eyebrow">{section.title}</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    search={link.search}
                    onClick={onClose}
                    className="text-[14px] text-onyx/75"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/shop"
            search={{ new: "true" }}
            onClick={onClose}
            className="font-display text-xl text-onyx"
          >
            New Arrivals
          </Link>
          <Link
            to="/shop"
            search={{ sale: "true" }}
            onClick={onClose}
            className="font-display text-xl text-[hsl(var(--aurum))]"
          >
            Sale
          </Link>
          <Link
            to="/wishlist"
            onClick={onClose}
            className="font-display text-xl text-onyx"
          >
            Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
}
