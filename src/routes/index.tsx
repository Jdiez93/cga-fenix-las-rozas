import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import logoAsset from "@/assets/logo-fenix.jpeg.asset.json";
import mainLogo from "@/assets/sponsors/main.png.asset.json";
import geniosLogo from "@/assets/sponsors/genios.png.asset.json";
import agefiLogo from "@/assets/sponsors/agefi.png.asset.json";
import etelLogo from "@/assets/sponsors/etel.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CGA Fénix Las Rozas · Club de Gimnasia Artística" },
      {
        name: "description",
        content:
          "Club de Gimnasia Artística Fénix Las Rozas. Formamos gimnastas desde la excelencia técnica y el desarrollo personal.",
      },
    ],
  }),
  component: Index,
});

const SPONSORS = [
  { name: "Main MKT&PUB", tag: "Marketing & Publicidad", logo: mainLogo.url, url: "#" },
  { name: "Genios Team", tag: "Team", logo: geniosLogo.url, url: "#", dark: true },
  { name: "AGEFI", tag: "Abogados · Economistas", logo: agefiLogo.url, url: "#", dark: true },
  { name: "Etel Comunicación", tag: "Arte en impresión", logo: etelLogo.url, url: "#" },
];

function Index() {
  return (
    <>
      <Mission />
      <SponsorsMarquee />
    </>
  );
}

/* ---------------- MISSION (elevated hero) ---------------- */
function Mission() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:py-40">
        <RevealOnScroll>
          {/* Logo emblem */}
          <div className="mx-auto mb-10 flex items-center justify-center">
            <div className="relative animate-float-slow">
              <div className="absolute inset-0 -m-6 rounded-full bg-primary/25 blur-2xl" />
              <div className="relative rounded-full bg-carbon p-3 ring-1 ring-primary/40">
                <img
                  src={logoAsset.url}
                  alt="CGA Fénix Las Rozas"
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 -m-3 rounded-full border border-dashed border-primary/40" />
            </div>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3 w-3" />
            Nuestra esencia
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight text-foreground leading-[0.95]">
            Club Fénix
            <br />
            <span className="text-primary">Las Rozas</span>
          </h1>

          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-border" />
            <span className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Gimnasia Artística
            </span>
            <span className="h-px w-10 bg-border" />
          </div>

          <p className="mx-auto mt-12 max-w-xl text-xl sm:text-2xl font-bold text-foreground leading-snug">
            Nuestra pasión es la <span className="text-primary">gimnasia</span>.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Queremos formar a los gimnastas de hoy y del mañana, no solo desde la{" "}
            <span className="text-foreground font-semibold">excelencia técnica</span> sino
            también desde el{" "}
            <span className="text-foreground font-semibold">
              desarrollo personal y social
            </span>{" "}
            que este deporte nos ofrece.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/preinscripcion"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-elegant transition-all hover:scale-[1.03]"
            >
              Preinscripción
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/conocenos/historia"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Conócenos
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ---------------- SPONSORS MARQUEE (con logos reales) ---------------- */
function SponsorsMarquee() {
  const loop = [...SPONSORS, ...SPONSORS, ...SPONSORS];
  return (
    <section className="relative border-t border-border bg-muted/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <RevealOnScroll>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Con el apoyo de
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
            Nuestros patrocinadores
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary" />
          <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground">
            Marcas que confían en el proyecto Fénix y hacen posible que cada gimnasta llegue
            más lejos.
          </p>
        </RevealOnScroll>
      </div>

      <div
        className="group relative mt-14 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <a
              key={`${s.name}-${i}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card relative flex h-36 w-64 shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card px-6 py-4 transition-all duration-500 hover:-translate-y-2 hover:border-primary hover:shadow-elegant"
            >
              {/* Corner glow */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover/card:bg-primary/40" />

              <div
                className={`flex h-16 w-full items-center justify-center rounded-lg ${
                  s.dark ? "bg-carbon px-3" : ""
                }`}
              >
                <img
                  src={s.logo}
                  alt={s.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-80 transition-all duration-500 group-hover/card:grayscale-0 group-hover/card:opacity-100"
                  loading="lazy"
                />
              </div>

              <span className="relative mt-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover/card:text-foreground">
                {s.tag}
              </span>

              {/* Bottom line reveal */}
              <span className="absolute inset-x-6 bottom-3 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover/card:scale-x-100" />
            </a>
          ))}
        </div>
      </div>

      {/* Small legend / marquee hint */}
      <p className="mt-8 text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        Pasa el ratón para pausar
      </p>
    </section>
  );
}

/* ---------------- Reveal on scroll helper ---------------- */
function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
