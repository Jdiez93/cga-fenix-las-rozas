import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Calendar, Newspaper, Instagram, FileSignature, Tv } from "lucide-react";

import img10 from "@/assets/medios-image-10.png.asset.json";
import img11 from "@/assets/medios-image-11.png.asset.json";
import img12 from "@/assets/medios-image-12.png.asset.json";
import img13 from "@/assets/medios-image-13.png.asset.json";

type Categoria = "Televisión" | "Prensa" | "Redes" | "Iniciativa";

type Noticia = {
  id: string;
  titulo: string;
  resumen: string;
  medio: string;
  fecha: string;
  fechaLarga: string;
  categoria: Categoria;
  url: string;
  imagen: string;
  alt: string;
  destacada?: boolean;
};

const NOTICIAS: Noticia[] = [
  {
    id: "turnfest",
    titulo:
      'Tres veteranos representarán a España en el Turnfest: "He estado 35 años sin tocar la gimnasia"',
    resumen:
      "Un grupo de veteranos españoles representará al país en el Festival Internacional Alemán de Gimnasia, demostrando, una vez más, que el deporte no entiende de edad.",
    medio: "Antena 3 Noticias",
    fecha: "28 MAY 2025",
    fechaLarga: "28 de mayo de 2025",
    categoria: "Prensa",
    url: "https://www.antena3.com/noticias/deportes/tres-veteranos-representaran-espana-turnfest-estado-35-anos-tocar-gimnasia_20250528683722427b27927d3db43519.html",
    imagen: img10.url,
    alt: "Gimnasta veterano del club ejecutando un ejercicio en la barra fija",
    destacada: true,
  },
  {
    id: "leipzig",
    titulo: "A3N Deportes: tres veteranos representarán a España en el Turnfest",
    resumen:
      "Dos de estos gimnastas de más de 50 años se han proclamado campeones en sus categorías en el gran festival de Leipzig.",
    medio: "A3N Deportes · Instagram",
    fecha: "2 JUN 2025",
    fechaLarga: "2 de junio de 2025",
    categoria: "Televisión",
    url: "https://www.instagram.com/reel/DKaRIQCNHhr/",
    imagen: img11.url,
    alt: "Fotograma del reportaje de A3N Deportes sobre los veteranos en Leipzig",
  },
  {
    id: "diana",
    titulo: "Diana Hidalgo marca un hito en la gimnasia española al competir frente a los chicos",
    resumen:
      "La gimnasta rompe barreras al medirse en categoría masculina, abriendo camino a las mujeres en la gimnasia artística masculina.",
    medio: "Antena 3 Noticias",
    fecha: "5 JUL 2022",
    fechaLarga: "5 de julio de 2022",
    categoria: "Prensa",
    url: "https://www.antena3.com/noticias/deportes/diana-hidalgo-marca-hito-gimnasia-espanola-competir-frente-chicos_2022070562c44a677523070001145ce0.html",
    imagen: img13.url,
    alt: "Diana Hidalgo durante una entrevista en el pabellón de competición",
  },
  {
    id: "change",
    titulo: "Apertura de un Change.org con más de 400 firmas",
    resumen:
      "Inclusión de la mujer en las competiciones de gimnasia artística masculina: una petición que sigue sumando apoyos.",
    medio: "Change.org",
    fecha: "2022",
    fechaLarga: "Petición abierta desde 2022",
    categoria: "Iniciativa",
    url: "https://www.change.org/p/inclusi%C3%B3n-de-la-mujer-en-las-competiciones-de-gimnasia-art%C3%ADstica-masculina?recruiter=false&recruited_by_id=b3b44b90-b7d4-11ec-8d6a-9f63f4c01bc9",
    imagen: img12.url,
    alt: "Gimnasta del club entrenando sobre el tapiz",
  },
];

const CATEGORIA_ICONO: Record<Categoria, typeof Newspaper> = {
  Televisión: Tv,
  Prensa: Newspaper,
  Redes: Instagram,
  Iniciativa: FileSignature,
};

const FILTROS = ["Todas", "Prensa", "Televisión", "Iniciativa"] as const;

function CategoriaBadge({ categoria }: { categoria: Categoria }) {
  const Icon = CATEGORIA_ICONO[categoria];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground backdrop-blur">
      <Icon className="h-3 w-3 text-primary" aria-hidden />
      {categoria}
    </span>
  );
}

