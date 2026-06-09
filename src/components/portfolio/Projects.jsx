import { getTranslation } from "../../utils/translations";

const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

export function Projects({ projects, isDark, lang }) {
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-28 px-6 md:px-8">
        <div className="max-w-[1100px] mx-auto text-center py-16">
          <p className="text-customText-mutedLight dark:text-customText-mutedDark text-xs font-medium uppercase tracking-wider">
            {lang === "en" ? "No projects added yet." : "Belum ada proyek yang ditambahkan."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-28 px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <p className="reveal text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
          {getTranslation(lang, "projects", "title")}
        </p>
        <h2 className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark">
          {getTranslation(lang, "projects", "subtitle").split(" ").slice(0, -1).join(" ")}{" "}
          <em className="text-brand dark:text-[#7ab84a] not-italic">
            {getTranslation(lang, "projects", "subtitle").split(" ").slice(-1)[0]}
          </em>
        </h2>
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden border bg-black/8 border-black/8 dark:bg-white/8 dark:border-white/8">
          {projects.map((p, i) => (
            <a
              key={p.id || i}
              href={ensureAbsoluteUrl(p.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card block p-8 relative transition-colors bg-white hover:bg-[#f8f7f4] dark:bg-customBg-darkCard dark:hover:bg-[#1f201e]"
            >
              <div className="font-serif text-sm italic mb-5 text-customText-subLight dark:text-customText-subDark">
                0{i + 1}
              </div>
              <span className="project-arrow absolute top-7 right-7 text-lg text-customText-subLight dark:text-customText-subDark select-none transition-all">
                ↗
              </span>
              <div className="font-serif text-xl tracking-tight mb-2.5 leading-snug text-customText-light dark:text-customText-dark font-medium">
                {p.name}
              </div>
              <p className="text-xs leading-relaxed mb-5 font-light text-customText-mutedLight dark:text-customText-mutedDark min-h-[4.5em] line-clamp-3">
                {p.desc}
              </p>
              {p.tag && (
                <span className="px-2.5 py-1 rounded-full text-[0.7rem] font-medium bg-[#edf5e5] text-brand dark:bg-brand-darkBg dark:text-brand-textDark transition-all">
                  {p.tag}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
