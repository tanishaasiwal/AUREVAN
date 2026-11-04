import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { getProduct, formatINR } from "@/lib/products";

export default function MegaPanel({ panel, onNavigate }) {
  const feature = panel.feature ? getProduct(panel.feature.slug) : null;

  return (
    <div className="shell py-10">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5 grid grid-cols-2 gap-8">
          {panel.columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      search={link.search}
                      onClick={onNavigate}
                      className="group inline-flex items-center gap-2 text-[14px] text-onyx/75 transition-colors hover:text-onyx"
                    >
                      <span className="h-px w-0 bg-[hsl(var(--aurum))] transition-all duration-500 group-hover:w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {feature && (
          <div className="col-span-7 grid grid-cols-[140px_1fr] items-center gap-6 border-l border-border pl-10">
            <Link
              to="/product/$slug"
              params={{ slug: feature.slug }}
              onClick={onNavigate}
              className="block overflow-hidden bg-[hsl(var(--ivory))]"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={feature.images[0]}
                  alt={`${feature.name} by AURAVEN`}
                  className="absolute inset-0 h-full w-full transition-transform duration-1200 hover:scale-105"
                />
              </div>
            </Link>
            <div>
              <p className="eyebrow">Featured</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-onyx">
                {feature.name}
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {panel.feature.copy}
              </p>
              <p className="price mt-3 text-onyx">{formatINR(feature.price)}</p>
              <Link
                to="/product/$slug"
                params={{ slug: feature.slug }}
                onClick={onNavigate}
                className="mt-4 inline-block border-b border-onyx pb-1 text-[10px] font-medium uppercase tracking-[0.26em] text-onyx transition-colors hover:border-[hsl(var(--aurum))] hover:text-[hsl(var(--aurum))]"
              >
                Discover
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
