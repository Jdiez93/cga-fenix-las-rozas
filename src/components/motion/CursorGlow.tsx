import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { APPLE_EASE, useHeavyEffectsEnabled } from "./motion-config";

/**
 * Iluminación interactiva (radial glow mesh) que sigue el cursor dentro de la
 * sección contenedora. Puramente decorativa y desactivada en móvil/táctil.
 */
export function CursorGlow({
  className,
  size = 520,
  intensity = 14,
}: {
  className?: string;
  size?: number;
  intensity?: number;
}) {
  const enabled = useHeavyEffectsEnabled();
  const [active, setActive] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });
  const background = useTransform(
    [sx, sy],
    ([px, py]: number[]) =>
      `radial-gradient(${size}px circle at ${px}px ${py}px, color-mix(in oklab, var(--primary) ${intensity}%, transparent), transparent 65%)`,
  );

  React.useEffect(() => {
    if (!enabled) return;
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      setActive(true);
    };
    const onLeave = () => setActive(false);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={enabled ? { background } : undefined}
      animate={{ opacity: enabled && active ? 1 : 0 }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
    />
  );
}
