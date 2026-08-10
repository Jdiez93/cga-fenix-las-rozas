import * as React from "react";

/* ------------------------------------------------------------------
   Motor de animaciones scroll-driven (estilo apple.com)
   - Intersection Observer nativo (sin librerías)
   - Revela una sola vez (no re-anima al subir)
   - Respeta prefers-reduced-motion
   - Solo transform + opacity, will-change con cleanup
-------------------------------------------------------------------*/

export const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const REVEAL_EASE_BOUNCE = "cubic-bezier(0.34, 1.4, 0.64, 1)";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";
export type RevealVariant = "heading" | "card" | "cta" | "fade";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Dirección de scroll global (compartida por todos los consumidores). */
export function useScrollDirection() {
  const [direction, setDirection] = React.useState<"down" | "up">("down");
  React.useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) > 4) {
          setDirection(y > last ? "down" : "up");
          last = y;
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return direction;
}

export type UseScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
  /** ms de espera antes de revelar */
  delay?: number;
  /** revelar siempre (útil para contenido above-the-fold) */
  immediate?: boolean;
};

/**
 * Devuelve una ref y el estado de revelado. El elemento se revela la primera
 * vez que entra en viewport y nunca vuelve a animarse.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
  delay = 0,
  immediate = false,
}: UseScrollRevealOptions = {}) {
  const ref = React.useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  React.useEffect(() => {
    if (reduced || immediate) {
      setRevealed(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let done: ReturnType<typeof setTimeout> | undefined;
    let cleaned = false;

    const fire = () => {
      if (cleaned) return;
      cleaned = true;
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      timer = setTimeout(() => {
        setAnimating(true);
        setRevealed(true);
        // cleanup de will-change cuando termina la transición
        done = setTimeout(() => setAnimating(false), 950);
      }, delay);
    };

    // Fallback geométrico: garantiza el reveal aunque el IO no reporte
    // (iframes en segundo plano, navegadores antiguos, etc.)
    const checkRect = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const visible = Math.min(rect.bottom, vh * 0.92) - Math.max(rect.top, 0);
      if (visible > Math.min(rect.height * threshold, vh * 0.2)) fire();
    };

    const onScroll = () => checkRect();

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) fire();
            },
            { threshold, rootMargin },
          )
        : null;

    io?.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkRect();

    return () => {
      cleaned = true;
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (timer) clearTimeout(timer);
      if (done) clearTimeout(done);
    };
  }, [threshold, rootMargin, delay, reduced, immediate]);


  return { ref, revealed, animating, reduced };
}

const OFFSETS: Record<RevealDirection, string> = {
  up: "translate3d(0, 24px, 0)",
  down: "translate3d(0, -24px, 0)",
  left: "translate3d(28px, 0, 0)",
  right: "translate3d(-28px, 0, 0)",
  none: "translate3d(0, 0, 0)",
};

function hiddenTransform(variant: RevealVariant, direction: RevealDirection) {
  const offset = OFFSETS[direction];
  if (variant === "card") return `${offset} scale(0.96)`;
  if (variant === "cta") return `${offset} scale(0.98)`;
  return offset;
}

function variantDuration(variant: RevealVariant) {
  switch (variant) {
    case "heading":
      return 750;
    case "card":
      return 700;
    case "cta":
      return 600;
    default:
      return 650;
  }
}

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** retardo en ms */
  delay?: number;
  direction?: RevealDirection;
  variant?: RevealVariant;
  /** duración en ms (máx. recomendado 900) */
  duration?: number;
  threshold?: number;
  as?: "div" | "section" | "li" | "span" | "article" | "header" | "footer";
  style?: React.CSSProperties;
};

/** Envoltorio genérico de reveal. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  variant = "fade",
  duration,
  threshold,
  as = "div",
  style,
}: RevealProps) {
  const { ref, revealed, animating, reduced } = useScrollReveal<HTMLDivElement>({
    delay,
    ...(threshold !== undefined ? { threshold } : {}),
  });
  const Tag = as as React.ElementType;
  const ms = Math.min(duration ?? variantDuration(variant), 900);
  const ease = variant === "cta" ? REVEAL_EASE_BOUNCE : REVEAL_EASE;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translate3d(0, 0, 0) scale(1)" : hiddenTransform(variant, direction),
        transition: reduced
          ? "opacity 200ms linear"
          : `opacity ${ms}ms ${ease}, transform ${ms}ms ${ease}`,
        willChange: animating ? "transform, opacity" : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/** Aplica reveal escalonado a cada hijo directo (grids de cards). */
export function RevealGroup({
  children,
  className,
  stagger = 90,
  delay = 0,
  variant = "card",
  direction = "up",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  variant?: RevealVariant;
  direction?: RevealDirection;
  as?: RevealProps["as"];
}) {
  const items = React.Children.toArray(children);
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={className}>
      {items.map((child, i) => (
        <Reveal
          key={i}
          delay={delay + i * stagger}
          variant={variant}
          direction={direction}
          className="contents-reveal"
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}

/**
 * Parallax sutil: mueve el elemento a un ritmo distinto del scroll.
 * ratio recomendado 0.3–0.5. Solo transform, con rAF.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(ratio = 0.35) {
  const ref = React.useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${(progress * ratio * 100).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      visible = !!entries[0]?.isIntersecting;
      el.style.willChange = visible ? "transform" : "";
      if (visible) update();
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.willChange = "";
    };
  }, [ratio, reduced]);

  return ref;
}

/** Capa de fondo con parallax para secciones full-width. */
export function ParallaxLayer({
  children,
  ratio = 0.35,
  className,
}: {
  children?: React.ReactNode;
  ratio?: number;
  className?: string;
}) {
  const ref = useParallax<HTMLDivElement>(ratio);
  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
