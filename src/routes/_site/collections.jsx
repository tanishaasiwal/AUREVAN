import { createFileRoute, Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { COLLECTION_CARDS, STYLE_CARDS, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/_site/collections")({
  head: () => ({
    meta: [
      { title: "Collections — AURAVEN" },
      {
        name: "description",
        content:
          "Explore the AURAVEN collections: men's and women's watches, chronographs, classics, automatics and dive watches.",
      },
    ],
  }),
  component: CollectionsPage,
});

const countFor = (slug) =>
  PRODUCTS.filter(
    (product) => product.gender === slug || product.collections.includes(slug),
  ).length;

function CollectionsPage() {
  return (
    <>
      <div className="border-b border-border">
        <div className="shell py-12 lg:py-16">
          <p className="eyebrow">The Collections</p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[0.98] text-onyx lg:text-7xl">
            Every reference, in one place.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Twelve references, four families. Swiss movements throughout,
            finished to a standard we would wear ourselves.
          </p>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {COLLECTION_CARDS.map((card, index) => (
            <Reveal key={card.slug} delay={index * 80}>
              <Link
                to={card.href.to}
                search={card.href.search}
                className="group block"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[hsl(var(--ivory))]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full transition-transform duration-1500 ease-silk group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h2 className="font-display text-2xl leading-tight text-white">
                      {card.title}
                    </h2>
                    <p className="mt-1 text-[12px] text-white/60">
                      {countFor(card.slug)} references
                    </p>
                    <span className="mt-3 block h-px w-6 bg-[hsl(var(--aurum))] transition-all duration-500 group-hover:w-12" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="eyebrow">By Finish</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-onyx lg:text-4xl">
            Shop by style
          </h2>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {STYLE_CARDS.map((card, index) => (
            <Reveal key={card.slug} delay={index * 70}>
              <Link
                to="/shop"
                search={{ style: card.slug }}
                className="group relative block overflow-hidden bg-[hsl(var(--ivory))]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full transition-transform duration-1500 ease-silk group-hover:scale-[1.05]"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/95 px-4 py-3.5 backdrop-blur-sm">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-onyx">
                    {card.title}
                  </span>
                  <span className="text-[11px] text-[hsl(var(--aurum))]">
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/shop" className="btn-onyx">
            Shop All Watches
          </Link>
        </div>
      </div>
    </>
  );
}
