import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Medal, Trophy, Sparkles, Quote } from "lucide-react";
import { COACHES, CoachPortrait, type Coach } from "./quienes-somos.equipo-tecnico";

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

/** Renders a paragraph with **bold** markdown-style emphasis. */
function RichParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </p>
  );
}

function CoachDetailPage() {
  const { coach } = Route.useLoaderData() as { coach: Coach };
  const isDirector = coach.highlight;
  const hasAchievements = coach.achievements && coach.achievements.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Back bar */}
      <section className="border-b border-border bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            to="/quienes-somos/equipo-tecnico"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al equipo técnico
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        {/* subtle background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(60% 50% at 20% 30%, hsl(var(--primary)) 0%, transparent 60%), radial-gradient(50% 40% at 90% 80%, hsl(var(--primary)) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 md:grid-cols-[minmax(280px,380px)_1fr] md:gap-14"
          >
            {/* Portrait */}
            <div className="md:sticky md:top-24 md:self-start">
              <div className="group relative">
                {/* glow behind card */}
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)]">
                  <CoachPortrait coach={coach} />
                  {isDirector && (
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg">
                      <Medal className="h-3 w-3" />
                      Director Deportivo
                    </div>
                  )}
                </div>
              </div>

              {/* Quick facts */}
              {hasAchievements && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Trophy className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Logros</span>
                    </div>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {coach.achievements!.length}
                    </p>
                    <p className="text-xs text-muted-foreground">competiciones destacadas</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <div className="flex items-center gap-2 text-primary">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Rol</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-tight text-foreground">
                      {coach.role}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Header text */}
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
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                {coach.name}
              </h1>
              <div className="mt-5 h-1 w-20 rounded-full bg-primary" />
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {coach.bio}
              </p>

              {/* Biography */}
              <div className="mt-10 space-y-5">
                {coach.longBio.map((paragraph, idx) => (
                  <RichParagraph key={idx} text={paragraph} />
                ))}
              </div>

              {/* Extra sections */}
              {coach.extraSections?.map((section, idx) => (
                <div key={idx} className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
                  <h2 className="text-xl font-bold text-foreground md:text-2xl">{section.title}</h2>
                  <div className="mt-4 h-0.5 w-12 rounded-full bg-primary" />
                  <div className="mt-5 space-y-4">
                    {section.body.map((p, i) => (
                      <RichParagraph key={i} text={p} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Achievements */}
              {hasAchievements && (
                <div className="mt-12">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground md:text-2xl">
                      {coach.achievementsTitle ?? "Logros destacados"}
                    </h2>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {coach.achievements!.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.25) }}
                        className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)]"
                      >
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          {i + 1}
                        </div>
                        <p className="text-sm leading-snug text-foreground">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Closing note */}
              {coach.closingNote && (
                <div className="relative mt-12 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card p-6 md:p-8">
                  <Quote className="absolute right-4 top-4 h-16 w-16 text-primary/10" />
                  <p className="relative text-lg font-medium italic leading-relaxed text-foreground md:text-xl">
                    {coach.closingNote}
                  </p>
                </div>
              )}

              {/* Bottom nav */}
              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
                <Link
                  to="/quienes-somos/equipo-tecnico"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ver todo el equipo técnico
                </Link>
                <Link
                  to="/preinscripcion"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Únete al club
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
