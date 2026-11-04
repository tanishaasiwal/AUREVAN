import { Link } from "@tanstack/react-router";
import { Image } from "@/components/ui/image";
import { getProduct } from "@/lib/products";

const NOIR = getProduct("noir-elite");
const ONYX = getProduct("onyx-reserve");

const SPECS = [
  { label: "Case", value: "Black PVD · 40mm" },
  { label: "Dial", value: "Black lacquer" },
  { label: "Hands", value: "Champagne gold" },
];

const SERIF = "font-[Georgia,_'Times_New_Roman',_serif]";

export default function PromoBanner() {
  return (
    <section className="relative isolate mx-auto flex w-full flex-col gap-[15px] overflow-hidden border border-[#c6a66a] bg-[radial-gradient(ellipse_at_50%_18%,#222019_0%,#10100e_62%)] px-[18px] pb-5 pt-[22px] text-[#f5efe3] shadow-[0_14px_36px_rgba(16,16,14,0.16)] [font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] lg:gap-7 lg:px-[52px] lg:pb-9 lg:pt-11">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10px] border border-[#c6a66a]/23"
      />
      <div
        aria-hidden="true"
        className="h-px flex-none animate-[goldpulse_2.8s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,#c6a66a_20%,#f5efe3_50%,#c6a66a_80%,transparent)]"
      />

      <header className="flex flex-col gap-[7px] lg:items-center lg:gap-[10px] lg:text-center">
        <p className="m-0 text-[10px] uppercase leading-[1.3] tracking-[0.2em] text-[#c6a66a] [font-weight:600]">
          AV-03 · Noir Élite
        </p>
        <h2 className="m-0 text-[30px] leading-[1.02] text-[#f5efe3] [font-family:inherit] [font-weight:500] [letter-spacing:-0.045em] lg:text-[46px]">
          Black, with a gold pulse.
        </h2>
      </header>

      <div className="grid grid-cols-2 items-stretch gap-[10px] lg:gap-6">
        <Image
          src={NOIR.images[0]}
          alt="AURAVEN Noir Élite — black PVD watch with champagne-gold indices"
          fittingType="fill"
          className="block h-[190px] w-full animate-[promo-arrive_0.8s_cubic-bezier(0.22,1,0.36,1)_both] border border-[#c6a66a]/55 object-cover shadow-[0_12px_24px_rgba(0,0,0,0.3)] lg:h-[360px] xl:h-[400px]"
        />
        <Image
          src={ONYX.images[0]}
          alt="AURAVEN Onyx Reserve"
          fittingType="fill"
          className="block h-[190px] w-full animate-[promo-arrive_0.8s_cubic-bezier(0.22,1,0.36,1)_both] border border-[#c6a66a]/55 object-cover shadow-[0_12px_24px_rgba(0,0,0,0.3)] [animation-delay:0.12s] lg:h-[360px] xl:h-[400px]"
        />
      </div>

      <p className="m-0 text-[12px] leading-[1.55] tracking-[0.005em] text-[#e4dccd] lg:max-w-[620px] lg:self-center lg:text-center lg:text-[14px] lg:leading-[1.7]">
        Matte black PVD case, black lacquer dial, champagne-gold indices. Noir
        Élite and Onyx Reserve — the dark side of the collection.
      </p>

      <div className="flex flex-col gap-[15px] lg:flex-row lg:items-center lg:justify-center lg:gap-8">
        <Link
          to="/product/$slug"
          params={{ slug: "noir-elite" }}
          className="box-border flex min-h-[43px] items-center justify-center border border-[#c6a66a] bg-[#c6a66a] text-[10px] uppercase tracking-[0.22em] text-[#10100e] transition-[background-color,color,box-shadow,transform] duration-200 [font-weight:700] hover:border-[#f5efe3] hover:bg-[#f5efe3] hover:text-[#10100e] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f5efe3] lg:min-h-[46px] lg:w-[248px]"
        >
          Shop Now
        </Link>

        <Link
          to="/product/$slug"
          params={{ slug: "onyx-reserve" }}
          className="self-start border-b border-[#c6a66a]/65 pb-1 text-[10px] uppercase tracking-[0.16em] text-[#e5d4ae] transition-[color,border-color] duration-200 [font-weight:650] hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f5efe3] lg:self-auto lg:pb-[6px]"
        >
          Onyx Reserve
        </Link>
      </div>

      <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-[#c6a66a]/55 pt-[13px] lg:gap-8 lg:pt-[18px]">
        {SPECS.map((spec, index) => (
          <div
            key={spec.label}
            className={`flex min-w-0 flex-col gap-1.5 lg:gap-[7px] ${
              index > 0 ? "border-l border-[#c6a66a]/30 pl-[9px] lg:pl-8" : ""
            }`}
          >
            <dt className="m-0 text-[8px] uppercase leading-[1.2] tracking-[0.18em] text-[#c6a66a] [font-weight:650] lg:text-[9px]">
              {spec.label}
            </dt>
            <dd
              className={`m-0 ${SERIF} leading-[1.3] text-[#f5efe3] ${
                index === SPECS.length - 1 ? "text-[11px]" : "text-[12px]"
              } lg:text-[14px]`}
            >
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
