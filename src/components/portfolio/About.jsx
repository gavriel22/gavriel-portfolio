import { getTranslation } from "../../utils/translations";

export function About({ about, projectsCount, organizationsCount, committeesCount, awardsCount, isDark, lang }) {
  const stats = [
    [projectsCount.toString(), getTranslation(lang, "about", "statsLiveProjects")],
    [organizationsCount.toString(), getTranslation(lang, "about", "statsOrganizations")],
    [committeesCount.toString(), getTranslation(lang, "about", "statsCommittees")],
    [awardsCount.toString(), getTranslation(lang, "about", "statsAwards")],
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="reveal text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
          {getTranslation(lang, "about", "title")}
        </p>
        <h2 className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark">
          {getTranslation(lang, "about", "subtitle").split(" ").slice(0, -1).join(" ")}{" "}
          <em className="text-brand dark:text-[#7ab84a] not-italic">
            {getTranslation(lang, "about", "subtitle").split(" ").slice(-1)[0]}
          </em>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Bio & Stats */}
          <div className="reveal">
            {[about.bio1, about.bio2, about.bio3].map((bio, i) => (
              bio && (
                <p
                  key={i}
                  className="text-[0.95rem] leading-[1.85] mb-5 font-light text-customText-mutedLight dark:text-customText-mutedDark"
                >
                  {bio}
                </p>
              )
            ))}
            
            {/* Dynamic Grid of Stats */}
            <div className={`grid grid-cols-2 gap-px mt-8 rounded-xl overflow-hidden border bg-black/8 border-black/8 dark:bg-white/8 dark:border-white/8`}>
              {stats.map(([n, l]) => (
                <div
                  key={l}
                  className="p-6 transition-colors bg-white hover:bg-customBg-lightAccent dark:bg-customBg-darkCard dark:hover:bg-[#1f201e]"
                >
                  <div className="font-serif text-3xl mb-1 text-brand dark:text-[#7ab84a] font-semibold">
                    {n}
                  </div>
                  <div className="text-xs text-customText-subLight dark:text-customText-subDark font-medium">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education & Focus Interests */}
          <div className="reveal space-y-4">
            <div className="p-6 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard transition-all hover:shadow-sm">
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
                {getTranslation(lang, "about", "periodLabel")} {about.batch} · {getTranslation(lang, "about", "semesterLabel")} {about.semester}
                <br />
                {about.location}
              </div>
            </div>
            
            <div className="p-6 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard transition-all hover:shadow-sm">
              <p className="text-xs tracking-widest uppercase mb-4 text-customText-subLight dark:text-customText-subDark font-semibold">
                {getTranslation(lang, "about", "interests")}
              </p>
              <div className="flex flex-wrap gap-2">
                {about.interests && about.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#edf5e5] text-brand border border-brand/15 dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20 transition-all hover:scale-105"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default About;
