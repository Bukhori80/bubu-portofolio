export const defaultPortfolioData = {
  id: {
    nav: { logo: 'Selamat datang', home: 'Beranda', about: 'Profil', services: 'Layanan', edu: 'Pendidikan', project: 'Proyek', cert: 'Sertifikasi', contact: 'Kontak' },
    settings: { title: 'Pengaturan', theme: 'Mode Tema', lang: 'Bahasa' },
    roles: ["Data Scientist", "Mahasiswa Teknik Informatika", "Desainer Grafis"],
    splash: { welcome: 'Selamat Datang di Portofolio' },
    devBadge: 'Masih dalam pengembangan',
    comingSoon: 'Segera Hadir',
    hero: {
      greeting: 'Halo, saya',
      desc: 'Berfokus pada Data Science, Machine Learning, Artificial Intelligence, dan Desain Grafis dengan pengalaman dalam analisis data, pengembangan model AI, visualisasi data, serta pembuatan desain visual untuk menyampaikan informasi secara efektif dan menarik.',
      btnProject: 'Eksplorasi Project',
      btnCV: 'Lihat Resume'
    },
    about: {
      title: 'Profil Singkat',
      desc: 'Saya merupakan mahasiswa Teknik Informatika yang memiliki minat pada bidang Data Science dan Desain Grafis. Saya tertarik mengolah dan menganalisis data untuk menghasilkan insight yang bermanfaat, serta menggabungkannya dengan desain visual yang komunikatif dan estetis.',
      toolsTitle: 'Tools Favorit Saya',
      stats: [
        { value: '3+', label: 'Tahun Belajar' },
        { value: '20+', label: 'Sertifikat & Kursus' },
        { value: '15+', label: 'Proyek Selesai' }
      ]
    },
    services: {
      title: 'Fokus Layanan',
      subtitle: 'Spesialisasi ganda yang memungkinkan integrasi antara analitik yang tajam dengan visualisasi yang memukau.',
      dataTitle: 'Data Science',
      dataDesc: 'Pengolahan dan analisis data untuk menemukan insight yang berharga. Fokus pada pemahaman pola data dan penyampaian informasi secara efektif.',
      dataItems: ['Data Cleaning & Preprocessing', 'Exploratory Data Analysis (EDA)', 'Data Storytelling & Visualization', 'Statistical Analysis'],
      designTitle: 'Desain Grafis & UI/UX',
      designDesc: 'Pembuatan identitas visual, desain materi promosi, infografis, hingga perancangan antarmuka aplikasi (UI/UX) yang ramah pengguna dan modern.',
      designItems: ['UI/UX Design (Figma)', 'Logo & Visual Identity', 'Infographic Design', 'Social Media Graphics']
    },
    edu: {
      title: 'Pendidikan & Pengalaman',
      items: [
        { year: '1 Apr 2026 - Sekarang', school: 'Google', degree: 'Google Student Ambassador', desc: 'Mewakili Google di lingkungan kampus, menyelenggarakan lokakarya teknologi, mengenalkan produk dan inovasi Google, serta memfasilitasi komunitas belajar mahasiswa.' },
        { year: 'Des 2025 - Sekarang', school: 'Dicoding Community, Institut Teknologi Garut', degree: 'Anggota Komunitas', desc: 'Aktif berpartisipasi dalam komunitas developer kampus, berbagi pengetahuan teknologi, dan mengikuti berbagai kegiatan kolaboratif di bidang IT.' },
        { year: 'Jan 2026 - Sekarang', school: 'UKM Technocrat', degree: 'Divisi Publikasi Dokumentasi Dekorasi', desc: 'Bertanggung jawab dalam merancang publikasi visual, mendokumentasikan setiap kegiatan organisasi, serta mengatur dekorasi untuk berbagai acara dan program kerja UKM.' },
        { year: '2023 - Sekarang', school: 'Institut Teknologi Garut', degree: 'S1 Teknik Informatika', desc: 'Fokus pada pengembangan perangkat lunak, algoritma struktur data, dan peminatan pada Kecerdasan Buatan.' },
        { year: 'Agt 2025 - Feb 2026', school: 'Program Asah led by Dicoding', degree: 'Cohort Machine Learning', desc: 'Mengikuti bootcamp intensif berfokus pada pengembangan model Machine Learning dan implementasi AI terapan.' },
        { year: '2019 - 2023', school: 'SMAS Islam Cikuya Bungbulang', degree: 'Jurusan MIPA', desc: 'Lulus dengan predikat sangat baik. Aktif dalam kegiatan sains terapan, olimpiade matematika, dan organisasi kepemimpinan siswa.' }
      ]
    },
    projects: {
      title: 'Eksplorasi Proyek',
      all: 'Semua',
      items: [
        { title: 'Recall', category: 'AI Application', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', desc: 'Aplikasi berbasis AI untuk merekomendasikan paket telekomunikasi terbaik kepada pengguna.', tags: ['Python', 'Machine Learning', 'AI'], inDev: false, url: 'https://recall-gold.vercel.app/' },
        { title: 'Jaganusa', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', desc: 'Desain aplikasi komunitas pecinta laut untuk kampanye dan pelestarian lingkungan bahari.', tags: ['Figma', 'UI/UX', 'Design System'], inDev: false, url: 'https://www.figma.com/design/wMBD1h1fdHtnpHJV6rxMsA/Jaganusa---Aplikasi-Pecinta-Kebersihan-Pantai?node-id=187-302&m=dev&t=WtFpGas9Ebcpf4rf-1' },
        { title: 'Hand Gesture Translator', category: 'Computer Vision', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800', desc: 'Sistem computer vision pendeteksi gesture tangan yang mampu menerjemahkan isyarat menjadi teks arti yang dipahami komputer.', tags: ['OpenCV', 'Python', 'AI'], inDev: true, url: '' },
        { title: 'Microplastic Detector', category: 'Computer Vision', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', desc: 'Sistem pendeteksi microplastic pada air menggunakan analisis citra dan pembelajaran mesin.', tags: ['Computer Vision', 'Data Analysis'], inDev: true, url: '' },
        { title: 'Household Energy Prediction', category: 'Machine Learning', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', desc: 'Pengembangan model Machine Learning untuk prediksi konsumsi energi rumah tangga menggunakan teknik ensemble learning, optimasi fitur, dan Explainable AI guna meningkatkan akurasi serta interpretabilitas model.', tags: ['Predictive Analytics', 'Machine Learning'], inDev: false, url: 'https://github.com/Bukhori80/Energy_Prediction_Ensemble_Analysis' }
      ]
    },
    certifications: {
      title: 'Sertifikasi & Pencapaian',
      items: [
        { title: 'Sertifikat Kelulusan Program Bootcamp Asah Dicoding', org: 'Dicoding Indonesia', year: '2026', status: 'Selesai', url: 'https://drive.google.com/file/d/1Mx3d59YwLOxUNfw8eL-MptM6D6y-9Tgf/view' },
        { title: 'Membangun Sistem Machine Learning', org: 'Dicoding Indonesia', year: '2026', status: 'Selesai', url: 'https://www.dicoding.com/certificates/MEPJ207NWP3V' },
        { title: 'Belajar Fundamental Deep Learning', org: 'Dicoding Indonesia', year: '2026', status: 'Selesai', url: 'https://www.dicoding.com/certificates/N9ZO2LY3RPG5' },
        { title: 'Belajar Machine Learning untuk Pemula', org: 'Dicoding Indonesia', year: '2026', status: 'Selesai', url: 'https://www.dicoding.com/certificates/EYX4KYNV6PDL' },
        { title: 'Memulai Pemrograman dengan Python', org: 'Dicoding Indonesia', year: '2025', status: 'Selesai', url: 'https://www.dicoding.com/certificates/81P25804YPOY' },
        { title: 'Belajar Dasar AI', org: 'Dicoding Indonesia', year: '2025', status: 'Selesai', url: 'https://www.dicoding.com/certificates/6RPNG6V78Z2M' },
        { title: 'Belajar Dasar Git dengan GitHub', org: 'Dicoding Indonesia', year: '2025', status: 'Selesai', url: 'https://www.dicoding.com/certificates/QLZ96K5Q7Z5D' },
        { title: 'Pengenalan ke Logika Pemrograman (Programming Logic 101)', org: 'Dicoding Indonesia', year: '2025', status: 'Selesai', url: 'https://www.dicoding.com/certificates/98XWOR009ZM3' },
        { title: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software', org: 'Dicoding Indonesia', year: '2025', status: 'Selesai', url: 'https://www.dicoding.com/certificates/ERZR2MELQPYV' }
      ]
    },
    contact: {
      title: 'Mari Berdiskusi',
      desc: 'Tertarik untuk berkolaborasi dalam mengolah data, membangun model AI, atau membuat desain visual yang menarik? Jangan ragu untuk mengirim pesan!',
      nameHolder: 'Nama Anda',
      emailHolder: 'Email Anda',
      subjectHolder: 'Subjek Pesan',
      msgHolder: 'Pesan Anda',
      btn: 'Kirim Pesan'
    }
  },
  en: {
    nav: { logo: 'Welcome', home: 'Home', about: 'Profile', services: 'Services', edu: 'Experience', project: 'Projects', cert: 'Certifications', contact: 'Contact' },
    settings: { title: 'Settings', theme: 'Theme Mode', lang: 'Language' },
    roles: ["Data Scientist", "Informatics Engineering Student", "Graphic Designer"],
    splash: { welcome: 'Welcome to the Portfolio of' },
    devBadge: 'In development',
    comingSoon: 'Coming Soon',
    hero: {
      greeting: 'Hello, I am',
      desc: 'To me, data is more than just numbers; it\'s a story that needs to be understood and visualized. I am interested in Data Science, Artificial Intelligence (AI), and Graphic Design, combining data analysis and visual creativity to turn complex information into valuable and easily understood insights.',
      btnProject: 'Explore Projects',
      btnCV: 'View Resume'
    },
    about: {
      title: 'Short Profile',
      desc: 'I am an Informatics Engineering student with a strong passion for Data Science and Graphic Design. I am interested in processing and analyzing data to generate useful insights, and combining them with communicative and aesthetic visual designs.',
      toolsTitle: 'My Favorite Tools',
      stats: [
        { value: '3+', label: 'Years Learning' },
        { value: '20+', label: 'Certifications' },
        { value: '15+', label: 'Completed Projects' }
      ]
    },
    services: {
      title: 'Service Focus',
      subtitle: 'A dual specialization that enables the integration of sharp analytics with stunning visualizations.',
      dataTitle: 'Data Science',
      dataDesc: 'Processing and analyzing data to find valuable insights. Focusing on understanding data patterns and effectively communicating information.',
      dataItems: ['Data Cleaning & Preprocessing', 'Exploratory Data Analysis (EDA)', 'Data Storytelling & Visualization', 'Statistical Analysis'],
      designTitle: 'Graphic Design & UI/UX',
      designDesc: 'Creating visual identities, promotional designs, infographics, and user-friendly, modern application interfaces (UI/UX).',
      designItems: ['UI/UX Design (Figma)', 'Logo & Visual Identity', 'Infographic Design', 'Social Media Graphics']
    },
    edu: {
      title: 'Education & Experience',
      items: [
        { year: 'Apr 1, 2026 - Present', school: 'Google', degree: 'Google Student Ambassador', desc: 'Representing Google on campus, organizing technology workshops, introducing Google products and innovations, and building a bridge between students and Google.' },
        { year: 'Dec 2025 - Present', school: 'Dicoding Community, Institut Teknologi Garut', degree: 'Community Member', desc: 'Actively participating in the campus developer community, sharing tech knowledge, and joining collaborative IT events.' },
        { year: 'Jan 2026 - Present', school: 'UKM Technocrat', degree: 'Publication, Documentation, & Decoration Division', desc: 'Responsible for designing visual publications, documenting every organizational activity, and arranging decorations for various events and UKM programs.' },
        { year: '2023 - Present', school: 'Institut Teknologi Garut', degree: 'Bachelor of Informatics', desc: 'Focusing on software development, data structures, and a specialization in Artificial Intelligence.' },
        { year: 'Aug 2025 - Feb 2026', school: 'Program Asah led by Dicoding', degree: 'Cohort Machine Learning', desc: 'Participating in an intensive bootcamp focusing on Machine Learning model development and applied AI implementation.' },
        { year: '2019 - 2023', school: 'SMAS Islam Cikuya Bungbulang', degree: 'Science Major (MIPA)', desc: 'Graduated with high honors. Active in applied science activities, math olympiads, and student leadership organizations.' }
      ]
    },
    projects: {
      title: 'Project Explorations',
      all: 'All',
      items: [
        { title: 'Recall', category: 'AI Application', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', desc: 'An AI-based application to recommend the best telecommunication packages to users.', tags: ['Python', 'Machine Learning', 'AI'], inDev: false, url: 'https://recall-gold.vercel.app/' },
        { title: 'Jaganusa', category: 'UI/UX Design', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', desc: 'Ocean lover community application design for marine environment campaigns and preservation.', tags: ['Figma', 'UI/UX', 'Design System'], inDev: false, url: 'https://www.figma.com/design/wMBD1h1fdHtnpHJV6rxMsA/Jaganusa---Aplikasi-Pecinta-Kebersihan-Pantai?node-id=187-302&m=dev&t=WtFpGas9Ebcpf4rf-1' },
        { title: 'Hand Gesture Translator', category: 'Computer Vision', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800', desc: 'A computer vision system that detects hand gestures and translates them into text/meanings understood by computers.', tags: ['OpenCV', 'Python', 'AI'], inDev: true, url: '' },
        { title: 'Microplastic Detector', category: 'Computer Vision', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', desc: 'A microplastic detection system in water using image analysis and machine learning.', tags: ['Computer Vision', 'Data Analysis'], inDev: true, url: '' },
        { title: 'Household Energy Prediction', category: 'Machine Learning', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', desc: 'Development of a Machine Learning model to predict household energy consumption using ensemble learning techniques, feature optimization, and Explainable AI to improve model accuracy and interpretability.', tags: ['Predictive Analytics', 'Machine Learning'], inDev: false, url: 'https://github.com/Bukhori80/Energy_Prediction_Ensemble_Analysis' }
      ]
    },
    certifications: {
      title: 'Certifications & Achievements',
      items: [
        { title: 'Graduation Certificate: Asah Dicoding Bootcamp', org: 'Dicoding Indonesia', year: '2026', status: 'Completed', url: 'https://drive.google.com/file/d/1Mx3d59YwLOxUNfw8eL-MptM6D6y-9Tgf/view' },
        { title: 'Building Machine Learning Systems', org: 'Dicoding Indonesia', year: '2026', status: 'Completed', url: 'https://www.dicoding.com/certificates/MEPJ207NWP3V' },
        { title: 'Learning Fundamental Deep Learning', org: 'Dicoding Indonesia', year: '2026', status: 'Completed', url: 'https://www.dicoding.com/certificates/N9ZO2LY3RPG5' },
        { title: 'Learning Machine Learning for Beginners', org: 'Dicoding Indonesia', year: '2026', status: 'Completed', url: 'https://www.dicoding.com/certificates/EYX4KYNV6PDL' },
        { title: 'Getting Started with Python Programming', org: 'Dicoding Indonesia', year: '2025', status: 'Completed', url: 'https://www.dicoding.com/certificates/81P25804YPOY' },
        { title: 'Learning AI Basics', org: 'Dicoding Indonesia', year: '2025', status: 'Completed', url: 'https://www.dicoding.com/certificates/6RPNG6V78Z2M' },
        { title: 'Learning Git Basics with GitHub', org: 'Dicoding Indonesia', year: '2025', status: 'Completed', url: 'https://www.dicoding.com/certificates/QLZ96K5Q7Z5D' },
        { title: 'Introduction to Programming Logic 101', org: 'Dicoding Indonesia', year: '2025', status: 'Completed', url: 'https://www.dicoding.com/certificates/98XWOR009ZM3' },
        { title: 'Starting Programming Basics to Become a Software Developer', org: 'Dicoding Indonesia', year: '2025', status: 'Completed', url: 'https://www.dicoding.com/certificates/ERZR2MELQPYV' }
      ]
    },
    contact: {
      title: 'Let\'s Discuss',
      desc: 'Interested in collaborating on data processing, building AI models, or creating engaging visual designs? Feel free to send me a message!',
      nameHolder: 'Your Name',
      emailHolder: 'Your Email',
      subjectHolder: 'Subject',
      msgHolder: 'Your Message',
      btn: 'Send Message'
    }
  }
};

const STORAGE_KEY = 'bubu_portfolio_custom_data_v1';
const GITHUB_TOKEN_KEY = 'bubu_github_pat_token';
const GITHUB_REPO_KEY = 'bubu_github_repo_name';

export const loadPortfolioData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.id && parsed.en) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading portfolio data from localStorage', e);
  }
  return defaultPortfolioData;
};

export const fetchPortfolioJSON = async () => {
  try {
    const res = await fetch('/portfolio-data.json?v=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      if (data && data.id && data.en) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Could not fetch portfolio-data.json from server, using local fallback.', err);
  }
  return loadPortfolioData();
};

export const savePortfolioData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving portfolio data to localStorage', e);
  }
};

export const resetPortfolioData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing portfolio data', e);
  }
  return defaultPortfolioData;
};

export const exportPortfolioJSON = (data) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', `portfolio-data-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

export const importPortfolioJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && parsed.id && parsed.en) {
          resolve(parsed);
        } else {
          reject(new Error('Format file JSON tidak valid. Harus memiliki struktur bahasa ID dan EN.'));
        }
      } catch (err) {
        reject(new Error('Gagal membaca file JSON. Pastikan format file valid.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsText(file);
  });
};

// --- GITHUB CONFIG & COMMIT HELPERS ---
export const getSavedGitHubConfig = () => {
  return {
    token: localStorage.getItem(GITHUB_TOKEN_KEY) || '',
    repo: localStorage.getItem(GITHUB_REPO_KEY) || 'bukhori80/bubu-portofolio'
  };
};

export const saveGitHubConfig = (token, repo) => {
  if (token !== undefined) localStorage.setItem(GITHUB_TOKEN_KEY, token);
  if (repo !== undefined) localStorage.setItem(GITHUB_REPO_KEY, repo);
};

export const commitToGitHub = async ({
  data,
  token,
  repoFull = 'bukhori80/bubu-portofolio',
  path = 'public/portfolio-data.json',
  message = 'Update portfolio data via Admin Form'
}) => {
  if (!token) {
    throw new Error('GitHub Personal Access Token belum diisi. Silakan masukkan Token di tab GitHub Sync.');
  }

  const [owner, repoName] = repoFull.split('/');
  if (!owner || !repoName) {
    throw new Error('Nama repositori GitHub harus dalam format username/repository (contoh: bukhori80/bubu-portofolio).');
  }

  const fileUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${path}`;
  let currentSha = null;

  // 1. Get current SHA if file exists
  try {
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (getRes.ok) {
      const getJson = await getRes.json();
      currentSha = getJson.sha;
    } else if (getRes.status === 401) {
      throw new Error('Token GitHub tidak memiliki akses atau telah kedaluwarsa. Silakan periksa kembali Token Anda.');
    } else if (getRes.status === 404) {
      // File does not exist yet on repo, will create
    }
  } catch (err) {
    if (err.message.includes('Token') || err.message.includes('repositori')) throw err;
  }

  // 2. Convert UTF-8 JSON to Base64
  const jsonString = JSON.stringify(data, null, 2);
  const utf8Bytes = new TextEncoder().encode(jsonString);
  let binary = '';
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64Content = btoa(binary);

  // 3. Put File Commit
  const payload = {
    message,
    content: base64Content,
    branch: 'main'
  };
  if (currentSha) {
    payload.sha = currentSha;
  }

  const putRes = await fetch(fileUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!putRes.ok) {
    const errorJson = await putRes.json().catch(() => ({}));
    throw new Error(errorJson.message || `Gagal commit ke GitHub (Status: ${putRes.status})`);
  }

  const resultJson = await putRes.json();
  return resultJson;
};
