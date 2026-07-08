import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Navigation,
  ArrowRight,
} from "lucide-react";

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
      {/* Title */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12 sm:pt-32 sm:pb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
          Contacta
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          ¿Quieres formar parte del Club Fénix Las Rozas? Llámanos, escríbenos
          o ven a conocernos al Polideportivo Entremontes.
        </p>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            label="Teléfono"
            title={CONTACT.phone}
            href={CONTACT.phoneHref}
            cta="Llamar"
          />
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            title={CONTACT.email}
            href={CONTACT.emailHref}
            cta="Enviar email"
          />
          <ContactCard
            icon={<MapPin className="h-5 w-5" />}
            label="Ubicación"
            title={CONTACT.venue}
            href={CONTACT.mapsUrl}
            external
            cta="Cómo llegar"
          />
        </div>
      </section>

      {/* Info + Map */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left panel */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight">
                Polideportivo Entremontes
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Nuestra sede en Las Rozas de Madrid.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dirección</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {CONTACT.address}
                    <br />
                    {CONTACT.city}
                    <br />
                    Madrid
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-start gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Horario</p>
                  <ul className="mt-0.5 space-y-1 text-sm text-muted-foreground">
                    <li className="flex justify-between gap-4">
                      <span>Sábados</span>
                      <span className="font-medium text-foreground">16:30 – 20:30</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Domingos</span>
                      <span className="font-medium text-foreground">10:00 – 14:00</span>
                    </li>
                  </ul>
                </div>
              </div>

              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </div>

          </div>

          {/* Right: map */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-black/50 to-transparent px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{CONTACT.venue}</p>
                    <p className="text-xs text-white/70">{CONTACT.address}</p>
                  </div>
                </div>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md hover:bg-white/25 transition-colors"
                >
                  Maps <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <iframe
                title="Ubicación Polideportivo Entremontes"
                src={CONTACT.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
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
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 font-display text-lg font-bold tracking-tight break-words">
          {title}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}
