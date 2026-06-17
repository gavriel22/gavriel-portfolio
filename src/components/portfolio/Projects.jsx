import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getTranslation } from "../../utils/translations";
import { ParticleBackground } from "../global/ParticleBackground";

const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  return trimmed.startsWith("http://") || trimmed.startsWith("https://")
    ? trimmed
    : `https://${trimmed}`;
};

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ children, className, href, prefersReduced }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 300, damping: 28 });
  const y = useSpring(rawY, { stiffness: 300, damping: 28 });

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e) => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReduced
          ? {}
          : { rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }
      }
      whileHover={prefersReduced ? {} : { scale: 1.025, zIndex: 10 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ─── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({ p, i, prefersReduced }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: (i % 3) * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <TiltCard
        href={ensureAbsoluteUrl(p.url)}
        prefersReduced={prefersReduced}
        className="project-card block p-8 relative bg-white hover:bg-[#f8f7f4] dark:bg-customBg-darkCard dark:hover:bg-[#1f201e] transition-colors h-full group overflow-hidden"
      >
        {/* Hover overlay shimmer */}
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              background:
                "radial-gradient(ellipse at var(--mx,50%) var(--my,50%), rgba(122,184,74,0.07) 0%, transparent 70%)",
            }}
          />
        )}

        {/* Index number */}
        <div className="font-serif text-sm italic mb-5 text-customText-subLight dark:text-customText-subDark">
          0{i + 1}
        </div>

        {/* Arrow — slides in on hover */}
        <motion.span
          className="absolute top-7 right-7 text-lg text-customText-subLight dark:text-customText-subDark select-none"
          whileHover={prefersReduced ? {} : { x: 3, y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          ↗
        </motion.span>

        {/* Title */}
        <div className="font-serif text-xl tracking-tight mb-2.5 leading-snug text-customText-light dark:text-customText-dark font-medium">
          {p.name}
        </div>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-5 font-light text-customText-mutedLight dark:text-customText-mutedDark min-h-[4.5em] line-clamp-3">
          {p.desc}
        </p>

        {/* Tag pill */}
        {p.tag && (
          <motion.span
            className="inline-block px-2.5 py-1 rounded-full text-[0.7rem] font-medium bg-[#edf5e5] text-brand dark:bg-brand-darkBg dark:text-brand-textDark"
            whileHover={prefersReduced ? {} : { scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {p.tag}
          </motion.span>
        )}
      </TiltCard>
    </motion.div>
  );
}

// ─── Projects Section ──────────────────────────────────────────────────────────
export function Projects({ projects, isDark, lang }) {
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

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-28 px-6 md:px-8 relative overflow-hidden">
        <ParticleBackground isDark={isDark} count={35} opacity={0.55} />
        <div className="relative z-10 max-w-[1100px] mx-auto text-center py-16">
          <p className="text-customText-mutedLight dark:text-customText-mutedDark text-xs font-medium uppercase tracking-wider">
            {lang === "en" ? "No projects added yet." : "Belum ada proyek yang ditambahkan."}
          </p>
        </div>
      </section>
    );
  }

  const subtitleWords = getTranslation(lang, "projects", "subtitle").split(" ");

  return (
    <section id="projects" className="py-28 px-6 md:px-8 relative overflow-hidden">
      {/* Particle background — fewer dots, slightly transparent */}
      <ParticleBackground isDark={isDark} count={38} maxDist={100} opacity={0.5} />

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
            {getTranslation(lang, "projects", "title")}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={1}
            initial={prefersReduced ? false : "hidden"}
            animate={headingInView ? "visible" : "hidden"}
            className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark"
          >
            {subtitleWords.slice(0, -1).join(" ")}{" "}
            <em className="text-brand dark:text-[#7ab84a] not-italic">
              {subtitleWords.slice(-1)[0]}
            </em>
          </motion.h2>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border bg-black/8 border-black/8 dark:bg-white/8 dark:border-white/8">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id || i}
              p={p}
              i={i}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;