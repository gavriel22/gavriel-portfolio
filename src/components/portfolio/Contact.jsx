import { getTranslation } from "../../utils/translations";

export function Contact({ contact, location, isDark, lang }) {
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
      val: contact.github ? contact.github.replace("https://", "") : "",
      href: contact.github,
    },
    {
      icon: "🔗",
      label: "LinkedIn",
      val: contact.linkedin ? contact.linkedin.replace("https://", "") : "",
      href: contact.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-28 px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* Main Social Section */}
          <div className="flex-1 reveal">
            <p className="text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
              {getTranslation(lang, "contact", "title")}
            </p>
            <h2 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] tracking-tight leading-tight mb-6 text-customText-light dark:text-customText-dark">
              {getTranslation(lang, "contact", "subtitle").split(" ").slice(0, 2).join(" ")}{" "}
              <em className="text-brand dark:text-[#7ab84a] not-italic">
                {getTranslation(lang, "contact", "subtitle").split(" ").slice(2, 3)[0]}
              </em>
              <br />
              {getTranslation(lang, "contact", "subtitle").split(" ").slice(3).join(" ")}
            </h2>
            <p className="text-sm leading-relaxed mb-8 font-light text-customText-mutedLight dark:text-customText-mutedDark">
              {lang === "en"
                ? "I am open to project discussions, collaborations, or simply chatting about tech."
                : "Saya terbuka untuk diskusi proyek, kolaborasi, maupun sekadar ngobrol tentang teknologi."}
            </p>
            
            <div className="space-y-3">
              {socialLinks.map(({ icon, label, val, href }) => (
                val && (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-black/8 bg-white hover:bg-customBg-lightAccent dark:border-white/8 dark:bg-customBg-darkCard dark:hover:bg-[#1f201e] transition-all hover:translate-x-1"
                  >
                    <span className="text-lg select-none">{icon}</span>
                    <div>
                      <div className="text-[0.65rem] uppercase tracking-widest mb-0.5 text-customText-subLight dark:text-customText-subDark font-semibold">
                        {label}
                      </div>
                      <div className="text-sm font-medium text-customText-light dark:text-customText-dark">
                        {val}
                      </div>
                    </div>
                  </a>
                )
              ))}
            </div>
          </div>
          
          {/* Status Section */}
          <div className="lg:w-72 reveal">
            <div className="p-6 rounded-2xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard transition-all hover:shadow-sm">
              <p className="text-xs tracking-widest uppercase mb-4 text-customText-subLight dark:text-customText-subDark font-semibold">
                {getTranslation(lang, "contact", "statusLabel")}
              </p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4a7c28] shadow-[0_0_0_3px_#d4e8c4] dark:shadow-[0_0_0_3px_#1a2e0a] inline-block animate-pulse" />
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
                <p className="text-sm text-customText-mutedLight dark:text-customText-mutedDark font-medium">
                  {location} 🇮🇩
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Contact;
