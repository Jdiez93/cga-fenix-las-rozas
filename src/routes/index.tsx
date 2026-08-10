import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal, ParallaxLayer } from "@/hooks/use-scroll-reveal";
import { Sparkles, ArrowRight } from "lucide-react";
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
      <ParallaxLayer ratio={0.4} className="pointer-events-none absolute inset-0">
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
      </ParallaxLayer>

      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-24 lg:py-28">
        <Reveal variant="heading" duration={800}>
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
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- SPONSORS CAROUSEL — infinite premium marquee ---------------- */
function SponsorsMarquee() {
  const [paused, setPaused] = useState(false);

  // Duplicate the list so the marquee loops seamlessly
  const track = [...SPONSORS, ...SPONSORS];

  return (
    <section className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background via-muted/30 to-background py-20 sm:py-24">
      {/* subtle ambient accents */}
      <ParallaxLayer ratio={0.3} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <Reveal variant="heading" duration={800}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Con el apoyo de
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight text-foreground">
            Nuestros <span className="text-primary">patrocinadores</span>
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary" />
          <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-muted-foreground">
            Marcas que confían en el proyecto Fénix y hacen posible que cada gimnasta
            llegue más lejos.
          </p>
        </Reveal>
      </div>

      {/* Marquee viewport */}
      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent" />

        <div
          className="flex w-max gap-6 sm:gap-8 animate-marquee"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {track.map((s, i) => {
            const key = `${s.name}-${i}`;
            return (
              <a
                key={key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name} — ${s.tag}`}
                className="relative flex h-44 w-64 sm:h-48 sm:w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card will-change-transform"
              >
                {/* logo area */}
                <div
                  className={`relative flex flex-1 items-center justify-center px-6 py-6 ${
                    s.dark ? "bg-carbon" : "bg-background"
                  }`}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    loading="lazy"
                    className="max-h-20 max-w-[80%] object-contain"
                  />
                </div>

                {/* footer strip */}
                <div className="relative flex items-center border-t border-border bg-card px-4 py-3">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                      {s.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.tag}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
