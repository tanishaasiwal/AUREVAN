import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/site-content";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

export default function ReviewsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % REVIEWS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  const review = REVIEWS[index];

  return (
    <section className="shell py-20 lg:py-28">
      <div
        className="mx-auto max-w-3xl text-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Reveal>
          <p className="eyebrow">Client Reviews</p>
          <div className="mt-5 flex items-center justify-center gap-1.5">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="h-3.5 w-3.5 fill-[hsl(var(--aurum))] text-[hsl(var(--aurum))]"
              />
            ))}
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              4.9 / 5
            </span>
          </div>
        </Reveal>

        <div className="relative mt-10 min-h-[240px] sm:min-h-[210px]">
          <Quote
            className="mx-auto h-6 w-6 text-[hsl(var(--aurum))]/50"
            strokeWidth={1.2}
          />
          <blockquote
            key={review.name}
            className="mt-6 animate-in fade-in duration-700 font-display text-2xl font-light leading-snug text-onyx sm:text-[30px]"
          >
            “{review.quote}”
          </blockquote>
          <cite className="mt-7 block not-italic">
            <span className="text-[12px] font-medium uppercase tracking-[0.24em] text-onyx">
              {review.name}
            </span>
            <span className="mt-1 block text-[12px] text-muted-foreground">
              {review.city} · {review.watch}
            </span>
          </cite>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show review from ${item.name}`}
              aria-current={dotIndex === index}
              className="group py-3"
            >
              <span
                className={cn(
                  "block h-px transition-all duration-500",
                  dotIndex === index
                    ? "w-10 bg-[hsl(var(--aurum))]"
                    : "w-5 bg-onyx/20 group-hover:bg-onyx/50",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
