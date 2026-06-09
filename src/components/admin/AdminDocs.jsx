import { useState, useRef } from "react";

export function AdminDocs({ data, save, isDark }) {
  const [docs, setDocs] = useState(data.docs || []);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  // Compress image helper using HTML Canvas
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH_HEIGHT = 800; // max size for either dimension
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH_HEIGHT) {
              height *= MAX_WIDTH_HEIGHT / width;
              width = MAX_WIDTH_HEIGHT;
            }
          } else {
            if (height > MAX_WIDTH_HEIGHT) {
              width *= MAX_WIDTH_HEIGHT / height;
              height = MAX_WIDTH_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to jpeg with 70% quality for optimal size (approx 30KB - 80KB)
          const base64Url = canvas.toDataURL("image/jpeg", 0.7);
          resolve({
            src: base64Url,
            caption: file.name.replace(/\.[^.]+$/, ""), // default caption is filename
          });
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    const compressedDocs = [];
    
    for (const file of files) {
      try {
        const compressed = await compressImage(file);
        compressedDocs.push(compressed);
      } catch (err) {
        console.error("Gagal mengompresi gambar:", err);
      }
    }

    if (compressedDocs.length > 0) {
      const updated = [...docs, ...compressedDocs];
      setDocs(updated);
      save({ ...data, docs: updated });
    }
    
    e.target.value = "";
    setLoading(false);
  };

  const updateCaption = (i, caption) => {
    const updated = docs.map((d, ii) => (ii === i ? { ...d, caption } : d));
    setDocs(updated);
    save({ ...data, docs: updated });
  };

  const removeDoc = (i) => {
    const updated = docs.filter((_, ii) => ii !== i);
    setDocs(updated);
    save({ ...data, docs: updated });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl tracking-tight font-semibold text-customText-light dark:text-customText-dark">
          Dokumentasi Galeri
        </h2>
        <button
          type="button"
          onClick={() => fileRef.current.click()}
          disabled={loading}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-all cursor-pointer disabled:opacity-55"
        >
          {loading ? "Mengompresi..." : "+ Upload Foto"}
        </button>
      </div>
      
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />

      {docs.length === 0 ? (
        <div
          onClick={() => !loading && fileRef.current.click()}
          className={`cursor-pointer text-center py-16 rounded-2xl border-2 border-dashed transition-colors select-none
            border-black/10 hover:border-brand/40 text-customText-subLight
            dark:border-white/10 dark:hover:border-brand-dark/40 dark:text-customText-subDark`}
        >
          <div className="text-4xl mb-3">📸</div>
          <p className="text-sm font-semibold">Klik untuk upload foto dokumentasi</p>
          <p className="text-xs mt-1 opacity-70">
            JPG, PNG, WebP · Kompresi otomatis aktif untuk menghemat ruang penyimpanan
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {docs.map((doc, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-black/5 dark:bg-white/5 overflow-hidden">
                <img
                  src={doc.src}
                  alt={doc.caption || "Dokumentasi"}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeDoc(i)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow"
                  title="Hapus gambar"
                >
                  ✕
                </button>
              </div>
              <div className="p-2 border-t border-black/8 dark:border-white/8">
                <input
                  type="text"
                  value={doc.caption || ""}
                  onChange={(e) => updateCaption(i, e.target.value)}
                  placeholder="Keterangan foto..."
                  className="w-full text-xs px-2 py-1.5 rounded-lg border outline-none bg-customBg-light border-black/10 text-customText-light focus:border-brand dark:bg-customBg-light/5 dark:border-white/10 dark:text-customText-dark dark:focus:border-brand-dark"
                />
              </div>
            </div>
          ))}
          
          <div
            onClick={() => !loading && fileRef.current.click()}
            className="cursor-pointer flex flex-col items-center justify-center aspect-[4/3] rounded-xl border-2 border-dashed border-black/10 hover:border-brand/40 text-customText-subLight dark:border-white/10 dark:hover:border-brand-dark/40 dark:text-customText-subDark transition-colors"
          >
            <span className="text-2xl font-bold mb-1">+</span>
            <span className="text-xs font-medium">Tambah foto</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDocs;
