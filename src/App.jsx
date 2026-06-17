import { useState, useEffect, Suspense, lazy } from "react";
import Portfolio from "./pages/Portfolio";
import { fetchPortfolioData } from "./utils/supabaseService";
import { loadData } from "./utils/storage";

// ─── New animation components ────────────────────────────────────────────────
import { CustomCursor } from "./components/global/CustomCursor";
import { SmoothScroll } from "./components/global/SmoothScroll";
import { PageLoader } from "./components/global/PageLoader";

const AdminPanel = lazy(() => import("./pages/AdminPanel"));

export default function App() {
  const [page, setPage] = useState(() =>
    window.location.pathname === "/admin" ? "admin" : "portfolio"
  );
  const [data, setData] = useState(() => loadData());
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

  const navigateTo = (path) => {
    window.history.pushState(null, "", path);
    setPage(path === "/admin" ? "admin" : "portfolio");
  };

  useEffect(() => {
    const handlePopState = () =>
      setPage(window.location.pathname === "/admin" ? "admin" : "portfolio");
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const dbData = await fetchPortfolioData();
        setData(dbData);
      } catch (err) {
        console.error("Gagal memuat data dari Supabase:", err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("theme")) setIsDark(e.matches);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch {}
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

  // ── Minimalist first-load spinner (before local cache is ready) ──────────
  if (!data) {
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
      <Suspense fallback={
        <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#111210] text-[#f0ede8]" : "bg-[#f8f7f4] text-[#1a1916]"
        }`}>
          <p className="text-xs font-semibold uppercase tracking-widest text-customText-mutedLight dark:text-customText-mutedDark animate-pulse">
            Loading Admin Panel...
          </p>
        </div>
      }>
        <AdminPanel
          data={data}
          setData={setData}
          isDark={isDark}
          toggleTheme={toggleTheme}
          goBack={() => navigateTo("/")}
        />
      </Suspense>
    );
  }

  const activeDataSlice = data?.[lang] || data?.id || data;

  // ── Main render — CustomCursor sits outside SmoothScroll intentionally ──
  return (
    <>
      {/* Custom cursor — rendered above everything, no scroll wrapper needed */}
      <CustomCursor />

      {/* PageLoader wraps SmoothScroll + Portfolio so the slide-up exit
          reveals the already-mounted page content beneath it */}
      <PageLoader initials="GTN" isDark={isDark} minDelay={1400}>
        <SmoothScroll>
          <Portfolio
            data={activeDataSlice}
            lang={lang}
            setLang={setLang}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </SmoothScroll>
      </PageLoader>
    </>
  );
}