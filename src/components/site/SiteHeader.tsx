import { useEffect, useState } from "react";
// Using plain anchors for routes not yet created
import { Menu, X, Phone, Mail, ChevronDown, Facebook, Instagram, Twitter, ShieldCheck } from "lucide-react";
import logoAsset from "@/assets/logo-fenix.jpeg.asset.json";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Conócenos",
    children: [
      { label: "Nuestra historia", to: "/conocenos/historia" },
      { label: "Nuestros logros", to: "/conocenos/logros" },
    ],
  },
  {
    label: "Quiénes somos",
    children: [{ label: "Equipo técnico", to: "/quienes-somos/equipo-tecnico" }],
  },
  { label: "Los equipos", to: "/equipos" },
  {
    label: "Galería",
    children: [
      { label: "Fotos", to: "/galeria/fotos" },
      { label: "Vídeos", to: "/galeria/videos" },
    ],
  },
  { label: "En los medios", to: "/medios" },
  { label: "Contacta", to: "/contacto" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Thin top bar */}
      <div
        className={cn(
          "hidden md:block bg-carbon text-carbon-foreground/80 text-xs transition-all duration-300",
          scrolled ? "max-h-0 opacity-0 overflow-hidden" : "max-h-12 opacity-100"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="tel:+34679980626"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>679 98 06 26</span>
            </a>
            <a
              href="mailto:info@cgafenixlasrozas.es"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>info@cgafenixlasrozas.es</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/cgafenix_lasrozas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/cgafenixlasrozas/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://x.com/fenixlasrozas" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-lg shadow-[var(--shadow-header)] border-b border-border"
            : "bg-background border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div
            className={cn(
              "grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-all duration-300",
              scrolled ? "h-[72px]" : "h-[88px]"
            )}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group mr-2 lg:mr-4 xl:mr-6">
              <img
                src={logoAsset.url}
                alt="CGA Fénix Las Rozas"
                className={cn(
                  "shrink-0 transition-all duration-300 object-contain rounded-full shadow-logo-glow",
                  scrolled ? "h-11 w-11" : "h-14 w-14"
                )}
              />
              <span className="hidden sm:inline font-black text-[11px] lg:text-xs tracking-tight uppercase whitespace-nowrap">
                CGA Fénix Las Rozas
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 lg:pl-6 xl:pl-10 2xl:pl-16">
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  {item.to ? (
                    <a
                      href={item.to}
                      className="whitespace-nowrap px-2.5 xl:px-3 py-2 text-[11.5px] xl:text-[12.5px] font-bold uppercase tracking-[0.06em] text-foreground/85 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      className="inline-flex items-center gap-1 whitespace-nowrap px-2.5 xl:px-3 py-2 text-[11.5px] xl:text-[12.5px] font-bold uppercase tracking-[0.06em] text-foreground/85 hover:text-primary transition-colors"
                      aria-expanded={openMenu === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          openMenu === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}

                  {item.children && (
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[220px] transition-all duration-200",
                        openMenu === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      )}
                    >
                      <div className="rounded-xl border border-border bg-popover shadow-[var(--shadow-header)] overflow-hidden">
                        <div className="h-1 bg-gradient-fire" />
                        <div className="py-2">
                          {item.children.map((c) => (
                            <a
                              key={c.to}
                              href={c.to}
                              className="block px-4 py-2.5 text-sm text-popover-foreground/85 hover:bg-accent hover:text-primary transition-colors"
                            >
                              {c.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-2 sm:gap-3 justify-end">
              <a
                href="/preinscripcion"
                className="hidden sm:inline-flex items-center rounded-full px-4 xl:px-5 py-2.5 text-[11.5px] xl:text-[12px] font-black uppercase tracking-[0.08em] bg-primary text-primary-foreground shadow-[var(--shadow-elegant)] hover:scale-[1.03] active:scale-[0.98] transition-transform whitespace-nowrap"
              >
                Preinscripción
              </a>
              <a
                href="/admin/login"
                title="Acceso administración"
                className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 xl:px-4 py-2.5 text-[11.5px] xl:text-[12px] font-black uppercase tracking-[0.08em] text-foreground/80 hover:border-primary hover:text-primary hover:shadow-[var(--shadow-elegant)] transition-all whitespace-nowrap"
              >
                <ShieldCheck className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                <span className="hidden xl:inline">Admin</span>
              </a>

              <button
                type="button"
                aria-label="Abrir menú"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent transition-colors"
              >
                <div className="relative h-6 w-6">
                  <Menu
                    className={cn(
                      "absolute inset-0 h-6 w-6 transition-all duration-300",
                      mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 h-6 w-6 transition-all duration-300",
                      mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={cn(
            "lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40 bg-background transition-all duration-300 origin-top",
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className="h-full overflow-y-auto px-6 py-6">
            <nav className="flex flex-col divide-y divide-border">
              {NAV.map((item, i) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  index={i}
                  open={mobileOpen}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </nav>

            <a
              href="/preinscripcion"
              onClick={() => setMobileOpen(false)}
              className="mt-8 flex items-center justify-center rounded-full py-3.5 text-sm font-black uppercase tracking-[0.1em] bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
            >
              Preinscripción
            </a>

            <a
              href="/admin/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-border bg-card py-3.5 text-sm font-black uppercase tracking-[0.1em] text-foreground/80"
            >
              <ShieldCheck className="h-4 w-4 text-primary" /> Admin
            </a>


            <div className="mt-8 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
              <a href="tel:+34679980626" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> 679 98 06 26
              </a>
              <a href="mailto:info@cgafenixlasrozas.es" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> info@cgafenixlasrozas.es
              </a>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.instagram.com/cgafenix_lasrozas/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/cgafenixlasrozas/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://x.com/fenixlasrozas" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function MobileNavItem({
  item,
  index,
  open,
  onNavigate,
}: {
  item: NavItem;
  index: number;
  open: boolean;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={cn(
        "py-1 transition-all duration-500",
        open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      )}
      style={{ transitionDelay: open ? `${index * 40}ms` : "0ms" }}
    >
      {item.children ? (
        <>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-between py-3 text-base font-bold uppercase tracking-wide"
          >
            {item.label}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="pb-3 pl-3 flex flex-col gap-1 border-l-2 border-primary/40">
                {item.children.map((c) => (
                  <a
                    key={c.to}
                    href={c.to}
                    onClick={onNavigate}
                    className="py-2 pl-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <a
          href={item.to!}
          onClick={onNavigate}
          className="block py-3 text-base font-bold uppercase tracking-wide hover:text-primary transition-colors"
        >
          {item.label}
        </a>
      )}
    </div>
  );
}
