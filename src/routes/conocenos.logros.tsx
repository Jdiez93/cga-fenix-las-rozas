import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  Users,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/conocenos/logros")({
  head: () => ({
    meta: [
      { title: "Nuestros logros · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Palmarés del CGA Fénix Las Rozas: temporada 2025-2026, 2024-2025 y anteriores. Campeonatos de España, autonómicos y Trofeos 7 Estrellas en GAF y GAM.",
      },
      { property: "og:title", content: "Nuestros logros · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Éxitos deportivos de nuestros gimnastas temporada tras temporada: 2025-2026, 2024-2025 y palmarés histórico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LogrosPage,
});

/* ---------------------------------- Tipos --------------------------------- */

type Result = { name: string; category?: string; detail: string };
type Event = {
  title: string;
  location?: string;
  discipline?: string;
  results: Result[];
};

type Squad = {
  level: string;
  headline: string;
  gymnasts: string[];
  competitions: string[];
  highlights?: string[];
  note?: string;
};

/* ------------------------------ 2025 · 2026 ------------------------------- */

const GAF_2025_26: Squad[] = [
  {
    level: "Base 2",
    headline: "Estreno en competición",
    gymnasts: [
      "Clara Gómez Caldeiro",
      "María Gómez Caldeiro",
      "Federica Raris Kuhl",
      "India López Rodríguez",
      "Henar Vázquez Barón",
      "Irene González Martín",
      "Valeria Dévora Jiménez",
      "Amina Berrezgaoui Samit",
      "Marlene Lafuente González",
    ],
    competitions: [
      "II Trofeo 7 Estrellas B2 (FMG) — primera competición del grupo",
      "Campeonato de Madrid — todas ellas salvo las hermanas Gómez",
      "Campeonato de España Base 2 (Pamplona)",
    ],
    highlights: [
      "Valeria Dévora Jiménez e Irene González Martín debutan en un Campeonato de España",
    ],
  },
  {
    level: "Base 3",
    headline: "Talento precoz",
    gymnasts: ["Coral San Juan San Andrés", "Lucía Rubio Díaz"],
    competitions: [
      "II Trofeo 7 Estrellas (FMG)",
      "Campeonato de Madrid",
      "Campeonato de España Base 3 (Pamplona)",
    ],
    highlights: ["Coral San Juan compitió con tan solo 7 años de edad"],
  },
  {
    level: "Base 4",
    headline: "Un bloque muy sólido",
    gymnasts: [
      "Valentina García Vila",
      "Alma Merino Calderín",
      "Inés Lara Salvador",
      "Ayleen Chankhmwong López",
      "Isabella Guinato Carrascosa",
    ],
    competitions: ["II Trofeo 7 Estrellas (FMG)", "Campeonato de Madrid"],
    highlights: ["Valentina García Vila compitió en el Campeonato de España B4 (Pamplona)"],
  },
  {
    level: "Base 5",
    headline: "El grupo más numeroso",
    gymnasts: [
      "Naikare Namajeu Fernández",
      "Lara Hernández Franco",
      "Olivia Aragón Sancho",
      "Irene Van Boven",
      "Leire Demnati Gilarranz",
      "Julieta Gilsanz",
      "Carla González Rodríguez",
      "Ariagny Colmenares Rico",
      "Sara del Peso",
      "Inés Porcar Bonilla",
      "Vega Martín Abdo",
    ],
    competitions: [
      "I Trofeo 7 Estrellas B5 (FMG) — Naikare Namajeu y Lara Hernández",
      "II Trofeo 7 Estrellas B5 (FMG)",
      "Campeonato Autonómico",
      "Campeonato de España B5 (Pamplona)",
    ],
    note: "Todas participaron en el Campeonato de España salvo Julieta Gilsanz, Inés Porcar y Sara del Peso.",
  },
  {
    level: "Base 6",
    headline: "Temporada completa",
    gymnasts: ["Blanca Ramírez Lizarre"],
    competitions: [
      "I y II Trofeo 7 Estrellas (FMG)",
      "Campeonato Autonómico",
      "Campeonato de España B6 (Pamplona)",
    ],
  },
  {
    level: "Base 7",
    headline: "Máximo nivel base",
    gymnasts: ["Keira Angulo Domínguez", "Laura Calleja Carrizo"],
    competitions: [
      "I y II Trofeo 7 Estrellas (FMG)",
      "Campeonato Autonómico",
      "Campeonato de España (Pamplona)",
    ],
  },
  {
    level: "Amistoso Lucena",
    headline: "Preparación para el Nacional",
    gymnasts: [
      "Valentina García",
      "Lara Hernández",
      "Olivia Aragón",
      "Carla González",
      "Irene Van Boven",
      "Vega Martín",
      "Naikare Namajeu",
      "Ariagny Colmenares",
      "Laura Calleja",
      "Keira Angulo",
    ],
    competitions: ["Campeonato amistoso de Lucena, previo al Campeonato de España"],
    highlights: [
      "Ariagny Colmenares — 🥇 1ª en salto (B5)",
      "Keira Angulo — 🥇 1ª en suelo y 🥉 3ª en salto (B7)",
      "Naikare Namajeu — 🥈 2ª en salto",
    ],
  },
];

const GAM_2025_26: Squad[] = [
  {
    level: "Promogym 3",
    headline: "Debutantes con medalla",
    gymnasts: ["Ilian Demnati", "Diego Lázaro", "Joaquín del Peso"],
    competitions: ["I Trofeo 7 Estrellas (FMG)", "II Trofeo 7 Estrellas (FMG)"],
    highlights: [
      "Ilian Demnati — 🥉 3º potro con arcos y 🥉 3º barra (I Trofeo)",
      "Ilian Demnati — 🥈 2º anillas (II Trofeo)",
      "Diego Lázaro — 🥉 3º anillas y 🥉 3º paralelas (II Trofeo)",
    ],
  },
  {
    level: "Promogym 4",
    headline: "Constancia en el podio",
    gymnasts: ["Santiago Zapata", "Álvaro Alonso-Misol"],
    competitions: ["I Trofeo 7 Estrellas (FMG)", "II Trofeo 7 Estrellas (FMG)"],
    highlights: [
      "Álvaro Alonso-Misol — 🥈 2º salto y 🥉 3º barra (I Trofeo)",
      "Álvaro Alonso-Misol — 🥉 3º barra (II Trofeo)",
    ],
  },
  {
    level: "Junior",
    headline: "Arturo Pascual, becado por la RFEG",
    gymnasts: ["Arturo Pascual"],
    competitions: [
      "I y II Trofeo 7 Estrellas (FMG)",
      "Campeonato Autonómico",
      "Campeonato de España (Guadalajara)",
    ],
    highlights: [
      "I Trofeo — 🥉 3º potro con arcos · 🥈 2º paralelas",
      "II Trofeo — 🥇 1º paralelas · 🥉 3º general · 🥉 3º potro con arcos · 🥉 3º barra",
      "Autonómico — 🥈 2º general · 🥈 2º salto · 🥉 3º suelo · 🥉 3º potro con arcos · 🥉 3º barra",
    ],
    note: "Gimnasta becado por la RFEG para formar parte de la selección española junior.",
  },
  {
    level: "Senior",
    headline: "Juan Toharia y Carlos García",
    gymnasts: ["Juan Toharia", "Carlos García"],
    competitions: [
      "I y II Trofeo 7 Estrellas (FMG)",
      "Campeonato Autonómico",
      "Campeonato de España (Guadalajara)",
    ],
    highlights: [
      "Juan Toharia — 🥇 1º salto · 4º general (I Trofeo)",
      "Juan Toharia — 🥇 1º anillas · 🥈 2º suelo · 🥈 2º salto · 🥈 2º general (II Trofeo)",
      "Juan Toharia — 🥉 3º salto · 4º general (Autonómico)",
      "Carlos García — 5º general (Autonómico)",
    ],
  },
];

/* ------------------------------ 2024 · 2025 ------------------------------- */

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

/* -------------------------------- Página ---------------------------------- */

function LogrosPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="min-h-screen bg-background">
      {/* Barra de progreso de scroll */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
      />

      <Hero />

      <ImagePlaceholder aspect="aspect-[21/9]" label="Foto del equipo / celebración destacada" />

      {/* TEMPORADA 2025-2026 */}
      <section id="temporada-2025-2026" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <SectionHeader
          eyebrow="Temporada 2025 · 2026"
          title="La temporada más numerosa de nuestra historia"
          description="Decenas de gimnastas debutando en competición, presencia en los dos Trofeos 7 Estrellas de la FMG, en los autonómicos y en los Campeonatos de España de Pamplona y Guadalajara."
        />

        <DisciplineBlock
          label="GAF"
          title="Gimnasia Artística Femenina"
          squads={GAF_2025_26}
        />
        <DisciplineBlock
          label="GAM"
          title="Gimnasia Artística Masculina"
          squads={GAM_2025_26}
        />
      </section>

      {/* Galería intermedia */}
      <div className="mx-auto max-w-7xl px-6 pb-4">
        <div className="grid gap-4 md:grid-cols-3">
          <ImagePlaceholder aspect="aspect-[4/5]" label="Gimnasta en competición" inline />
          <ImagePlaceholder aspect="aspect-[4/5]" label="Podio / medalla" inline />
          <ImagePlaceholder aspect="aspect-[4/5]" label="Momento del equipo" inline />
        </div>
      </div>

      {/* TEMPORADA 2024-2025 */}
      <section
        id="temporada-2024-2025"
        className="relative border-y border-border bg-card"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ background: "var(--gradient-fire, transparent)" }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <SectionHeader
            eyebrow="Temporada 2024 · 2025"
            title="Un curso de podios y récords"
            description="Del Turnfest de Leipzig a los Campeonatos de España: medallas y momentos que ya forman parte de la historia del club."
          />

          <EventDisciplineBlock
            label="GAF"
            title="Gimnasia Artística Femenina"
            events={SEASON_2024_25.filter((e) => e.discipline === "GAF")}
          />
          <EventDisciplineBlock
            label="GAM"
            title="Gimnasia Artística Masculina"
            events={SEASON_2024_25.filter((e) => e.discipline === "GAM")}
          />

        </div>
      </section>

      {/* TEMPORADAS ANTERIORES */}
      <section id="historico" className="mx-auto max-w-7xl px-6 py-20 md:py-24">
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
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <ImagePlaceholder
          aspect="aspect-[16/6]"
          label="Foto motivacional del club / entrenamiento"
        />
      </div>

      {/* CITA FINAL */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <motion.blockquote
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-10 text-center md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
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

/* --------------------------------- Hero ----------------------------------- */

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-border bg-card"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ background: "var(--gradient-fire, transparent)" }}
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-7xl px-6 py-20 md:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-primary/40"
              />
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Hoy celebramos los impresionantes logros de nuestros gimnastas. Representan el
            verdadero espíritu de la gimnasia: entrenan con pasión y dedicación, movidos por el
            amor al deporte y por haber encontrado un club donde solo hacen falta ganas y
            determinación para practicar gimnasia artística.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            A pesar de contar con limitadas horas de entrenamiento, han demostrado que el
            esfuerzo y la constancia rinden frutos, logrando grandes hitos{" "}
            <span className="font-semibold text-foreground">temporada tras temporada</span>.
          </p>

          {/* Navegación por temporadas */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { href: "#temporada-2025-2026", label: "2025 · 2026" },
              { href: "#temporada-2024-2025", label: "2024 · 2025" },
              { href: "#historico", label: "Histórico" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
              >
                {s.label}
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Medal, value: 60, suffix: "+", label: "Medallas" },
            { icon: Trophy, value: 15, suffix: "+", label: "Campeonatos" },
            { icon: Users, value: 45, suffix: "+", label: "Gimnastas en competición" },
            { icon: Flame, value: 0, suffix: "∞", label: "Pasión" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_40px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
            >
              <s.icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
              <div className="mt-3 text-3xl font-bold text-foreground">
                {s.value > 0 ? <Counter to={s.value} suffix={s.suffix} /> : s.suffix}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 40;
    const id = setInterval(() => {
      frame += 1;
      const t = frame / total;
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (frame >= total) clearInterval(id);
    }, 20);
    return () => clearInterval(id);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------- Secciones -------------------------------- */

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl"
    >
      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-4 h-1 w-16 origin-left rounded-full bg-primary"
      />
      <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

function DisciplineBlock({
  label,
  title,
  squads,
}: {
  label: string;
  title: string;
  squads: Squad[];
}) {
  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <span className="rounded-xl bg-primary px-3 py-1.5 text-sm font-black tracking-widest text-primary-foreground">
          {label}
        </span>
        <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
          {title}
        </h3>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {squads.map((squad, i) => (
          <SquadCard key={squad.level} squad={squad} index={i} />
        ))}
      </div>
    </div>
  );
}

function SquadCard({ squad, index }: { squad: Squad; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_24px_60px_-28px_color-mix(in_oklab,hsl(var(--primary))_50%,transparent)] md:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {squad.level}
          </span>
          <h4 className="mt-3 text-lg font-bold leading-tight tracking-tight text-foreground md:text-xl">
            {squad.headline}
          </h4>
        </div>
        <div className="rounded-xl border border-border bg-background p-2.5 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
          <Star className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Gimnastas */}
      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Gimnastas
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {squad.gymnasts.map((g) => (
            <span
              key={g}
              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Competiciones */}
      <div className="mt-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Competiciones
        </p>
        <ul className="mt-2.5 space-y-2">
          {squad.competitions.map((c) => (
            <li key={c} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resultados destacados */}
      {squad.highlights && squad.highlights.length > 0 && (
        <div className="mt-5 rounded-xl border border-primary/25 bg-primary/[0.07] p-4">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Medal className="h-3.5 w-3.5" />
            Resultados destacados
          </p>
          <ul className="mt-2.5 space-y-1.5">
            {squad.highlights.map((h) => (
              <li key={h} className="text-sm font-medium leading-relaxed text-foreground">
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      {squad.note && (
        <p className="mt-auto pt-5 text-xs italic leading-relaxed text-muted-foreground">
          {squad.note}
        </p>
      )}
    </motion.article>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)] md:p-7"
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
        <div className="rounded-xl border border-border bg-card p-2.5 transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
          <Trophy className="h-5 w-5 text-primary" />
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {event.results.map((r, i) => (
          <li
            key={i}
            className="rounded-xl border border-border/60 bg-card/60 p-3.5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-foreground">{r.name}</p>
              {r.category && (
                <span className="shrink-0 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className="group grid overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-primary/50 hover:shadow-[0_20px_50px_-25px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)] md:grid-cols-[280px_1fr]"
    >
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
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
      </motion.div>
    </div>
  );
}
