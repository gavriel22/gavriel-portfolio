import { useState, useRef, useEffect } from "react";
import { AdminField } from "./AdminFields";

export function AdminList({ data, save, isDark, section, fields, title }) {
  const [items, setItems] = useState(data[section] || []);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({});
  
  // Track high ID for items
  const nextId = useRef(1);
  
  useEffect(() => {
    const sectionItems = data[section] || [];
    setItems(sectionItems);
    nextId.current = Math.max(0, ...sectionItems.map((i) => i.id || 0)) + 1;
  }, [data, section]);

  const startEdit = (item, idx) => {
    setEditIdx(idx);
    setForm({ ...item });
  };

  const startNew = () => {
    setEditIdx("new");
    setForm(Object.fromEntries(fields.map((f) => [f.k, ""])));
  };

  const cancelEdit = () => {
    setEditIdx(null);
    setForm({});
  };

  const saveItem = () => {
    let updated;
    if (editIdx === "new") {
      updated = [...items, { ...form, id: nextId.current++ }];
    } else {
      updated = items.map((it, i) => (i === editIdx ? { ...it, ...form } : it));
    }
    setItems(updated);
    save({ ...data, [section]: updated });
    cancelEdit();
  };

  const removeItem = (idx) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    save({ ...data, [section]: updated });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl tracking-tight font-semibold text-customText-light dark:text-customText-dark">
          {title}
        </h2>
        <button
          type="button"
          onClick={startNew}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-all cursor-pointer"
        >
          + Tambah {title}
        </button>
      </div>

      {/* Item editor overlay card */}
      {editIdx !== null && (
        <div className="p-5 rounded-2xl border mb-6 bg-customBg-light border-brand/20 dark:bg-customBg-darkCard dark:border-brand-dark/20 animate-[fadeIn_0.25s_ease]">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4 text-brand dark:text-[#7ab84a]">
            {editIdx === "new" ? "Tambah Item Baru" : "Edit Item"}
          </p>
          
          <div className="space-y-1">
            {fields.map((f) => (
              <AdminField
                key={f.k}
                label={f.l}
                value={form[f.k] || ""}
                onChange={(v) => setForm((fo) => ({ ...fo, [f.k]: v }))}
                isDark={isDark}
                multiline={f.k === "desc" || f.k === "statusDetail"}
              />
            ))}
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={saveItem}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand text-white hover:bg-[#1a3009] dark:bg-[#7ab84a] dark:text-customBg-dark dark:hover:bg-[#5a9830] transition-colors"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="px-4 py-2 rounded-xl text-xs font-medium border border-black/10 text-customText-mutedLight hover:bg-black/5 dark:border-white/10 dark:text-customText-mutedDark dark:hover:bg-white/5 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Item listing */}
      <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <p className="text-sm italic text-customText-subLight dark:text-customText-subDark py-6 text-center border border-dashed border-black/10 dark:border-white/10 rounded-xl">
            Belum ada item di section {title}.
          </p>
        ) : (
          items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex items-start justify-between gap-3 p-4 rounded-xl border border-black/8 bg-white dark:border-white/8 dark:bg-customBg-darkCard group transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate text-customText-light dark:text-customText-dark">
                  {item[fields[0].k]}
                </div>
                {fields[1] && (
                  <div className="text-xs mt-1 truncate text-customText-mutedLight dark:text-customText-mutedDark">
                    {item[fields[1].k]}
                  </div>
                )}
                {fields[2] && item[fields[2].k] && (
                  <div className="text-xs mt-0.5 truncate text-customText-subLight dark:text-customText-subDark italic">
                    {item[fields[2].k]}
                  </div>
                )}
              </div>
              <div className="flex gap-1.5 shrink-0 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => startEdit(item, idx)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold border border-black/10 text-customText-mutedLight hover:bg-black/5 dark:border-white/10 dark:text-customText-mutedDark dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminList;
