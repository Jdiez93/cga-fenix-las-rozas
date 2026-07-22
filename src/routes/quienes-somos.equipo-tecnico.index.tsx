import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { COACHES, CoachCard } from "./quienes-somos.equipo-tecnico";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico/")({
  head: () => ({
    meta: [
      { title: "Equipo técnico · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Conoce al equipo técnico del club CGA Fénix Las Rozas: entrenadores con amplia trayectoria en gimnasia artística.",
      },
      { property: "og:title", content: "Equipo técnico · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content: "Nuestros entrenadores: pasión, experiencia y compromiso con la gimnasia.",
      },
    ],
  }),
  component: EquipoTecnicoIndexPage,
});

function EquipoTecnicoIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ background: "var(--gradient-fire, transparent)" }}
        />
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
              Un cuerpo técnico con trayectoria, disciplina y pasión. Detrás de cada gimnasta del Fénix
              hay un entrenador comprometido con su crecimiento personal y deportivo.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {COACHES.map((coach, i) => (
            <CoachCard key={coach.slug} coach={coach} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
