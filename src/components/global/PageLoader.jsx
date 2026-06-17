import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * PageLoader
 *
 * A full-screen loader that plays once on the very first visit,
 * then fades away to reveal the portfolio.
 *
 * What it shows:
 *   - Initials appear letter by letter
 *   - A thin progress bar fills from left to right
 *   - The whole overlay slides up and out
 *
 * Usage — wrap your page content in App.jsx:
 *
 *   <PageLoader initials="GTN" isDark={isDark}>
 *     <Portfolio ... />
 *   </PageLoader>
 *
 * Props:
 *   initials  — string, e.g. "GTN"
 *   isDark    — boolean from your theme state
 *   children  — the page content revealed after loading
 *   minDelay  — ms to hold the loader even if data is ready (default: 1400)
 */
export function PageLoader({ initials = "GTN", isDark, children, minDelay = 1400 }) {
  const prefersReduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip the animation entirely on reduced motion or subsequent visits
    if (prefersReduced) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setDone(true), minDelay);
    return () => clearTimeout(t);
  }, [prefersReduced, minDelay]);

  const letters = initials.split("");

  return (
    <>
      <AnimatePresence mode="wait">
        {!done && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99990,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "#111210" : "#f8f7f4",
            }}
            aria-label="Loading portfolio"
            role="status"
          >
            {/* Initials — letters stagger in */}
            <div
              style={{
                display: "flex",
                gap: "0.08em",
                marginBottom: 28,
              }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + i * 0.11,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "serif",
                    fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "#7ab84a",
                    lineHeight: 1,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: 80,
                height: 1.5,
                borderRadius: 2,
                overflow: "hidden",
                background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: minDelay / 1000 - 0.2,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  background: "#7ab84a",
                  transformOrigin: "left",
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Subtle label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              style={{
                marginTop: 20,
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: isDark ? "#f0ede8" : "#1a1916",
              }}
            >
              Portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — fade in after loader exits */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: done ? 0 : (minDelay / 1000 + 0.15) }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default PageLoader;