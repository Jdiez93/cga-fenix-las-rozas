import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stagger, StaggerItem } from "@/components/motion/Reveal3D";
import { ParallaxY } from "@/components/motion/Parallax";
import { CursorGlow } from "@/components/motion/CursorGlow";
import {
  HelpCircle,
  Users,
  Clock,
  Euro,
  ClipboardList,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

type FaqItem = { q: string; a: React.ReactNode; plain: string };
type FaqGroup = { id: string; label: string; icon: typeof Users; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "club",
    label: "El club",
    icon: Users,
    items: [
      {
        q: "¿Desde qué edad se puede empezar a hacer gimnasia en el club?",
        plain:
          "Desde los 3 años en adelante, sin límite de edad: tenemos grupo de iniciación (3 a 5 años), perfeccionamiento, competición y veteranos para adultos desde 18 años.",
        a: (
          <>
            Desde los <strong>3 años en adelante y sin límite de edad</strong>. Contamos con grupo
            de <strong>Iniciación</strong> (3 a 5 años), <strong>Perfeccionamiento</strong> (6 a 10
            años), <strong>Competición</strong> (a partir de 7 años) y{" "}
            <strong>Veteranos</strong> (18 años en adelante).
          </>
        ),
      },
      {
        q: "¿Hace falta experiencia previa para entrar?",
        plain:
          "No. Los grupos de iniciación, perfeccionamiento y veteranos están abiertos a gimnastas sin experiencia previa; el trabajo es progresivo y adaptado a cada edad y nivel.",
        a: (
          <>
            No hace falta. Iniciación, Perfeccionamiento y Veteranos están abiertos a gimnastas{" "}
            <strong>sin experiencia previa</strong>: el trabajo es progresivo y siempre adaptado a
            la edad y a los objetivos de cada grupo.
          </>
        ),
      },
      {
        q: "¿Es un club solo de competición?",
        plain:
          "No. Hay grupos de no competición y de iniciación además de los grupos de competición y alta competición.",
        a: (
          <>
            No. Además de los grupos de <strong>competición y alta competición</strong>, tenemos
            grupos de <strong>iniciación y de formación no competitiva</strong>. Nuestro proyecto es
            fomentar la gimnasia en todas las especialidades a nuestro alcance, con integración de
            gimnastas con diferentes capacidades y libertad de elección de especialidad sin tener en
            cuenta el género.
          </>
        ),
      },
    ],
  },
  {
    id: "horarios",
    label: "Grupos y horarios",
    icon: Clock,
    items: [
      {
        q: "¿Cuáles son los horarios de entrenamiento?",
        plain:
          "Iniciación (3-5 años): sábados 16:30-17:30 o 17:30-18:30 y domingos 10:00-11:00 o 11:00-12:00. No competición (8 años o más): sábados 16:30-18:30 o 18:30-20:30 y domingos 10:00-12:00 o 12:00-14:00. Competición (desde 6-7 años): sábados 16:30-20:30 y domingos 10:00-14:00. Adultos: domingos 12:00-14:00.",
        a: (
          <ul className="space-y-2">
            <li>
              <strong>Iniciación · 3 a 5 años:</strong> sábados 16:30–17:30 o 17:30–18:30 y
              domingos 10:00–11:00 o 11:00–12:00.
            </li>
            <li>
              <strong>No competición · 8 años o más:</strong> sábados 16:30–18:30 o 18:30–20:30 y
              domingos 10:00–12:00 o 12:00–14:00.
            </li>
            <li>
              <strong>Competición · 6 años en adelante:</strong> sábados 16:30–20:30 y domingos
              10:00–14:00.
            </li>
            <li>
              <strong>Adultos · +18 años:</strong> domingos 12:00–14:00.
            </li>
          </ul>
        ),
      },
      {
        q: "¿Cuántos días a la semana hay que asistir?",
        plain:
          "Es obligatorio asistir dos días a la semana, con la duración estipulada en el apartado de horarios.",
        a: (
          <>
            La duración de las clases es la estipulada en el apartado de horarios y es{" "}
            <strong>obligatorio asistir dos días a la semana</strong>. Los horarios siempre están en
            función de las edades y de los objetivos de cada grupo.
          </>
        ),
      },
      {
        q: "¿Dónde se entrena?",
        plain:
          "En el Polideportivo Entremontes, Calle Aristóteles 3, 28232 Las Rozas de Madrid.",
        a: (
          <>
            En el <strong>Polideportivo Entremontes</strong>, Calle Aristóteles, 3 · 28232 Las Rozas
            de Madrid. Puedes ver el mapa y cómo llegar en la{" "}
            <Link to="/contacto" className="font-semibold text-primary hover:underline">
              página de contacto
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    id: "precios",
    label: "Precios y pagos",
    icon: Euro,
    items: [
      {
        q: "¿Cuánto cuesta la matrícula?",
        plain:
          "La matrícula de la temporada 2026-2027 es de 65 € para nuevos alumnos y 30 € para antiguos alumnos, y debe abonarse para reservar la plaza.",
        a: (
          <>
            Temporada 2026·2027: <strong>65 €</strong> para nuevos alumnos y <strong>30 €</strong>{" "}
            para antiguos alumnos. Debes abonar la tasa para tener la{" "}
            <strong>plaza reservada</strong>, indicando en la transferencia el{" "}
            <strong>nombre y apellidos del gimnasta</strong>.
          </>
        ),
      },
      {
        q: "¿Cuáles son las cuotas mensuales?",
        plain:
          "Adultos 2h/semana 22 €, 3-5 años 2h/semana 30 €, 4h/semana 40 €, 8h/semana 62 € y 11h/semana 75 €.",
        a: (
          <ul className="space-y-1.5">
            <li>Adultos · 2 h/semana: <strong>22 €</strong></li>
            <li>3–5 años · 2 h/semana: <strong>30 €</strong></li>
            <li>4 h/semana: <strong>40 €</strong></li>
            <li>8 h/semana: <strong>62 €</strong></li>
            <li>11 h/semana: <strong>75 €</strong></li>
          </ul>
        ),
      },
      {
        q: "¿Hay otras tasas o licencias además de la cuota?",
        plain:
          "Sí: tasas del Ayuntamiento de Las Rozas 25 € por temporada completa (septiembre 2026 – junio 2027), licencia autonómica 50 € y licencia nacional 75 €, ambas se abonan en diciembre para todo el año 2027.",
        a: (
          <ul className="space-y-1.5">
            <li>
              <strong>Tasas Ayto. Las Rozas · 25 €</strong> — temporada completa (septiembre 2026 –
              junio 2027).
            </li>
            <li>
              <strong>Licencia autonómica · 50 €</strong> — se abona en diciembre, para todo el año
              2027.
            </li>
            <li>
              <strong>Licencia nacional · 75 €</strong> — se abona en diciembre, para todo el año
              2027.
            </li>
          </ul>
        ),
      },
      {
        q: "¿Cómo y cuándo se pagan los recibos?",
        plain:
          "La facturación se realiza del 1 al 5 de cada mes mediante transferencia bancaria a la cuenta del club ES57 0081 0357 4200 0209 9917. El retraso en el abono conlleva un recargo de tres euros.",
        a: (
          <>
            La facturación de los recibos se realiza <strong>del 1 al 5 de cada mes</strong> mediante
            transferencia bancaria a la cuenta bancaria del club:
            <span className="mt-2 block font-mono text-sm font-black tracking-wide text-foreground">
              ES57 0081 0357 4200 0209 9917
            </span>
            El retraso en el abono de la cuota conlleva un recargo de{" "}
            <strong>tres euros</strong>.
          </>
        ),
      },
      {
        q: "Si falto un mes, ¿tengo que pagar la cuota?",
        plain:
          "Sí. La inasistencia temporal, aunque esté justificada, no exime del pago total de la cuota, y no se puede estar más de un mes sin asistir a clase.",
        a: (
          <>
            Sí. La <strong>inasistencia temporal, aunque esté justificada, no exime del pago total
            de la cuota</strong>. Además, no se puede estar más de un mes sin asistir a clase.
          </>
        ),
      },
    ],
  },
  {
    id: "inscripcion",
    label: "Inscripción y bajas",
    icon: ClipboardList,
    items: [
      {
        q: "¿Cómo me inscribo en el club?",
        plain:
          "Rellenando el formulario de preinscripción de la web, descargando y firmando la normativa interna del club, subiéndola en el último paso y abonando la matrícula en la cuenta del club por cada gimnasta.",
        a: (
          <>
            Rellena el{" "}
            <Link to="/preinscripcion" className="font-semibold text-primary hover:underline">
              formulario de preinscripción
            </Link>
            , descarga y firma la <strong>normativa interna del club</strong>, súbela firmada en el
            último paso y, una vez confirmada la plaza, abona la matrícula en la cuenta del club{" "}
            <strong>por cada gimnasta</strong>.
          </>
        ),
      },
      {
        q: "¿Puedo probar una clase antes de inscribirme?",
        plain:
          "Sí. Todo alumno o alumna nuevo con plaza puede realizar una clase gratuita antes de inscribirse.",
        a: (
          <>
            Sí. <strong>Todo alumno/a nuevo con plaza podrá realizar una clase gratuita</strong>{" "}
            antes de inscribirse.
          </>
        ),
      },
      {
        q: "¿Cómo se tramita una baja?",
        plain:
          "Las bajas deben tramitarse antes del día 27 del mes anterior al que se va a dejar de asistir, mediante correo a info@cgafenixlasrozas.es.",
        a: (
          <>
            Las bajas deben tramitarse <strong>antes del día 27</strong> del mes anterior al que se
            va a dejar de asistir, mediante correo a{" "}
            <a
              href="mailto:info@cgafenixlasrozas.es"
              className="font-semibold text-primary hover:underline"
            >
              info@cgafenixlasrozas.es
            </a>
            .
          </>
        ),
      },
      {
        q: "¿Puedo inscribirme si tengo recibos pendientes de otros años?",
        plain:
          "No. No se podrán inscribir usuarios con recibos pendientes de pago de años anteriores.",
        a: (
          <>
            No. <strong>No se podrán inscribir usuarios/as con recibos pendientes de pago de años
            anteriores.</strong>
          </>
        ),
      },
    ],
  },
  {
    id: "contacto",
    label: "Contacto",
    icon: MapPin,
    items: [
      {
        q: "¿Cómo puedo contactar con el club?",
        plain:
          "Por email en info@cgafenixlasrozas.es o por teléfono en el 679 980 626 y el 695 299 885.",
        a: (
          <>
            Escríbenos a{" "}
            <a
              href="mailto:info@cgafenixlasrozas.es"
              className="font-semibold text-primary hover:underline"
            >
              info@cgafenixlasrozas.es
            </a>{" "}
            o llámanos al{" "}
            <a href="tel:+34679980626" className="font-semibold text-primary hover:underline">
              679 980 626
            </a>{" "}
            /{" "}
            <a href="tel:+34695299885" className="font-semibold text-primary hover:underline">
              695 299 885
            </a>
            .
          </>
        ),
      },
      {
        q: "¿Qué pasa con el reparto de la instalación deportiva?",
        plain:
          "Seguimos pendientes de la resolución del TSJ del recurso interpuesto por el Ayuntamiento de Las Rozas a la sentencia estimatoria del contencioso administrativo que nos daba la razón y obligaba a la Concejalía de Deportes a hacer un reparto justo y equitativo de la instalación.",
        a: (
          <>
            Seguimos pendientes de la resolución del <strong>TSJ</strong> del recurso interpuesto por
            el Ayuntamiento de Las Rozas a la sentencia estimatoria del contencioso administrativo
            que nos daba la razón y obligaba a la Concejalía de Deportes a hacer un{" "}
            <strong>reparto justo y equitativo de la instalación</strong>.
          </>
        ),
      },
    ],
  },
];

export function HomeFaq() {
  const [active, setActive] = useState(FAQ_GROUPS[0]!.id);
  const group = FAQ_GROUPS.find((g) => g.id === active) ?? FAQ_GROUPS[0]!;

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden border-t border-border bg-background py-20 sm:py-24"
    >
      <ParallaxY distance={60} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/5 h-64 w-64 rounded-full bg-primary/[0.06] blur-3xl" />
      </ParallaxY>
      <CursorGlow size={560} intensity={8} />

      <div className="relative mx-auto max-w-6xl px-6">
        <Stagger stagger={0.08} className="text-center">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-primary">
              <HelpCircle className="h-3.5 w-3.5" />
              Preguntas frecuentes
            </span>
          </StaggerItem>
          <StaggerItem>
            <h2
              id="faq-title"
              className="mt-5 text-3xl sm:text-4xl xl:text-5xl font-black uppercase tracking-tight text-foreground"
            >
              Todo lo que necesitas <span className="text-primary">saber</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-primary" />
          </StaggerItem>
          <StaggerItem>
            <p className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-muted-foreground">
              Edades, grupos, horarios, cuotas e inscripción. Si te queda alguna duda, escríbenos y
              te la resolvemos.
            </p>
          </StaggerItem>
        </Stagger>

        <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Categorías */}
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Categorías de preguntas frecuentes"
          >
            {FAQ_GROUPS.map((g) => {
              const Icon = g.icon;
              const isActive = g.id === active;
              return (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(g.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[12px] font-black uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "border-primary/60 bg-primary/10 text-primary shadow-elegant"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {g.label}
                </button>
              );
            })}
          </div>

          {/* Preguntas */}
          <div className="rounded-2xl border border-border bg-card p-2 sm:p-4">
            <Accordion type="single" collapsible className="w-full" key={group.id}>
              {group.items.map((item, i) => (
                <AccordionItem
                  key={item.q}
                  value={`${group.id}-${i}`}
                  className="border-border px-2 sm:px-3"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base font-bold text-foreground hover:text-primary hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-primary/30 bg-primary/[0.06] p-7 text-center sm:p-9">
          <p className="text-lg font-black uppercase tracking-tight text-foreground sm:text-xl">
            ¿Sigues con dudas? Te ayudamos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/preinscripcion"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-elegant transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
            >
              Preinscripción
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+34679980626"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              679 980 626
            </a>
            <a
              href="mailto:info@cgafenixlasrozas.es"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Escríbenos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export const FAQ_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((g) =>
    g.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.plain },
    })),
  ),
});
