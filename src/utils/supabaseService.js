import { supabase } from '../database/supabaseClient';
import { INITIAL_DATA, loadData, saveData } from './storage';

/**
 * Mengambil data portfolio dari tabel portfolio_data di Supabase.
 * Jika terjadi error atau data kosong, akan menggunakan data lokal (localStorage / INITIAL_DATA).
 */
export async function fetchPortfolioData() {
  try {
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('content')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.warn("Gagal memuat data dari Supabase (menggunakan local storage):", error.message);
      return loadData();
    }

    if (data && data.content && Object.keys(data.content).length > 0) {
      // Gabungkan dengan INITIAL_DATA untuk memastikan skema data lengkap
      return {
        ...INITIAL_DATA,
        ...data.content,
        hero: { ...INITIAL_DATA.hero, ...data.content.hero },
        about: { ...INITIAL_DATA.about, ...data.content.about },
        contact: { ...INITIAL_DATA.contact, ...data.content.contact },
        skills: { ...INITIAL_DATA.skills, ...data.content.skills },
      };
    }
  } catch (err) {
    console.error("Exception saat memuat data dari Supabase:", err);
  }
  return loadData();
}

/**
 * Menyimpan data portfolio ke Supabase melalui PostgreSQL RPC function 'update_portfolio_data'.
 * Fungsi ini memvalidasi password admin di sisi database demi keamanan.
 */
export async function updatePortfolioDataSecure(password, newData) {
  const { data, error } = await supabase.rpc('update_portfolio_data', {
    admin_pw: password,
    new_content: newData,
  });

  if (error) {
    throw new Error(error.message || "Gagal menyimpan ke database Supabase.");
  }

  // Backup data di localStorage lokal
  saveData(newData);
  return data;
}
