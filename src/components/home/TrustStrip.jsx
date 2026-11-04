import { TRUST_POINTS } from "@/lib/site-content";

export default function TrustStrip() {
  return (
    <section className="border-b border-border bg-background">
      <div className="shell grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {TRUST_POINTS.map((point) => (
          <div
            key={point.title}
            className="px-3 py-6 text-center lg:px-6 lg:py-7"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-onyx">
              {point.title}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {point.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
