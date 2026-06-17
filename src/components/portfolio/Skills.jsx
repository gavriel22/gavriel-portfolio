import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getTranslation } from "../../utils/translations";
import { ParticleBackground } from "../global/ParticleBackground";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ to, suffix = "", duration = 1400 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setCount(to); return; }

    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration, prefersReduced]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ─── Animated Progress Bar ────────────────────────────────────────────────────
function ProgressBar({ level = 80, color = "#7ab84a", delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const prefersReduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="h-[3px] w-full rounded-full overflow-hidden bg-black/8 dark:bg-white/8"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }
        }
        style={{
          height: "100%",
          background: color,
          borderRadius: 9999,
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

// ─── Skill Badge ──────────────────────────────────────────────────────────────
function SkillBadge({ s, i, prefersReduced }) {
  return (
    <motion.span
      initial={prefersReduced ? false : { opacity: 0, scale: 0.8, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: i * 0.045,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1], // spring-like overshoot
      }}
      whileHover={
        prefersReduced
          ? {}
          : { scale: 1.08, y: -2, transition: { type: "spring", stiffness: 400, damping: 18 } }
      }
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors cursor-default select-none
        ${
          s.featured
            ? "bg-[#edf5e5] text-brand border-brand/15 font-semibold dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20"
            : "bg-customBg-lightAccent text-customText-mutedLight border-black/8 hover:bg-[#edf5e5] hover:text-brand dark:bg-customBg-darkAccent dark:text-customText-mutedDark dark:border-white/8 dark:hover:bg-brand-darkBg dark:hover:text-brand-textDark"
        }`}
    >
      {s.logo && (
        <img
          src={s.logo}
          alt=""
          className={`w-3.5 h-3.5 object-contain rounded-sm ${s.invert ? "dark:invert-0" : ""}`}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      {s.name}
    </motion.span>
  );
}

// ─── Skill Group ───────────────────────────────────────────────────────────────
export function SkillGroup({ label, skills, isDark, prefersReduced, barDelay = 0 }) {
  if (!skills || skills.length === 0) return null;

  // Use featured count as proxy for "group proficiency level"
  const featuredCount = skills.filter((s) => s.featured).length;
  const level = Math.round(Math.min(100, 45 + (featuredCount / skills.length) * 55));

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: barDelay }}
    >
      {/* Label + proficiency bar */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] tracking-[0.12em] uppercase font-bold text-customText-subLight dark:text-customText-subDark">
          {label}
        </p>
        <span className="text-[10px] font-mono text-customText-subLight dark:text-customText-subDark opacity-60">
          {level}%
        </span>
      </div>

      <div className="mb-4">
        <ProgressBar level={level} delay={barDelay + 0.1} />
      </div>

      {/* Staggered skill badges */}
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <SkillBadge key={i} s={s} i={i} prefersReduced={prefersReduced} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stats Row ────────────────────────────────────────────────────────────────
function StatsRow({ lang }) {
  const stats = [
    { value: 10, suffix: "+", label: lang === "en" ? "Projects" : "Proyek" },
    { value: 5, suffix: "+", label: lang === "en" ? "Technologies" : "Teknologi" },
    { value: 2, suffix: "yr", label: lang === "en" ? "Experience" : "Pengalaman" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-14">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-brand dark:text-[#7ab84a] font-semibold leading-none mb-1">
            <AnimatedCounter to={s.value} suffix={s.suffix} />
          </p>
          <p className="text-[10px] uppercase tracking-widest text-customText-subLight dark:text-customText-subDark font-bold">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Skills Section ────────────────────────────────────────────────────────────
export function Skills({ skills, isDark, lang }) {
  const prefersReduced = useReducedMotion();

  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const subtitleWords = getTranslation(lang, "skills", "subtitle").split(" ");

  return (
    <section
      id="skills"
      className="py-28 px-6 md:px-8 bg-customBg-lightAccent dark:bg-customBg-darkAccent transition-colors relative overflow-hidden"
    >
      {/* Particle background — slightly denser, slower for contrast with Projects */}
      <ParticleBackground isDark={isDark} count={42} maxDist={105} speed={0.75} opacity={0.45} />

      <div className="relative z-10 max-w-[1100px] mx-auto">

        {/* Section heading */}
        <div ref={headingRef}>
          <motion.p
            variants={fadeUp}
            custom={0}
            initial={prefersReduced ? false : "hidden"}
            animate={headingInView ? "visible" : "hidden"}
            className="text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium"
          >
            {getTranslation(lang, "skills", "title")}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial={prefersReduced ? false : "hidden"}
            animate={headingInView ? "visible" : "hidden"}
            className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-10 text-customText-light dark:text-customText-dark"
          >
            {subtitleWords[0]}{" "}
            <em className="text-brand dark:text-[#7ab84a] not-italic">
              {subtitleWords.slice(1).join(" ")}
            </em>
          </motion.h2>
        </div>

        {/* Animated stats row */}
        <StatsRow lang={lang} />

        {/* Skill groups grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Frontend & UI/UX */}
          <div className="space-y-8">
            <SkillGroup
              label="Frontend"
              skills={skills.frontend}
              isDark={isDark}
              prefersReduced={prefersReduced}
              barDelay={0}
            />
            <SkillGroup
              label="UI/UX"
              skills={skills.uiux}
              isDark={isDark}
              prefersReduced={prefersReduced}
              barDelay={0.08}
            />
          </div>

          {/* Right: Backend, DB, Tools */}
          <div className="space-y-8">
            <SkillGroup
              label="Backend & Framework"
              skills={skills.backend}
              isDark={isDark}
              prefersReduced={prefersReduced}
              barDelay={0.05}
            />
            <SkillGroup
              label="Database"
              skills={skills.database}
              isDark={isDark}
              prefersReduced={prefersReduced}
              barDelay={0.1}
            />
            <SkillGroup
              label="Tools & Platform"
              skills={skills.tools}
              isDark={isDark}
              prefersReduced={prefersReduced}
              barDelay={0.15}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;