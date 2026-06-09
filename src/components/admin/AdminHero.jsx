import { useState, useRef } from "react";
import { AdminField, AdminSaveBtn } from "./AdminFields";

export function AdminHero({ data, save, isDark }) {
  const [hero, setHero] = useState(data.hero || { name: "", tagline: "", description: "", ctaPrimary: "", ctaSecondary: "", profileImage: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  // Cropper states
  const [cropImgSrc, setCropImgSrc] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const f = (k) => (v) => setHero((h) => ({ ...h, [k]: v }));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setCropImgSrc(reader.result);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
      setShowCropper(true);
      setUploading(false);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // reset file input
  };

  const removePhoto = () => {
    setHero((h) => ({ ...h, profileImage: "" }));
  };

  // Drag-to-pan handlers (Mouse)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Drag-to-pan handlers (Touch for Mobile)
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const cancelCrop = () => {
    setShowCropper(false);
    setCropImgSrc(null);
  };

  const applyCrop = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      const aspect = img.width / img.height;
      let w = 250;
      let h = 250;
      if (aspect > 1) {
        h = 250;
        w = 250 * aspect;
      } else {
        w = 250;
        h = 250 / aspect;
      }

      const scale = 400 / 250;
      const drawW = w * zoom * scale;
      const drawH = h * zoom * scale;
      const drawX = (125 + offset.x - (w * zoom) / 2) * scale;
      const drawY = (125 + offset.y - (h * zoom) / 2) * scale;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Convert cropped canvas to base64 jpeg
      const base64Url = canvas.toDataURL("image/jpeg", 0.8);
      setHero((h) => ({ ...h, profileImage: base64Url }));
      setShowCropper(false);
      setCropImgSrc(null);
    };
    img.src = cropImgSrc;
  };

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Hero Section
      </h2>

      {/* Profil Image Upload Area */}
      <div className="mb-6 p-4 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard">
        <label className="block text-xs font-bold uppercase tracking-wider mb-3 text-customText-subLight dark:text-customText-subDark">
          Foto Profil (Bulat)
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
                {uploading ? "Memuat..." : "Upload Foto"}
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
              Posisikan wajah Anda di tengah sebelum menyimpannya ke database.
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

      {/* Cropper Modal Overlay */}
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease]">
          <div className="bg-white dark:bg-customBg-darkCard border border-black/10 dark:border-white/10 p-6 rounded-2xl max-w-sm w-full flex flex-col items-center shadow-lg text-customText-light dark:text-customText-dark">
            <h3 className="font-serif text-base tracking-tight font-semibold mb-1">
              Sesuaikan Foto Profil
            </h3>
            <p className="text-[10px] text-customText-subLight dark:text-customText-subDark mb-6 uppercase tracking-wider font-bold">
              Geser & perbesar wajah agar berada di tengah
            </p>

            {/* Circular Crop Window Container */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-[250px] h-[250px] rounded-full overflow-hidden relative border-2 border-brand/40 dark:border-brand-dark/40 bg-black/10 dark:bg-white/5 cursor-move select-none flex items-center justify-center shadow-inner"
            >
              {cropImgSrc && (
                <img
                  src={cropImgSrc}
                  alt="Crop Target"
                  className="absolute select-none pointer-events-none origin-center"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                    maxWidth: "none",
                  }}
                  onLoad={(e) => {
                    const img = e.target;
                    const aspect = img.naturalWidth / img.naturalHeight;
                    if (aspect > 1) {
                      img.style.height = "250px";
                      img.style.width = "auto";
                    } else {
                      img.style.width = "250px";
                      img.style.height = "auto";
                    }
                  }}
                />
              )}
              {/* Target Mask Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />
            </div>

            {/* Zoom Slider */}
            <div className="w-full mt-6 mb-6">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2 text-customText-subLight dark:text-customText-subDark">
                <span>Perbesar / Zoom:</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand dark:accent-brand-dark"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={cancelCrop}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-black/10 text-customText-mutedLight hover:bg-black/5 dark:border-white/10 dark:text-customText-mutedDark dark:hover:bg-white/5 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={applyCrop}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}

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
