import { useState } from "react";
import { getTranslation } from "../../utils/translations";

export function Navbar({ name, isDark, toggleTheme, goAdmin, lang, setLang }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["about", "skills", "projects", "activities", "docs", "contact"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-8 border-b backdrop-blur-md transition-colors duration-300 bg-customBg-light/80 dark:bg-customBg-dark/80 border-customText-light/10 dark:border-customText-dark/10">
      <a href="#" className="font-serif text-lg tracking-tight font-semibold hover:opacity-85 transition-opacity">
        gavriel's
      </a>
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((n) => (
          <li key={n}>
            <a
              href={`#${n}`}
              className="text-xs uppercase tracking-widest transition-colors text-customText-mutedLight hover:text-customText-light dark:text-customText-mutedDark dark:hover:text-customText-dark"
            >
              {getTranslation(lang, "navbar", n)}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setLang(lang === "id" ? "en" : "id")}
          className="px-2.5 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold tracking-wider transition-all border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-customText-mutedLight dark:text-customText-mutedDark hover:text-customText-light dark:hover:text-customText-dark cursor-pointer select-none"
          title={lang === "id" ? "Switch to English" : "Ubah ke Bahasa Indonesia"}
        >
          {lang === "id" ? "ID" : "ENG"}
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
          title="Toggle Theme"
        >
          {isDark ? "🌙" : "☀️"}
        </button>

        {/* Admin Link */}
        <button
          onClick={goAdmin}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all border-brand/40 text-brand dark:border-[#7ab84a]/40 dark:text-[#7ab84a] hover:bg-brand/10 dark:hover:bg-[#7ab84a]/10 cursor-pointer"
        >
          {getTranslation(lang, "navbar", "admin")}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden flex flex-col gap-1 p-1.5 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-5 h-[1.5px] block transition-all ${
                isDark ? "bg-customText-dark" : "bg-customText-light"
              }`}
            />
          ))}
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-40 flex flex-col gap-4 px-6 py-5 border-b backdrop-blur-md bg-customBg-light/95 dark:bg-customBg-dark/95 border-customText-light/10 dark:border-customText-dark/10 animate-[fadeIn_0.25s_ease]">
          {navLinks.map((n) => (
            <a
              key={n}
              href={`#${n}`}
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest text-customText-mutedLight hover:text-customText-light dark:text-customText-mutedDark dark:hover:text-customText-dark"
            >
              {getTranslation(lang, "navbar", n)}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              goAdmin();
            }}
            className="text-left text-xs uppercase tracking-widest font-bold text-brand dark:text-[#7ab84a] cursor-pointer"
          >
            {getTranslation(lang, "navbar", "admin")}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
