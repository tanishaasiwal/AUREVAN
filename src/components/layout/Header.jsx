import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-content";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";
import MegaPanel from "./MegaPanel";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const { count, wishlist, openCart } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.href]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "border-border bg-background/92 backdrop-blur-xl"
            : "border-transparent bg-background",
        )}
      >
        <div className="shell grid h-[62px] grid-cols-[1fr_auto_1fr] items-center lg:h-[78px]">
          <div className="flex min-w-0 items-center">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="-ml-2 flex h-10 w-10 items-center justify-center text-onyx lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>

            <nav
              aria-label="Main"
              className="hidden items-center gap-3 lg:flex xl:gap-7"
            >
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.to}
                  search={link.search}
                  onMouseEnter={() => setOpenMenu(link.panel ? index : null)}
                  onFocus={() => setOpenMenu(link.panel ? index : null)}
                  className={cn(
                    "relative whitespace-nowrap py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 xl:text-[11px] xl:tracking-[0.22em]",
                    link.label === "Sale"
                      ? "text-[hsl(var(--aurum))]"
                      : "text-onyx/80 hover:text-onyx",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500",
                      openMenu === index && "scale-x-100",
                    )}
                  />
                </Link>
              ))}
            </nav>
          </div>

          <Link
            to="/"
            aria-label="AURAVEN home"
            className="select-none whitespace-nowrap font-display text-[17px] leading-none tracking-[0.34em] text-onyx sm:text-[19px] sm:tracking-[0.44em] lg:text-[22px] lg:tracking-[0.52em]"
          >
            AURAVEN
          </Link>

          <div className="-mr-1.5 flex items-center justify-end gap-0 sm:mr-0 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center text-onyx transition-colors hover:text-[hsl(var(--aurum))]"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
            </button>

            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative hidden h-10 w-10 items-center justify-center text-onyx transition-colors hover:text-[hsl(var(--aurum))] sm:flex"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {wishlist.length > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[hsl(var(--aurum))] px-1 font-mono text-[9px] text-onyx">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Shopping bag, ${count} items`}
              className="relative flex h-10 w-10 items-center justify-center text-onyx transition-colors hover:text-[hsl(var(--aurum))]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
              {count > 0 && (
                <span className="absolute right-0 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-onyx px-1 font-mono text-[9px] text-[hsl(var(--ivory))]">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {openMenu !== null && NAV_LINKS[openMenu]?.panel && (
          <div className="absolute inset-x-0 top-full hidden border-b border-border bg-background shadow-[0_40px_70px_-50px_rgba(26,26,26,0.5)] lg:block animate-in fade-in slide-in-from-top-1 duration-300">
            <MegaPanel
              panel={NAV_LINKS[openMenu].panel}
              onNavigate={() => setOpenMenu(null)}
            />
          </div>
        )}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
