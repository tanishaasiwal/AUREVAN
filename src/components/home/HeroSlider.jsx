import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import { CAMPAIGN } from "@/lib/products";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: CAMPAIGN.heroDark,
    eyebrow: "The 2026 Collection",
    title: "Time, refined.",
    copy: "Swiss movements, sapphire crystal and finishing made to be worn for decades.",
    cta: "Shop the Collection",
    to: "/shop",
    search: {},
    // The watch sits on the right of this frame — anchor the crop there so it
    // survives the narrow mobile crop.
    focalX: 0.74,
    focalY: 0.5,
  },
  {
    image: CAMPAIGN.heroLight,
    eyebrow: "Signature Reference",
    title: "Meridian Chronograph",
    copy: "A 41mm steel chronograph built around clarity — three counters, one clean read.",
    cta: "Discover Meridian",
    to: "/product/$slug",
    params: { slug: "meridian-chronograph" },
    // Wrist shot sits high and to the right — anchor the crop on the watch.
    focalX: 0.7,
    focalY: 0.42,
  },
  {
    image: CAMPAIGN.lifestyle,
    eyebrow: "For Her",
    title: "Aurelia",
    copy: "Luminous mother-of-pearl on a fine gold milanese mesh.",
    cta: "Explore Aurelia",
    to: "/product/$slug",
    params: { slug: "aurelia" },
    // Keep the upper part of the frame in view so her head is never clipped.
    focalX: 0.52,
    focalY: 0.2,
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  const go = (next) => setIndex((next + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-label="Featured campaigns"
      className="relative isolate h-[74vh] min-h-[520px] w-full overflow-hidden bg-onyx lg:h-[calc(100vh-118px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, slideIndex) => (
        <div
          key={slide.title}
          aria-hidden={slideIndex !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1400 ease-silk",
            slideIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="hero-drift absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              loading={slideIndex === 0 ? "eager" : "lazy"}
              focalPointX={slide.focalX}
              focalPointY={slide.focalY}
              className="h-full w-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-onyx/78 via-onyx/45 to-onyx/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/55 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="shell w-full">
          <div
            key={index}
            className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-1000"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[hsl(var(--ivory))]/70">
              {SLIDES[index].eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[12vw] font-light leading-[0.95] text-white sm:mt-5 sm:text-6xl lg:text-[82px]">
              {SLIDES[index].title}
            </h1>
            <div className="mt-4 h-px w-12 bg-[hsl(var(--aurum))] sm:mt-6 sm:w-16" />
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/80 sm:mt-6 sm:text-[15px]">
              {SLIDES[index].copy}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-9">
              <Link
                to={SLIDES[index].to}
                params={SLIDES[index].params}
                search={SLIDES[index].search}
                className="btn-light"
              >
                {SLIDES[index].cta}
              </Link>
              <Link
                to="/collections"
                className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/75 transition-colors hover:text-white"
              >
                All Collections
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="shell flex items-end justify-between pb-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.1em] text-white/80">
              0{index + 1}
            </span>
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, slideIndex) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => go(slideIndex)}
                  aria-label={`Show slide ${slideIndex + 1}: ${slide.title}`}
                  aria-current={slideIndex === index}
                  className="group py-3"
                >
                  <span
                    className={cn(
                      "block h-px transition-all duration-500",
                      slideIndex === index
                        ? "w-12 bg-[hsl(var(--aurum))]"
                        : "w-6 bg-white/40 group-hover:bg-white/80",
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="font-mono text-[11px] tracking-[0.1em] text-white/45">
              0{SLIDES.length}
            </span>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-all duration-300 hover:bg-white hover:text-onyx"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-all duration-300 hover:bg-white hover:text-onyx"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
