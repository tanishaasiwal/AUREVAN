const MESSAGES = [
  "Complimentary insured delivery across India",
  "3-year movement warranty on every watch",
  "14-day returns, no questions asked",
];

export default function AnnouncementBar() {
  const line = MESSAGES.join("   ·   ");
  return (
    <div className="relative overflow-hidden border-b border-onyx/10 bg-onyx py-2 text-[hsl(var(--ivory))]">
      <div className="flex w-max marquee-track whitespace-nowrap">
        <span className="px-6 text-[10px] font-light uppercase tracking-[0.3em] text-[hsl(var(--ivory))]/85">
          {line} ·
        </span>
        <span
          aria-hidden="true"
          className="px-6 text-[10px] font-light uppercase tracking-[0.3em] text-[hsl(var(--ivory))]/85"
        >
          {line} ·
        </span>
      </div>
    </div>
  );
}
