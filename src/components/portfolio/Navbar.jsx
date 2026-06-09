import { useState } from "react";

export function Navbar({ name, isDark, toggleTheme, goAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["about", "skills", "projects", "activities", "docs", "contact"];
  
  // Dynamically compute initials from the name
  const initials = name
    ? name.split(" ").map(w => w[0]).join("").toUpperCase()
    : "GTN";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-8 border-b backdrop-blur-md transition-colors duration-300 bg-customBg-light/80 dark:bg-customBg-dark/80 border-customText-light/10 dark:border-customText-dark/10">
      <a href="#" className="font-serif text-lg tracking-tight font-semibold hover:opacity-85 transition-opacity">
        {initials}
      </a>
      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((n) => (
          <li key={n}>
            <a
              href={`#${n}`}
              className="text-xs uppercase tracking-widest transition-colors text-customText-mutedLight hover:text-customText-light dark:text-customText-mutedDark dark:hover:text-customText-dark"
            >
              {n === "docs" ? "Dokumentasi" : n.charAt(0).toUpperCase() + n.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full border flex items-center justify-center text-sm transition-all border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
          title="Toggle Theme"
        >
          {isDark ? "🌙" : "☀️"}
        </button>
        <button
          onClick={goAdmin}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all border-brand/40 text-brand dark:border-[#7ab84a]/40 dark:text-[#7ab84a] hover:bg-brand/10 dark:hover:bg-[#7ab84a]/10"
        >
          ⚙️ Admin
        </button>
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
        <div className="fixed top-[60px] left-0 right-0 z-40 flex flex-col gap-4 px-6 py-5 border-b backdrop-blur-md bg-customBg-light/95 dark:bg-customBg-dark/95 border-customText-light/10 dark:border-customText-dark/10">
          {navLinks.map((n) => (
            <a
              key={n}
              href={`#${n}`}
              onClick={() => setMobileOpen(false)}
              className="text-xs uppercase tracking-widest text-customText-mutedLight hover:text-customText-light dark:text-customText-mutedDark dark:hover:text-customText-dark"
            >
              {n === "docs" ? "Dokumentasi" : n.charAt(0).toUpperCase() + n.slice(1)}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              goAdmin();
            }}
            className="text-left text-xs uppercase tracking-widest text-brand dark:text-[#7ab84a]"
          >
            ⚙️ Admin Panel
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