function NewsCard({ noticia, index }: { noticia: Noticia; index: number }) {
  return (
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 90}ms` }}
      className="group relative flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-border bg-card opacity-0 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-elegant"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-carbon">
        <img
          src={noticia.imagen}
          alt={noticia.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <CategoriaBadge categoria={noticia.categoria} />
        </div>
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-carbon-foreground">
          <span>{noticia.medio}</span>
          <span className="inline-flex items-center gap-1 opacity-80">
            <Calendar className="h-3 w-3" aria-hidden />
            {noticia.fecha}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
          {noticia.titulo}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{noticia.resumen}</p>
        <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-carbon px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-carbon-foreground transition-all group-hover:bg-gradient-fire group-hover:text-primary-foreground">
          Más info
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-fire transition-transform duration-500 group-hover:scale-x-100" />
    </a>
  );
}

function FeaturedCard({ noticia }: { noticia: Noticia }) {
  return (
    <a
      href={noticia.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative grid animate-fade-up overflow-hidden rounded-[2rem] border border-border bg-card opacity-0 shadow-sm transition-all duration-500 hover:border-primary/60 hover:shadow-elegant lg:grid-cols-[1.15fr_1fr]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-carbon lg:aspect-auto lg:min-h-[420px]">
        <img
          src={noticia.imagen}
          alt={noticia.alt}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-carbon/25" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-fire px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-primary-foreground">
            Destacado
          </span>
          <CategoriaBadge categoria={noticia.categoria} />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          <span className="text-primary">{noticia.medio}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{noticia.fechaLarga}</span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl">
          {noticia.titulo}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{noticia.resumen}</p>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-primary-foreground transition-transform group-hover:scale-[1.03]">
          Leer la noticia
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}

function MediosPage() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todas");

  const destacada = NOTICIAS.find((n) => n.destacada)!;
  const resto = useMemo(
    () =>
      NOTICIAS.filter((n) => !n.destacada).filter((n) => filtro === "Todas" || n.categoria === filtro),
    [filtro],
  );

  const mostrarDestacada = filtro === "Todas" || destacada.categoria === filtro;

  return (
    <div className="bg-background">
      {/* Intro */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-foreground">
            <Newspaper className="h-3.5 w-3.5 text-primary" aria-hidden />
            Sala de prensa
          </span>
          <h1 className="mt-6 text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
            Lee nuestras noticias más recientes
          </h1>
          <span className="mx-auto mt-5 block h-[3px] w-24 animate-shimmer-line rounded-full bg-gradient-fire" />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Televisión, prensa e iniciativas sociales que han puesto el foco en el CGA Fénix Las Rozas
            y en la gimnasia artística que defendemos cada día.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
            {FILTROS.map((f) => {
              const activo = f === filtro;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  aria-pressed={activo}
                  className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                    activo
                      ? "border-primary bg-gradient-fire text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Noticias */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        {mostrarDestacada && <FeaturedCard noticia={destacada} />}

        {resto.length > 0 && (
          <div className={`grid gap-7 sm:grid-cols-2 lg:grid-cols-3 ${mostrarDestacada ? "mt-10" : ""}`}>
            {resto.map((noticia, i) => (
              <NewsCard key={noticia.id} noticia={noticia} index={i} />
            ))}
          </div>
        )}

        {!mostrarDestacada && resto.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No hay apariciones en esta categoría por ahora.
          </p>
        )}
      </section>

      {/* Cierre */}
      <section className="border-t border-border bg-carbon">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-14 text-center">
          <h2 className="text-xl font-black uppercase tracking-[0.12em] text-carbon-foreground sm:text-2xl">
            ¿Eres periodista o medio de comunicación?
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-carbon-foreground/70">
            Escríbenos y te facilitamos material, declaraciones y acceso a nuestros entrenamientos.
          </p>
          <a
            href="/contacto"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-fire px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-105"
          >
            Contactar con el club
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/medios")({
  head: () => ({
    meta: [
      { title: "En los medios · CGA Fénix Las Rozas" },
      {
        name: "description",
        content:
          "Apariciones del CGA Fénix Las Rozas en televisión y prensa: Turnfest de Leipzig, Diana Hidalgo y la inclusión femenina en la gimnasia artística masculina.",
      },
      { property: "og:title", content: "En los medios · CGA Fénix Las Rozas" },
      {
        property: "og:description",
        content:
          "Televisión, prensa e iniciativas que han hablado del CGA Fénix Las Rozas y de la gimnasia artística.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MediosPage,
});
