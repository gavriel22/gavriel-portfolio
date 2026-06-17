import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { getTranslation } from "../../utils/translations";
import { ParticleBackground } from "../global/ParticleBackground";

const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:")
  )
    return trimmed;
  return `https://${trimmed}`;
};

// ─── Social Link Row ───────────────────────────────────────────────────────────
function SocialLink({ icon, label, val, href, i, prefersReduced }) {
  if (!val) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={prefersReduced ? false : { opacity: 0, x: -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        prefersReduced
          ? {}
          : { x: 6, transition: { type: "spring", stiffness: 350, damping: 22 } }
      }
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      className="flex items-center gap-3 p-4 rounded-xl border border-black/8 bg-white hover:bg-customBg-lightAccent dark:border-white/8 dark:bg-customBg-darkCard dark:hover:bg-[#1f201e] transition-colors"
    >
      {/* Icon with subtle bounce on hover */}
      <motion.span
        className="text-lg select-none"
        whileHover={prefersReduced ? {} : { scale: 1.25, rotate: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 16 }}
      >
        {icon}
      </motion.span>
      <div>
        <div className="text-[0.65rem] uppercase tracking-widest mb-0.5 text-customText-subLight dark:text-customText-subDark font-semibold">
          {label}
        </div>
        <div className="text-sm font-medium text-customText-light dark:text-customText-dark">
          {val}
        </div>
      </div>

      {/* Arrow that slides in on hover */}
      <motion.span
        className="ml-auto text-customText-subLight dark:text-customText-subDark text-xs"
        initial={{ opacity: 0, x: -6 }}
        whileHover={prefersReduced ? {} : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ─── Status Dot (pulsing) ──────────────────────────────────────────────────────
function StatusDot({ prefersReduced }) {
  return (
    <motion.span
      className="w-2.5 h-2.5 rounded-full bg-[#4a7c28] inline-block flex-shrink-0"
      animate={
        prefersReduced
          ? {}
          : {
              boxShadow: [
                "0 0 0 0px rgba(74,124,40,0.5)",
                "0 0 0 5px rgba(74,124,40,0)",
              ],
            }
      }
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
export function Contact({ contact, location, isDark, lang }) {
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

  const subtitleWords = getTranslation(lang, "contact", "subtitle").split(" ");

  const socialLinks = [
    {
      icon: "✉️",
      label: "Email",
      val: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: "💻",
      label: "GitHub",
      val: contact.github
        ? contact.github.replace("https://", "").replace("http://", "")
        : "",
      href: ensureAbsoluteUrl(contact.github),
    },
    {
      icon: "🔗",
      label: "LinkedIn",
      val: contact.linkedin
        ? contact.linkedin.replace("https://", "").replace("http://", "")
        : "",
      href: ensureAbsoluteUrl(contact.linkedin),
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 md:px-8 relative overflow-hidden">
      {/* Particle background — lightest of all sections, bottom of page */}
      <ParticleBackground
        isDark={isDark}
        count={28}
        maxDist={90}
        speed={0.55}
        opacity={0.38}
        repulse={false}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* ── Left: Heading + Social Links ── */}
          <div className="flex-1">
            <div ref={headingRef}>
              <motion.p
                variants={fadeUp}
                custom={0}
                initial={prefersReduced ? false : "hidden"}
                animate={headingInView ? "visible" : "hidden"}
                className="text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium"
              >
                {getTranslation(lang, "contact", "title")}
              </motion.p>

              <motion.h2
                variants={fadeUp}
                custom={1}
                initial={prefersReduced ? false : "hidden"}
                animate={headingInView ? "visible" : "hidden"}
                className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] tracking-tight leading-tight mb-6 text-customText-light dark:text-customText-dark"
              >
                {subtitleWords.slice(0, 2).join(" ")}{" "}
                <em className="text-brand dark:text-[#7ab84a] not-italic">
                  {subtitleWords[2]}
                </em>
                <br />
                {subtitleWords.slice(3).join(" ")}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                custom={2}
                initial={prefersReduced ? false : "hidden"}
                animate={headingInView ? "visible" : "hidden"}
                className="text-sm leading-relaxed mb-8 font-light text-customText-mutedLight dark:text-customText-mutedDark"
              >
                {lang === "en"
                  ? "I am open to project discussions, collaborations, or simply chatting about tech."
                  : "Saya terbuka untuk diskusi proyek, kolaborasi, maupun sekadar ngobrol tentang teknologi."}
              </motion.p>
            </div>

            {/* Social links — stagger slide in from left */}
            <div className="space-y-3">
              {socialLinks.map(({ icon, label, val, href }, i) => (
                <SocialLink
                  key={label}
                  icon={icon}
                  label={label}
                  val={val}
                  href={href}
                  i={i}
                  prefersReduced={prefersReduced}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Status Card ── */}
          <div className="lg:w-72">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={
                prefersReduced
                  ? {}
                  : { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }
              }
              className="p-6 rounded-2xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard"
            >
              <p className="text-xs tracking-widest uppercase mb-4 text-customText-subLight dark:text-customText-subDark font-semibold">
                {getTranslation(lang, "contact", "statusLabel")}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <StatusDot prefersReduced={prefersReduced} />
                <span className="text-sm font-medium text-customText-light dark:text-customText-dark">
                  {contact.status}
                </span>
              </div>

              <p className="text-xs leading-relaxed mb-5 text-customText-mutedLight dark:text-customText-mutedDark font-light">
                {contact.statusDetail}
              </p>

              <div className="pt-4 border-t border-black/8 dark:border-white/8">
                <p className="text-xs uppercase tracking-widest mb-2 text-customText-subLight dark:text-customText-subDark font-semibold">
                  {lang === "en" ? "Location" : "Lokasi"}
                </p>
                <motion.p
                  className="text-sm text-customText-mutedLight dark:text-customText-mutedDark font-medium"
                  initial={prefersReduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {location} 🇮🇩
                </motion.p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;