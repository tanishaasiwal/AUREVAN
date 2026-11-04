import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { STYLE_CARDS } from "@/lib/products";
import Reveal from "@/components/Reveal";

export default function StyleGrid() {
  return (
    <section className="shell py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow">Shop by Style</p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-onyx lg:text-5xl">
          Find your finish
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {STYLE_CARDS.map((card, index) => (
          <Reveal key={card.slug} delay={index * 80}>
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
                <span className="text-[11px] text-[hsl(var(--aurum))] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
