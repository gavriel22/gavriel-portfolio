import { supabase } from '../database/supabaseClient';
import { INITIAL_DATA, INITIAL_DATA_ID, INITIAL_DATA_EN, loadData, saveData } from './storage';

/**
 * Mengambil data portfolio dari tabel portfolio_data di Supabase.
 * Melakukan migrasi otomatis ke skema bilingual jika data di database masih format lama.
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
      const parsed = data.content;

      // MIGRATION: Jika data di DB masih berbentuk flat/single-language (tidak punya properti 'id' dan 'en')
      if (!parsed.id && !parsed.en) {
        const migrated = {
          id: {
            ...INITIAL_DATA_ID,
            ...parsed,
            hero: { ...INITIAL_DATA_ID.hero, ...parsed.hero },
            about: { ...INITIAL_DATA_ID.about, ...parsed.about },
            contact: { ...INITIAL_DATA_ID.contact, ...parsed.contact },
            skills: { ...INITIAL_DATA_ID.skills, ...parsed.skills },
          },
          en: {
            ...INITIAL_DATA_EN,
            ...parsed,
            hero: { ...INITIAL_DATA_EN.hero, ...parsed.hero },
            about: { ...INITIAL_DATA_EN.about, ...parsed.about },
            contact: { ...INITIAL_DATA_EN.contact, ...parsed.contact },
            skills: { ...INITIAL_DATA_EN.skills, ...parsed.skills },
          }
        };
        // Hapus Figma dari frontend di hasil migrasi dan masukkan ke uiux
        if (migrated.id.skills.frontend) {
          migrated.id.skills.frontend = migrated.id.skills.frontend.filter(s => s.name !== "Figma");
        }
        if (migrated.en.skills.frontend) {
          migrated.en.skills.frontend = migrated.en.skills.frontend.filter(s => s.name !== "Figma");
        }
        return migrated;
      }

      // Gabungkan data bilingual dengan INITIAL_DATA untuk menjaga kelengkapan skema
      return {
        id: {
          ...INITIAL_DATA.id,
          ...parsed.id,
          hero: { ...INITIAL_DATA.id.hero, ...parsed.id?.hero },
          about: { ...INITIAL_DATA.id.about, ...parsed.id?.about },
          contact: { ...INITIAL_DATA.id.contact, ...parsed.id?.contact },
          skills: { ...INITIAL_DATA.id.skills, ...parsed.id?.skills },
        },
        en: {
          ...INITIAL_DATA.en,
          ...parsed.en,
          hero: { ...INITIAL_DATA.en.hero, ...parsed.en?.hero },
          about: { ...INITIAL_DATA.en.about, ...parsed.en?.about },
          contact: { ...INITIAL_DATA.en.contact, ...parsed.en?.contact },
          skills: { ...INITIAL_DATA.en.skills, ...parsed.en?.skills },
        }
      };
    }
  } catch (err) {
    console.error("Exception saat memuat data dari Supabase:", err);
  }
  return loadData();
}

/**
 * Menyimpan data portfolio ke Supabase melalui PostgreSQL RPC function 'update_portfolio_data'.
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
