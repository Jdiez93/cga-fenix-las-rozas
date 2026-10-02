import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Bell,
  Sparkles,
  MapPin,
  ArrowRight,
  Info,
  Trophy,
  Medal,
  Flag,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/conocenos/logros/calendario")({
  head: () => ({
    meta: [
      { title: "Calendario de competición · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Calendario de competición del CGA Fénix Las Rozas: fechas de Trofeos, Campeonatos Autonómicos y de España. Publicaremos aquí el calendario oficial en cuanto la federación lo confirme.",
      },
      { property: "og:title", content: "Calendario de competición · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "En desarrollo: la federación aún no ha publicado el calendario oficial. Lo publicaremos aquí en cuanto esté disponible.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarioPage,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const SEASON_STEPS = [
  {
    icon: Flag,
    title: "Trofeos 7 Estrellas",
    text: "Las primeras citas de la temporada, organizadas por la FMG. Sirven de debut para muchos gimnastas y de puesta a punto para los campeonatos.",
  },
  {
    icon: Trophy,
    title: "Campeonato de Madrid",
    text: "La competición autonómica donde nuestros equipos se juegan la clasificación para los Campeonatos de España.",
  },
  {
    icon: Medal,
    title: "Campeonato de España",
    text: "El objetivo de la temporada: las gimnastas y gimnastas clasificados representan al club a nivel nacional.",
  },
];

const MODALIDADES = [
  {
    label: "GAF",
    title: "Gimnasia Artística Femenina",
    text: "Barras, viga, suelo y salto. Casi todo nuestro palmarés reciente viene de aquí, desde Base 2 hasta niveles de edad y competición nacional.",
  },
  {
    label: "GAM",
    title: "Gimnasia Artística Masculina",
    text: "Caballo con arcos, anillas, paralelas, barra, salto y suelo. Nuestro grupo masculino compite en Trofeos y campeonatos autonómicos.",
  },
];

function CalendarioPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card">
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

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <CalendarDays className="h-3.5 w-3.5" />
              Temporada 2026 · 2027
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Calendario de{" "}
              <span className="relative inline-block text-primary">
                competición
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                  className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-primary/40"
                />
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Todas las fechas de los Trofeos, Campeonatos Autonómicos y Campeonatos de
              España donde competirán nuestros gimnastas, en un mismo sitio y siempre
              actualizado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Aviso: en desarrollo */}
      <section className="mx-auto max-w-4xl px-6 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-background p-10 text-center md:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10">
            <Clock className="h-8 w-8 animate-pulse text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Página en desarrollo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            La federación{" "}
            <span className="font-semibold text-foreground">
              todavía no ha publicado el calendario oficial
            </span>{" "}
            de esta temporada. En cuanto lo haga, actualizaremos esta página con todas
            las fechas, sedes y horarios de cada competición.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-8 h-1 w-16 rounded-full bg-primary"
          />
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-sm font-medium text-foreground">
            <Bell className="h-4 w-4 text-primary" />
            Consulta esta página para conocer las próximas competiciones
          </div>
        </motion.div>
      </section>

      {/* Cómo se estructura la temporada */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Así es la temporada
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Cómo se estructura el año competitivo
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 origin-center rounded-full bg-primary" />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Aunque la federación aún no ha confirmado las fechas, la temporada suele
            seguir siempre el mismo camino. Cuando se publique el calendario oficial,
            aquí verás cada cita dentro de este recorrido.
          </p>
        </motion.div>

        <div className="relative mt-14">
          {/* línea conectora */}
          <div
            aria-hidden
            className="absolute left-[27px] top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-border to-transparent sm:block md:left-1/2"
          />
          <ol className="space-y-6">
            {SEASON_STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                className="relative"
              >
                <div
                  className={`flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/50 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)] md:flex-row md:items-center md:gap-8 ${
                    i % 2 === 1 ? "md:ml-[calc(50%+3rem)]" : "md:mr-[calc(50%+3rem)]"
                  }`}
                >
                  <div className="flex items-center gap-4 md:shrink-0">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10">
                      <step.icon className="h-7 w-7 text-primary" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
          <p className="mt-8 flex items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Estructura orientativa basada en temporadas anteriores; las fechas y sedes
            definitivas las fija siempre la federación.
          </p>
        </div>
      </section>

      {/* Modalidades GAF / GAM */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <Medal className="h-3.5 w-3.5" />
            Nuestras modalidades
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            GAF y GAM en cada competición
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 origin-center rounded-full bg-primary" />
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {MODALIDADES.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 blur-2xl transition-opacity opacity-0 group-hover:opacity-100"
              />
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-[0.15em] text-primary">
                {m.label}
              </span>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground">
                {m.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {m.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Qué encontraremos aquí */}
      <section className="border-t border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Lo que encontrarás
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Cuando se publique el calendario
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 origin-center rounded-full bg-primary" />
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              En cuanto la federación confirme las fechas, aquí encontrarás el detalle de
              cada cita del calendario.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarDays,
                title: "Fechas y jornadas",
                description:
                  "Cada competición con su fecha, jornada y convocatoria para saber exactamente cuándo y dónde participar.",
              },
              {
                icon: MapPin,
                title: "Sedes e instalaciones",
                description:
                  "Lugar de cada cita con la información práctica para acompañar a nuestros gimnastas.",
              },
              {
                icon: Info,
                title: "Actualizaciones",
                description:
                  "Cualquier cambio de horario o de sede se reflejará aquí, siempre con la información más reciente.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_20px_50px_-24px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
              >
                <div className="rounded-xl border border-border bg-background p-3 w-fit transition-colors group-hover:border-primary/40 group-hover:bg-primary/5">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="rounded-3xl border border-border bg-card p-10 text-center md:p-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Mientras tanto, nuestros logros hablan por sí solos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Descubre el palmarés del club temporada tras temporada, revive las mejores
            imágenes en los medios o pregúntanos cualquier duda sobre la competición.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/conocenos/logros"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_color-mix(in_oklab,hsl(var(--primary))_60%,transparent)]"
            >
              Ver nuestros logros
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/medios"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            >
              Ver fotos y vídeos
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              Contacta con nosotros
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            También puedes preguntar a <span className="font-semibold text-primary">Fénix</span>,
            nuestro asistente, desde el botón de la esquina inferior derecha.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
