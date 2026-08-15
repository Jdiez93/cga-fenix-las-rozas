import * as React from "react";
import { motion, useScroll, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { useHeavyEffectsEnabled } from "./motion-config";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** px de desplazamiento total (positivo = se mueve más lento que el scroll) */
  distance?: number;
  /** opacidad/escala extra opcional */
  style?: MotionStyle;
};

/**
 * Capa con parallax vertical ligado al progreso de scroll del propio elemento.
 * Solo transform → compositor GPU, 60 FPS.
 */
export function ParallaxY({ children, className, distance = 80, style }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const enabled = useHeavyEffectsEnabled();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className} data-no-reveal>
      <motion.div style={enabled ? { y, willChange: "transform", ...style } : style}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Zoom suave (out/in) + fade ligados al scroll. Ideal para el hero:
 * la imagen empieza ampliada y se asienta a medida que avanzas.
 */
export function ScrollZoom({
  children,
  className,
  from = 1.12,
  to = 1,
  parallax = 60,
}: {
  children: React.ReactNode;
  className?: string;
  from?: number;
  to?: number;
  parallax?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const enabled = useHeavyEffectsEnabled(640);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [from, to]);
  const scale = useSpring(scaleRaw, { stiffness: 140, damping: 34, mass: 0.4 });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.55]);

  return (
    <div ref={ref} className={className} data-no-reveal>
      <motion.div
        className="h-full w-full"
        style={enabled ? { scale, y, opacity, willChange: "transform, opacity" } : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
