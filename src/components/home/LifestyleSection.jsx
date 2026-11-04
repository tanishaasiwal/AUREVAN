import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { CAMPAIGN } from "@/lib/products";
import Reveal from "@/components/Reveal";

export default function LifestyleSection() {
  return (
    <section className="relative isolate h-[78vh] min-h-[560px] max-h-[760px] w-full overflow-hidden bg-onyx lg:h-[84vh]">
      <Image
        src={CAMPAIGN.lifestyle}
        alt="An AURAVEN watch worn in the city"
        loading="lazy"
        focalPointX={0.62}
        focalPointY={0.4}
        className="absolute inset-0 h-full w-full"
      />

      {/* keeps the copy legible over the marble table and bright blazer */}
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/95 via-onyx/55 to-onyx/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-onyx/85 via-onyx/25 to-transparent" />

      <div className="relative z-10 flex h-full items-end">
        <div className="shell w-full pb-12 lg:pb-16">
          <Reveal className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-aurum" />
              <p className="text-[11px] font-medium uppercase tracking-[0.38em] text-aurum">
                Worn Daily
              </p>
            </div>
            <h2 className="mt-4 font-display text-[40px] font-light leading-[1.03] text-white sm:text-[52px] lg:text-[64px]">
              Designed to be lived in.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 lg:text-base">
              Sapphire crystal because desks are harder than you think.
              100-metre cases because life is not always indoors.
            </p>
            <Link
              to="/shop"
              search={{ gender: "women" }}
              className="btn-light mt-7"
            >
              Shop Women
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
