import * as React from "react";
import { useRouterState } from "@tanstack/react-router";

/* ------------------------------------------------------------------
   AutoReveal — animaciones scroll-driven globales (bidireccionales)
   - Marca automáticamente elementos "revelables" en cada página
   - Al entrar en viewport: fade + slide/scale suave
   - Al salir: vuelve al estado oculto (re-anima al volver a entrar,
     tanto bajando como subiendo)
   - Solo opacity/transform, IO nativo, respeta prefers-reduced-motion
-------------------------------------------------------------------*/

const SKIP_SELECTOR =
  "[data-no-reveal], [data-no-reveal] *, header, nav, [role='dialog'], [data-radix-popper-content-wrapper], table, thead, tbody, tr, td, th, input, textarea, select, .contents-reveal";

function isSkippable(el: HTMLElement) {
  if (el.hasAttribute("data-reveal")) return true;
  if (el.closest(SKIP_SELECTOR)) return true;
  const style = window.getComputedStyle(el);
  if (style.position === "fixed" || style.position === "sticky") return true;
  if (style.display === "contents") return true;
  const rect = el.getBoundingClientRect();
  if (rect.height < 8) return true;
  if (rect.height > window.innerHeight * 2.4) return true;
  return false;
}

/** Elige los elementos a animar: hijos directos de secciones y cards. */
function collectTargets(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const containers = Array.from(
    root.querySelectorAll<HTMLElement>("section, article, footer > div, main > div"),
  );

  const push = (el: HTMLElement) => {
    if (!isSkippable(el)) out.push(el);
  };

  for (const container of containers) {
    const kids = Array.from(container.children) as HTMLElement[];
    for (const kid of kids) {
      if (isSkippable(kid)) continue;
      // Si el hijo es un wrapper grande, animamos sus hijos (grids de cards)
      const grandKids = Array.from(kid.children) as HTMLElement[];
      const isGrid = grandKids.length > 2 && kid.getBoundingClientRect().height > 260;
      if (isGrid) {
        grandKids.forEach(push);
      } else {
        push(kid);
      }
    }
  }
  return out;
}

export function AutoReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | null = null;
    let raf = 0;

    const setup = () => {
      const root = document.querySelector("main");
      if (!root) return;
      const targets = collectTargets(root);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              const idx = Number(el.dataset["revealIndex"] ?? 0);
              el.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
              el.setAttribute("data-reveal", "in");
            } else {
              const rect = entry.boundingClientRect;
              // dirección según el lado por el que sale
              el.style.setProperty("--rv-y", rect.top > 0 ? "26px" : "-20px");
              el.style.transitionDelay = "0ms";
              el.setAttribute("data-reveal", "out");
            }
          }
        },
        { threshold: 0.06, rootMargin: "0px 0px -6% 0px" },
      );

      targets.forEach((el, i) => {
        const siblingIndex = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
        el.dataset["revealIndex"] = String(siblingIndex >= 0 ? siblingIndex : i);
        el.style.setProperty("--rv-y", "26px");
        el.setAttribute("data-reveal", "out");
        io!.observe(el);
      });
    };

    // esperar a que la página pinte antes de medir
    raf = requestAnimationFrame(() => requestAnimationFrame(setup));

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        el.removeAttribute("data-reveal");
        el.style.removeProperty("--rv-y");
        el.style.transitionDelay = "";
      });
    };
  }, [pathname]);

  return null;
}
