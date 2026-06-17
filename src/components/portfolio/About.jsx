import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getTranslation } from "../../utils/translations";
import { ParticleBackground } from "../global/ParticleBackground";

// ─── Animated Counter ──────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

function AnimatedCounter({ to, duration = 1200 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setCount(to); return; }
    const target = parseInt(to, 10);
    if (isNaN(target)) { setCount(to); return; }

    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration, prefersReduced]);

  return <span ref={ref}>{count}</span>;
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ n, label, i, prefersReduced }) {
  const isNumeric = !isNaN(parseInt(n, 10));

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={prefersReduced ? {} : { y: -3, transition: { type: "spring", stiffness: 400, damping: 18 } }}
      className="p-6 transition-colors bg-white hover:bg-customBg-lightAccent dark:bg-customBg-darkCard dark:hover:bg-[#1f201e]"
    >
      <div className="font-serif text-3xl mb-1 text-brand dark:text-[#7ab84a] font-semibold">
        {isNumeric ? <AnimatedCounter to={parseInt(n, 10)} /> : n}
      </div>
      <div className="text-xs text-customText-subLight dark:text-customText-subDark font-medium">
        {label}
      </div>
    </motion.div>
  );
}

// ─── Bio Paragraph ─────────────────────────────────────────────────────────────
function BioParagraph({ text, i, prefersReduced }) {
  if (!text) return null;
  return (
    <motion.p
      initial={prefersReduced ? false : { opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-[0.95rem] leading-[1.85] mb-5 font-light text-customText-mutedLight dark:text-customText-mutedDark"
    >
      {text}
    </motion.p>
  );
}

// ─── Info Card (Education / Interests) ────────────────────────────────────────
function InfoCard({ children, i, prefersReduced }) {
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={prefersReduced ? {} : { y: -2, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="p-6 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard transition-colors"
    >
      {children}
    </motion.div>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
export function About({
  about,
  projectsCount,
  organizationsCount,
  committeesCount,
  awardsCount,
  isDark,
  lang,
}) {
  const prefersReduced = useReducedMotion();

  const stats = [
    [projectsCount.toString(), getTranslation(lang, "about", "statsLiveProjects")],
    [organizationsCount.toString(), getTranslation(lang, "about", "statsOrganizations")],
    [committeesCount.toString(), getTranslation(lang, "about", "statsCommittees")],
    [awardsCount.toString(), getTranslation(lang, "about", "statsAwards")],
  ];

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

  const subtitleWords = getTranslation(lang, "about", "subtitle").split(" ");

  return (
    <section id="about" className="py-28 px-6 md:px-8 relative overflow-hidden">
      {/* Particle background — sparse, slower drift */}
      <ParticleBackground
        isDark={isDark}
        count={32}
        maxDist={95}
        speed={0.65}
        opacity={0.4}
        repulse={false}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto">

        {/* Heading */}
        <div ref={headingRef}>
          <motion.p
            variants={fadeUp}
            custom={0}
            initial={prefersReduced ? false : "hidden"}
            animate={headingInView ? "visible" : "hidden"}
            className="text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium"
          >
            {getTranslation(lang, "about", "title")}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* ── Left: Bio + Stats ── */}
          <div>
            {[about.bio1, about.bio2, about.bio3].map((bio, i) => (
              <BioParagraph key={i} text={bio} i={i} prefersReduced={prefersReduced} />
            ))}

            {/* Stats grid with animated counters */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-px mt-8 rounded-xl overflow-hidden border bg-black/8 border-black/8 dark:bg-white/8 dark:border-white/8"
            >
              {stats.map(([n, l], i) => (
                <StatCard key={l} n={n} label={l} i={i} prefersReduced={prefersReduced} />
              ))}
            </motion.div>
          </div>

          {/* ── Right: Education + Interests ── */}
          <div className="space-y-4">

            {/* Education card */}
            <InfoCard i={0} prefersReduced={prefersReduced}>
              <p className="text-xs tracking-widest uppercase mb-4 text-customText-subLight dark:text-customText-subDark font-semibold">
                {getTranslation(lang, "about", "education")}
              </p>
              <div className="font-serif text-xl tracking-tight mb-1 text-customText-light dark:text-customText-dark font-semibold">
                {about.university}
              </div>
              <div className="text-sm mb-2 font-medium text-brand dark:text-[#7ab84a]">
                {about.major}
              </div>
              <div className="text-xs leading-relaxed text-customText-subLight dark:text-customText-subDark">
                {getTranslation(lang, "about", "periodLabel")} {about.batch} ·{" "}
                {getTranslation(lang, "about", "semesterLabel")} {about.semester}
                <br />
                {about.location}
              </div>
            </InfoCard>

            {/* Interests card */}
            <InfoCard i={1} prefersReduced={prefersReduced}>
              <p className="text-xs tracking-widest uppercase mb-4 text-customText-subLight dark:text-customText-subDark font-semibold">
                {getTranslation(lang, "about", "interests")}
              </p>
              <div className="flex flex-wrap gap-2">
                {about.interests &&
                  about.interests.map((interest, i) => (
                    <motion.span
                      key={i}
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        delay: 0.3 + i * 0.055,
                        duration: 0.38,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      whileHover={
                        prefersReduced
                          ? {}
                          : { scale: 1.08, y: -2, transition: { type: "spring", stiffness: 400, damping: 18 } }
                      }
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#edf5e5] text-brand border border-brand/15 dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20 cursor-default"
                    >
                      {interest}
                    </motion.span>
                  ))}
              </div>
            </InfoCard>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;