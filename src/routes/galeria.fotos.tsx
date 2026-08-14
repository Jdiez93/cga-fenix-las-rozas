import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { galImage14Png as p1 } from "@/lib/media";
import { galImage15Png as p2 } from "@/lib/media";
import { galImage16Png as p3 } from "@/lib/media";
import { galImage17Png as p4 } from "@/lib/media";
import { galImage18Png as p5 } from "@/lib/media";
import { galImage19Png as p6 } from "@/lib/media";
import { galImage20Png as p7 } from "@/lib/media";
import { galImageWebp as p8 } from "@/lib/media";
import { galImage2Webp as p9 } from "@/lib/media";
import { galImage3Webp as p10 } from "@/lib/media";
import { galImage23Png as p11 } from "@/lib/media";
import { galImage24Png as p12 } from "@/lib/media";
import { galImage25Png as p13 } from "@/lib/media";
import { galImage26Png as p14 } from "@/lib/media";
import { galImage27Png as p15 } from "@/lib/media";
import { galImage28Png as p16 } from "@/lib/media";
import { galImage34Png as p17 } from "@/lib/media";
import { galImage35Png as p18 } from "@/lib/media";
import { galImage36Png as p19 } from "@/lib/media";
import { galImage37Png as p20 } from "@/lib/media";
import { galImage38Png as p21 } from "@/lib/media";
import { galImage39Png as p22 } from "@/lib/media";

export const Route = createFileRoute("/galeria/fotos")({
  head: () => ({
    meta: [
      { title: "Galería de fotos · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Fotos del CGA Fénix Las Rozas: equipos GAF y GAM, competiciones, podios y entrenamientos en el Polideportivo Entremontes.",
      },
      { property: "og:title", content: "Galería de fotos · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Momentos del club: equipo, competición, podios y entrenamientos de nuestros gimnastas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: p1.url },
      { name: "twitter:image", content: p1.url },
    ],
  }),
  component: FotosPage,
});

type Photo = {
  src: string;
  title: string;
  caption: string;
  span: string;
};

const PHOTOS: Photo[] = [
  {
    src: p1.url,
    title: "Toda la familia Fénix",
    caption: "Foto de grupo de la escuela al completo en el Polideportivo Entremontes.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: p3.url,
    title: "Barra de equilibrio",
    caption: "Concentración absoluta sobre la barra en competición internacional.",
    span: "md:row-span-2",
  },
  {
    src: p2.url,
    title: "Emoción compartida",
    caption: "El abrazo tras un ejercicio: el trabajo del entrenador y la gimnasta.",
    span: "md:row-span-2",
  },
  {
    src: p7.url,
    title: "Equipo GAF con medalla",
    caption: "Nuestras gimnastas celebrando el podio por equipos.",
    span: "md:row-span-2",
  },
  {
    src: p4.url,
    title: "Suelo",
    caption: "Elegancia y control en el ejercicio de suelo.",
    span: "md:col-span-2",
  },
  {
    src: p6.url,
    title: "Equipo GAM y su técnico",
    caption: "Medallas y trofeo FMG para nuestros gimnastas masculinos.",
    span: "md:row-span-2",
  },
  {
    src: p5.url,
    title: "Camino a la pista",
    caption: "Antes de competir: nervios, foco y equipo.",
    span: "md:row-span-2",
  },
  {
    src: p8.url,
    title: "Podio 7 Estrellas",
    caption: "Nuestro gimnasta en el podio del Trofeo 7 Estrellas.",
    span: "md:col-span-2",
  },
  {
    src: p9.url,
    title: "Nacional Base Masculino",
    caption: "Medalla en el Campeonato de España Base de Guadalajara.",
    span: "md:row-span-2",
  },
  {
    src: p10.url,
    title: "Entrenamiento en Entremontes",
    caption: "Calentamiento y flexibilidad: la base de cada temporada.",
    span: "md:col-span-2",
  },
  {
    src: p11.url,
    title: "Carla González en suelo",
    caption: "Nuestra gimnasta en el Campeonato de España, lista para su ejercicio de suelo.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: p12.url,
    title: "Fénix en la espalda",
    caption: "El escudo bordado en el maillot y la complicidad entre compañeras.",
    span: "md:row-span-2",
  },
  {
    src: p13.url,
    title: "Técnicos y gimnastas",
    caption: "Cuerpo técnico junto a nuestras gimnastas en jornada de competición.",
    span: "md:col-span-2",
  },
  {
    src: p14.url,
    title: "Abrazo en Pamplona",
    caption: "Cto. de España GAM-GAF 2023: emoción tras el ejercicio.",
    span: "md:row-span-2",
  },
  {
    src: p15.url,
    title: "Pino en competición FMG",
    caption: "Ejercicio de suelo en un campeonato de la Federación Madrileña.",
    span: "md:col-span-2",
  },
  {
    src: p16.url,
    title: "Espíritu Fénix",
    caption: "La mirada del club: resurgir siempre, con fuego dentro.",
    span: "md:row-span-2",
  },
];


function FotosPage() {
  const [open, setOpen] = useState<number | null>(null);

  const list = PHOTOS;

  const move = useCallback(
    (dir: number) => {
      setOpen((cur) => (cur === null ? cur : (cur + dir + list.length) % list.length));
    },
    [list.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  return (
    <main className="bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              <Camera className="h-3.5 w-3.5" /> Galería
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Fotos que cuentan lo que somos
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Competiciones, podios, entrenamientos y equipo. Abre cualquier
              imagen a pantalla completa y revive cada momento del club.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        <motion.div
          layout
          className="grid auto-rows-[160px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[180px] md:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {list.map((photo, i) => (
              <motion.button
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpen(i)}
                className={`group relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-border bg-card text-left ${photo.span}`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-base font-bold leading-tight text-foreground drop-shadow">
                    {photo.title}
                  </p>
                </div>
                <span className="pointer-events-none absolute right-4 top-4 rounded-full border border-primary/40 bg-background/70 p-2 opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-primary" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Seguimos subiendo fotos de cada competición y de cada temporada.
        </p>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 rounded-full border border-border bg-card p-3 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                move(-1);
              }}
              aria-label="Anterior"
              className="absolute left-3 z-10 rounded-full border border-border bg-card/80 p-3 text-foreground transition-colors hover:border-primary hover:text-primary md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                move(1);
              }}
              aria-label="Siguiente"
              className="absolute right-3 z-10 rounded-full border border-border bg-card/80 p-3 text-foreground transition-colors hover:border-primary hover:text-primary md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={list[open].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex max-h-[88vh] w-full max-w-5xl flex-col items-center px-14"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={list[open].src}
                alt={list[open].title}
                className="max-h-[70vh] w-auto rounded-2xl border border-border object-contain shadow-2xl"
              />
              <figcaption className="mt-5 max-w-2xl text-center">
                <p className="mt-2 text-lg font-bold text-foreground">{list[open].title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{list[open].caption}</p>
                <p className="mt-3 text-xs font-semibold tracking-widest text-muted-foreground">
                  {open + 1} / {list.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
