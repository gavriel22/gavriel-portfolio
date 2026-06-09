import { useState } from "react";
import { AdminField, AdminSaveBtn } from "./AdminFields";

export function AdminHero({ data, save, isDark }) {
  const [hero, setHero] = useState(data.hero);
  const f = (k) => (v) => setHero((h) => ({ ...h, [k]: v }));

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Hero Section
      </h2>
      <AdminField label="Nama Lengkap" value={hero.name} onChange={f("name")} isDark={isDark} />
      <AdminField label="Tagline" value={hero.tagline} onChange={f("tagline")} isDark={isDark} />
      <AdminField label="Deskripsi" value={hero.description} onChange={f("description")} multiline isDark={isDark} />
      <AdminField label="Teks Tombol Utama" value={hero.ctaPrimary} onChange={f("ctaPrimary")} isDark={isDark} />
      <AdminField label="Teks Tombol Kedua" value={hero.ctaSecondary} onChange={f("ctaSecondary")} isDark={isDark} />
      <AdminSaveBtn onClick={() => save({ ...data, hero })} isDark={isDark} />
    </div>
  );
}

export default AdminHero;
