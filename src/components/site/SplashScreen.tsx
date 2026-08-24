import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logoFenixJpeg } from "@/lib/media";
import { APPLE_EASE } from "@/components/motion/motion-config";

const PHRASES = [
  "Preparando el tapiz...",
  "Calentando anillas...",
  "Ajustando las barras...",
  "¡Listos para volar!",
];

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Duración total: ~1.8s
    const phraseInterval = setInterval(() => {
      setPhase((p) => (p + 1) % PHRASES.length);
    }, 400);

    const hideTimer = setTimeout(() => {
      setShow(false);
      clearInterval(phraseInterval);
    }, 1600);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: APPLE_EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-carbon"
          aria-label="Pantalla de carga"
        >
          {/* Fondo dinámico con partículas de fuego */}
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--primary) 30%, transparent) 0%, color-mix(in oklab, var(--primary) 5%, transparent) 60%, transparent 100%)",
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute -bottom-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, oklch(0.7 0.18 55) 20%, transparent) 0%, color-mix(in oklab, oklch(0.7 0.18 55) 5%, transparent) 60%, transparent 100%)",
              }}
            />
          </div>

          {/* Líneas de gimnasia decorativas */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1="0%"
                y1={`${20 + i * 15}%`}
                x2="100%"
                y2={`${20 + i * 15}%`}
                stroke="url(#lineGrad)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  delay: 0.1 * i,
                  ease: APPLE_EASE,
                }}
              />
            ))}
          </svg>

          {/* Escudo central */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.15, opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Glow detrás del escudo */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-8 rounded-full bg-primary/30 blur-3xl"
            />

            <div className="relative">
              <div
                className="rounded-full bg-black p-3 ring-2 ring-primary/40"
                style={{
                  boxShadow:
                    "0 0 60px -15px color-mix(in oklab, var(--primary) 50%, transparent)",
                }}
              >
                <img
                  src={logoFenixJpeg.url}
                  alt="CGA Fénix Las Rozas"
                  className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
                />
              </div>
              {/* Anillo giratorio decorativo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-0 -m-4 rounded-full border border-dashed border-primary/30"
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: APPLE_EASE }}
              className="mt-8 text-center text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl"
            >
              CGA Fénix <span className="text-primary">Las Rozas</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 flex h-6 items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: APPLE_EASE }}
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground sm:text-sm"
                >
                  {PHRASES[phase]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Barra de progreso inferior */}
          <div className="absolute bottom-12 left-1/2 z-10 w-48 -translate-x-1/2 sm:w-64">
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, ease: APPLE_EASE }}
                className="h-full bg-gradient-fire"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              Gimnasia Artística
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

