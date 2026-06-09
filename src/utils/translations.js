export const translations = {
  id: {
    navbar: {
      about: "Tentang",
      skills: "Skills",
      projects: "Proyek",
      activities: "Aktivitas",
      docs: "Galeri",
      contact: "Kontak",
      admin: "⚙️ Admin",
    },
    hero: {
      activeSemester: "semester aktif",
      scroll: "gulir",
    },
    about: {
      title: "Tentang saya",
      subtitle: "Siapa saya?",
      statsLiveProjects: "Proyek live",
      statsOrganizations: "Organisasi",
      statsCommittees: "Kepanitiaan",
      statsAwards: "Penghargaan",
      education: "Pendidikan",
      interests: "Minat & Fokus",
      periodLabel: "Angkatan",
      semesterLabel: "Semester",
    },
    skills: {
      title: "Kemampuan",
      subtitle: "Tech Stack",
    },
    projects: {
      title: "Proyek",
      subtitle: "Karya Terkini",
    },
    activities: {
      title: "Aktivitas",
      subtitle: "Pengalaman & Prestasi",
      orgHeader: "Organisasi",
      committeeHeader: "Kepanitiaan",
      awardHeader: "Kompetisi & Penghargaan",
    },
    docs: {
      title: "Galeri Kegiatan",
      subtitle: "Dokumentasi & Dokumenter",
      noDocs: "Belum ada dokumentasi foto.",
    },
    contact: {
      title: "Hubungi",
      subtitle: "Mari Berkolaborasi",
      statusLabel: "Status saat ini",
      buttonText: "Hubungi Saya",
    },
    footer: {
      rights: "Hak Cipta Dilindungi.",
    },
    admin: {
      backToPortfolio: "← Kembali ke Portfolio",
    }
  },
  en: {
    navbar: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      activities: "Activities",
      docs: "Gallery",
      contact: "Contact",
      admin: "⚙️ Admin",
    },
    hero: {
      activeSemester: "active semester",
      scroll: "scroll",
    },
    about: {
      title: "About me",
      subtitle: "Who am I?",
      statsLiveProjects: "Live projects",
      statsOrganizations: "Organizations",
      statsCommittees: "Committees",
      statsAwards: "Awards",
      education: "Education",
      interests: "Interests & Focus",
      periodLabel: "Batch",
      semesterLabel: "Semester",
    },
    skills: {
      title: "Skills",
      subtitle: "Tech Stack",
    },
    projects: {
      title: "Projects",
      subtitle: "Recent Work",
    },
    activities: {
      title: "Activities",
      subtitle: "Experience & Achievements",
      orgHeader: "Organizations",
      committeeHeader: "Committees",
      awardHeader: "Competitions & Awards",
    },
    docs: {
      title: "Activity Gallery",
      subtitle: "Documentation & Highlights",
      noDocs: "No documentation photos added yet.",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's Collaborate",
      statusLabel: "Current status",
      buttonText: "Contact Me",
    },
    footer: {
      rights: "All Rights Reserved.",
    },
    admin: {
      backToPortfolio: "← Back to Portfolio",
    }
  }
};

export const getTranslation = (lang, section, key) => {
  return translations[lang]?.[section]?.[key] || translations["id"]?.[section]?.[key] || "";
};
