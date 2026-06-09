import { useState, useEffect } from "react";
import Portfolio from "./pages/Portfolio";
import AdminPanel from "./pages/AdminPanel";
import { loadData } from "./utils/storage";

export default function App() {
  const [page, setPage] = useState("portfolio");
  const [data, setData] = useState(loadData);
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
    } catch {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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

  return (
    <Portfolio
      data={data}
      isDark={isDark}
      toggleTheme={toggleTheme}
      goAdmin={() => setPage("admin")}
    />
  );
}
