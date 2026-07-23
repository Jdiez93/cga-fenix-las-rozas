import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Star,
  Flame,
  Sparkles,
  Award,
  Calendar,
  MapPin,
  Quote,
  ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/conocenos/logros")({
  head: () => ({
    meta: [
      { title: "Nuestros logros · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Éxitos deportivos de los gimnastas del CGA Fénix Las Rozas: campeonatos, trofeos y medallas temporada tras temporada.",
      },
      { property: "og:title", content: "Nuestros logros · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Palmarés y logros deportivos de nuestros gimnastas: temporada 2024-2025 y anteriores.",
      },
    ],
  }),
  component: LogrosPage,
});

type Result = { name: string; category?: string; detail: string };
type Event = {
  title: string;
  location?: string;
  discipline?: string;
  results: Result[];
};

const SEASON_2024_25: Event[] = [
  {
    title: "I Trofeo 7 Estrellas FMG",
    discipline: "GAM",
    results: [
      {
        name: "Arturo Pascual",
        category: "VO6",
        detail: "1º suelo · 1º potro con arcos · 3º anillas · 2º paralelas",
      },
      {
        name: "Juan Toharia",
        category: "VO8",
        detail: "1º clasificación general · 1º potro con arcos · 1º salto",
      },
      {
        name: "Carlos García",
        category: "VO8",
        detail: "2º general · 1º suelo · 3º potro con arcos · 3º salto",
      },
    ],
  },
  {
    title: "II Trofeo 7 Estrellas",
    discipline: "GAM",
    results: [
      {
        name: "Álvaro Alonso-Misol",
        category: "Promogym 4",
        detail: "1º anillas · 2º salto",
      },
      { name: "Juan Toharia", category: "VO8", detail: "1º salto" },
    ],
  },
  {
    title: "Campeonato Autonómico VO — Campeonato de Madrid Base",
    discipline: "GAM",
    results: [
      {
        name: "Arturo Pascual",
        category: "VO9",
        detail: "2º anillas · 2º paralelas · 4º clasificación general",
      },
    ],
  },
  {
    title: "Turnfest 2025",
    location: "Leipzig, Alemania",
    discipline: "Campeonato del Mundo oficioso de Veteranos",
    results: [
      {
        name: "Luis Rodríguez",
        category: "+70 años",
        detail:
          "🥇 Campeón general · 1º suelo · 1º salto · 1º paralelas · 1º barra fija",
      },
      {
        name: "Miguel Ángel Muñoz",
        category: "50-54 años",
        detail: "🥇 Campeón general · 1º paralelas · 2º suelo",
      },
      {
        name: "Ignacio López",
        category: "50-54 años",
        detail: "6º general · 2º salto",
      },
    ],
  },
  {
    title: "Campeonato de España Individual, Clubes y Autonomías",
    discipline: "GAM",
    results: [{ name: "Juan Toharia", category: "VO8", detail: "2º suelo" }],
  },
  {
    title: "I Trofeo 7 Estrellas",
    discipline: "GAF",
    results: [
      {
        name: "Olivia Aragón",
        category: "VO1",
        detail: "3º general · 2º suelo · 3º barra",
      },
      { name: "Laura Calleja", category: "B7", detail: "2º salto" },
    ],
  },
  {
    title: "Campeonato Autonómico VO — Campeonato de Madrid Base",
    discipline: "GAF",
    results: [{ name: "Olivia Aragón", category: "VO1", detail: "2º salto" }],
  },
];

type Athlete = {
  name: string;
  category: string;
  blocks: { heading?: string; items: string[] }[];
  note?: string;
};

