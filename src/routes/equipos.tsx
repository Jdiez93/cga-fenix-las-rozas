import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Users, CalendarDays, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/equipos")({
  head: () => ({
    meta: [
      { title: "Nuestros equipos · CGA Fénix Las Rozas" },
      { name: "description", content: "Descubre los equipos de gimnasia del club CGA Fénix Las Rozas: iniciación, perfeccionamiento, competición y adultos." },
      { property: "og:title", content: "Nuestros equipos · CGA Fénix Las Rozas" },
      { property: "og:description", content: "Descubre los equipos de gimnasia del club CGA Fénix Las Rozas." },
    ],
  }),
  component: EquiposPage,
});

type Team = {
  id: string;
  label: string;
  emoji: string;
  ageRange: string;
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
    emoji: "🌱",
    ageRange: "4 a 7 años",
    hours: "4 horas semanales",
    description: "Primeros pasos en la gimnasia artística. Juegos, coordinación y diversión para los más pequeños.",
    schedule: [
      { day: "Sábados", slots: ["16:30h. – 18:30h.", "18:30h. – 20:30h."] },
      { day: "Domingos", slots: ["10:00h. – 12:00h.", "12:00h. – 14:00h."] },
    ],
    venue: "Polideportivo Entremontes",
    color: "#4ade80",
    accentBg: "bg-green-500/10",
  },
  {
    id: "perfeccionamiento",
    label: "Perfeccionamiento",
    emoji: "🔥",
    ageRange: "8 a 11 años",
    hours: "4 horas semanales",
    description: "Consolidación de técnicas, desarrollo de habilidades y preparación para competición.",
    schedule: [
      { day: "Sábados", slots: ["16:30h. – 18:30h.", "18:30h. – 20:30h."] },
      { day: "Domingos", slots: ["10:00h. – 12:00h.", "12:00h. – 14:00h."] },
    ],
    venue: "Polideportivo Entremontes",
    color: "#f97316",
    accentBg: "bg-orange-500/10",
  },
  {
    id: "competicion",
    label: "Competición",
    emoji: "🏆",
    ageRange: "A partir de 7 años",
    hours: "8 horas semanales",
    description: "Entrenamiento de alto rendimiento. Compromiso, disciplina y pasión por la gimnasia.",
    schedule: [
      { day: "Sábados", slots: ["16:30h. – 20:30h."] },
      { day: "Domingos", slots: ["10:00h. – 14:00h."] },
    ],
    venue: "Polideportivo Entremontes",
    color: "#ef4444",
    accentBg: "bg-red-500/10",
  },
  {
    id: "adultos",
    label: "Adultos",
    emoji: "💪",
    ageRange: "18 años en adelante",
    hours: "2 horas semanales",
    description: "Gimnasia para adultos. Flexibilidad, fuerza y diversión sin límite de edad.",
    schedule: [
      { day: "Domingos", slots: ["12:00h. – 14:00h."] },
    ],
    venue: "Polideportivo Entremontes",
    color: "#8b5cf6",
    accentBg: "bg-violet-500/10",
  },
];

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.25 } },
};

const tabIndicatorVariants = {
  initial: { scaleY: 0, opacity: 0 },
  animate: { scaleY: 1, opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
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
              Encuentra tu nivel
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Desde los primeros pasos hasta la competición de alto rendimiento. Cada gimnasta tiene su sitio en el Fénix.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
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
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-card font-semibold text-foreground shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTeamIndicator"
                      className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
                      style={{ backgroundColor: team.color }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: isActive ? `${team.color}18` : undefined,
                    }}
                  >
                    {team.emoji}
                  </span>

                  <span className="flex-1">{team.label}</span>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
                    }`}
                    style={{ color: isActive ? team.color : undefined }}
                  />
                </button>
              );
            })}
          </nav>

          {/* Content panel */}
          <div className="min-w-0">
            <div className="relative overflow-hidden rounded-2xl p-[2px]">
              {/* Animated rotating border */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from 0deg, ${activeTeam.color}, ${activeTeam.color}30, ${activeTeam.color})`,
                  animation: "spin-slow 3s linear infinite",
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTeam.id}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative rounded-[14px] bg-card p-6 shadow-sm md:p-8"
                >
                  {/* Header card */}
                  <div className="mb-6 flex items-start gap-4">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl"
                      style={{ backgroundColor: `${activeTeam.color}15` }}
                    >
                      {activeTeam.emoji}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
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
                      color={activeTeam.color}
                    />
                    <StatCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Horas semanales"
                      value={activeTeam.hours}
                      color={activeTeam.color}
                    />
                    <StatCard
                      icon={<MapPin className="h-4 w-4" />}
                      label="Instalación"
                      value={activeTeam.venue}
                      color={activeTeam.color}
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
                                className="inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium"
                                style={{
                                  backgroundColor: `${activeTeam.color}12`,
                                  color: activeTeam.color,
                                }}
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
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}12`, color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold leading-snug text-foreground">{value}</p>
      </div>
    </div>
  );
}



