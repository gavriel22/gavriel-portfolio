import { getTranslation } from "../../utils/translations";

export function Hero({ hero, about, isDark, lang }) {
  const nameParts = hero.name.split(" ");
  
  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-[110px] pb-[60px] px-6 md:px-8 max-w-[1100px] mx-auto relative">
      {/* Left Column: Teks Intro */}
      <div className="lg:col-span-7 z-10 order-2 lg:order-1">
        <p className="anim-1 text-xs tracking-[0.14em] uppercase mb-6 text-brand dark:text-[#7ab84a] font-medium">
          {hero.tagline}
        </p>
        <h1 className="font-serif anim-2 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] tracking-tight mb-6 text-customText-light dark:text-customText-dark">
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
        <p className="anim-3 text-[0.95rem] leading-[1.75] max-w-[520px] mb-10 font-light text-customText-mutedLight dark:text-customText-mutedDark">
          {hero.description}
        </p>
        <div className="anim-4 flex gap-4 flex-wrap">
          <a
            href="#projects"
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all hover:opacity-85 hover:-translate-y-0.5 bg-customText-light text-customBg-light dark:bg-customText-dark dark:text-customBg-dark shadow-sm cursor-pointer"
          >
            {hero.ctaPrimary} →
          </a>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all hover:-translate-y-0.5 border-black/12 text-customText-light hover:bg-black/5 dark:border-white/15 dark:text-customText-dark dark:hover:bg-white/5 cursor-pointer"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
      
      {/* Right Column: Foto Profil Bulat */}
      <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 mb-6 lg:mb-0 z-10 anim-badge">
        {hero.profileImage ? (
          <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] rounded-full overflow-hidden border-2 border-brand/25 dark:border-brand-dark/25 p-1 bg-white/5 dark:bg-white/5 backdrop-blur-[2px] transition-all duration-500 hover:scale-[1.02] shadow-md flex items-center justify-center">
            <img
              src={hero.profileImage}
              alt={hero.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        ) : (
          <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full border border-dashed border-black/15 dark:border-white/15 flex items-center justify-center bg-black/5 dark:bg-white/5 text-4xl text-customText-subLight dark:text-customText-subDark">
            👤
          </div>
        )}
      </div>
      
      {/* Dynamic Semester Badge */}
      <div className="anim-badge absolute right-8 bottom-32 w-[130px] h-[130px] rounded-full border flex flex-col items-center justify-center text-center text-[10px] leading-relaxed hidden xl:flex border-black/10 text-customText-subLight dark:border-white/10 dark:text-customText-subDark bg-customBg-lightCard/20 dark:bg-customBg-darkCard/20 backdrop-blur-[2px] transition-all uppercase tracking-wider font-bold">
        <span className="font-serif text-[1.5rem] italic block mb-0.5 text-brand dark:text-[#7ab84a] font-semibold">
          {about.semester}
        </span>
        {getTranslation(lang, "hero", "activeSemester")}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 flex items-center gap-2 text-[10px] tracking-widest uppercase text-customText-subLight dark:text-customText-subDark anim-badge font-bold">
        <div className="scroll-line bg-customText-subLight dark:bg-customText-subDark" />
        {getTranslation(lang, "hero", "scroll")}
      </div>
    </section>
  );
}

export default Hero;
