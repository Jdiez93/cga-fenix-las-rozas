import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Users, CalendarDays, ChevronRight, Info, Sparkles } from "lucide-react";

export const Route = createFileRoute("/equipos")({
  head: () => ({
    meta: [
      { title: "Nuestros equipos · CGA Fénix Las Rozas" },
      { name: "description", content: "Descubre los equipos y horarios del club CGA Fénix Las Rozas: grupos por edad, no competición, competición y adultos." },
      { property: "og:title", content: "Nuestros equipos · CGA Fénix Las Rozas" },
      { property: "og:description", content: "Grupos, edades y horarios de entrenamiento del CGA Fénix Las Rozas." },
    ],
  }),
  component: EquiposPage,
});

type Team = {
  id: string;
  label: string;
  shortLabel: string;
  emoji: string;
  ageRange: string;
  category: string;
  hours: string;
  description: string;
  schedule: {
    day: string;
    slots: string[];
  }[];
  venue: string;
};

const TEAMS: Team[] = [
  {
    id: "iniciacion",
    label: "Iniciación",
    shortLabel: "Iniciación",
    emoji: "🌱",
    ageRange: "3 a 5 años",
    category: "Iniciación",
    hours: "2 horas semanales",
    description: "Primeros pasos en la gimnasia artística. Juegos, coordinación, ritmo y diversión para los más pequeños en dos turnos disponibles.",
    schedule: [
      { day: "Sábados", slots: ["16:30 h. – 18:30 h.", "17:30 h. – 18:30 h."] },
      { day: "Domingos", slots: ["10:00 h. – 11:00 h.", "11:00 h. – 12:00 h."] },
    ],
    venue: "Polideportivo Entremontes",
  },
  {
    id: "perfeccionamiento",
    label: "Perfeccionamiento",
    shortLabel: "Perfeccionamiento",
    emoji: "🌿",
    ageRange: "6 a 10 años",
    category: "Perfeccionamiento",
    hours: "4 horas semanales",
    description: "Formación técnica para gimnastas que buscan consolidar su base sin competir. Trabajo progresivo y adaptado en dos turnos.",
    schedule: [
      { day: "Sábados", slots: ["16:30 h. – 18:30 h.", "18:30 h. – 20:30 h."] },
      { day: "Domingos", slots: ["10:00 h. – 12:00 h.", "12:00 h. – 14:00 h."] },
    ],
    venue: "Polideportivo Entremontes",
  },
  {
    id: "competicion",
    label: "Competición",
    shortLabel: "Competición",
    emoji: "🏆",
    ageRange: "A partir de 7 años",
    category: "Competición",
    hours: "8 horas semanales",
    description: "Entrenamiento de alto rendimiento para gimnastas con compromiso competitivo. Trabajo técnico, físico y artístico al máximo nivel.",
    schedule: [
      { day: "Sábados", slots: ["16:30 h. – 20:30 h."] },
      { day: "Domingos", slots: ["10:00 h. – 14:00 h."] },
    ],
    venue: "Polideportivo Entremontes",
  },
  {
    id: "veteranos",
    label: "Veteranos",
    shortLabel: "Veteranos",
    emoji: "💪",
    ageRange: "18 años en adelante",
    category: "Veteranos",
    hours: "2 horas semanales",
    description: "Gimnasia para adultos. Flexibilidad, fuerza, movilidad y diversión sin límite de edad ni experiencia previa.",
    schedule: [
      { day: "Domingos", slots: ["12:00 h. – 14:00 h."] },
    ],
    venue: "Polideportivo Entremontes",
  },
];

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function EquiposPage() {
  const [activeId, setActiveId] = useState(TEAMS[0].id);
  const activeTeam = TEAMS.find((t) => t.id === activeId)!;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-fire opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <Users className="h-4 w-4" />
              <span>Nuestros equipos</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Encuentra tu grupo
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Los horarios se organizan según la edad y los objetivos de cada gimnasta: iniciación, formación no competitiva, competición y adultos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar tabs */}
          <nav className="space-y-1" role="tablist" aria-label="Equipos">
            {TEAMS.map((team) => {
              const isActive = team.id === activeId;
              return (
                <button
                  key={team.id}
                  onClick={() => setActiveId(team.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-card font-semibold text-foreground shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTeamIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: isActive ? "color-mix(in oklab, hsl(var(--primary)) 10%, transparent)" : undefined,
                    }}
                  >
                    {team.emoji}
                  </span>

                  <span className="flex-1 min-w-0">
                    <span className="block truncate text-sm">{team.shortLabel}</span>
                    <span className="block truncate text-[11px] font-normal text-muted-foreground">
                      {team.ageRange}
                    </span>
                  </span>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                      isActive
                        ? "translate-x-0 opacity-100 text-primary"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Content panel */}
          <div className="min-w-0 space-y-6">
            <div className="rounded-2xl border-2 border-primary/60 bg-card shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTeam.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="p-6 md:p-8"
                >
                  {/* Header card */}
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl bg-primary/10">
                      {activeTeam.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {activeTeam.category}
                      </span>
                      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                        {activeTeam.label}
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {activeTeam.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <StatCard
                      icon={<Users className="h-4 w-4" />}
                      label="Edad"
                      value={activeTeam.ageRange}
                    />
                    <StatCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Horas semanales"
                      value={activeTeam.hours}
                    />
                    <StatCard
                      icon={<MapPin className="h-4 w-4" />}
                      label="Instalación"
                      value={activeTeam.venue}
                    />
                  </div>

                  {/* Schedule */}
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                        Horarios
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {activeTeam.schedule.map((dayBlock) => (
                        <div
                          key={dayBlock.day}
                          className="flex flex-col gap-2 rounded-xl bg-muted/50 p-4 sm:flex-row sm:items-center sm:gap-6"
                        >
                          <span className="shrink-0 text-sm font-semibold text-foreground">
                            {dayBlock.day}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {dayBlock.slots.map((slot) => (
                              <span
                                key={slot}
                                className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info notice */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-7"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Info className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">
                    Información sobre la instalación municipal
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Por motivos ajenos al club, solo disponemos del uso del <strong className="text-foreground">Polideportivo Municipal Entremontes</strong> los sábados por la tarde —excepto el segundo sábado de mes— y los domingos. Este reparto lo marca la Concejalía de Deportes del Ayuntamiento de Las Rozas, una decisión que hemos recurrido y denunciado, esperando que se corrija esta injusticia.
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Os iremos informando de cualquier cambio en los horarios.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold leading-snug text-foreground">{value}</p>
      </div>
    </div>
  );
}
