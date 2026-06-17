import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * CustomCursor
 *
 * Renders two elements:
 *   - A small sharp dot that tracks the cursor exactly
 *   - A larger ring that follows with a smooth lag
 *
 * Usage: Mount once inside App.jsx, above everything else.
 * The native cursor is hidden via a global CSS class added to <html>.
 *
 * Automatically disabled when:
 *   - The user prefers reduced motion
 *   - The device is touch-only (no fine pointer)
 */
export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Disable on touch devices or reduced motion
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (prefersReduced || isTouch) return;

    // Hide native cursor
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Track hoverable elements (links, buttons, [data-cursor-hover])
    const onPointerOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor-hover]");
      setHovered(!!target);
    };

    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.addEventListener("pointerover", onPointerOver);

    // Animation loop — dot snaps, ring lags
    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      // Dot: snap to actual cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      // Ring: smooth follow with lerp
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [prefersReduced, isTouch]);

  if (prefersReduced || isTouch) return null;

  const opacity = hidden ? 0 : 1;

  return (
    <>
      {/* Sharp dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--cursor-color, #7ab84a)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity,
          marginLeft: -3,
          marginTop: -3,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? 42 : 30,
          height: hovered ? 42 : 30,
          marginLeft: hovered ? -21 : -15,
          marginTop: hovered ? -21 : -15,
          borderRadius: "50%",
          border: "1.5px solid var(--cursor-color, #7ab84a)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: opacity * (hovered ? 0.7 : 0.45),
          transition: "width 0.25s ease, height 0.25s ease, margin 0.25s ease, opacity 0.2s",
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />
    </>
  );
}

export default CustomCursor;

/*
 * Add these two rules to your global CSS (e.g. index.css):
 *
 * html.custom-cursor-active,
 * html.custom-cursor-active * {
 *   cursor: none !important;
 * }
 *
 * And optionally set the cursor accent color:
 *
 * :root {
 *   --cursor-color: #7ab84a;
 * }
 * .dark {
 *   --cursor-color: #7ab84a;
 * }
 */