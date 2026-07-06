import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Trophy, Users, Heart, ChevronDown } from "lucide-react";
import logoAsset from "@/assets/logo-fenix.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CGA Fénix Las Rozas · Club de Gimnasia Artística" },
      {
        name: "description",
        content:
          "Club de Gimnasia Artística Fénix Las Rozas. Formamos gimnastas desde la excelencia técnica y el desarrollo personal. Descubre nuestra pasión.",
      },
    ],
  }),
  component: Index,
});

const SPONSORS = [
  { name: "Main MKT&PUB", tag: "Marketing & Publicidad" },
  { name: "Genios Team", tag: "Team" },
  { name: "AGEFI", tag: "Abogados · Economistas" },
  { name: "Etel Comunicación", tag: "Arte en impresión" },
  { name: "Ayto. Las Rozas", tag: "Colaborador" },
  { name: "Fed. Madrileña", tag: "Gimnasia" },
];

function Index() {
  return (
    <>
      <Hero />
      <Mission />
      <Highlights />
      <SponsorsMarquee />
    </>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-carbon text-carbon-foreground">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--carbon-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--carbon-foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-32">
        {/* Text */}
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Club de Gimnasia Artística
          </span>

          <h1 className="mt-6 font-black uppercase leading-[0.9] tracking-tight text-4xl sm:text-6xl xl:text-7xl">
            CLUB <span className="text-primary">FÉNIX</span>
            <br />
            LAS ROZAS
          </h1>

          {/* Animated underline */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-[3px] w-16 origin-left animate-shimmer-line bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">
              Desde la base hasta la élite
            </span>
          </div>

          <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-white/70">
            <span className="text-white font-semibold">Nuestra pasión es la gimnasia.</span>{" "}
            Formamos gimnastas de hoy y del mañana desde la excelencia técnica y el
            desarrollo personal y social que este deporte nos ofrece.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/preinscripcion"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-elegant transition-all hover:scale-[1.03] hover:shadow-2xl"
            >
              Preinscripción
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/conocenos/historia"
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur transition-colors hover:border-primary/60 hover:bg-primary/10 hover:text-primary"
            >
              Conócenos
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-lg">
            {[
              { k: "+15", v: "Años de club" },
              { k: "+120", v: "Gimnastas" },
              { k: "+30", v: "Podios" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl sm:text-3xl font-black text-primary">{s.k}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-widest text-white/50">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Logo showcase */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative animate-float-slow">
            <div className="absolute inset-0 -m-8 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative rounded-full bg-gradient-to-br from-white/10 to-white/0 p-2 backdrop-blur ring-1 ring-white/15">
              <div className="rounded-full bg-carbon-2 p-4 ring-1 ring-primary/30">
                <img
                  src={logoAsset.url}
                  alt="CGA Fénix Las Rozas"
                  className="h-56 w-56 sm:h-72 sm:w-72 rounded-full object-cover"
                />
              </div>
            </div>
            {/* Orbit ring */}
            <div className="pointer-events-none absolute inset-0 -m-6 rounded-full border border-dashed border-primary/40" />
            <div className="pointer-events-none absolute inset-0 -m-14 rounded-full border border-dashed border-white/10" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.3em]">Descubre</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- MISSION (replicates original section) ---------------- */
function Mission() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
      <RevealOnScroll>
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Nuestra esencia
        </span>
        <h2 className="mt-4 text-3xl sm:text-5xl font-black uppercase tracking-tight text-foreground">
          Club Fénix <span className="text-primary">Las Rozas</span>
        </h2>
        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary" />

        <p className="mx-auto mt-10 max-w-xl text-lg font-semibold text-foreground">
          Nuestra pasión es la gimnasia.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
          Queremos formar a los gimnastas de hoy y del mañana, no solo desde la excelencia
          técnica sino también desde el <span className="text-foreground font-semibold">desarrollo personal y social</span>{" "}
          que este deporte nos ofrece.
        </p>
      </RevealOnScroll>
    </section>
  );
}

/* ---------------- HIGHLIGHTS ---------------- */
function Highlights() {
  const items = [
    {
      icon: Trophy,
      title: "Excelencia técnica",
      desc: "Entrenamiento riguroso desde la base para llevar a cada gimnasta a su máximo nivel.",
    },
    {
      icon: Users,
      title: "Equipo humano",
      desc: "Un equipo técnico titulado que acompaña, motiva y educa dentro y fuera del tapiz.",
    },
    {
      icon: Heart,
      title: "Valores Fénix",
      desc: "Disciplina, respeto y superación. Formamos personas, no solo deportistas.",
    },
  ];
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 sm:grid-cols-3">
        {items.map((it, i) => (
          <RevealOnScroll key={it.title} delay={i * 120}>
            <article className="group relative h-full rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wide text-foreground">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
              <div className="absolute inset-x-8 bottom-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SPONSORS MARQUEE ---------------- */
function SponsorsMarquee() {
  const loop = [...SPONSORS, ...SPONSORS];
  return (
    <section className="bg-background py-20">
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
            <div
              key={`${s.name}-${i}`}
              className="flex h-28 w-64 shrink-0 flex-col items-center justify-center rounded-2xl border border-border bg-card px-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
            >
              <span className="text-lg font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-primary">
                {s.name}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
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
