export function SkillGroup({ label, skills, isDark }) {
  if (!skills || skills.length === 0) return null;
  
  return (
    <div>
      <p className="text-xs tracking-[0.12em] uppercase mb-4 font-semibold text-customText-subLight dark:text-customText-subDark">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all cursor-default select-none
              ${
                s.featured
                  ? "bg-[#edf5e5] text-brand border-brand/15 font-medium dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20"
                  : "bg-customBg-lightAccent text-customText-mutedLight border-black/8 hover:bg-[#edf5e5] hover:text-brand dark:bg-customBg-darkAccent dark:text-customText-mutedDark dark:border-white/8 dark:hover:bg-brand-darkBg dark:hover:text-brand-textDark"
              }`}
          >
            {s.logo && (
              <img
                src={s.logo}
                alt=""
                className={`w-3.5 h-3.5 object-contain rounded-sm ${
                  s.invert ? "dark:invert-0" : "" // we can style inverts cleanly
                }`}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills({ skills, isDark }) {
  return (
    <section id="skills" className="py-28 px-6 md:px-8 bg-customBg-lightAccent dark:bg-customBg-darkAccent transition-colors">
      <div className="max-w-[1100px] mx-auto">
        <p className="reveal text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
          Kemampuan
        </p>
        <h2 className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark">
          Tech <em className="text-brand dark:text-[#7ab84a] not-italic">Stack</em>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="reveal">
            <SkillGroup label="Frontend" skills={skills.frontend} isDark={isDark} />
          </div>
          <div className="reveal space-y-8">
            <SkillGroup label="Backend & Framework" skills={skills.backend} isDark={isDark} />
            <SkillGroup label="Database" skills={skills.database} isDark={isDark} />
            <SkillGroup label="Tools & Platform" skills={skills.tools} isDark={isDark} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
