import { useState } from "react";
import { AdminField, AdminSaveBtn } from "./AdminFields";

export function AdminAbout({ data, save, isDark }) {
  const [about, setAbout] = useState(data.about);
  const f = (k) => (v) => setAbout((a) => ({ ...a, [k]: v }));
  const [interestInput, setInterestInput] = useState("");

  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !about.interests.includes(trimmed)) {
      setAbout((a) => ({ ...a, interests: [...a.interests, trimmed] }));
      setInterestInput("");
    }
  };

  const removeInterest = (idx) => {
    setAbout((a) => ({
      ...a,
      interests: a.interests.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Tentang Saya
      </h2>
      <AdminField label="Bio Paragraf 1" value={about.bio1} onChange={f("bio1")} multiline isDark={isDark} />
      <AdminField label="Bio Paragraf 2" value={about.bio2} onChange={f("bio2")} multiline isDark={isDark} />
      <AdminField label="Bio Paragraf 3" value={about.bio3} onChange={f("bio3")} multiline isDark={isDark} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminField label="Universitas" value={about.university} onChange={f("university")} isDark={isDark} />
        <AdminField label="Program Studi" value={about.major} onChange={f("major")} isDark={isDark} />
        <AdminField label="Angkatan" value={about.batch} onChange={f("batch")} isDark={isDark} />
        <AdminField label="Semester" value={about.semester} onChange={f("semester")} isDark={isDark} />
        <div className="md:col-span-2">
          <AdminField label="Lokasi" value={about.location} onChange={f("location")} isDark={isDark} />
        </div>
      </div>

      <div className="mb-6 mt-4">
        <label className="block text-[0.7rem] uppercase tracking-widest mb-2 font-semibold text-customText-subLight dark:text-customText-subDark">
          Minat & Fokus
        </label>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {about.interests && about.interests.map((i, idx) => (
            <span
              key={idx}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all
                bg-[#edf5e5] text-brand border-brand/15
                dark:bg-brand-darkBg dark:text-brand-textDark dark:border-brand/20`}
            >
              {i}
              <button
                type="button"
                onClick={() => removeInterest(idx)}
                className="hover:text-red-500 font-bold ml-1 transition-colors outline-none cursor-pointer"
                title={`Hapus ${i}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="Tambah minat/fokus baru (tekan Enter)"
            className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none transition-all duration-200 
              bg-white border-black/15 text-customText-light placeholder-customText-subLight/60 focus:border-brand
              dark:bg-customBg-light/10 dark:border-white/10 dark:text-customText-dark dark:placeholder-customText-subDark/40 dark:focus:border-brand-dark"
          />
          <button
            type="button"
            onClick={addInterest}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-colors"
          >
            Tambah
          </button>
        </div>
      </div>

      <AdminSaveBtn onClick={() => save({ ...data, about })} isDark={isDark} />
    </div>
  );
}

export default AdminAbout;
