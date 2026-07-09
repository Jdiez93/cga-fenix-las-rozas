import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Users, Medal } from "lucide-react";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico")({
  head: () => ({
    meta: [
      { title: "Equipo técnico · CGA Fénix Las Rozas" },
      { name: "description", content: "Conoce al equipo técnico del club CGA Fénix Las Rozas: entrenadores con amplia trayectoria en gimnasia artística." },
      { property: "og:title", content: "Equipo técnico · CGA Fénix Las Rozas" },
      { property: "og:description", content: "Nuestros entrenadores: pasión, experiencia y compromiso con la gimnasia." },
    ],
  }),
  component: EquipoTecnicoPage,
});

export type Coach = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  highlight?: boolean;
};

export const COACHES: Coach[] = [
  {
    slug: "luis-s-rodriguez",
    name: "D. Luis S. Rodríguez",
    role: "Director Técnico",
    bio: "Es uno de los expertos con más experiencia en la gimnasia artística masculina, con un currículum muy destacado, tanto como miembro del equipo nacional de gimnasia, como entrenador.",
    initials: "LR",
    highlight: true,
  },
  {
    slug: "miguel-alvarez",
    name: "Miguel Álvarez",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años. Juez de Gimnasia Artística Masculina nivel I.",
    initials: "MA",
  },
  {
    slug: "juan-toharia",
    name: "Juan Toharia",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años.",
    initials: "JT",
  },
  {
    slug: "lucia-navarro",
    name: "Lucía Navarro",
    role: "Entrenadora",
    bio: "Es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia artística femenina sirve de referencia para nuestros atletas.",
    initials: "LN",
  },
  {
    slug: "elena-faura",
    name: "Elena Faura",
    role: "Entrenadora",
    bio: "Es una entrenadora con gran pasión por la gimnasia, con una sólida trayectoria en el deporte.",
    initials: "EF",
  },
  {
    slug: "manuel-inigo",
    name: "Manuel Íñigo",
    role: "Entrenador",
    bio: "Es un entrenador con mucho que enseñar y con un corazón incomparable.",
    initials: "MI",
  },
  {
    slug: "david-alonso",
    name: "David Alonso",
    role: "Entrenador",
    bio: "Es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia artística lo convierte en un referente dentro del club.",
    initials: "DA",
  },
  {
    slug: "aruca-rodriguez",
    name: "Aruca Rodríguez",
    role: "Entrenadora",
    bio: "",
    initials: "AR",
  },
  {
    slug: "mar-cuesta",
    name: "Mar Cuesta",
    role: "Entrenadora",
    bio: "",
    initials: "MC",
  },
];

function EquipoTecnicoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 opacity-[0.05]" style={{ background: "var(--gradient-fire, transparent)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Users className="h-4 w-4" />
              <span>Quiénes somos</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Equipo técnico
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Un cuerpo técnico con trayectoria, disciplina y pasión. Detrás de cada gimnasta del Fénix hay un
              entrenador comprometido con su crecimiento personal y deportivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de entrenadores */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COACHES.map((coach, i) => (
            <CoachCard key={coach.slug} coach={coach} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const isDirector = coach.highlight;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to="/quienes-somos/equipo-tecnico/$slug"
        params={{ slug: coach.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
      >
        {/* Avatar / imagen */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted via-background to-muted">
          {/* Decorative animated ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-56 w-56 rounded-full border border-primary/20 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute h-40 w-40 rounded-full border border-primary/30 transition-transform duration-700 group-hover:scale-125" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-foreground text-3xl font-bold tracking-wider text-primary shadow-lg transition-transform duration-500 group-hover:scale-110">
              {coach.initials}
            </div>
          </div>

          {isDirector && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              <Medal className="h-3 w-3" />
              Director
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {coach.role}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
            {coach.name}
          </h3>
          <div className="mt-3 h-px w-10 bg-primary/60 transition-all duration-300 group-hover:w-20" />

          {coach.bio && (
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
              {coach.bio}
            </p>
          )}

          <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            <span>Ver perfil</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
