import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Sparkles, Users, GraduationCap, Scale, ImageIcon } from "lucide-react";
import escudoAsset from "@/assets/escudo-fenix.png.asset.json";

export const Route = createFileRoute("/conocenos/historia")({
  head: () => ({
    meta: [
      { title: "Nuestra historia · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Descubre la historia de CGA Fénix Las Rozas: un club de gimnasia artística que resurgió con un proyecto único basado en la libertad, la inclusión y los valores.",
      },
      { property: "og:title", content: "Nuestra historia · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "De las cenizas al referente nacional. Conoce el origen, el escudo y el proyecto inclusivo del club CGA Fénix Las Rozas.",
      },
    ],
  }),
  component: HistoriaPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ImagePlaceholder({ label, aspect = "aspect-[4/3]" }: { label: string; aspect?: string }) {
  return (
    <div
      className={`group relative ${aspect} w-full overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-gradient-to-br from-muted to-background`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <ImageIcon className="h-8 w-8 opacity-40" />
        <span className="text-xs font-semibold uppercase tracking-widest">{label}</span>
        <span className="text-[10px] opacity-60">Imagen próximamente</span>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

function SectionHeading({
  kicker,
  title,
  icon: Icon,
}: {
  kicker: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/90">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-foreground/80">{kicker}</span>
      </div>
      <h2 className="text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="h-1 w-16 rounded-full bg-gradient-fire" />
    </div>
  );
}

function HistoriaPage() {
  return (
    <div className="bg-background">
      {/* Hero minimalista */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" />
              Nuestra historia
            </span>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Bienvenidos a{" "}
              <span className="text-gradient-fire">CGA Fénix Las Rozas</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Un club joven, ambicioso e inclusivo que ha resurgido para transformar la gimnasia
              artística desde Las Rozas de Madrid.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-[15px] leading-relaxed text-foreground/85"
          >
            <p>
              <span className="font-bold text-foreground">CGA Fénix Las Rozas</span> es un club de
              gimnasia artística de reciente creación que, en apenas cinco años, ha logrado un
              impulso significativo en la práctica de este deporte en el municipio. Nuestro
              compromiso se basa en el esfuerzo y la dedicación, con el objetivo de alcanzar metas
              ambiciosas en el desarrollo de nuestros gimnastas.
            </p>
            <p>
              Desde nuestros inicios hemos apostado por un enfoque renovador, promoviendo la{" "}
              <span className="font-semibold text-primary">
                libertad de elección de los aparatos
              </span>{" "}
              sin condicionantes de género. Creemos firmemente que cada gimnasta debe tener la
              oportunidad de explorar y mejorar en los aparatos que más le apasionan.
            </p>
            <p>
              Contamos con gimnastas desde iniciación hasta niveles de perfeccionamiento,
              competición y veteranos. Pese a nuestra corta trayectoria, nos hemos posicionado como
              un <span className="font-semibold text-foreground">referente nacional</span> en
              nuestras categorías, y seguiremos trabajando por promover y fomentar la gimnasia
              artística en nuestro municipio.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ImagePlaceholder label="Foto del club" aspect="aspect-[4/5]" />
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { k: "5+", v: "Años de historia" },
            { k: "100%", v: "Inclusivo" },
            { k: "4", v: "Niveles" },
            { k: "★", v: "Referente nacional" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
            >
              <div className="text-3xl font-black text-gradient-fire">{s.k}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {s.v}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Escudo */}
      <section className="border-y border-border bg-carbon text-carbon-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl border border-dashed border-primary/50 bg-carbon-2 p-6">
              <div className="flex h-full items-center justify-center">
                <Shield className="h-24 w-24 text-primary/60" />
              </div>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Escudo · imagen próximamente
              </span>
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading kicker="Símbolo" title="Nuestro escudo" icon={Flame} />
            <div className="space-y-4 text-[15px] leading-relaxed text-carbon-foreground/85">
              <p>
                El escudo de CGA Fénix Las Rozas simboliza el nacimiento del club y la pasión que
                nos impulsa. Tras un periodo de retirada, muchos de los fundadores decidimos{" "}
                <span className="font-semibold text-primary">resurgir de las cenizas</span> con un
                proyecto innovador y lleno de futuro para la gimnasia artística.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proyecto */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          kicker="Filosofía"
          title="Un proyecto único en la gimnasia artística"
          icon={Sparkles}
        />
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-5 text-[15px] leading-relaxed text-foreground/85">
            <p>
              Nuestro enfoque se basa en la{" "}
              <span className="font-semibold text-primary">
                libertad de practicar gimnasia artística
              </span>{" "}
              sin limitaciones físicas específicas. En CGA Fénix abrimos nuestras puertas a todas
              las personas interesadas en conocer y practicar este maravilloso deporte. No hay
              pruebas de acceso ni procesos de selección: aquí todos son bienvenidos.
            </p>
            <p>
              Fomentamos un ambiente inclusivo donde cada gimnasta tiene la oportunidad de
              iniciarse, perfeccionarse y competir en un entorno de apoyo y motivación.
            </p>
            <p>
              Creemos que la práctica regular del deporte contribuye a la salud y es fundamental en
              la formación de valores esenciales.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Esfuerzo",
                "Superación",
                "Autodisciplina",
                "Trabajo en equipo",
                "Respeto",
                "Amistad",
                "Humildad",
                "Honestidad",
                "Responsabilidad",
              ].map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-foreground"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <ImagePlaceholder label="Entrenamiento" />
        </div>
      </section>

      {/* Formación */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <SectionHeading
            kicker="Continuidad"
            title="Formación de gimnastas, entrenadores y jueces"
            icon={GraduationCap}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Gimnastas",
                d: "Formación integral desde iniciación hasta competición, adaptada a cada etapa.",
              },
              {
                t: "Entrenadores",
                d: "Preparamos a quienes desean seguir vinculados al deporte guiando a nuevas generaciones.",
              },
              {
                t: "Jueces",
                d: "Ofrecemos itinerarios para formar jueces oficiales de gimnasia artística.",
              },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-fire text-primary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Igualdad */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <ImagePlaceholder label="Igualdad en el deporte" aspect="aspect-[4/5]" />
          <div>
            <SectionHeading
              kicker="Misión"
              title="Hacia una gimnasia artística en igualdad"
              icon={Scale}
            />
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
              <p>
                Aunque hemos enfrentado críticas, estamos comprometidos con nuestra misión de
                eliminar la{" "}
                <span className="font-semibold text-primary">
                  segregación de aparatos por géneros
                </span>{" "}
                en la gimnasia artística. Aspiramos a un futuro en el que todos los gimnastas,
                independientemente de su género, puedan competir en iguales condiciones, con los
                mismos aparatos y regulaciones.
              </p>
              <p>
                Creemos que este cambio es crucial para que la gimnasia artística se convierta en
                un deporte único y cohesionado, donde hombres y mujeres compitan sin restricciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="relative overflow-hidden border-t border-border bg-carbon text-carbon-foreground">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-primary/10" />
        </div>
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-black leading-tight sm:text-5xl"
          >
            Únete a esta{" "}
            <span className="text-gradient-fire">emocionante aventura</span>
          </motion.h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-carbon-foreground/80">
            Cada niño y niña puede explorar su potencial, aprender valores fundamentales y
            disfrutar de la gimnasia artística en un ambiente inclusivo y motivador.
          </p>
        </div>
      </section>
    </div>
  );
}
