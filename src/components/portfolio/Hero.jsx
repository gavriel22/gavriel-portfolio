import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getTranslation } from "../../utils/translations";
import { ParticleBackground } from "../global/ParticleBackground";

// ─── Typing Effect Hook ────────────────────────────────────────────────────────
function useTypingEffect(text, { delay = 0, speed = 45 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = "";
    let i = 0;
    let timeout;

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return ref;
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const scalePop = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 },
  },
};

// ─── Main Hero Component ───────────────────────────────────────────────────────
export function Hero({ hero, about, isDark, lang }) {
  const prefersReduced = useReducedMotion();
  const nameParts = hero.name.split(" ");

  // Typing effect for tagline — starts after stagger settles
  const taglineRef = useTypingEffect(hero.tagline, {
    delay: prefersReduced ? 0 : 200,
    speed: prefersReduced ? 0 : 38,
  });

  // Wrap all motion props so reduced-motion users see no animation
  const motionProps = (variants, custom) =>
    prefersReduced
      ? {}
      : { variants, custom, initial: "hidden", animate: "visible" };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-[110px] pb-[60px] px-6 md:px-8 max-w-[1100px] mx-auto relative overflow-hidden">
      
      {/* Particle background — full density, mouse repulsion on */}
      <ParticleBackground isDark={isDark} count={55} maxDist={110} repulse={true} />

      {/* ── Left Column ── */}
      <div className="lg:col-span-7 z-10 order-2 lg:order-1">

        {/* Tagline — typing effect */}
        <motion.p
          {...motionProps(fadeUp, 0)}
          className="text-xs tracking-[0.14em] uppercase mb-6 text-brand dark:text-[#7ab84a] font-medium"
        >
          <span ref={taglineRef} />
          {/* Blinking cursor */}
          {!prefersReduced && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.55, repeat: 4, repeatType: "reverse" }}
              className="inline-block w-[2px] h-[0.9em] ml-[2px] align-middle bg-brand dark:bg-[#7ab84a]"
              aria-hidden="true"
            />
          )}
        </motion.p>

        {/* Name — each word staggers in */}
        <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight mb-6 text-customText-light dark:text-customText-dark">
          {nameParts.map((word, i) => (
            <motion.span
              key={i}
              {...motionProps(fadeUp, i + 1)}
              className="inline-block mr-3"
            >
              {i === 1 ? (
                <em className="text-brand dark:text-[#7ab84a] not-italic">{word}</em>
              ) : (
                word
              )}
              {i < nameParts.length - 1 && i === 1 && <br />}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          {...motionProps(fadeUp, nameParts.length + 1)}
          className="text-[0.95rem] leading-[1.75] max-w-[520px] mb-10 font-light text-customText-mutedLight dark:text-customText-mutedDark"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...motionProps(fadeUp, nameParts.length + 2)}
          className="flex gap-4 flex-wrap"
        >
          <motion.a
            href="#projects"
            whileHover={prefersReduced ? {} : { y: -2, opacity: 0.85 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-customText-light text-customBg-light dark:bg-customText-dark dark:text-customBg-dark shadow-sm cursor-pointer"
          >
            {hero.ctaPrimary} →
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={prefersReduced ? {} : { y: -2 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border border-black/12 text-customText-light hover:bg-black/5 dark:border-white/15 dark:text-customText-dark dark:hover:bg-white/5 cursor-pointer"
          >
            {hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </div>

      {/* ── Right Column: Profile Image ── */}
      <motion.div
        {...motionProps(fadeLeft)}
        className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 mb-6 lg:mb-0 z-10"
      >
        {hero.profileImage ? (
          <motion.div
            whileHover={prefersReduced ? {} : { scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border-2 border-brand/25 dark:border-brand-dark/25 p-1 bg-white/5 dark:bg-white/5 backdrop-blur-[2px] shadow-md flex items-center justify-center"
          >
            <img
              src={hero.profileImage}
              alt={hero.name}
              loading="eager"
              fetchpriority="high"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        ) : (
          <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-dashed border-black/15 dark:border-white/15 flex items-center justify-center bg-black/5 dark:bg-white/5 text-4xl text-customText-subLight dark:text-customText-subDark">
            👤
          </div>
        )}
      </motion.div>

      {/* ── Semester Badge ── */}
      <motion.div
        {...motionProps(scalePop)}
        className="absolute right-8 bottom-32 w-[130px] h-[130px] rounded-full border flex-col items-center justify-center text-center text-[10px] leading-relaxed hidden xl:flex border-black/10 text-customText-subLight dark:border-white/10 dark:text-customText-subDark bg-customBg-lightCard/20 dark:bg-customBg-darkCard/20 backdrop-blur-[2px] uppercase tracking-wider font-bold"
      >
        <motion.span
          animate={prefersReduced ? {} : { rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="font-serif text-[1.5rem] italic block mb-0.5 text-brand dark:text-[#7ab84a] font-semibold"
        >
          {about.semester}
        </motion.span>
        {getTranslation(lang, "hero", "activeSemester")}
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        {...motionProps(fadeUp, nameParts.length + 3)}
        className="absolute bottom-8 left-6 flex items-center gap-2 text-[10px] tracking-widest uppercase text-customText-subLight dark:text-customText-subDark font-bold"
      >
        <motion.div
          animate={prefersReduced ? {} : { scaleX: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="scroll-line bg-customText-subLight dark:bg-customText-subDark origin-left"
        />
        {getTranslation(lang, "hero", "scroll")}
      </motion.div>
    </section>
  );
}

export default Hero;