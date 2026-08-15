import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { APPLE_EASE, useHeavyEffectsEnabled } from "./motion-config";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  /** grados máximos de inclinación */
  max?: number;
  /** brillo radial que sigue el cursor dentro de la tarjeta */
  glow?: boolean;
  as?: "div" | "a" | "article" | "li";
} & Record<string, unknown>;

/**
 * Tarjeta con inclinación 3D mouse-follow (perspective + rotateX/rotateY)
 * y glow radial opcional. Se desactiva en móvil/táctil/reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 9,
  glow = true,
  as = "div",
  ...rest
}: TiltCardProps) {
  const enabled = useHeavyEffectsEnabled();
  const [hover, setHover] = React.useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const springCfg = { stiffness: 200, damping: 22, mass: 0.35 };
  const rotateX = useSpring(rx, springCfg);
  const rotateY = useSpring(ry, springCfg);
  const glowBg = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x}% ${y}%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    mx.set(px * 100);
    my.set(py * 100);
  };

  const onLeave = () => {
    setHover(false);
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      {...(rest as Record<string, never>)}
      onMouseEnter={() => enabled && setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        perspective: 900,
        ...(enabled ? { rotateX, rotateY } : {}),
      }}
      whileHover={enabled ? { scale: 1.025 } : undefined}
      transition={{ duration: 0.4, ease: APPLE_EASE }}
    >
      {children}
      {glow && enabled ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: glowBg }}
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.45, ease: APPLE_EASE }}
        />
      ) : null}
    </Comp>
  );
}
