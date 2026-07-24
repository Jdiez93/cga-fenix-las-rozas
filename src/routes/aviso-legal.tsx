import { createFileRoute } from "@tanstack/react-router";
import { Shield, FileText, Scale, Cookie, UserCheck, Globe, AlertCircle, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "titularidad", title: "Titularidad", icon: Globe },
  { id: "objetivo", title: "Objetivo", icon: BookOpen },
  { id: "acceso", title: "Acceso y utilización", icon: UserCheck },
  { id: "contenidos", title: "Contenidos", icon: FileText },
  { id: "responsabilidad", title: "Limitación de responsabilidad", icon: AlertCircle },
  { id: "propiedad", title: "Propiedad intelectual", icon: Scale },
  { id: "privacidad", title: "Política de privacidad", icon: Shield },
  { id: "cookies", title: "Política de cookies", icon: Cookie },
];

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · CGA Fénix Las Rozas" },
      { name: "description", content: "Aviso legal, política de privacidad y política de cookies de CGA Fénix Las Rozas." },
      { property: "og:title", content: "Aviso legal · CGA Fénix Las Rozas" },
      { property: "og:description", content: "Aviso legal, política de privacidad y política de cookies de CGA Fénix Las Rozas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: AvisoLegalPage,
});

function AvisoLegalPage() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 104;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
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
            <Scale className="h-3.5 w-3.5" />
            Información legal
          </div>
          <h1 className="mt-5 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            Aviso legal
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-carbon-foreground/70 sm:text-base">
            Condiciones de acceso, uso de contenidos, política de privacidad y política de cookies del sitio web de CGA Fénix Las Rozas.
          </p>
        </div>
      </section>

      {/* Content */}
      <div ref={mainRef} className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sticky navigation */}
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

          {/* Legal text */}
          <article className="space-y-8">
            <LegalSection id="titularidad" title="Titularidad del sitio web" icon={Globe}>
              <p className="text-foreground/80 leading-relaxed">
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> con N.I.F.:{" "}
                <strong className="text-foreground">G01776764</strong> con domicilio fiscal en{" "}
                <strong className="text-foreground">C/ Lorca 8 - 28231 Las Rozas de Madrid</strong>.
              </p>
            </LegalSection>

            <LegalSection id="objetivo" title="Objetivo" icon={BookOpen}>
              <p className="text-foreground/80 leading-relaxed">
                El sitio web facilita a los usuarios del mismo el acceso a información y servicios prestados por{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> a aquellas personas u organizaciones
                interesadas en los mismos.
              </p>
            </LegalSection>

            <LegalSection id="acceso" title="Acceso y utilización de la web" icon={UserCheck}>
              <p className="text-foreground/80 leading-relaxed">
                El acceso a la web tiene carácter gratuito para los usuarios de la misma. Con carácter general el acceso
                y utilización de la web no exige la previa suscripción o registro de los usuarios de la misma. Los
                citados usuarios sólo están autorizados al uso de la web previa aceptación y cumplimiento de las
                condiciones aquí recogidas y deberán abandonar el web site en caso contrario.
              </p>
            </LegalSection>

            <LegalSection id="contenidos" title="Contenidos de la web" icon={FileText}>
              <p className="text-foreground/80 leading-relaxed">
                Se prohíbe el uso de los contenidos de la web para promocionar, contratar o divulgar publicidad o
                información propia o de terceras personas sin la autorización de{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong>, ni remitir publicidad o información
                valiéndose para ello de los servicios o información que se ponen a disposición de los usuarios,
                independientemente de si la utilización es gratuita o no.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Los enlaces o hiperenlaces que incorporen terceros en sus páginas web, dirigidos a esta web, serán para
                la apertura de la página web completa, no pudiendo manifestar, directa o indirectamente, indicaciones
                falsas, inexactas o confusas, ni incurrir en acciones desleales o ilícitas en contra de{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong>.
              </p>
            </LegalSection>

            <LegalSection id="responsabilidad" title="Limitación de responsabilidad" icon={AlertCircle}>
              <p className="text-foreground/80 leading-relaxed">
                Tanto el acceso a la web como el uso inconsentido que pueda efectuarse de la información contenida en la
                misma es de la exclusiva responsabilidad de quien lo realiza.{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no responderá de ninguna consecuencia,
                daño o perjuicio que pudieran derivarse de dicho acceso o uso.{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no se hace responsable de los errores
                de seguridad que se puedan producir ni de los daños que puedan causarse al sistema informático del
                usuario (hardware y software), o a los ficheros o documentos almacenados en el mismo, como consecuencia
                de:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>la presencia de un virus en el ordenador del usuario que sea utilizado para la conexión a los servicios y contenidos de la web,</li>
                <li>un mal funcionamiento del navegador,</li>
                <li>y/o del uso de versiones no actualizadas del mismo.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no se hace responsable de la fiabilidad
                y rapidez de los hiperenlaces que se incorporen en la web para la apertura de otras.{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no garantiza la utilidad de estos
                enlaces, ni se responsabiliza de los contenidos o servicios a los que pueda acceder el usuario por medio
                de estos enlaces, ni del buen funcionamiento de estas webs.{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no será responsable de los virus o
                demás programas informáticos que deterioren o puedan deteriorar los sistemas o equipos informáticos de
                los usuarios al acceder a su web u otras webs a las que se haya accedido mediante enlaces de esta web.
              </p>
            </LegalSection>

            <LegalSection id="propiedad" title="Propiedad intelectual e industrial" icon={Scale}>
              <p className="text-foreground/80 leading-relaxed">
                El texto, imágenes, marcas, gráficos y logotipos del portal se encuentran protegidos por las leyes sobre
                Propiedad Intelectual e Industrial, quedando prohibida su reproducción, distribución, comunicación
                pública y transformación, salvo para uso personal y privado.{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> no garantiza que los contenidos sean
                precisos o libres de error o que el libre uso de los mismos por el usuario no infrinja los derechos de
                terceras partes. El buen o mal uso de esta Web y de sus contenidos está bajo la responsabilidad del
                usuario.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Asimismo, queda prohibida la reproducción, retransmisión, copia, cesión o redifusión, total o parcial, de
                la información contenida en estas páginas, cualquiera que fuera su finalidad y el medio utilizado para
                ello.
              </p>
            </LegalSection>

            <LegalSection id="privacidad" title="Política de privacidad" icon={Shield}>
              <p className="text-foreground/80 leading-relaxed">
                En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de abril de
                2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
                personales y a la libre circulación de estos datos y en la legislación nacional de desarrollo del mismo,
                el usuario, por el hecho de remitir sus datos de carácter personal a través de correo electrónico o
                rellenando cualquier formulario de este sitio web, consiente a{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> su tratamiento conforme a la presente
                política de protección de datos.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Los datos pasarán a formar parte de los ficheros de{" "}
                <strong className="text-foreground">CGA FENIX LAS ROZAS</strong> para atender las peticiones que realice el
                usuario y, en su caso, el envío de comunicaciones informativas sobre sus diversas actividades
                (convocatorias a eventos, cambios legislativos, nuevos servicios, ofertas de formación, etc).
              </p>
              <p className="text-foreground/80 leading-relaxed">
                El usuario podrá ejercer sus derechos de acceso, rectificación, oposición o cancelación contactando con{" "}
                <a
                  href="mailto:info@cgafenixlasrozas.es"
                  className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  info@cgafenixlasrozas.es
                </a>
                .
              </p>
            </LegalSection>

            <LegalSection id="cookies" title="Política de cookies" icon={Cookie}>
              <p className="text-foreground/80 leading-relaxed">
                En la web utilizamos cookies para facilitar la relación de los visitantes con nuestro contenido y para
                permitir elaborar estadísticas sobre las visitantes que recibimos.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                En cumplimiento de la Directiva 2009/136/CE, desarrollada en nuestro ordenamiento por el apartado
                segundo del artículo 22 de la Ley de Servicios de Sociedad de la Información, siguiendo las directrices
                de la Agencia Española de Protección de Datos, procedemos a informarle detalladamente del uso que se
                realiza en nuestra web.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Se denominan cookies a unos pequeños archivos que se graban en el navegador utilizado por cada visitante
                de nuestra web para que el servidor pueda recordar la visita de ese usuario con posterioridad cuando
                vuelva a acceder a nuestros contenidos. Esta información no revela su identidad, ni dato personal alguno,
                ni accede al contenido almacenado en su pc, pero sí que permite a nuestro sistema identificarle a usted
                como un usuario determinado que ya visitó la web con anterioridad, visualizó determinadas páginas, etc.
                y además permite guardar sus preferencias personales e información técnica como por ejemplo las visitas
                realizadas o páginas concretas que visite.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La finalidad de las cookies es la de facilitar al Usuario un acceso más rápido a los Servicios
                seleccionados.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Si no desea que se guarden cookies en su navegador o prefiere recibir una información cada vez que una
                cookie solicite instalarse, puede configurar sus opciones de navegación para que se haga de esa forma. La
                mayor parte de los navegadores permiten la gestión de las cookies de 3 formas diferentes:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>Las cookies son siempre rechazadas;</li>
                <li>El navegador pregunta si el usuario desea instalar cada cookie;</li>
                <li>Las cookies son siempre aceptadas;</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                Su navegador también puede incluir la posibilidad de seleccionar con detalle las cookies que desea que se
                instalen en su ordenador. En concreto, el usuario puede normalmente aceptar alguna de las siguientes
                opciones:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>rechazar las cookies de determinados dominios;</li>
                <li>rechazar las cookies de terceros;</li>
                <li>aceptar cookies como no persistentes (se eliminan cuando el navegador se cierra);</li>
                <li>permitir al servidor crear cookies para un dominio diferente.</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                Para permitir, conocer, bloquear o eliminar las cookies instaladas en su equipo puede hacerlo mediante la
                configuración de las opciones del navegador instalado en su ordenador.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Puede encontrar información sobre cómo configurar los navegadores más usados en las siguientes
                ubicaciones:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-foreground/80 leading-relaxed">
                <li>
                  <strong className="text-foreground">Internet Explorer:</strong> Herramientas -&gt; Opciones de
                  Internet -&gt; Privacidad -&gt; Configuración. Para más información, puede consultar el soporte de
                  Microsoft o la Ayuda del navegador.
                </li>
                <li>
                  <strong className="text-foreground">Firefox:</strong> Herramientas -&gt; Opciones -&gt; Privacidad
                  -&gt; Historial -&gt; Configuración Personalizada. Para más información, puede consultar el soporte de
                  Mozilla o la Ayuda del navegador.
                </li>
                <li>
                  <strong className="text-foreground">Chrome:</strong> Configuración -&gt; Mostrar opciones avanzadas
                  -&gt; Privacidad -&gt; Configuración de contenido. Para más información, puede consultar el soporte de
                  Google o la Ayuda del navegador.
                </li>
                <li>
                  <strong className="text-foreground">Safari:</strong> Preferencias -&gt; Seguridad. Para más
                  información, puede consultar el soporte de Apple o la Ayuda del navegador.
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                Respecto de las cookies de terceros, es decir aquellas que son ajenas a nuestro sitio web, no podemos
                hacernos responsables del contenido y veracidad de las políticas de privacidad que ellos incluyen por lo
                que la información que le ofrecemos es siempre con referencia a la fuente.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Se puede modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con
                la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de
                Protección de Datos, por ello se aconseja a los Usuarios que la visiten periódicamente.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicarán a los Usuarios
                bien mediante la web o a través de correo electrónico a los Usuarios registrados.
              </p>
            </LegalSection>

            <div className="rounded-2xl border border-border bg-muted/40 p-6 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Si tienes cualquier duda sobre este aviso legal, puedes contactar con nosotros en{" "}
                <a
                  href="mailto:info@cgafenixlasrozas.es"
                  className="font-semibold text-primary underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  info@cgafenixlasrozas.es
                </a>
                .
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

function LegalSection({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-elegant">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-black uppercase tracking-tight sm:text-xl">{title}</h2>
      </div>
      <div className="space-y-4 text-sm sm:text-base">{children}</div>
    </section>
  );
}
