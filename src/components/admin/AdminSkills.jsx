import { useState } from "react";
import { AdminSaveBtn } from "./AdminFields";

export function AdminSkills({ data, save, isDark }) {
  const [skills, setSkills] = useState(data.skills);
  const [newSkill, setNewSkill] = useState({ name: "", logo: "", featured: false });
  const [activeGroup, setActiveGroup] = useState("frontend");
  const groups = ["frontend", "backend", "database", "tools"];

  const removeSkill = (group, idx) => {
    setSkills((s) => ({
      ...s,
      [group]: s[group].filter((_, i) => i !== idx),
    }));
  };

  const toggleFeatured = (group, idx) => {
    setSkills((s) => ({
      ...s,
      [group]: s[group].map((sk, i) =>
        i === idx ? { ...sk, featured: !sk.featured } : sk
      ),
    }));
  };

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    setSkills((s) => ({
      ...s,
      [activeGroup]: [
        ...s[activeGroup],
        {
          name: newSkill.name.trim(),
          logo: newSkill.logo.trim() || "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
          featured: newSkill.featured,
        },
      ],
    }));
    setNewSkill({ name: "", logo: "", featured: false });
  };

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Tech Stack
      </h2>
      
      {/* Category selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setActiveGroup(g)}
            className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-all font-semibold outline-none cursor-pointer
              ${
                activeGroup === g
                  ? "bg-[#edf5e5] text-brand dark:bg-brand-darkBg dark:text-brand-textDark"
                  : "text-customText-mutedLight hover:bg-black/5 dark:text-customText-mutedDark dark:hover:bg-white/5"
              }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Skill List */}
      <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto pr-1">
        {skills[activeGroup] && skills[activeGroup].length === 0 ? (
          <p className="text-xs italic text-customText-subLight dark:text-customText-subDark py-2">
            Belum ada skill di kategori ini.
          </p>
        ) : (
          skills[activeGroup].map((sk, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard transition-all"
            >
              <img
                src={sk.logo}
                alt=""
                className="w-5 h-5 object-contain rounded"
                onError={(e) => {
                  e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
                }}
              />
              <span className="text-sm font-medium flex-1 text-customText-light dark:text-customText-dark">
                {sk.name}
              </span>
              
              <button
                type="button"
                onClick={() => toggleFeatured(activeGroup, i)}
                className={`text-xs px-2 py-0.5 rounded-full border transition-all cursor-pointer font-medium
                  ${
                    sk.featured
                      ? "bg-[#edf5e5] text-brand border-brand/20 dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20"
                      : "border-black/10 text-customText-subLight dark:border-white/10 dark:text-customText-subDark"
                  }`}
              >
                {sk.featured ? "★ Featured" : "☆ Biasa"}
              </button>
              
              <button
                type="button"
                onClick={() => removeSkill(activeGroup, i)}
                className="text-xs text-red-500 hover:text-red-700 px-1 cursor-pointer font-semibold"
                title="Hapus"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Skill Form */}
      <div className="p-4 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-customText-subLight dark:text-customText-subDark">
          Tambah Skill Baru ke {activeGroup}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
            placeholder="Nama (e.g. React.js)"
            className="px-3 py-2 rounded-lg border text-sm outline-none bg-customBg-light border-black/10 text-customText-light focus:border-brand dark:bg-customBg-light/10 dark:border-white/10 dark:text-customText-dark dark:focus:border-brand-dark"
          />
          <input
            type="text"
            value={newSkill.logo}
            onChange={(e) => setNewSkill((s) => ({ ...s, logo: e.target.value }))}
            placeholder="URL Logo (e.g. devicons URL)"
            className="px-3 py-2 rounded-lg border text-sm outline-none bg-customBg-light border-black/10 text-customText-light focus:border-brand dark:bg-customBg-light/10 dark:border-white/10 dark:text-customText-dark dark:focus:border-brand-dark"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-medium text-customText-mutedLight dark:text-customText-mutedDark cursor-pointer select-none">
            <input
              type="checkbox"
              checked={newSkill.featured}
              onChange={(e) => setNewSkill((s) => ({ ...s, featured: e.target.checked }))}
              className="rounded text-brand focus:ring-brand accent-brand cursor-pointer"
            />
            Star (Featured Skill)
          </label>
          
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-colors"
          >
            + Tambah
          </button>
        </div>
      </div>

      <AdminSaveBtn onClick={() => save({ ...data, skills })} isDark={isDark} />
    </div>
  );
}

export default AdminSkills;
