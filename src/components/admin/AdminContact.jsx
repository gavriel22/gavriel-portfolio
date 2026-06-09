import { useState } from "react";
import { AdminField, AdminSaveBtn } from "./AdminFields";

export function AdminContact({ data, save, isDark }) {
  const [contact, setContact] = useState(data.contact);
  const f = (k) => (v) => setContact((c) => ({ ...c, [k]: v }));

  return (
    <div>
      <h2 className="font-serif text-xl tracking-tight mb-6 font-semibold text-customText-light dark:text-customText-dark">
        Kontak & Status
      </h2>
      <AdminField label="Email" value={contact.email} onChange={f("email")} isDark={isDark} />
      <AdminField label="GitHub URL" value={contact.github} onChange={f("github")} isDark={isDark} />
      <AdminField label="LinkedIn URL" value={contact.linkedin} onChange={f("linkedin")} isDark={isDark} />
      <AdminField label="Status (teks badge)" value={contact.status} onChange={f("status")} isDark={isDark} />
      <AdminField label="Detail Status" value={contact.statusDetail} onChange={f("statusDetail")} multiline isDark={isDark} />
      <AdminSaveBtn onClick={() => save({ ...data, contact })} isDark={isDark} />
    </div>
  );
}

export default AdminContact;
