import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * SmoothScroll
 *
 * Wraps the page with Lenis for buttery momentum-based smooth scrolling.
 * Automatically disabled when the user prefers reduced motion.
 *
 * Usage:
 *   1. npm install lenis
 *   2. Wrap your app in <SmoothScroll> inside App.jsx:
 *
 *      <SmoothScroll>
 *        <Portfolio ... />
 *      </SmoothScroll>
 *
 * Lenis works alongside framer-motion scroll hooks (useScroll) with no
 * extra configuration needed.
 */
export function SmoothScroll({ children }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let lenis;

    // Dynamically import so it doesn't block the initial bundle
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.15,         // scroll duration multiplier
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.8,
      });

      // Integrate with requestAnimationFrame
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Expose lenis on window so other components can call lenis.scrollTo()
      window.__lenis = lenis;
    });

    return () => {
      if (lenis) {
        lenis.destroy();
        window.__lenis = null;
      }
    };
  }, [prefersReduced]);

  return children;
}

/**
 * Helper — smooth-scroll to a target from anywhere in the app.
 * Usage: scrollTo("#projects")  or  scrollTo(0)  to go to top
 */
export function scrollTo(target, options = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: 1.2, ...options });
  } else {
    // Graceful fallback
    const el = typeof target === "string" ? document.querySelector(target) : null;
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default SmoothScroll;