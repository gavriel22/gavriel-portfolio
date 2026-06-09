// ─── INITIAL SINGLE-LANGUAGE SCHEMA (FOR TRANSLATION & REFERENCE) ─────────────
export const INITIAL_DATA_ID = {
  hero: {
    name: "Gavriel Theofilus Nugroho",
    tagline: "Informatika · UKSW · 2023",
    description:
      "Mahasiswa Teknik Informatika yang berfokus pada pengembangan web modern, desain antarmuka yang intuitif, dan solusi backend yang andal. Senang membangun hal-hal yang bermakna dari kode.",
    ctaPrimary: "Lihat Proyek",
    ctaSecondary: "Hubungi Saya",
    profileImage: "",
  },
  about: {
    bio1:
      "Halo! Saya Gavriel Theofilus Nugroho, mahasiswa aktif Teknik Informatika di Universitas Kristen Satya Wacana (UKSW) angkatan 2023, saat ini berada di semester 6.",
    bio2:
      "Saya memiliki minat yang kuat dalam pengembangan aplikasi web dan mobile, terutama menggunakan React.js, Tailwind CSS, Laravel, dan Flutter. Saya senang membangun antarmuka yang bersih dan pengalaman pengguna yang menyenangkan.",
    bio3:
      "Di luar coding, saya aktif berkontribusi di lingkungan kampus melalui organisasi dan kepanitiaan, serta terus mengasah kemampuan melalui kompetisi dan bootcamp.",
    university: "Universitas Kristen Satya Wacana",
    major: "S1 Teknik Informatika",
    batch: "2023",
    semester: "6",
    location: "Salatiga, Jawa Tengah",
    interests: ["Web Development", "Mobile Development", "UI/UX Design", "Database Management", "Cybersecurity", "Data Science"],
  },
  skills: {
    frontend: [
      { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", featured: true },
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", featured: true },
      { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", featured: true },
      { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", featured: false },
      { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", featured: false },
      { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", featured: false },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", featured: false },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", featured: false },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", featured: false, invert: true },
      { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", featured: false },
    ],
    backend: [
      { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", featured: true },
      { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", featured: false },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", featured: false },
      { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", featured: false, invert: true },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", featured: false },
      { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", featured: false },
    ],
    database: [
      { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", featured: true },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", featured: true },
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", featured: false },
      { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", featured: false },
      { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg", featured: false },
    ],
    tools: [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", featured: false },
      { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", featured: false, invert: true },
      { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", featured: false },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", featured: false },
      { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", featured: false },
    ],
    uiux: [
      { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", featured: true },
    ],
  },
  projects: [
    { id: 1, name: "Family Tree", url: "https://family-tree-one-gray.vercel.app/", desc: "Website interaktif untuk visualisasi dan penelusuran silsilah keluarga. Memetakan hubungan antar anggota keluarga secara visual.", tag: "Web App" },
    { id: 2, name: "STMISS Web", url: "https://stmiss-web.vercel.app/", desc: "Website company profile profesional yang menampilkan identitas, layanan, dan informasi perusahaan secara elegan.", tag: "Company Profile" },
    { id: 3, name: "Edukasi Hipertensi", url: "https://edukasi-hipertensi.vercel.app/", desc: "Landing page edukasi kesehatan tentang hipertensi — menyampaikan informasi medis dengan tampilan yang ramah dan informatif.", tag: "Landing Page" },
    { id: 4, name: "Jastip Kas", url: "https://jastip-kas.vercel.app/", desc: "Aplikasi web pencatatan dan manajemen mutasi kas untuk bisnis jastip, lengkap dengan sistem pelaporan keuangan.", tag: "Finance App" },
    { id: 5, name: "Church Admin Panel", url: "https://church-admin-panel-nine.vercel.app/", desc: "Sistem manajemen administrasi gereja dengan landing page publik dan panel admin internal untuk pengelolaan data jemaat.", tag: "Admin System" },
  ],
  organizations: [
    { id: 1, name: "ISACA", fullName: "Information Systems Audit and Control Association", role: "Head of Content", period: "Jan 2024 – Des 2024" },
    { id: 2, name: "HMPTI", fullName: "Himpunan Mahasiswa Teknik Informatika", role: "Magang Divisi Internal & Eksternal", period: "Jun 2024 – Des 2024" },
    { id: 3, name: "HMPTI", fullName: "Himpunan Mahasiswa Teknik Informatika", role: "Koordinator Divisi Program Kerja", period: "Jan 2025 – Des 2025" },
  ],
  committees: [
    { id: 1, name: "ISFEST 2024", fullName: "Information System Festival", role: "Divisi Hubungan Masyarakat", period: "Sep 2024" },
    { id: 2, name: "GIHN 2024", fullName: "Gelar Inovasi Harmoni Nusantara", role: "Panitia", period: "Jun 2024" },
    { id: 3, name: "Company Visit TI 2024", fullName: "Teknik Informatika UKSW", role: "Sekretaris", period: "Nov 2024" },
    { id: 4, name: "GIHN 2025", fullName: "Gelar Inovasi Harmoni Nusantara", role: "Panitia", period: "Okt 2025" },
    { id: 5, name: "Company Visit TI 2025", fullName: "Teknik Informatika UKSW", role: "Bendahara", period: "Nov 2025" },
  ],
  competitions: [
    { id: 1, name: "Fiskom Entrepreneur Competition 2025", badge: "🏆 Juara 2", type: "award", period: "Sep 2025" },
    { id: 2, name: "Wirausaha Merdeka UKSW 2024", badge: "🥇 Best Business Plan", type: "award", period: "Agu 2024 – Des 2024" },
    { id: 3, name: "UI/UX Competition ISFEST 2025", badge: "Participant", type: "participant", period: "Sep 2025" },
    { id: 4, name: "Cyber Security Tehcom Bootcamp", badge: "Bootcamp", type: "bootcamp", period: "Jun 2025" },
    { id: 5, name: "Data Science Tehcom Bootcamp", badge: "Bootcamp", type: "bootcamp", period: "Jun 2025" },
  ],
  contact: {
    email: "gavrielthen@gmail.com",
    github: "https://github.com/gavrielthen",
    linkedin: "https://linkedin.com/in/gavrielthen",
    status: "Tersedia untuk proyek",
    statusDetail: "Saat ini aktif kuliah semester 6 dan terbuka untuk proyek freelance, kolaborasi, maupun magang.",
  },
  docs: [],
};

export const INITIAL_DATA_EN = {
  ...INITIAL_DATA_ID,
  hero: {
    ...INITIAL_DATA_ID.hero,
    tagline: "Informatics · UKSW · 2023",
    description:
      "Informatics Engineering student focusing on modern web development, intuitive interface design, and reliable backend solutions. Passionate about building meaningful things through code.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Me",
  },
  about: {
    ...INITIAL_DATA_ID.about,
    bio1:
      "Hello! I am Gavriel Theofilus Nugroho, an active Informatics Engineering student at Satya Wacana Christian University (UKSW) class of 2023, currently in my 6th semester.",
    bio2:
      "I have a strong interest in web and mobile application development, especially using React.js, Tailwind CSS, Laravel, and Flutter. I love building clean interfaces and delightful user experiences.",
    bio3:
      "Outside of coding, I actively contribute to campus life through organizations and committees, and continuously hone my skills through competitions and bootcamps.",
    university: "Satya Wacana Christian University",
    major: "Bachelor of Informatics Engineering",
    location: "Salatiga, Central Java, Indonesia",
  },
  projects: [
    { id: 1, name: "Family Tree", url: "https://family-tree-one-gray.vercel.app/", desc: "An interactive website for family tree visualization and tracing. Mapping relations between family members visually.", tag: "Web App" },
    { id: 2, name: "STMISS Web", url: "https://stmiss-web.vercel.app/", desc: "A professional company profile website showcasing company identity, services, and information elegantly.", tag: "Company Profile" },
    { id: 3, name: "Edukasi Hipertensi", url: "https://edukasi-hipertensi.vercel.app/", desc: "A health education landing page about hypertension — conveying medical information in a user-friendly and informative display.", tag: "Landing Page" },
    { id: 4, name: "Jastip Kas", url: "https://jastip-kas.vercel.app/", desc: "A web application for cash flow recording and management for jastip business, complete with financial reporting system.", tag: "Finance App" },
    { id: 5, name: "Church Admin Panel", url: "https://church-admin-panel-nine.vercel.app/", desc: "A church administration management system with a public landing page and internal admin panel for member data management.", tag: "Admin System" },
  ],
  organizations: [
    { id: 1, name: "ISACA", fullName: "Information Systems Audit and Control Association", role: "Head of Content", period: "Jan 2024 – Dec 2024" },
    { id: 2, name: "HMPTI", fullName: "Himpunan Mahasiswa Teknik Informatika", role: "Internal & External Division Intern", period: "Jun 2024 – Dec 2024" },
    { id: 3, name: "HMPTI", fullName: "Himpunan Mahasiswa Teknik Informatika", role: "Program Coordinator", period: "Jan 2025 – Dec 2025" },
  ],
  committees: [
    { id: 1, name: "ISFEST 2024", fullName: "Information System Festival", role: "Public Relations Division", period: "Sep 2024" },
    { id: 2, name: "GIHN 2024", fullName: "Gelar Inovasi Harmoni Nusantara", role: "Committee", period: "Jun 2024" },
    { id: 3, name: "Company Visit TI 2024", fullName: "Teknik Informatika UKSW", role: "Secretary", period: "Nov 2024" },
    { id: 4, name: "GIHN 2025", fullName: "Gelar Inovasi Harmoni Nusantara", role: "Committee", period: "Oct 2025" },
    { id: 5, name: "Company Visit TI 2025", fullName: "Teknik Informatika UKSW", role: "Treasurer", period: "Nov 2025" },
  ],
  competitions: [
    { id: 1, name: "Fiskom Entrepreneur Competition 2025", badge: "🏆 2nd Winner", type: "award", period: "Sep 2025" },
    { id: 2, name: "Wirausaha Merdeka UKSW 2024", badge: "🥇 Best Business Plan", type: "award", period: "Aug 2024 – Dec 2024" },
    { id: 3, name: "UI/UX Competition ISFEST 2025", badge: "Participant", type: "participant", period: "Sep 2025" },
    { id: 4, name: "Cyber Security Tehcom Bootcamp", badge: "Bootcamp", type: "bootcamp", period: "Jun 2025" },
    { id: 5, name: "Data Science Tehcom Bootcamp", badge: "Bootcamp", type: "bootcamp", period: "Jun 2025" },
  ],
  contact: {
    ...INITIAL_DATA_ID.contact,
    status: "Available for projects",
    statusDetail: "Currently active in 6th semester, open for freelance projects, collaborations, or internships.",
  },
};

// ─── BILINGUAL CORE DATA STRUCTURE ───────────────────────────────────────────
export const INITIAL_DATA = {
  id: INITIAL_DATA_ID,
  en: INITIAL_DATA_EN,
};

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
export const loadData = () => {
  try {
    const raw = localStorage.getItem("portfolio_data");
    if (raw) {
      const parsed = JSON.parse(raw);
      
      // MIGRATION: Jika data di localStorage masih berstruktur lama (tidak punya field 'id' dan 'en')
      if (!parsed.id && !parsed.en) {
        // Migrasi data lama ke sub-objek 'id' dan 'en'
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
            // Copy dynamic details for English as well, user can translate later
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

      // Merging standar jika data sudah bilingual
      const merged = {
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
      return merged;
    }
  } catch (e) {
    console.error("Gagal memuat data dari localStorage:", e);
  }
  return INITIAL_DATA;
};

export const saveData = (data) => {
  try {
    localStorage.setItem("portfolio_data", JSON.stringify(data));
  } catch (e) {
    console.error("Gagal menyimpan data ke localStorage:", e);
    throw e;
  }
};
