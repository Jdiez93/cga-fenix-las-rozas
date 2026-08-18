import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Medal } from "lucide-react";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico")({
  component: () => <Outlet />,
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
  /** CSS object-position para encuadrar bien el retrato */
  photoPosition?: string;
  highlight?: boolean;
};

export const COACHES: Coach[] = [
  {
    slug: "luis-s-rodriguez",
    name: "D. Luis S. Rodríguez",
    role: "Director Deportivo",
    bio: "Internacional con España en 34 ocasiones y entrenador desde 1971. Licenciado en Ciencias de la Educación Física y del Deporte, con el tercer nivel de capacitación en artística masculina y femenina.",
    longBio: [
      "Luis S. Rodríguez es un referente en la gimnasia artística masculina, reconocido por su vasta experiencia y dedicación al deporte. Con un historial impresionante, ha sido miembro del equipo nacional de gimnasia y ha representado a nuestro país en competiciones internacionales en **treinta y cuatro ocasiones**. Desde 1971, ha estado al frente como entrenador, impartiendo no solo su conocimiento técnico, sino también su pasión por la gimnasia a generaciones de gimnastas.",
      "Es **Licenciado en Ciencias de la Educación Física y el Deporte**, lo que le permite abordar el entrenamiento desde una perspectiva integral, combinando teoría y práctica. Además, ha alcanzado el **tercer nivel de capacitación en gimnasia artística masculina y femenina**, garantizando así un nivel de enseñanza de alta calidad.",
      "Con Luis como entrenador, nuestros gimnastas tienen la oportunidad de crecer y perfeccionar sus habilidades bajo una guía experta y comprometida. Su enfoque en el desarrollo personal y deportivo es fundamental para forjar no solo grandes atletas, sino también excelentes personas.",
    ],
    closingNote: "¡Estamos emocionados de contar con su liderazgo en el camino hacia el éxito!",
    initials: "LR",
    photo: "/images/coaches/luis-rodriguez.jpg",
    photoPosition: "50% 20%",
    highlight: true,
  },
  {
    slug: "miguel-alvarez",
    name: "Miguel Álvarez",
    role: "Entrenador",
    bio: "Campeón de España 2013 y competidor activo entre 2011 y 2020. Juez de Gimnasia Artística Masculina nivel I y entrenador titulado nivel I.",
    longBio: [
      "Miguel Álvarez es un apasionado de la gimnasia artística masculina, no solo como juez, sino también como un experimentado gimnasta. Con una trayectoria destacada, Miguel fue un competidor activo desde 2011 hasta 2020, acumulando numerosos logros en su carrera.",
      "Adicionalmente, Miguel se ha desempeñado como **Juez de Gimnasia Artística Masculina nivel I**, lo que le permite evaluar y comprender la competición desde una perspectiva técnica y objetiva. Actualmente ha accedido a la consecución de la titulación de **entrenador de nivel I**, y combina su pasión por la gimnasia con su formación académica, cursando un Doble Grado en Derecho y Economía en la Universidad Carlos III de Madrid (2021–actualidad).",
    ],
    achievementsTitle: "Logros destacados",
    achievements: [
      "3º clasificado general en el Campeonato de España 2012",
      "Campeón de España en clasificación general 2013",
      "Campeón de Madrid en clasificación general (2013, 2014 y 2015)",
      "Subcampeón en el Torneo de Covadonga 2016 en clasificación general",
      "3º clasificado en el Campeonato Autonómico Vía Olímpica 9 (2019)",
      "Más de 50 medallas en clasificaciones por aparatos en torneos autonómicos y nacionales (2011–2019)",
    ],
    closingNote: "¡Con Miguel en el equipo, nuestros gimnastas tienen la oportunidad de aprender de un verdadero campeón!",
    initials: "MA",
    photo: "/images/coaches/miguel-alvarez.jpg",
    photoPosition: "50% 45%",
  },
  {
    slug: "juan-toharia",
    name: "Juan Toharia",
    role: "Entrenador",
    bio: "Cuatro años entrenando en el club y entrenador titulado de primer nivel. Gimnasta en activo con medalla cada año en los Campeonatos de España, mientras estudia ingeniería de caminos.",
    longBio: [
      "Juan comenzó ayudando en los entrenamientos del club porque necesitaba realizar un trabajo para el instituto. Lo que empezó como una tarea escolar terminó convirtiéndose en una auténtica pasión: le gustó tanto la experiencia que pidió encargarse de un pequeño grupo de niños para iniciarse como entrenador. Desde entonces, la gimnasia lo ha enganchado por completo.",
      "Lleva ya **cuatro de los seis años entrenando con nosotros**, tiempo en el que ha demostrado compromiso, paciencia y una evolución constante. Ha obtenido su **titulación de entrenador de primer nivel** y ha logrado que varios de sus chavales compitan a nivel autonómico, un logro que habla de su dedicación y de su capacidad para formar deportistas.",
      "Y por si fuera poco, sigue como gimnasta en activo, consiguiendo todos los años **medalla en los Campeonatos de España**.",
      "Todo esto lo ha conseguido sin abandonar sus estudios de ingeniería de caminos, equilibrando ambas responsabilidades con una disciplina admirable. La gimnasia tiene ese poder: cuando te atrapa, lo hace a tope.",
    ],
    initials: "JT",
    photo: "/images/coaches/juan-toharia.jpg",
    photoPosition: "50% 45%",
  },
  {
    slug: "elena-faura",
    name: "Elena Faura",
    role: "Entrenadora",
    bio: "Competidora desde muy joven en gimnasia acrobática, domina dos especialidades: acrobática y artística femenina.",
    longBio: [
      "Es un valioso miembro de nuestro equipo de entrenadores, cuya trayectoria en la gimnasia compitiendo desde muy jovencita en la especialidad de **gimnasia acrobática** la convierte en un referente para nuestros gimnastas, pues domina dos especialidades como son la **acrobática** y la **artística femenina**.",
      "Su pasión por la gimnasia la ha impulsado a compartir su conocimiento y amor por este deporte con los nuevos talentos. Como entrenadora, Elena se enfoca en desarrollar la técnica y la mentalidad de sus gimnastas, instándolos a superarse día a día y a disfrutar del proceso. Su experiencia en la competición y su cercanía con las gimnastas la convierten en una mentora excepcional. Con su guía, nuestros deportistas están en el camino correcto para alcanzar sus objetivos y disfrutar de la gimnasia al máximo.",
    ],
    closingNote: "¡Estamos emocionados de tenerla en nuestro equipo!",
    initials: "EF",
    photo: "/images/coaches/elena-faura.jpg",
    photoPosition: "50% 30%",
  },
  {
    slug: "david-alonso",
    name: "David Alonso",
    role: "Entrenador",
    bio: "Estudiante de ingeniería aeroespacial y gimnasta en activo hasta 2025. Prepara la titulación de entrenador de primer nivel y ya ha llevado a competir a varias de sus gimnastas.",
    longBio: [
      "David es estudiante de **ingeniería aeroespacial** y gimnasta en activo hasta 2025, un verdadero enamorado de este deporte. La temporada pasada comenzó sus prácticas como entrenador, trabajando con un grupo de niñas. Desde el primer día destacó por su madurez, su integridad y su constancia, cualidades que han hecho que esté plenamente preparado para presentarse a la **titulación de entrenador de primer nivel**.",
      "Las niñas que entrena han avanzado con él de manera notable; incluso algunas han llegado a competir, un reto que David ha afrontado con dedicación, responsabilidad y una ilusión que contagia a todo el equipo.",
    ],
    initials: "DA",
    photo: "/images/coaches/david-alonso.jpg",
    photoPosition: "30% 30%",
  },
];


