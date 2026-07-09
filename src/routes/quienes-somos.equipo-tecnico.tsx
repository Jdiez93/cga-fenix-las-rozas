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
  longBio: string[];
  initials: string;
  photo?: string;
  highlight?: boolean;
};

export const COACHES: Coach[] = [
  {
    slug: "luis-s-rodriguez",
    name: "D. Luis S. Rodríguez",
    role: "Director Técnico",
    bio: "Uno de los expertos con más experiencia en la gimnasia artística masculina, con un currículum destacado como gimnasta internacional y entrenador.",
    longBio: [
      "Luis es una de las figuras más reconocidas de la gimnasia artística masculina en España. Miembro del equipo nacional durante años, ha vivido la alta competición desde dentro y hoy pone toda esa experiencia al servicio del CGA Fénix Las Rozas.",
      "Como Director Técnico, define la filosofía deportiva del club: disciplina, respeto y crecimiento personal por encima del resultado. Diseña las progresiones técnicas de cada equipo y acompaña personalmente a los gimnastas de competición.",
      "Su trayectoria combina la exigencia del alto rendimiento con una vocación educativa clara: formar personas antes que campeones. Es el referente del cuerpo técnico y el garante de que cada niño y niña encuentre su lugar en el club.",
    ],
    initials: "LR",
    highlight: true,
  },
  {
    slug: "miguel-alvarez",
    name: "Miguel Álvarez",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años y Juez de Gimnasia Artística Masculina nivel I.",
    longBio: [
      "Miguel se formó como gimnasta durante nueve temporadas, pasando por todas las categorías y aparatos de la gimnasia artística masculina. Esa etapa le dio una comprensión profunda de la técnica y del esfuerzo diario que requiere el deporte.",
      "Además de entrenador, es Juez de Gimnasia Artística Masculina de nivel I, lo que le permite trabajar en el gimnasio con una mirada muy afinada al detalle técnico y a la ejecución.",
      "En el Fénix se encarga especialmente de los grupos de iniciación y perfeccionamiento masculino, transmitiendo la pasión que él mismo vivió como gimnasta.",
    ],
    initials: "MA",
  },
  {
    slug: "juan-toharia",
    name: "Juan Toharia",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años, con una amplia experiencia en gimnasia artística masculina.",
    longBio: [
      "Juan practicó gimnasia artística masculina durante nueve años, recorriendo el camino de gimnasta a entrenador con la misma intensidad. Conoce de primera mano lo que se siente al entrenar duro y competir.",
      "Su estilo se basa en la cercanía y en la confianza: sabe cuándo empujar a un gimnasta y cuándo dar un paso atrás para dejarle crecer. Trabaja principalmente con los grupos de iniciación y perfeccionamiento.",
      "Su objetivo es que cada gimnasta se marche del gimnasio habiendo aprendido algo nuevo y con ganas de volver al día siguiente.",
    ],
    initials: "JT",
  },
  {
    slug: "lucia-navarro",
    name: "Lucía Navarro",
    role: "Entrenadora",
    bio: "Referente del cuerpo técnico, con una amplia trayectoria en gimnasia artística femenina.",
    longBio: [
      "Lucía es una de las entrenadoras de referencia del CGA Fénix Las Rozas. Su trayectoria en la gimnasia artística femenina la avala como una de las técnicas más completas del club.",
      "Trabaja tanto con los grupos base como con los equipos de competición, adaptando su método a la edad y al nivel de cada gimnasta. Cree firmemente en la técnica bien construida desde los cimientos.",
      "Es un ejemplo de disciplina, cercanía y compromiso para las gimnastas del club, y una figura clave en la formación de las futuras competidoras del Fénix.",
    ],
    initials: "LN",
  },
  {
    slug: "elena-faura",
    name: "Elena Faura",
    role: "Entrenadora",
    bio: "Entrenadora con gran pasión por la gimnasia y una sólida trayectoria en el deporte.",
    longBio: [
      "Elena vive la gimnasia con una pasión contagiosa. Su sólida trayectoria como deportista y como técnica le permite trabajar con gimnastas de niveles muy distintos, siempre con la misma energía.",
      "En el Fénix se encarga de que las sesiones sean exigentes pero divertidas, buscando que las gimnastas disfruten mientras aprenden. Da mucha importancia al calentamiento, la flexibilidad y la base física.",
      "Su cercanía con las familias y su compromiso con el club la convierten en una pieza fundamental del cuerpo técnico.",
    ],
    initials: "EF",
  },
  {
    slug: "manuel-inigo",
    name: "Manuel Íñigo",
    role: "Entrenador",
    bio: "Un entrenador con mucho que enseñar y con un corazón incomparable.",
    longBio: [
      "Manuel es de esos entrenadores que dejan huella. Une un enorme conocimiento técnico con una calidad humana difícil de igualar, y esa combinación se nota en cada sesión.",
      "Trabaja con los gimnastas desde el respeto y el ejemplo. Sabe leer el momento de cada niño o niña y adaptar el entrenamiento a lo que realmente necesitan, tanto a nivel deportivo como personal.",
      "En el Fénix es una figura muy querida por gimnastas y familias, y una referencia dentro del cuerpo técnico del club.",
    ],
    initials: "MI",
  },
  {
    slug: "david-alonso",
    name: "David Alonso",
    role: "Entrenador",
    bio: "Miembro valioso del cuerpo técnico, con una trayectoria que lo convierte en un referente dentro del club.",
    longBio: [
      "David aporta al Fénix una trayectoria consolidada en la gimnasia artística. Su experiencia como deportista y su recorrido como entrenador lo han convertido en uno de los referentes técnicos del club.",
      "Es especialmente meticuloso con la técnica y la seguridad. Diseña progresiones claras y adaptadas para que cada gimnasta avance con confianza en aparatos que requieren mucha precisión.",
      "Su presencia da estabilidad al cuerpo técnico y confianza a las familias que dejan a sus hijos e hijas en sus manos.",
    ],
    initials: "DA",
  },
  {
    slug: "aruca-rodriguez",
    name: "Aruca Rodríguez",
    role: "Entrenadora",
    bio: "Entrenadora del club, comprometida con la formación integral de las gimnastas.",
    longBio: [
      "Aruca forma parte del equipo técnico del CGA Fénix Las Rozas y trabaja día a día para que las gimnastas del club evolucionen tanto técnica como personalmente.",
      "Combina exigencia y cariño en la misma medida. En sus sesiones se busca el trabajo bien hecho, pero también la sonrisa, el compañerismo y el disfrute del deporte.",
      "Muy pronto ampliaremos su biografía con más detalles sobre su trayectoria y titulaciones.",
    ],
    initials: "AR",
  },
  {
    slug: "mar-cuesta",
    name: "Mar Cuesta",
    role: "Entrenadora",
    bio: "Entrenadora del club, cercana con las gimnastas y comprometida con su progresión.",
    longBio: [
      "Mar es una de las entrenadoras del Fénix. Aporta cercanía, dedicación y una gran capacidad para conectar con las gimnastas desde el primer día.",
      "Trabaja especialmente la técnica base y la actitud en el gimnasio: puntualidad, respeto y ganas de mejorar. Cree que el buen ambiente en el grupo es la mitad del progreso.",
      "Muy pronto ampliaremos su biografía con más detalles sobre su trayectoria y titulaciones.",
    ],
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

export function CoachPortrait({ coach, className = "" }: { coach: Coach; className?: string }) {
  if (coach.photo) {
    return (
      <img
        src={coach.photo}
        alt={coach.name}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  // Placeholder retrato: silueta estilizada + iniciales, listo para sustituir por foto real
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-muted via-background to-muted ${className}`}>
      {/* Initials badge */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-md">
        {coach.initials}
      </div>
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
        {/* Foto */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <CoachPortrait coach={coach} className="transition-transform duration-500 group-hover:scale-[1.04]" />

          {isDirector && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              <Medal className="h-3 w-3" />
              Director
            </div>
          )}

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
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
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
