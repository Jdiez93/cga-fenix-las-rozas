import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Navigation,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacta · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Contacta con el Club de Gimnasia Artística Fénix Las Rozas. Teléfono, email y ubicación en el Polideportivo Entremontes.",
      },
      { property: "og:title", content: "Contacta · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Estamos en el Polideportivo Entremontes, Las Rozas. Llámanos, escríbenos o ven a vernos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactoPage,
});

const CONTACT = {
  phone: "679 98 06 26",
  phoneHref: "tel:+34679980626",
  email: "info@cgafenixlasrozas.es",
  emailHref: "mailto:info@cgafenixlasrozas.es",
  address: "Calle Aristóteles, 3",
  city: "28232 Las Rozas de Madrid",
  venue: "Polideportivo Entremontes",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Polideportivo+Entremontes+Las+Rozas",
  embedUrl:
    "https://www.google.com/maps?q=Polideportivo+Entremontes,+Calle+Arist%C3%B3teles+3,+28232+Las+Rozas+de+Madrid&output=embed",
};

function ContactoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-carbon text-carbon-foreground">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-primary-glow/30 blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--carbon-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--carbon-foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Estamos aquí para ti
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
              Hablemos de{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                gimnasia
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-carbon-foreground/70 leading-relaxed">
              ¿Quieres formar parte del Club Fénix Las Rozas? Llámanos, escríbenos
              un e-mail o ven a conocernos al Polideportivo Entremontes. Estaremos
              encantados de poderte ayudar.
            </p>
          </motion.div>
        </div>

        <svg
          className="relative block w-full text-background"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,80L0,80Z"
          />
        </svg>
      </section>

      {/* CONTACT CARDS */}
      <section className="mx-auto max-w-7xl px-6 -mt-16 relative z-10">
        <div className="grid gap-6 md:grid-cols-3">
          <ContactCard
            icon={<Phone className="h-6 w-6" />}
            label="Llámanos"
            title={CONTACT.phone}
            href={CONTACT.phoneHref}
            cta="Marcar ahora"
            delay={0}
          />
          <ContactCard
            icon={<Mail className="h-6 w-6" />}
            label="Escríbenos"
            title={CONTACT.email}
            href={CONTACT.emailHref}
            cta="Enviar e-mail"
            delay={0.1}
          />
          <ContactCard
            icon={<MapPin className="h-6 w-6" />}
            label="Visítanos"
            title={CONTACT.venue}
            href={CONTACT.mapsUrl}
            external
            cta="Cómo llegar"
            delay={0.2}
          />
        </div>
      </section>

      {/* SCHEDULE + MAP */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Ven a vernos
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-black tracking-tight">
                Polideportivo Entremontes
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Nuestra sede en Las Rozas de Madrid. Instalaciones equipadas para
                gimnasia artística de todos los niveles.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Dirección</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {CONTACT.address}
                    <br />
                    {CONTACT.city}
                    <br />
                    Madrid
                  </p>
                </div>
              </div>

              <div className="my-5 h-px bg-border" />

              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Horario de atención
                  </p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li className="flex justify-between gap-4">
                      <span>Sábados</span>
                      <span className="font-medium text-foreground">
                        16:30 – 20:30
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Domingos</span>
                      <span className="font-medium text-foreground">
                        10:00 – 14:00
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Síguenos:</span>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Right: map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-black/60 to-transparent px-5 py-4 text-white">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">
                      {CONTACT.venue}
                    </p>
                    <p className="text-xs text-white/70">{CONTACT.address}</p>
                  </div>
                </div>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors hover:bg-white/25"
                >
                  Abrir en Maps <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <iframe
                title="Ubicación Polideportivo Entremontes"
                src={CONTACT.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[520px] w-full border-0 grayscale-[15%] transition-all duration-500 group-hover:grayscale-0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-carbon px-8 py-14 text-carbon-foreground sm:px-14 sm:py-20">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight">
                ¿Lista para dar el salto?
              </h3>
              <p className="mt-3 text-carbon-foreground/70">
                Rellena la preinscripción para la temporada 26-27 y reserva tu
                plaza en el club.
              </p>
            </div>
            <a
              href="/preinscripcion"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              Preinscripción 26-27
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ContactCard({
  icon,
  label,
  title,
  href,
  cta,
  external,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  href: string;
  cta: string;
  external?: boolean;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-elegant"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary-glow opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-elegant">
        {icon}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-xl font-black tracking-tight text-foreground break-words">
        {title}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.a>
  );
}