const HISTORICAL: Athlete[] = [
  {
    name: "Juan Toharia",
    category: "VO8",
    blocks: [
      {
        heading: "Campeonato de España",
        items: [
          "🥉 Bronce en la general (2023)",
          "5º puesto en la general (2024)",
          "🥇 Oro en suelo (2023)",
          "4º puesto en suelo (2024)",
          "🥈 Plata en salto (2023)",
          "4º puesto en salto (2024)",
        ],
      },
    ],
  },
  {
    name: "Arturo Pascual",
    category: "VO4 y VO5",
    blocks: [
      {
        heading: "Campeón de España en anillas y paralelas (2023)",
        items: [
          "🥇 Oro en anillas (2023)",
          "🥇 Oro en paralelas (2023)",
          "6º puesto en la general (2024)",
          "4º puesto en paralelas (2024)",
        ],
      },
      {
        heading: "Trofeos adicionales",
        items: [
          "Trofeo de Invierno FMG (2023): 2 bronces y 1 plata",
          "Torneo Club Flip-Flap (2024): plata general, plata en paralelas, anillas y suelo; bronce en salto",
        ],
      },
    ],
    note: "Actualmente entrenando en el CAR (Centro de Alto Rendimiento) formando parte del equipo nacional junior.",
  },
  {
    name: "Carlos García",
    category: "VO5",
    blocks: [
      {
        heading: "Campeonato de España",
        items: ["7º puesto en la general"],
      },
      {
        heading: "Trofeos adicionales",
        items: [
          "I Trofeo 7 Estrellas Base 6 — campeón general · 5 oros",
          "II Trofeo 7 Estrellas Base 6 — campeón general · 4 oros y 1 plata",
          "Trofeo Club Flip-Flap — oro general · 2 oros, 1 plata y 1 bronce",
        ],
      },
    ],
  },
  {
    name: "Marco López-Ferro",
    category: "",
    blocks: [
      {
        items: [
          "🥉 Bronce en el Trofeo de Invierno FMG (2023)",
          "Trofeo Club Flip-Flap (2024): bronce en paralelas",
        ],
      },
    ],
  },
  {
    name: "Diana Hidalgo",
    category: "Pionera",
    blocks: [
      {
        items: [
          "Primera mujer en la historia de la gimnasia española en participar en un campeonato de gimnasia masculina — “Trofeo Club Flip-Flap” (2022), rompiendo barreras.",
        ],
      },
    ],
  },
  {
    name: "Martina Aguirre",
    category: "",
    blocks: [
      {
        items: [
          "II Trofeo 7 Estrellas Promogym 3 — 6ª clasificada entre 17 gimnastas masculinos.",
        ],
      },
    ],
  },
];

function LogrosPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ background: "var(--gradient-fire, transparent)" }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Trophy className="h-3.5 w-3.5" />
              Palmarés
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Éxitos deportivos de{" "}
              <span className="relative inline-block text-primary">
                nuestros gimnastas
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-primary/40" />
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Hoy celebramos los impresionantes logros de nuestros gimnastas. Representan el
              verdadero espíritu de la gimnasia: entrenan con pasión y dedicación, movidos por
              el amor al deporte y por haber encontrado un club donde solo hacen falta ganas y
              determinación para practicar gimnasia artística.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              A pesar de contar con limitadas horas de entrenamiento, han demostrado que el
              esfuerzo y la constancia rinden frutos, logrando grandes hitos{" "}
              <span className="font-semibold text-foreground">temporada tras temporada</span>.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { icon: Medal, value: "30+", label: "Medallas" },
              { icon: Trophy, value: "10+", label: "Campeonatos" },
              { icon: Star, value: "15+", label: "Podios" },
              { icon: Flame, value: "∞", label: "Pasión" },
            ].map((s, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
              >
                <s.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                <div className="mt-3 text-3xl font-bold text-foreground">{s.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Placeholder de imagen destacada */}
      <ImagePlaceholder
        aspect="aspect-[21/9]"
        label="Foto del equipo / celebración destacada"
      />

      {/* TEMPORADA 2024-2025 */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeader
          eyebrow="Temporada 2024 · 2025"
          title="Los últimos éxitos del Fénix"
          description="Un curso cargado de podios, medallas y momentos que ya forman parte de la historia del club."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SEASON_2024_25.map((event, i) => (
            <EventCard key={i} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Placeholder galería mid */}
      <div className="mx-auto max-w-7xl px-6 pb-4">
        <div className="grid gap-4 md:grid-cols-3">
          <ImagePlaceholder aspect="aspect-[4/5]" label="Gimnasta en competición" inline />
          <ImagePlaceholder aspect="aspect-[4/5]" label="Podio / medalla" inline />
          <ImagePlaceholder aspect="aspect-[4/5]" label="Momento del equipo" inline />
        </div>
      </div>

      {/* TEMPORADAS ANTERIORES */}
      <section className="relative border-y border-border bg-card">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ background: "var(--gradient-fire, transparent)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionHeader
            eyebrow="Temporadas anteriores"
            title="El legado de nuestros gimnastas"
            description="Cada palmarés cuenta una historia de esfuerzo, constancia y superación."
          />

          <div className="mt-14 space-y-6">
            {HISTORICAL.map((athlete, i) => (
              <AthleteCard key={i} athlete={athlete} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder previo a la cita */}
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <ImagePlaceholder
          aspect="aspect-[16/6]"
          label="Foto motivacional del club / entrenamiento"
        />
      </div>

      {/* CITA FINAL */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-10 text-center md:p-14"
        >
          <Quote className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-6 text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            “Nuestra recompensa se encuentra en el esfuerzo y la ilusión, no en un resultado.
            Un esfuerzo total es una victoria completa.”
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            CGA Fénix Las Rozas
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            Sigamos luchando y disfrutando de cada entrenamiento, porque cada pequeño logro
            cuenta en nuestro camino hacia la excelencia.
          </p>
        </motion.blockquote>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl"
    >
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
      <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)] md:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {event.discipline && (
              <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                {event.discipline}
              </span>
            )}
            {event.location && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {event.location}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
            {event.title}
          </h3>
        </div>
        <div className="rounded-xl border border-border bg-background p-2.5 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {event.results.map((r, i) => (
          <li
            key={i}
            className="rounded-xl border border-border/60 bg-background/60 p-3.5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-foreground">{r.name}</p>
              {r.category && (
                <span className="shrink-0 rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {r.category}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function AthleteCard({ athlete, index }: { athlete: Athlete; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
      className="group grid overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/50 hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)] md:grid-cols-[280px_1fr]"
    >
      {/* Header lateral */}
      <div className="relative flex flex-col justify-between border-b border-border bg-card p-6 md:border-b-0 md:border-r">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            <Award className="h-3 w-3" />
            Palmarés
          </div>
          <h3 className="mt-4 text-xl font-bold leading-tight tracking-tight text-foreground md:text-2xl">
            {athlete.name}
          </h3>
          {athlete.category && (
            <p className="mt-1.5 text-sm font-semibold text-muted-foreground">
              {athlete.category}
            </p>
          )}
        </div>
        <div className="mt-6 h-1 w-12 rounded-full bg-primary transition-all group-hover:w-24" />
      </div>

      {/* Contenido */}
      <div className="p-6 md:p-7">
        <div className="space-y-6">
          {athlete.blocks.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  {block.heading}
                </h4>
              )}
              <ul className="space-y-2">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {athlete.note && (
            <p className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm font-medium leading-relaxed text-foreground">
              ⭐ {athlete.note}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ImagePlaceholder({
  aspect,
  label,
  inline = false,
}: {
  aspect: string;
  label: string;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "" : "mx-auto max-w-7xl px-6 py-10"}>
      <div
        className={`relative ${aspect} w-full overflow-hidden rounded-2xl border-2 border-dashed border-border bg-card`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ background: "var(--gradient-fire, transparent)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
          <div className="rounded-full border border-border bg-background p-3">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Espacio para foto
          </p>
          <p className="max-w-xs px-4 text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}
