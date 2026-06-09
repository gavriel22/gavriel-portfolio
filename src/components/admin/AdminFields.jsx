export function AdminField({ label, value, onChange, multiline, isDark, placeholder }) {
  const cls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200 
    bg-white border-black/15 text-customText-light placeholder-customText-subLight/60 focus:border-brand focus:ring-1 focus:ring-brand
    dark:bg-customBg-light/10 dark:border-white/10 dark:text-customText-dark dark:placeholder-customText-subDark/40 dark:focus:border-brand-dark dark:focus:ring-1 dark:focus:ring-brand-dark`;

  return (
    <div className="mb-4">
      <label className="block text-[0.7rem] uppercase tracking-widest mb-1.5 font-semibold text-customText-subLight dark:text-customText-subDark">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

export function AdminSaveBtn({ onClick, label = "Simpan Perubahan", isDark }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all mt-2 active:scale-95 shadow-sm
        bg-brand text-white hover:bg-[#1a3009]
        dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830]"
    >
      {label}
    </button>
  );
}

export default AdminField;
