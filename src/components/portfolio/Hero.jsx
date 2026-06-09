export function Hero({ hero, about, isDark }) {
  // Graceful handling of single-word name or splits
  const nameParts = hero.name.split(" ");
  
  return (
    <section className="min-h-screen flex items-center pt-[100px] pb-[60px] px-6 md:px-8 max-w-[1100px] mx-auto relative">
      <div className="max-w-[700px] z-10">
        <p className="anim-1 text-xs tracking-[0.14em] uppercase mb-6 text-brand dark:text-[#7ab84a] font-medium">
          {hero.tagline}
        </p>
        <h1 className="font-serif anim-2 text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] tracking-tight mb-6 text-customText-light dark:text-customText-dark">
          {nameParts.map((word, i) => (
            <span key={i} className="inline-block mr-3">
              {i === 1 ? (
                <em className="text-brand dark:text-[#7ab84a] not-italic">{word}</em>
              ) : (
                word
              )}
              {i < nameParts.length - 1 && i === 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="anim-3 text-base leading-[1.75] max-w-[520px] mb-10 font-light text-customText-mutedLight dark:text-customText-mutedDark">
          {hero.description}
        </p>
        <div className="anim-4 flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-80 hover:-translate-y-0.5 bg-customText-light text-customBg-light dark:bg-customText-dark dark:text-customBg-dark shadow-sm"
          >
            {hero.ctaPrimary} →
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-sm border transition-all hover:-translate-y-0.5 border-black/12 text-customText-light hover:bg-black/5 dark:border-white/15 dark:text-customText-dark dark:hover:bg-white/5"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
      
      {/* Dynamic Semester Badge */}
      <div className="anim-badge absolute right-8 bottom-32 w-[140px] h-[140px] rounded-full border flex flex-col items-center justify-center text-center text-xs leading-relaxed hidden lg:flex border-black/10 text-customText-subLight dark:border-white/10 dark:text-customText-subDark bg-customBg-lightCard/20 dark:bg-customBg-darkCard/20 backdrop-blur-[2px] transition-all">
        <span className="font-serif text-[1.6rem] italic block mb-0.5 text-brand dark:text-[#7ab84a] font-semibold">
          {about.semester}
        </span>
        semester<br />aktif
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 flex items-center gap-2 text-xs tracking-widest uppercase text-customText-subLight dark:text-customText-subDark anim-badge">
        <div className="scroll-line bg-customText-subLight dark:bg-customText-subDark" />
        scroll
      </div>
    </section>
  );
}

export default Hero;
