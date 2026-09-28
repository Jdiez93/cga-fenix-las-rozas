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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Qué encontraremos aquí */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Lo que encontrarás
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Un calendario completo de la temporada
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
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border bg-card p-10 text-center md:p-12"
        >
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Mientras tanto, nuestros logros hablan por sí solos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Descubre el palmarés del club temporada tras temporada o ponte en contacto
            con nosotros para resolver cualquier duda sobre la competición.
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
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
            >
              Contacta con nosotros
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
