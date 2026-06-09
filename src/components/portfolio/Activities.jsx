import { getTranslation } from "../../utils/translations";

export function ActivityCol({ title, items, isDark, lang }) {
  if (!items || items.length === 0) {
    return (
      <div className="reveal">
        <div className="text-xs tracking-[0.14em] uppercase mb-6 pb-3 border-b font-semibold text-brand dark:text-[#7ab84a] border-black/8 dark:border-white/8">
          {title}
        </div>
        <p className="text-xs font-light text-customText-subLight dark:text-customText-subDark">
          {lang === "en" ? "No data available." : "Belum ada data."}
        </p>
      </div>
    );
  }

  return (
    <div className="reveal">
      <div className="text-xs tracking-[0.14em] uppercase mb-6 pb-3 border-b font-semibold text-brand dark:text-[#7ab84a] border-black/8 dark:border-white/8">
        {title}
      </div>
      {items.map((item, idx) => (
        <div
          key={item.id || idx}
          className="activity-item py-4 border-b last:border-0 border-black/5 dark:border-white/5 transition-all duration-300 hover:pl-2"
        >
          <div className="text-sm font-medium mb-1 text-customText-light dark:text-customText-dark">
            {item.name}
          </div>
          {item.role && (
            <div className="text-xs mb-1 font-medium text-brand dark:text-[#7ab84a]">
              {item.role}
            </div>
          )}
          {item.fullName && (
            <div className="text-xs font-light mb-1 text-customText-subLight dark:text-customText-subDark">
              {item.fullName}
            </div>
          )}
          {item.period && (
            <div className="text-xs text-customText-subLight dark:text-customText-subDark opacity-85">
              {item.period}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Activities({ organizations, committees, competitions, isDark, lang }) {
  return (
    <section id="activities" className="py-28 px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="reveal text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
          {getTranslation(lang, "activities", "title")}
        </p>
        <h2 className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark">
          {getTranslation(lang, "activities", "subtitle").split(" & ")[0]}{" "}
          <em className="text-brand dark:text-[#7ab84a] not-italic">
            & {getTranslation(lang, "activities", "subtitle").split(" & ")[1]}
          </em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <ActivityCol title={getTranslation(lang, "activities", "orgHeader")} items={organizations} isDark={isDark} lang={lang} />
          
          <ActivityCol title={getTranslation(lang, "activities", "committeeHeader")} items={committees} isDark={isDark} lang={lang} />
          
          <div className="reveal">
            <div className="text-xs tracking-[0.14em] uppercase mb-6 pb-3 border-b font-semibold text-brand dark:text-[#7ab84a] border-black/8 dark:border-white/8">
              {getTranslation(lang, "activities", "awardHeader")}
            </div>
            {!competitions || competitions.length === 0 ? (
              <p className="text-xs font-light text-customText-subLight dark:text-customText-subDark">
                {lang === "en" ? "No data available." : "Belum ada data."}
              </p>
            ) : (
              competitions.map((c, idx) => (
                <div
                  key={c.id || idx}
                  className="activity-item py-4 border-b last:border-0 border-black/5 dark:border-white/5 transition-all duration-300 hover:pl-2"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wide mb-2 ${
                      c.type === "award"
                        ? "bg-[#fef3c7] text-[#92400e] dark:bg-[#2c1f07] dark:text-[#fbbf24]"
                        : "bg-[#edf5e5] text-brand dark:bg-brand-darkBg dark:text-brand-textDark"
                    }`}
                  >
                    {c.badge}
                  </span>
                  <div className="text-sm font-medium mb-1 text-customText-light dark:text-customText-dark">
                    {c.name}
                  </div>
                  <div className="text-xs text-customText-subLight dark:text-customText-subDark">
                    {c.period}
                  </div>
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Activities;
