import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Users, Medal } from "lucide-react";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico")({
  head: () => ({
    meta: [
      { title: "Equipo técnico · CGA Fénix Las Rozas" },
      { name: "description", content: "Conoce al equipo técnico del club CGA Fénix Las Rozas: entrenadores con amplia trayectoria en gimnasia artística." },
      { property: "og:title", content: "Equipo técnico · CGA Fénix Las Rozas" },
      { property: "og:description", content: "Nuestros entrenadores: pasión, experiencia y compromiso con la gimnasia." },
    ],
  }),
  component: EquipoTecnicoPage,
});

export type Coach = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  longBio: string[];
  achievements?: string[];
  achievementsTitle?: string;
  extraSections?: { title: string; body: string[] }[];
  closingNote?: string;
  initials: string;
  photo?: string;
  highlight?: boolean;
};

export const COACHES: Coach[] = [
  {
    slug: "luis-s-rodriguez",
    name: "D. Luis S. Rodríguez",
    role: "Director Técnico",
    bio: "Uno de los expertos con más experiencia en la gimnasia artística masculina, con un currículum destacado como gimnasta internacional y entrenador.",
    longBio: [
      "Luis S. Rodríguez es un referente en la gimnasia artística masculina, reconocido por su vasta experiencia y dedicación al deporte. Con un historial impresionante, ha sido miembro del equipo nacional de gimnasia y ha representado a nuestro país en competiciones internacionales en **treinta y cuatro ocasiones**. Desde 1971, ha estado al frente como entrenador, impartiendo no solo su conocimiento técnico, sino también su pasión por la gimnasia a generaciones de atletas.",
      "Con Luis como entrenador, nuestros gimnastas tienen la oportunidad de crecer y perfeccionar sus habilidades bajo una guía experta y comprometida. Su enfoque en el desarrollo personal y deportivo es fundamental para forjar no solo grandes atletas, sino también excelentes personas.",
    ],
    achievementsTitle: "Resultados en competiciones más destacadas",
    achievements: [
      "1973 · XII Campeonato de España Juvenil, Gijón — 1º clasificado",
      "1974 · II Copa F.E.G. Júnior, Madrid — 1º clasificado",
      "1975 · Euro-torneo 75, Wiesbaden — 18º clasificado",
      "XIX Campeonato de España, Madrid — 4º clasificado",
      "XI Campeonato de Europa, Berna — 49º clasificado",
      "XVII Copa S.E. el Generalísimo, Madrid — 1º clasificado",
      "1976 · Torneo de clasificación para los JJ.OO. de Montreal, Wiesbaden — 43º",
      "1976 · Euro-torneo 76, Wiesbaden — 11º clasificado",
      "1976 · XX Campeonato de España, Gijón — 5º clasificado",
      "1977 · XXI Campeonato de España, Gijón — 4º clasificado",
      "1977 · Euro-torneo 77, Wiesbaden — 12º clasificado",
      "1978 · Euro-torneo 78, Wiesbaden — 20º clasificado",
      "1978 · XXII Campeonato de España, Madrid — 6º clasificado",
      "1979 · XIX Campeonato del Mundo, Estrasburgo — 78º clasificado",
      "1979 · XXIII Campeonato de España, Madrid — 5º clasificado",
      "1979 · Euro-torneo 79, Wiesbaden — 21º clasificado",
      "1979 · XXIII Copa de España, Madrid — 2º clasificado",
      "1979 · VIII Juegos del Mediterráneo, Split — 10º (plata por equipos, bronce en anillas)",
      "1980 · XXIV Campeonato de España — 4º clasificado",
      "1980 · Campeonato del Mundo, Fort Worth (Texas) — suplente",
    ],
    closingNote: "¡Estamos emocionados de contar con su liderazgo en el camino hacia el éxito!",
    initials: "LR",
    highlight: true,
  },
  {
    slug: "miguel-alvarez",
    name: "Miguel Álvarez",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años y Juez de Gimnasia Artística Masculina nivel I.",
    longBio: [
      "Miguel Álvarez es un apasionado de la gimnasia artística masculina, no solo como juez, sino también como un experimentado gimnasta. Con una trayectoria destacada, Miguel fue competidor activo desde 2011 hasta 2020, acumulando numerosos logros en su carrera.",
      "Adicionalmente, se ha desempeñado como **Juez de Gimnasia Artística Masculina nivel I**, lo que le permite evaluar y comprender la competición desde una perspectiva técnica y objetiva. Su experiencia en el tapiz y su conocimiento del deporte son fundamentales para guiar y motivar a nuestros gimnastas hacia la excelencia.",
      "Actualmente, Miguel ha accedido a la consecución de la titulación de entrenador de nivel I y combina su pasión por la gimnasia con su formación académica, cursando un Doble Grado en Derecho y Economía en la Universidad Carlos III de Madrid (2021–actualidad). Su dedicación tanto en el deporte como en su educación lo convierte en un modelo a seguir para nuestros atletas.",
    ],
    achievementsTitle: "Trayectoria competitiva",
    achievements: [
      "Clasificado general en el Campeonato de España 2012",
      "Campeón de España en clasificación general 2013",
      "Campeón de Madrid en clasificación general (2013, 2014 y 2015)",
      "Subcampeón en el Torneo de Covadonga 2016 (clasificación general)",
      "3º clasificado en el Campeonato Autonómico Vía Olímpica 9 (2019)",
      "Más de 50 medallas por aparatos en torneos autonómicos y nacionales (2011–2019)",
    ],
    closingNote: "¡Con Miguel en el equipo, nuestros gimnastas tienen la oportunidad de aprender de un verdadero campeón!",
    initials: "MA",
  },
  {
    slug: "juan-toharia",
    name: "Juan Toharia",
    role: "Entrenador",
    bio: "Gimnasta durante nueve años, con una amplia experiencia en gimnasia artística masculina.",
    longBio: [
      "Juan Toharia es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia artística masculina lo convierte en un referente para nuestros atletas. Como gimnasta en activo en Las Rozas desde 2013 hasta la actualidad, Juan vive intensamente el deporte, acumulando una rica experiencia competitiva y técnica a lo largo de los años.",
      "Su pasión por la gimnasia lo ha impulsado a compartir su conocimiento y amor por este deporte con los nuevos talentos. Como entrenador, Juan se enfoca en desarrollar la técnica y la mentalidad de sus gimnastas, instándolos a superarse día a día y a disfrutar del proceso.",
      "El compromiso de Juan con el crecimiento personal y deportivo de sus atletas es lo que lo distingue. Su experiencia en la competición y su cercanía con los gimnastas lo convierten en un mentor excepcional. Con su guía, nuestros deportistas están en el camino correcto para alcanzar sus objetivos y disfrutar de la gimnasia al máximo.",
    ],
    closingNote: "¡Estamos emocionados de tenerlo en nuestro equipo!",
    initials: "JT",
  },
  {
    slug: "lucia-navarro",
    name: "Lucía Navarro",
    role: "Entrenadora",
    bio: "Referente del cuerpo técnico, con una amplia trayectoria en gimnasia artística femenina.",
    longBio: [
      "Lucía Navarro es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia artística femenina sirve de referencia para nuestros atletas.",
      "Lucía comenzó a practicar gimnasia a los 3 años y compitió desde los 8 hasta los 17 años. Durante su carrera, ha participado en **4 campeonatos de España** y en varios torneos autonómicos de la Comunidad de Madrid. Además, cuenta con el título de **entrenadora de gimnasia artística de Nivel I** y un **Grado Superior en Educación Infantil**. Su experiencia incluye el trabajo con niños y niñas en diversos campamentos y actividades extraescolares.",
    ],
    extraSections: [
      {
        title: "Objetivos y filosofía de entrenamiento",
        body: [
          "Lucía se propone que los niños y niñas practiquen este deporte no solo para mejorar sus capacidades físicas, sino también mentales. Su enfoque prioritario es que los atletas se diviertan y disfruten, ya que considera que la diversión es esencial en el proceso de aprendizaje.",
          "Mantiene un trato cercano con los niños y niñas, atendiendo a sus necesidades individuales para conseguir un entorno seguro y de confianza. Gracias a su guía, nuestros deportistas experimentarán una evolución y crecimiento en su desarrollo gimnástico, lo que les permitirá amar y disfrutar aún más de la gimnasia.",
        ],
      },
    ],
    closingNote: "¡Nos encanta poder contar con Lucía en nuestro equipo!",
    initials: "LN",
  },
  {
    slug: "elena-faura",
    name: "Elena Faura",
    role: "Entrenadora",
    bio: "Entrenadora con gran pasión por la gimnasia y una sólida trayectoria en el deporte.",
    longBio: [
      "Elena Faura es una entrenadora con gran pasión por la gimnasia y una sólida trayectoria en el deporte, que comienza en la gimnasia acrobática, donde alcanzó el máximo nivel formando parte de la **selección española**. Su experiencia en el alto rendimiento le ha permitido acumular valiosos conocimientos que ahora transmite a sus gimnastas.",
      "Más allá de su carrera como deportista, encontró en la enseñanza su verdadera vocación, y se esforzó en la consecución de los títulos de **entrenadora de gimnasia acrobática Nivel I** y de **artística Nivel I**.",
      "Con un enfoque cercano y motivador, su objetivo es ayudar a cada gimnasta a desarrollar su máximo potencial, fortalecer su confianza y disfrutar del proceso de aprendizaje. Para ella, la gimnasia no es solo un deporte, sino una disciplina que enseña valores y deja una huella para toda la vida.",
      "Comprometida con el crecimiento deportivo y personal de sus alumnos, Elena trabaja cada día para que quienes entrenan con ella se superen, enfrenten nuevos retos y descubran todo lo que la gimnasia puede ofrecerles.",
    ],
    initials: "EF",
  },
  {
    slug: "manuel-inigo",
    name: "Manuel Íñigo",
    role: "Entrenador",
    bio: "Formado en el CAR de Madrid y miembro del equipo nacional. Juez Nivel II y entrenador Nivel II.",
    longBio: [
      "Manuel Íñigo es un entrenador con mucho que enseñar y con un corazón incomparable. Desde los dos años, la gimnasia artística ha sido su vida, lo que le ha hecho llegar a entrenar en el **Centro de Alto Rendimiento (CAR) de Madrid** y así formar parte del **equipo nacional de gimnasia**, acumulando grandes resultados y experiencias que no paran de multiplicarse, dedicando años de esfuerzo, disciplina y pasión al deporte que ama desde siempre.",
      "Manuel, además de gimnasta del equipo nacional, está titulado como **Juez de Nivel II** y cuenta con la titulación de **entrenador de gimnasia artística Nivel II**.",
      "Ahora su objetivo, además de entrenar para estar en la élite como gimnasta, es compartir todo lo que ha aprendido con los gimnastas nóveles, ayudándolos a desarrollar su máximo potencial y enseñarles que lo que aprendes no solo te sirve encima del aparato. Si buscas pasártelo bien sacando el gimnasta que llevas dentro y hacer el deporte más chulo del mundo, él está aquí para enseñarte todo lo que debes saber para que el arte de la gimnasia deje una huella imborrable en ti.",
    ],
    initials: "MI",
  },
  {
    slug: "david-alonso",
    name: "David Alonso",
    role: "Entrenador",
    bio: "Gimnasta en Las Rozas desde 2008 hasta 2023 y actualmente en el Club Gimnástico San Blas.",
    longBio: [
      "David Alonso es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia artística lo convierte en un referente dentro del club. **Gimnasta en el Club Gimnástico Las Rozas desde 2008 hasta 2023**, David ha vivido intensamente este deporte, acumulando una amplia experiencia competitiva y técnica a lo largo de los años.",
      "Su pasión por la gimnasia lo ha llevado a seguir desarrollándose y creciendo en esta disciplina formando parte del **Club Gimnástico San Blas desde 2023**, donde continúa perfeccionando su técnica y enfrentando nuevos desafíos con dedicación y esfuerzo.",
      "El compromiso de David con su progreso y su amor por la gimnasia lo distinguen. Su experiencia en la competición y su determinación lo convierten en un atleta ejemplar. Con su dedicación y constancia, sigue trazando el camino hacia nuevas metas y disfrutando de la gimnasia al máximo.",
    ],
    closingNote: "¡Estamos orgullosos de contar con él en nuestro equipo!",
    initials: "DA",
  },
  {
    slug: "aruca-rodriguez",
    name: "Aruca Rodríguez",
    role: "Entrenadora",
    bio: "Entrenadora del club, comprometida con la formación integral de las gimnastas.",
    longBio: [
      "Aruca forma parte del equipo técnico del CGA Fénix Las Rozas y trabaja día a día para que las gimnastas del club evolucionen tanto técnica como personalmente.",
      "Combina exigencia y cariño en la misma medida. En sus sesiones se busca el trabajo bien hecho, pero también la sonrisa, el compañerismo y el disfrute del deporte.",
      "Muy pronto ampliaremos su biografía con más detalles sobre su trayectoria y titulaciones.",
    ],
    initials: "AR",
  },
  {
    slug: "mar-cuesta",
    name: "Mar Cuesta",
    role: "Entrenadora",
    bio: "Entrenadora del club, cercana con las gimnastas y comprometida con su progresión.",
    longBio: [
      "Mar es una de las entrenadoras del Fénix. Aporta cercanía, dedicación y una gran capacidad para conectar con las gimnastas desde el primer día.",
      "Trabaja especialmente la técnica base y la actitud en el gimnasio: puntualidad, respeto y ganas de mejorar. Cree que el buen ambiente en el grupo es la mitad del progreso.",
      "Muy pronto ampliaremos su biografía con más detalles sobre su trayectoria y titulaciones.",
    ],
    initials: "MC",
  },
];

function EquipoTecnicoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 opacity-[0.05]" style={{ background: "var(--gradient-fire, transparent)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Users className="h-4 w-4" />
              <span>Quiénes somos</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Equipo técnico
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-primary" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Un cuerpo técnico con trayectoria, disciplina y pasión. Detrás de cada gimnasta del Fénix hay un
              entrenador comprometido con su crecimiento personal y deportivo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid de entrenadores */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COACHES.map((coach, i) => (
            <CoachCard key={coach.slug} coach={coach} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function CoachPortrait({ coach, className = "" }: { coach: Coach; className?: string }) {
  if (coach.photo) {
    return (
      <img
        src={coach.photo}
        alt={coach.name}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  // Placeholder retrato: silueta estilizada lista para sustituir por foto real
  return (
    <div className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-b from-muted via-background to-muted ${className}`}>
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4/5 w-auto opacity-40"
      >
        {/* Head */}
        <circle cx="100" cy="55" r="35" fill="currentColor" className="text-primary" />
        {/* Shoulders / Bust */}
        <path
          d="M100 95c-30 0-55 18-65 45-5 12-8 28-8 45v25h146v-25c0-17-3-33-8-45-10-27-35-45-65-45z"
          fill="currentColor"
          className="text-primary"
        />
      </svg>
    </div>
  );
}

function CoachCard({ coach, index }: { coach: Coach; index: number }) {
  const isDirector = coach.highlight;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to="/quienes-somos/equipo-tecnico/$slug"
        params={{ slug: coach.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
      >
        {/* Foto */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <CoachPortrait coach={coach} className="transition-transform duration-500 group-hover:scale-[1.04]" />

          {isDirector && (
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              <Medal className="h-3 w-3" />
              Director
            </div>
          )}

          {/* Bottom gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {coach.role}
          </p>
          <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
            {coach.name}
          </h3>
          <div className="mt-3 h-px w-10 bg-primary/60 transition-all duration-300 group-hover:w-20" />

          {coach.bio && (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {coach.bio}
            </p>
          )}

          <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            <span>Ver perfil</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
