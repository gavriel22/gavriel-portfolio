import { useState, useRef } from "react";
import { AdminField, AdminSaveBtn } from "./AdminFields";

export function AdminHero({ data, save, isDark }) {
  const [hero, setHero] = useState(data.hero || { name: "", tagline: "", description: "", ctaPrimary: "", ctaSecondary: "", profileImage: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const f = (k) => (v) => setHero((h) => ({ ...h, [k]: v }));

  // Compress image helper using HTML Canvas
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 400; // max size for profile image is smaller to keep db light
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to jpeg with 70% quality (very compact, ~20KB)
          const base64Url = canvas.toDataURL("image/jpeg", 0.7);
          resolve(base64Url);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      setHero((h) => ({ ...h, profileImage: compressed }));
    } catch (err) {
      console.error("Gagal mengupload foto profil:", err);
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const removePhoto = () => {
    setHero((h) => ({ ...h, profileImage: "" }));
  };

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Hero Section
      </h2>

      {/* Profil Image Upload Area */}
      <div className="mb-6 p-4 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard">
        <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-customText-subLight dark:text-customText-subDark">
          Foto Profil
        </label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0">
            {hero.profileImage ? (
              <img
                src={hero.profileImage}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl">👤</span>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileRef.current.click()}
                disabled={uploading}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-all cursor-pointer disabled:opacity-55"
              >
                {uploading ? "Mengompresi..." : "Upload Foto"}
              </button>
              {hero.profileImage && (
                <button
                  type="button"
                  onClick={removePhoto}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>
            <p className="text-[10px] text-customText-subLight dark:text-customText-subDark">
              Format JPG/PNG. Kompresi otomatis akan menghemat ukuran penyimpanan.
            </p>
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </div>

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
