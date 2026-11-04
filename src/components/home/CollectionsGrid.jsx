import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { COLLECTION_CARDS } from "@/lib/products";
import Reveal from "@/components/Reveal";

export default function CollectionGrid() {
  return (
    <section className="shell py-20 lg:py-28">
      <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Shop by Collection</p>
          <h2 className="mt-3 font-display text-4xl leading-tight text-onyx lg:text-5xl">
            Four ways to keep time
          </h2>
        </div>
        <Link
          to="/collections"
          className="hidden border-b border-onyx/30 pb-1 text-[10px] font-medium uppercase tracking-[0.26em] text-onyx transition-colors hover:border-onyx sm:inline-block"
        >
          All Collections
        </Link>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {COLLECTION_CARDS.map((card, index) => (
          <Reveal key={card.slug} delay={index * 90}>
            <Link
              to={card.href.to}
              search={card.href.search}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full bg-[hsl(var(--ivory))]">
                <Image
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full transition-transform duration-1500 ease-silk group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/72 via-onyx/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                    0{index + 1}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight text-white lg:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/65">{card.copy}</p>
                  <span className="mt-3 block h-px w-6 bg-[hsl(var(--aurum))] transition-all duration-500 group-hover:w-12" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
