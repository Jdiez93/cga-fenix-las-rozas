import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { APPLE_EASE } from "./motion-config";

/**
 * Reveal 3D: el elemento flota hacia la cámara (translateZ + scale + fade-up)
 * al entrar en el viewport.
 */
export function Reveal3D({
  children,
  className,
  delay = 0,
  y = 34,
  z = -90,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  z?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      data-no-reveal
      className={className}
      style={{ perspective: 1100, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y, z, scale: 0.965 }}
      whileInView={{ opacity: 1, y: 0, z: 0, scale: 1 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: APPLE_EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number = 0.09) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: APPLE_EASE },
  },
};

/** Contenedor con aparición secuencial (fade-in-up + stagger). */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  as?: "div" | "ul" | "section";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-no-reveal
      className={className}
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </Comp>
  );
}

/** Hijo de <Stagger>. */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "span";
}) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}

/**
 * Reveal con clip-path (cortina) + barrido de brillo metálico estilo Apple.
 * Pensado para imágenes y contenedores visuales.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  sheen = true,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  sheen?: boolean;
  once?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Observer propio: SSR pinta el contenido visible y solo lo ocultamos una vez
  // que el observador está activo en cliente (nunca deja contenido invisible).
  const [state, setState] = React.useState<"idle" | "hidden" | "shown">("idle");

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    setState(alreadyVisible ? "shown" : "hidden");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setState("shown");
          else if (!once) setState("hidden");
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const shown = state !== "hidden";

  return (
    <motion.div
      ref={ref}
      data-no-reveal
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={false}
      animate={
        shown
          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1 }
          : { clipPath: "inset(0% 0% 100% 0%)", opacity: 0, scale: 1.03 }
      }
      transition={{ duration: 0.9, delay, ease: APPLE_EASE }}
    >


      {children}
      {sheen ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 z-10 w-1/3 skew-x-[-14deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
          initial={{ x: "-40%", opacity: 0 }}
          animate={shown ? { x: "420%", opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.1, delay: delay + 0.25, ease: APPLE_EASE }}
        />
      ) : null}
    </motion.div>
  );
}