export function CoachPortrait({ coach, className = "" }: { coach: Coach; className?: string }) {
  if (coach.photo) {
    return (
      <img
        src={coach.photo}
        alt={coach.name}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectPosition: coach.photoPosition ?? "50% 30%" }}
        loading="lazy"
        decoding="async"
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

export function CoachCard({ coach, index }: { coach: Coach; index: number }) {
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
        className="group relative grid h-full grid-cols-[42%_1fr] overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_50px_-20px_color-mix(in_oklab,hsl(var(--primary))_45%,transparent)]"
      >
        {/* Foto (izquierda) */}
        <div className="relative overflow-hidden">
          <CoachPortrait coach={coach} className="transition-transform duration-500 group-hover:scale-[1.04]" />
          {isDirector && (
            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
              <Medal className="h-3 w-3" />
              Director
            </div>
          )}
        </div>

        {/* Info (derecha) */}
        <div className="flex flex-col p-5 md:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {coach.role}
          </p>
          <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground md:text-xl">
            {coach.name}
          </h3>
          <div className="mt-3 h-px w-10 bg-primary/60 transition-all duration-300 group-hover:w-20" />

          {coach.bio && (
            <p className="mt-4 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
              {coach.bio}
            </p>
          )}

          <div className="mt-auto pt-5 flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            <span>Ver más</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
