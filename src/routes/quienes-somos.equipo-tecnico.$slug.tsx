import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Medal } from "lucide-react";
import { COACHES, CoachPortrait } from "./quienes-somos.equipo-tecnico";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico/$slug")({
  loader: ({ params }) => {
    const coach = COACHES.find((c) => c.slug === params.slug);
    if (!coach) throw notFound();
    return { coach };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "No encontrado · CGA Fénix Las Rozas" }, { name: "robots", content: "noindex" }] };
    }
    const { coach } = loaderData;
    return {
      meta: [
        { title: `${coach.name} · Equipo técnico · CGA Fénix Las Rozas` },
        { name: "description", content: coach.bio || `${coach.role} del club CGA Fénix Las Rozas.` },
        { property: "og:title", content: `${coach.name} · CGA Fénix Las Rozas` },
        { property: "og:description", content: coach.bio || `${coach.role} del club CGA Fénix Las Rozas.` },
      ],
    };
  },
  component: CoachDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-foreground">Entrenador no encontrado</h1>
      <Link to="/quienes-somos/equipo-tecnico" className="mt-6 inline-block text-primary underline">
        Volver al equipo técnico
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-foreground">Ha ocurrido un error</h1>
    </div>
  ),
});

function CoachDetailPage() {
  const { coach } = Route.useLoaderData();
  const isDirector = coach.highlight;

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            to="/quienes-somos/equipo-tecnico"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al equipo técnico
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-[minmax(280px,380px)_1fr] md:gap-14"
        >
          {/* Foto */}
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <CoachPortrait coach={coach} />
              {isDirector && (
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                  <Medal className="h-3 w-3" />
                  Director
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {coach.role}
              </span>
              {isDirector && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  <Medal className="h-3 w-3" />
                  Director
                </span>
              )}
            </div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {coach.name}
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />

            <div className="mt-8 space-y-5">
              {coach.longBio.map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
