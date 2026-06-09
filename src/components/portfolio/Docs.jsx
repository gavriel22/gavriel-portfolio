export function Docs({ docs, isDark }) {
  return (
    <section
      id="docs"
      className="py-28 px-6 md:px-8 bg-customBg-lightAccent dark:bg-customBg-darkAccent transition-colors"
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="reveal text-xs tracking-[0.14em] uppercase mb-3 text-brand dark:text-[#7ab84a] font-medium">
          Galeri
        </p>
        <h2 className="reveal font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-tight mb-12 text-customText-light dark:text-customText-dark">
          Dokumentasi <em className="text-brand dark:text-[#7ab84a] not-italic">keaktifan</em>
        </h2>
        
        {!docs || docs.length === 0 ? (
          <div className="reveal text-center py-20 rounded-2xl border-2 border-dashed border-black/10 text-customText-subLight dark:border-white/10 dark:text-customText-subDark">
            <div className="text-4xl mb-4 select-none">📸</div>
            <p className="text-sm font-medium">Belum ada dokumentasi.</p>
            <p className="text-xs mt-1 opacity-75">Tambahkan foto dokumentasi kegiatan melalui Admin Panel.</p>
          </div>
        ) : (
          <div className="reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {docs.map((doc, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard group cursor-pointer transition-all hover:shadow-md"
                onClick={() => window.open(doc.src, "_blank")}
                title="Lihat ukuran penuh"
              >
                <div className="overflow-hidden aspect-[4/3] bg-black/5 dark:bg-white/5">
                  <img
                    src={doc.src}
                    alt={doc.caption || "Dokumentasi keaktifan"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {doc.caption && (
                  <div className="px-3 py-2 text-xs truncate border-t border-black/8 text-customText-mutedLight dark:border-white/8 dark:text-customText-mutedDark font-medium">
                    {doc.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Docs;
