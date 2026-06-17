import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * ParticleBackground
 *
 * Reusable canvas-based particle network. Extracted from Hero so any
 * section can use it. The parent must have `position: relative` and a
 * defined height (e.g. min-h-screen or py-28) for the canvas to fill.
 *
 * Props:
 *   isDark    — boolean, switches particle color
 *   count     — number of particles (default 55, use less for smaller sections)
 *   maxDist   — connection line max distance (default 110)
 *   speed     — particle velocity multiplier (default 1)
 *   opacity   — overall opacity of the whole canvas (default 1)
 *   repulse   — enable mouse repulsion (default true)
 */
export function ParticleBackground({
  isDark,
  count = 55,
  maxDist = 110,
  speed = 1,
  opacity = 1,
  repulse = true,
}) {
  const canvasRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleMouse = (e) => {
      if (!repulse) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const clearMouse = () => { mouse.x = null; mouse.y = null; };
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", clearMouse);

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3 * speed,
      vy: (Math.random() - 0.5) * 0.3 * speed,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isDark ? "rgba(122,184,74," : "rgba(80,130,40,";

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.x += dx * force * 0.03;
            p.y += dy * force * 0.03;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${color}0.55)`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${color}${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", clearMouse);
    };
  }, [isDark, count, maxDist, speed, repulse, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: repulse ? "auto" : "none",
        opacity,
        zIndex: 0,
      }}
    />
  );
}

export default ParticleBackground;