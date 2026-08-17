import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Shield,
  Building2,
  ClipboardList,
  Scale,
  Clock,
  Users,
  Lock,
  UserCheck,
  Baby,
  Cookie,
  RefreshCw,
} from "lucide-react";

const SECTIONS = [
  { id: "responsable", title: "Responsable del tratamiento", icon: Building2 },
  { id: "datos", title: "Datos que recogemos", icon: ClipboardList },
  { id: "finalidades", title: "Finalidades", icon: Shield },
  { id: "legitimacion", title: "Base jurídica", icon: Scale },
  { id: "conservacion", title: "Plazo de conservación", icon: Clock },
  { id: "destinatarios", title: "Destinatarios", icon: Users },
  { id: "seguridad", title: "Medidas de seguridad", icon: Lock },
  { id: "derechos", title: "Derechos de las personas", icon: UserCheck },
  { id: "menores", title: "Datos de menores e imágenes", icon: Baby },
  { id: "cookies", title: "Cookies", icon: Cookie },
  { id: "cambios", title: "Cambios en esta política", icon: RefreshCw },
];

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Información sobre el tratamiento de datos personales del formulario de preinscripción del CGA Fénix Las Rozas conforme al RGPD y la LOPDGDD.",
      },
      { property: "og:title", content: "Política de Privacidad · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Responsable, finalidades, base jurídica, conservación y derechos sobre los datos personales tratados por el club.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PoliticaPrivacidadPage,
});

function PoliticaPrivacidadPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 104;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-carbon py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, var(--color-primary), transparent 45%), radial-gradient(circle at 80% 20%, var(--color-ember), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Shield className="h-3.5 w-3.5" />
            Protección de datos
          </div>
          <h1 className="mt-5 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Política de Privacidad
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-carbon-foreground/70 sm:text-base">
            Cómo trata CGA Fénix Las Rozas los datos personales facilitados a través del formulario de preinscripción y
            de los canales de contacto del club, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018
            (LOPDGDD).
          </p>
        </div>
      </section>

      {/* Contenido */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1 rounded-2xl border border-border bg-card p-2 shadow-header">
              {SECTIONS.map(({ id, title, icon: Icon }) => {
                const isActive = activeId === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-elegant"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {title}
                  </button>
                );
              })}
            </div>
          </aside>

          <article className="space-y-8">
            <Section id="responsable" title="Responsable del tratamiento" icon={Building2}>
              <ul className="space-y-1.5 text-foreground/80 leading-relaxed">
                <li>
                  <strong className="text-foreground">Titular:</strong> CGA FÉNIX LAS ROZAS
                </li>
                <li>
                  <strong className="text-foreground">N.I.F.:</strong> G01776764
                </li>
                <li>
                  <strong className="text-foreground">Domicilio:</strong> C/ Lorca 8 · 28231 Las Rozas de Madrid
                </li>
                <li>
                  <strong className="text-foreground">Correo electrónico:</strong>{" "}
                  <a href="mailto:info@cgafenixlasrozas.es" className="text-primary hover:underline">
                    info@cgafenixlasrozas.es
                  </a>
                </li>
              </ul>
            </Section>

            <Section id="datos" title="Datos personales que recogemos" icon={ClipboardList}>
              <p className="text-foreground/80 leading-relaxed">
                A través del formulario de preinscripción de la web tratamos únicamente los datos necesarios para
                gestionar la solicitud de plaza:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>
                  <strong className="text-foreground">Datos de la gimnasta:</strong> nombre, apellidos y fecha de
                  nacimiento.
                </li>
                <li>
                  <strong className="text-foreground">Datos del padre, madre o tutor legal:</strong> nombre y apellidos.
                </li>
                <li>
                  <strong className="text-foreground">Datos de contacto:</strong> teléfono, correo electrónico,
                  domicilio y código postal.
                </li>
                <li>
                  <strong className="text-foreground">Datos deportivos:</strong> experiencia previa, club o nivel
                  anterior e información adicional facilitada voluntariamente.
                </li>
                <li>
                  <strong className="text-foreground">Documentación:</strong> normativa interna del club firmada y
                  subida en formato PDF, así como el justificante de pago de la matrícula cuando proceda.
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                No solicitamos datos de categorías especiales. Si en la información adicional facilitas datos de salud
                relevantes para la práctica deportiva, se tratarán con la máxima confidencialidad y con la única
                finalidad de velar por la seguridad de la gimnasta.
              </p>
            </Section>

            <Section id="finalidades" title="Finalidades del tratamiento" icon={Shield}>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>Gestionar y tramitar la preinscripción y, en su caso, el alta como socio o socia del club.</li>
                <li>Verificar el pago de la matrícula y de las cuotas correspondientes.</li>
                <li>Asignar grupo, horario y nivel técnico adecuados a la gimnasta.</li>
                <li>Comunicarnos con las familias para asuntos organizativos, competiciones y avisos del club.</li>
                <li>Cumplir las obligaciones legales, contables, fiscales y federativas aplicables.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                No se toman decisiones automatizadas ni se elaboran perfiles con los datos facilitados.
              </p>
            </Section>

            <Section id="legitimacion" title="Base jurídica del tratamiento" icon={Scale}>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>
                  <strong className="text-foreground">Ejecución de una relación contractual</strong> (art. 6.1.b RGPD):
                  gestión de la preinscripción, del alta y de la prestación del servicio deportivo.
                </li>
                <li>
                  <strong className="text-foreground">Consentimiento</strong> (art. 6.1.a RGPD): envío de comunicaciones
                  informativas del club y publicación de imágenes, cuando se autoriza expresamente.
                </li>
                <li>
                  <strong className="text-foreground">Cumplimiento de obligaciones legales</strong> (art. 6.1.c RGPD):
                  obligaciones fiscales, contables y de seguros deportivos.
                </li>
                <li>
                  <strong className="text-foreground">Interés legítimo</strong> (art. 6.1.f RGPD): seguridad de las
                  instalaciones y correcta organización de la actividad.
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                Facilitar los datos marcados como obligatorios es necesario para tramitar la solicitud; sin ellos no es
                posible gestionar la preinscripción.
              </p>
            </Section>

            <Section id="conservacion" title="Plazo de conservación" icon={Clock}>
              <p className="text-foreground/80 leading-relaxed">
                Los datos se conservarán mientras se mantenga la relación con el club y, una vez finalizada, durante los
                plazos legalmente exigibles para atender posibles responsabilidades (con carácter general, hasta 5 años
                en materia civil y hasta 6 años en materia contable y fiscal). Las solicitudes de preinscripción no
                formalizadas se eliminarán al cierre de la temporada correspondiente.
              </p>
            </Section>

            <Section id="destinatarios" title="Destinatarios y transferencias" icon={Users}>
              <p className="text-foreground/80 leading-relaxed">
                Los datos podrán comunicarse únicamente cuando sea necesario a: la federación o federaciones deportivas
                en las que participe el club, entidades aseguradoras deportivas, entidades bancarias para la gestión de
                cobros, la administración pública competente y proveedores tecnológicos que actúan como encargados del
                tratamiento (alojamiento web y base de datos) con contrato de encargo conforme al art. 28 RGPD.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo salvo que el
                proveedor ofrezca garantías adecuadas conforme al capítulo V del RGPD.
              </p>
            </Section>

            <Section id="seguridad" title="Medidas de seguridad" icon={Lock}>
              <p className="text-foreground/80 leading-relaxed">
                Aplicamos medidas técnicas y organizativas apropiadas para garantizar la confidencialidad, integridad y
                disponibilidad de la información: conexión cifrada (HTTPS), acceso restringido al panel de gestión
                mediante autenticación, almacenamiento de los documentos firmados en repositorios privados con acceso
                limitado y control de permisos por usuario.
              </p>
            </Section>

            <Section id="derechos" title="Derechos de las personas interesadas" icon={UserCheck}>
              <p className="text-foreground/80 leading-relaxed">
                Puedes ejercer en cualquier momento los derechos de acceso, rectificación, supresión, limitación del
                tratamiento, oposición, portabilidad y retirada del consentimiento escribiendo a{" "}
                <a href="mailto:info@cgafenixlasrozas.es" className="text-primary hover:underline">
                  info@cgafenixlasrozas.es
                </a>{" "}
                o al domicilio del club, indicando el derecho que deseas ejercer y acreditando tu identidad.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Si consideras que el tratamiento no se ajusta a la normativa vigente, puedes presentar una reclamación
                ante la Agencia Española de Protección de Datos (
                <a
                  href="https://www.aepd.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aepd.es
                </a>
                ).
              </p>
            </Section>

            <Section id="menores" title="Datos de menores e imágenes" icon={Baby}>
              <p className="text-foreground/80 leading-relaxed">
                Los formularios relativos a menores de 14 años deben ser cumplimentados por su padre, madre o tutor
                legal, quien garantiza la veracidad de los datos y autoriza su tratamiento. La publicación de imágenes o
                vídeos de gimnastas en la web y en las redes sociales del club requiere autorización expresa y
                revocable, que puede retirarse en cualquier momento mediante el correo indicado.
              </p>
            </Section>

            <Section id="cookies" title="Cookies" icon={Cookie}>
              <p className="text-foreground/80 leading-relaxed">
                Esta web utiliza exclusivamente cookies técnicas necesarias para su funcionamiento y para mantener la
                sesión en el área privada de administración. No se emplean cookies publicitarias ni de perfilado. Puedes
                configurar tu navegador para bloquear o eliminar las cookies, si bien ello puede afectar al correcto
                funcionamiento de algunas secciones.
              </p>
            </Section>

            <Section id="cambios" title="Cambios en esta política" icon={RefreshCw}>
              <p className="text-foreground/80 leading-relaxed">
                CGA Fénix Las Rozas podrá modificar esta política para adaptarla a novedades legislativas o a cambios en
                los servicios del club. Recomendamos revisarla periódicamente; la versión publicada en esta página es la
                vigente en cada momento.
              </p>
            </Section>
          </article>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight text-foreground sm:text-xl">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4.5 w-4.5" />
        </span>
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-sm sm:text-base">{children}</div>
    </section>
  );
}
