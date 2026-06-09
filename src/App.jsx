import { useState, useEffect } from "react";
import Portfolio from "./pages/Portfolio";
import AdminPanel from "./pages/AdminPanel";
import { fetchPortfolioData } from "./utils/supabaseService";

export default function App() {
  const [page, setPage] = useState("portfolio");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("lang");
      return saved === "en" ? "en" : "id";
    } catch {}
    return "id";
  });
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Load portfolio data on mount
  useEffect(() => {
    async function load() {
      try {
        const dbData = await fetchPortfolioData();
        setData(dbData);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Sync lang state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  // Track system preference theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      // Only sync if user hasn't explicitly set a custom theme preference
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync isDark state with tailwind's dark class on <html> and localStorage
  useEffect(() => {
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-[#111210] text-[#f0ede8]" : "bg-[#f8f7f4] text-[#1a1916]"
      }`}>
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute w-12 h-12 rounded-full border-2 border-brand/20 dark:border-brand-dark/20 animate-spin border-t-brand dark:border-t-brand-dark" />
          <span className="font-serif text-[10px] tracking-widest font-semibold text-brand dark:text-brand-dark uppercase">
            GTN
          </span>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-customText-mutedLight dark:text-customText-mutedDark animate-pulse">
          {lang === "en" ? "Loading Data..." : "Memuat Data..."}
        </p>
      </div>
    );
  }

  if (page === "admin") {
    return (
      <AdminPanel
        data={data}
        setData={setData}
        isDark={isDark}
        toggleTheme={toggleTheme}
        goBack={() => setPage("portfolio")}
      />
    );
  }

  // Kirimkan slice data yang aktif (id atau en) ke halaman utama portofolio
  const activeDataSlice = data?.[lang] || data?.id || data;

  return (
    <Portfolio
      data={activeDataSlice}
      lang={lang}
      setLang={setLang}
      isDark={isDark}
      toggleTheme={toggleTheme}
      goAdmin={() => setPage("admin")}
    />
  );
}

