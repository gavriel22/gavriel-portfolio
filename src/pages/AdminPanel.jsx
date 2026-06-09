import { useState } from "react";
import AdminHero from "../components/admin/AdminHero";
import AdminAbout from "../components/admin/AdminAbout";
import AdminSkills from "../components/admin/AdminSkills";
import AdminList from "../components/admin/AdminList";
import AdminDocs from "../components/admin/AdminDocs";
import AdminContact from "../components/admin/AdminContact";
import { saveData } from "../utils/storage";

const ADMIN_PASSWORD = "gavriel2025";

export function AdminPanel({ data, setData, isDark, toggleTheme, goBack }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [tab, setTab] = useState("hero");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const save = (newData) => {
    setData(newData);
    saveData(newData);
    showToast("✓ Tersimpan");
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-customBg-light text-customText-light dark:bg-customBg-dark dark:text-customText-dark">
        <div className="w-full max-w-sm p-8 rounded-2xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard shadow-sm transition-all">
          <div className="font-serif text-2xl tracking-tight mb-1 font-semibold text-customText-light dark:text-customText-dark">
            Admin Panel
          </div>
          <p className="text-xs mb-8 text-customText-subLight dark:text-customText-subDark font-medium">
            Masukkan password untuk melanjutkan
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setPwErr(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (pw === ADMIN_PASSWORD) {
                  setAuthed(true);
                } else {
                  setPwErr(true);
                }
              }
            }}
            placeholder="Password..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none mb-3 transition-colors 
              bg-customBg-light border-black/10 text-customText-light placeholder-customText-subLight
              focus:border-brand dark:bg-customBg-light/5 dark:border-white/10 dark:text-customText-dark dark:placeholder-customText-subDark dark:focus:border-brand-dark
              ${pwErr ? "border-red-400 dark:border-red-500" : ""}`}
          />
          {pwErr && (
            <p className="text-xs text-red-500 mb-3 font-semibold">
              Password salah
            </p>
          )}
          <button
            onClick={() => {
              if (pw === ADMIN_PASSWORD) {
                setAuthed(true);
              } else {
                setPwErr(true);
              }
            }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] active:scale-95 cursor-pointer"
          >
            Masuk
          </button>
          <button
            onClick={goBack}
            className="w-full mt-3 py-2 text-xs transition-colors text-customText-subLight hover:text-customText-mutedLight dark:text-customText-subDark dark:hover:text-customText-mutedDark cursor-pointer"
          >
            ← Kembali ke Portfolio
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "Tentang" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Proyek" },
    { id: "organizations", label: "Organisasi" },
    { id: "committees", label: "Kepanitiaan" },
    { id: "competitions", label: "Kompetisi" },
    { id: "docs", label: "Dokumentasi" },
    { id: "contact", label: "Kontak" },
  ];

  return (
    <div className="min-h-screen bg-customBg-lightAccent text-customText-light dark:bg-customBg-dark dark:text-customText-dark">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-widest bg-brand text-white shadow-lg animate-[fadeIn_0.3s_ease] dark:bg-[#7ab84a] dark:text-customBg-dark">
          {toast}
        </div>
      )}

      {/* Header Admin Nav */}
      <div className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 border-b bg-customBg-lightAccent/90 border-black/10 dark:bg-customBg-dark/95 dark:border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-serif text-base tracking-tight font-semibold">
            Admin Panel
          </span>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#edf5e5] text-brand border border-brand/10 dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20 font-bold">
            GTN Portfolio
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-all border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5 cursor-pointer"
            title="Toggle Theme"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
          <button
            onClick={goBack}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5 cursor-pointer"
          >
            ← Portfolio
          </button>
        </div>
      </div>

      {/* Admin Layout Grid */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-56px)]">
        {/* Sidebar Nav */}
        <div className="w-full md:w-52 shrink-0 border-r border-black/8 bg-customBg-lightAccent/50 overflow-y-auto dark:border-white/8 dark:bg-customBg-darkCard">
          <div className="p-4 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`text-left px-3.5 py-2 rounded-xl text-[10px] uppercase tracking-widest transition-all font-semibold outline-none cursor-pointer whitespace-nowrap md:w-full
                  ${
                    tab === t.id
                      ? "bg-[#edf5e5] text-brand dark:bg-brand-darkBg dark:text-brand-textDark"
                      : "text-customText-mutedLight hover:bg-black/5 dark:text-customText-mutedDark dark:hover:bg-white/5"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-3xl">
            {tab === "hero" && <AdminHero data={data} save={save} isDark={isDark} />}
            {tab === "about" && <AdminAbout data={data} save={save} isDark={isDark} />}
            {tab === "skills" && <AdminSkills data={data} save={save} isDark={isDark} />}
            {tab === "projects" && (
              <AdminList
                data={data}
                save={save}
                isDark={isDark}
                section="projects"
                fields={[
                  { k: "name", l: "Nama Proyek" },
                  { k: "url", l: "URL Website/Repo" },
                  { k: "desc", l: "Deskripsi Singkat" },
                  { k: "tag", l: "Tag (e.g. Web App, Landing Page)" },
                ]}
                title="Proyek"
              />
            )}
            {tab === "organizations" && (
              <AdminList
                data={data}
                save={save}
                isDark={isDark}
                section="organizations"
                fields={[
                  { k: "name", l: "Nama Singkat Organisasi (e.g. HMPTI)" },
                  { k: "fullName", l: "Nama Lengkap Organisasi" },
                  { k: "role", l: "Peran/Magang" },
                  { k: "period", l: "Periode Keanggotaan" },
                ]}
                title="Organisasi"
              />
            )}
            {tab === "committees" && (
              <AdminList
                data={data}
                save={save}
                isDark={isDark}
                section="committees"
                fields={[
                  { k: "name", l: "Nama Acara/Panitia" },
                  { k: "fullName", l: "Deskripsi/Afiliasi" },
                  { k: "role", l: "Peran/Divisi" },
                  { k: "period", l: "Periode Pelaksanaan" },
                ]}
                title="Kepanitiaan"
              />
            )}
            {tab === "competitions" && (
              <AdminList
                data={data}
                save={save}
                isDark={isDark}
                section="competitions"
                fields={[
                  { k: "name", l: "Nama Kompetisi/Kegiatan" },
                  { k: "badge", l: "Pencapaian (e.g. Juara 2, Participant, Bootcamp)" },
                  { k: "type", l: "Tipe Pencapaian (tulis 'award' jika Juara, 'participant' untuk Peserta, 'bootcamp' untuk Pelatihan)" },
                  { k: "period", l: "Periode" },
                ]}
                title="Kompetisi & Penghargaan"
              />
            )}
            {tab === "docs" && <AdminDocs data={data} save={save} isDark={isDark} />}
            {tab === "contact" && <AdminContact data={data} save={save} isDark={isDark} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
