// Using plain anchors for routes not yet created
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
} from "lucide-react";
import logoAsset from "@/assets/logo-fenix.jpeg.asset.json";

const QUICK_LINKS = [
  { label: "Nuestra historia", to: "/conocenos/historia" },
  { label: "Nuestros logros", to: "/conocenos/logros" },
  { label: "Equipo técnico", to: "/quienes-somos/equipo-tecnico" },
  { label: "Los equipos", to: "/equipos" },
  { label: "Galería", to: "/galeria/fotos" },
  { label: "En los medios", to: "/medios" },
  { label: "Preinscripción", to: "/preinscripcion" },
  { label: "Contacta", to: "/contacto" },
];


export function SiteFooter() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-carbon text-carbon-foreground overflow-hidden">
      {/* subtle top accent */}
      <div className="h-[3px] w-full bg-gradient-fire" />
      {/* decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Col 1 — Brand */}
          <div>
            <a href="/" className="inline-flex items-center gap-3 group">
              <div className="rounded-full bg-white p-1 shrink-0">
                <img
                  src={logoAsset.url}
                  alt="CGA Fénix Las Rozas"
                  className="h-14 w-14 rounded-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="font-black uppercase tracking-tight text-lg">CGA Fénix</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-carbon-foreground/60">
                  Las Rozas
                </div>
              </div>
            </a>
            <p className="mt-6 text-sm leading-relaxed text-carbon-foreground/70 max-w-sm">
              Club deportivo de gimnasia artística en Las Rozas de Madrid. Formamos gimnastas
              con pasión, disciplina y espíritu de superación desde la base hasta la
              competición.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/cgafenix_lasrozas/" },
                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/cgafenixlasrozas/" },
                { Icon: Twitter, label: "Twitter", href: "https://x.com/fenixlasrozas" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-carbon-foreground/80 hover:bg-primary hover:text-primary-foreground hover:border-transparent hover:scale-105 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <FooterHeading>Enlaces rápidos</FooterHeading>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <a
                    href={l.to}
                    className="group inline-flex items-center gap-2 text-sm text-carbon-foreground/70 hover:text-primary transition-colors"
                  >
                    <span className="h-px w-3 bg-primary/60 group-hover:w-5 transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <FooterHeading>Contacto</FooterHeading>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-carbon-foreground/75 leading-relaxed">
                  Polideportivo Entremontes
                  <br />
                  Calle Aristóteles 3
                  <br />
                  28232 Las Rozas de Madrid
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-carbon-foreground/75 leading-relaxed">
                  Sábados 16:30 – 20:30
                  <br />
                  Domingos 10:00 – 14:00
                </span>
              </li>
              <li>
                <a
                  href="tel:+34679980626"
                  className="flex items-center gap-3 text-carbon-foreground/75 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  679 98 06 26
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cgafenixlasrozas.es"
                  className="flex items-center gap-3 text-carbon-foreground/75 hover:text-primary transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  info@cgafenixlasrozas.es
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-carbon-foreground/60">
          <p>
            © {year} <span className="font-semibold text-carbon-foreground/80">CGA Fénix Las Rozas</span>. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <a href="/aviso-legal" className="hover:text-primary transition-colors">
              Aviso Legal
            </a>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-gradient-fire hover:text-primary-foreground hover:border-transparent transition-all"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Volver arriba
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="relative text-sm font-black uppercase tracking-[0.15em] pb-3">
      {children}
      <span className="absolute bottom-0 left-0 h-[2px] w-8 bg-gradient-fire" />
    </h3>
  );
}
