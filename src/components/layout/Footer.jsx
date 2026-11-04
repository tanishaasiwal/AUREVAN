import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/site-content";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              to="/"
              className="font-display text-2xl tracking-[0.46em] text-onyx"
            >
              AURAVEN
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-onyx/65">
              A Mumbai watch house making considered objects — Swiss movements,
              sapphire crystal, and finishing usually reserved for watches
              several times the cost.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-border text-onyx transition-colors duration-300 hover:border-onyx hover:bg-onyx hover:text-[hsl(var(--ivory))]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      search={link.search}
                      className="text-[14px] text-onyx/70 transition-colors hover:text-onyx"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <p className="eyebrow">Studio</p>
            <p className="mt-4 text-[14px] leading-relaxed text-onyx/70">
              Kala Ghoda
              <br />
              Fort, Mumbai
              <br />
              400001
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-7 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} AURAVEN Horology Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            Prices in INR · Demonstration storefront
          </p>
        </div>
      </div>
    </footer>
  );
}
