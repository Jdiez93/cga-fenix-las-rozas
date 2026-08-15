import { useEffect, useState } from "react";

/** Easing "Apple" compartido por todas las animaciones. */
export const APPLE_EASE = [0.16, 1, 0.3, 1] as const;
export const APPLE_EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * true cuando los efectos pesados (parallax, tilt 3D, glow que sigue el cursor)
 * deben desactivarse: pantallas pequeñas, dispositivos táctiles o
 * prefers-reduced-motion.
 */
export function useHeavyEffectsEnabled(minWidth = 768) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      `(min-width: ${minWidth}px) and (hover: hover) and (prefers-reduced-motion: no-preference)`,
    );
    const onChange = () => setEnabled(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [minWidth]);

  return enabled;
}
