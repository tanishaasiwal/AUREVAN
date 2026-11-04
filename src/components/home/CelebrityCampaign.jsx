import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/Reveal";
import { getProduct, formatINR } from "@/lib/products";

const CAMPAIGN_CAST = [
  {
    slug: "noir-elite",
    name: "Adrien Cole",
    role: "Actor",
    line: "Shot in London, 2 a.m.",
    image:
      "https://media.base44.com/images/public/6ae4bf9d44275289a7a5bcc2/9cbac5fb2_generated_image.png",
  },
  {
    slug: "solstice-gold",
    name: "Nadia Rey",
    role: "Musician",
    line: "Golden hour, kept.",
    image:
      "https://media.base44.com/images/public/6ae4bf9d44275289a7a5bcc2/18098b6c4_generated_image.png",
  },
  {
    slug: "regatta-diver",
    name: "Mira Sen",
    role: "Creative director",
    line: "Off the clock, on the water.",
    image:
      "https://media.base44.com/images/public/6ae4bf9d44275289a7a5bcc2/c674f1883_generated_image.png",
  },
];

export default function CelebrityCampaign() {
  return (
    <section className="shell py-14 sm:py-18 lg:py-24">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow mb-4">The Campaign</p>
          <h2 className="font-display text-3xl font-light leading-[1.05] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            Worn by the bold.
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Three faces, three timepieces. The campaign portraits, and the watches
          they wore.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6">
        {CAMPAIGN_CAST.map((cast, index) => {
          const watch = getProduct(cast.slug);
          if (!watch) return null;

          return (
            <Reveal key={cast.slug} delay={index * 90}>
              <Link
                to="/product/$slug"
                params={{ slug: cast.slug }}
                className="group relative block overflow-hidden bg-onyx"
              >
                <Image
                  src={cast.image}
                  alt={`${cast.name} wearing the AURAVEN ${watch.name}`}
                  fittingType="fill"
                  className="h-[420px] w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04] lg:h-[520px]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 text-white lg:p-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-[hsl(var(--aurum))]">
                      {cast.role}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-light leading-tight text-white lg:text-[27px]">
                      {cast.name}
                    </h3>
                    <p className="mt-1 text-[12px] italic leading-snug text-white/65">
                      {cast.line}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-3 border-t border-white/25 pt-3">
                    <Image
                      src={watch.images[0]}
                      alt={`AURAVEN ${watch.name}`}
                      fittingType="fill"
                      className="h-16 w-16 flex-none border border-white/30 bg-white object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] uppercase tracking-[0.24em] text-white/55">
                        AURAVEN · {watch.reference}
                      </p>
                      <p className="mt-1 truncate text-[13px] tracking-[0.03em] text-white">
                        {watch.name}
                      </p>
                      <p className="price mt-0.5 text-[11px] text-white/60">
                        {formatINR(watch.price)}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 flex-none items-center justify-center border border-white/35 transition-colors duration-500 group-hover:border-[hsl(var(--aurum))] group-hover:bg-[hsl(var(--aurum))] group-hover:text-onyx">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.4} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
