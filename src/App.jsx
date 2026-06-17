import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, ChevronDown,
  FileText, Award, Database, Settings, Moon, Sun,
  Palette, GraduationCap, X, Instagram
} from 'lucide-react';
const fotoBubu = '/foto-profil.jpg';
// === KAMUS BAHASA (i18n) ===
const translations = {
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
      btnCV: 'Lihat CV',
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
      btnCV: 'View CV',
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

const App = () => {
  // Global States
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('id');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Projects Category State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Certificate Marquee States
  const certScrollRef = useRef(null);
  const [isHoverCert, setIsHoverCert] = useState(false);

  // Contact Form States
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    try {
      const response = await fetch("https://formspree.io/f/mjgdznjj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          _subject: subject,
          message
        })
      });

      if (response.ok) {
        alert(lang === 'id' ? "Pesan berhasil terkirim ke email developer!" : "Message successfully sent to the developer's email!");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(lang === 'id' ? "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi." : "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(lang === 'id' ? "Gagal terhubung ke server. Silakan periksa koneksi internet Anda." : "Failed to connect to server. Please check your internet connection.");
    }
  };

  // Typewriter States
  const t = translations[lang];
  const roles = t.roles;
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


  // --- Static Barcode Generation ---
  const barcodeLines = useMemo(() => Array.from({ length: 18 }, () => Math.floor(Math.random() * 5) + 2), []);

  // --- Fisika Interaksi ID Card (Spring Pendulum + 3D Physics) ---
  const [cardTransform, setCardTransform] = useState({
    x: 0,
    y: 0,
    r: 0,
    rx: 0,
    ry: 0,
    hoverRx: 0,
    hoverRy: 0
  });
  const isDraggingCard = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0, r: 0, rx: 0, ry: 0 });
  const cardVel = useRef({ x: 0, y: 0, r: 0, rx: 0, ry: 0 });

  const springBack = () => {
    if (isDraggingCard.current) return;

    // Physics parameters for smooth pendulum decay (original values)
    const tension = 0.04;
    const friction = 0.82; // Higher friction so it does not bounce repeatedly

    const fx = -cardPos.current.x * tension;
    const fy = -cardPos.current.y * tension;
    const fr = -cardPos.current.r * tension;
    const frx = -cardPos.current.rx * tension;
    const fry = -cardPos.current.ry * tension;

    cardVel.current.x = (cardVel.current.x + fx) * friction;
    cardVel.current.y = (cardVel.current.y + fy) * friction;
    cardVel.current.r = (cardVel.current.r + fr) * friction;
    cardVel.current.rx = (cardVel.current.rx + frx) * friction;
    cardVel.current.ry = (cardVel.current.ry + fry) * friction;

    cardPos.current.x += cardVel.current.x;
    cardPos.current.y += cardVel.current.y;
    cardPos.current.r += cardVel.current.r;
    cardPos.current.rx += cardVel.current.rx;
    cardPos.current.ry += cardVel.current.ry;

    setCardTransform({
      ...cardPos.current,
      hoverRx: 0,
      hoverRy: 0
    });

    // Loop animation until card settles back at 0 with small tolerance
    if (
      Math.abs(cardPos.current.x) > 0.05 ||
      Math.abs(cardPos.current.y) > 0.05 ||
      Math.abs(cardPos.current.r) > 0.05 ||
      Math.abs(cardPos.current.rx) > 0.05 ||
      Math.abs(cardPos.current.ry) > 0.05 ||
      Math.abs(cardVel.current.x) > 0.05 ||
      Math.abs(cardVel.current.y) > 0.05
    ) {
      requestAnimationFrame(springBack);
    } else {
      cardPos.current = { x: 0, y: 0, r: 0, rx: 0, ry: 0 };
      setCardTransform({ x: 0, y: 0, r: 0, rx: 0, ry: 0, hoverRx: 0, hoverRy: 0 });
    }
  };

  const handleCardPointerDown = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    if (clientX === undefined) return;

    isDraggingCard.current = true;
    dragStart.current = {
      x: clientX - cardPos.current.x,
      y: clientY - cardPos.current.y
    };
    cardVel.current = { x: 0, y: 0, r: 0, rx: 0, ry: 0 };
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingCard.current) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const x = clientX - dragStart.current.x;
      const y = clientY - dragStart.current.y;

      // Allow rotation in any direction based on translation offset (original)
      const r = Math.max(-25, Math.min(25, x * 0.1));
      const ry = Math.max(-30, Math.min(30, x * -0.15));
      const rx = Math.max(-30, Math.min(30, y * 0.15));

      cardPos.current = { x, y, r, rx, ry };
      setCardTransform({
        x,
        y,
        r,
        rx,
        ry,
        hoverRx: 0,
        hoverRy: 0
      });
    };

    const handlePointerUp = () => {
      if (!isDraggingCard.current) return;
      isDraggingCard.current = false;
      requestAnimationFrame(springBack);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDraggingCard.current) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      dragTarget.current = {
        x: clientX - dragStart.current.x,
        y: clientY - dragStart.current.y
      };
    };

    const handlePointerUp = () => {
      if (!isDraggingCard.current) return;
      isDraggingCard.current = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  // --- TYPEWRITER EFFECT (Kini di dalam ID Card) ---
  useEffect(() => {
    const currentRole = roles[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500); // Tahan sebentar saat teks selesai
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex(prev => (prev + 1) % roles.length); // Lanjut ke kata berikutnya
      }
    }, isDeleting ? 30 : 80); // Kecepatan menghapus vs mengetik
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, roles]);

  // --- JS MARQUEE SCROLL (Sertifikasi - Looping & Draggable) ---
  useEffect(() => {
    let rafId;
    const el = certScrollRef.current;
    if (!el) return;

    if (el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 2;
    }

    const scrollStep = () => {
      if (!isHoverCert) {
        el.scrollLeft -= 1;
        if (el.scrollLeft <= 0) {
          el.scrollLeft += el.scrollWidth / 2;
        }
      }
      rafId = requestAnimationFrame(scrollStep);
    };
    rafId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(rafId);
  }, [isHoverCert]);

  // Navbar Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // CSS Variabel untuk Blue & Black/White
  const bgAccentClass = "bg-[#1883FF] hover:bg-[#0070f3] text-white transition-colors duration-300";
  const primaryBtnClass = "bg-[#1883FF] hover:bg-[#0070f3] text-white shadow-[0_4px_14px_rgba(24,131,255,0.4)] hover:shadow-[0_6px_20px_rgba(24,131,255,0.6)] transition-all duration-300";
  const textAccentClass = "text-[#1883FF]";
  const borderHoverClass = "hover:border-[#1883FF]/50";
  const textGradientClass = "bg-gradient-to-r from-[#1883FF] to-[#0051b3]";

  // Combined transform variables for ID card (physics + hover)
  const rx = (cardTransform.rx || 0) + (cardTransform.hoverRx || 0);
  const ry = (cardTransform.ry || 0) + (cardTransform.hoverRy || 0);
  const r = (cardTransform.r || 0);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>


      {/* Background Latar Utama */}
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 font-sans transition-colors duration-500 relative overflow-x-hidden selection:bg-blue-600/20 dark:selection:bg-blue-500/30">

        {/* CSS Custom */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .glass-nav {
            background: ${isDark ? 'rgba(10, 10, 10, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.4)'};
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
          }
          .glass-panel {
            background: ${isDark ? 'rgba(15, 15, 15, 0.35)' : 'rgba(255, 255, 255, 0.35)'};
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.45)'};
            box-shadow: 0 8px 32px ${isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(31, 38, 135, 0.03)'};
          }
          .glass-card {
            background: ${isDark ? 'linear-gradient(135deg, rgba(20, 20, 20, 0.4) 0%, rgba(10, 10, 10, 0.5) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)'};
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.35)'};
            box-shadow: 0 8px 32px 0 ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(31, 38, 135, 0.02)'};
          }
          
          /* Menyembunyikan Scrollbar untuk JS Marquee */
          .hidden-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hidden-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          /* Animasi Mengetik di ID Card */
          .typing-cursor::after {
            content: '|';
            animation: blink 1s step-end infinite;
          }
          @keyframes blink { 50% { opacity: 0; } }

          /* Animasi Gradasi Teks Sangat Lambat (15 detik) */
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-text {
            background-size: 200% auto;
            animation: gradient-move 15s ease-in-out infinite;
          }

          html { scroll-behavior: smooth; }
        `}} />



        {/* Cahaya Latar Glow (Biru) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 dark:opacity-20"></div>
        </div>

        {/* Panel Pengaturan (Mengambang di Kanan Bawah) */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {isSettingsOpen && (
            <div className="glass-panel p-4 rounded-2xl mb-2 w-48 animate-in slide-in-from-bottom-5 origin-bottom-right">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-300 dark:border-white/10">
                <span className="text-sm font-bold">{t.settings.title}</span>
                <button onClick={() => setIsSettingsOpen(false)} className="hover:text-slate-500 transition-colors"><X size={16} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-2 block">{t.settings.theme}</label>
                  <div className="flex bg-slate-200 dark:bg-white/5 p-1 rounded-lg">
                    <button onClick={() => setIsDark(false)} className={`flex-1 py-1 rounded-md flex justify-center items-center transition-colors ${!isDark ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}><Sun size={14} /></button>
                    <button onClick={() => setIsDark(true)} className={`flex-1 py-1 rounded-md flex justify-center items-center transition-colors ${isDark ? 'bg-neutral-800 shadow-sm text-white' : 'text-slate-500'}`}><Moon size={14} /></button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 mb-2 block">{t.settings.lang}</label>
                  <div className="flex bg-slate-200 dark:bg-white/5 p-1 rounded-lg">
                    <button onClick={() => setLang('id')} className={`flex-1 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'id' ? 'bg-white shadow-sm dark:bg-neutral-800 text-slate-900 dark:text-white' : 'text-slate-500'}`}>ID</button>
                    <button onClick={() => setLang('en')} className={`flex-1 py-1 rounded-md text-xs font-bold transition-colors ${lang === 'en' ? 'bg-white shadow-sm dark:bg-neutral-800 text-slate-900 dark:text-white' : 'text-slate-500'}`}>EN</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-3 rounded-full shadow-xl transition-all hover:scale-110 ${bgAccentClass}`}
          >
            <Settings size={24} className={isSettingsOpen ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Konten Utama */}
        <div className="relative z-10">

          {/* Navigasi */}
          <nav className="fixed w-full top-0 z-40 transition-all duration-300 glass-nav py-4">
            <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
              <a href="#" className="text-xl font-black tracking-wider bg-gradient-to-r from-[#1883FF] via-[#0051b3] to-[#1883FF] dark:from-[#1883FF] dark:via-white dark:to-[#1883FF] bg-clip-text text-transparent animate-gradient-text">
                {t.nav.logo}
              </a>
              <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
                <a href="#beranda" className={`hover:${textAccentClass} transition-colors`}>{t.nav.home}</a>
                <a href="#tentang" className={`hover:${textAccentClass} transition-colors`}>{t.nav.about}</a>
                <a href="#layanan" className={`hover:${textAccentClass} transition-colors`}>{t.nav.services}</a>
                <a href="#proyek" className={`hover:${textAccentClass} transition-colors`}>{t.nav.project}</a>
              </div>
              <a href="#kontak" className={`hidden md:block px-5 py-2 rounded-full border border-slate-400/80 dark:border-white/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-sm font-bold`}>
                {t.nav.contact}
              </a>
            </div>
          </nav>

          {/* Bagian Hero */}
          <section id="beranda" className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6">
            <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-12">

              {/* ID CARD (Mainan Interaktif & Dinamis) - Ditempatkan di atas (order-1) agar lanyard tidak menutupi tulisan */}
              <div className="flex justify-center order-1 relative w-full pt-16 pb-8">

                {/* Pembungkus ID Card yang bisa di-drag secara interaktif */}
                <div
                  className="relative flex flex-col items-center w-[280px] cursor-grab active:cursor-grabbing select-none"
                  style={{
                    transform: `translate3d(${cardTransform.x}px, ${cardTransform.y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${r}deg)`,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    touchAction: 'none',
                    transformOrigin: 'center -250px', // Ayunan seperti pendulum yang digantung dari atas
                    transition: (isDraggingCard.current || cardTransform.x !== 0 || cardTransform.y !== 0 || cardTransform.r !== 0 || cardTransform.rx !== 0 || cardTransform.ry !== 0) ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                  onMouseDown={handleCardPointerDown}
                  onTouchStart={handleCardPointerDown}
                >

                  {/* Tali / Lanyard - Dibuat panjang agar ujungnya tidak terlihat meskipun ditarik */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-20 h-[50vh] z-0 pointer-events-none">
                    <div className="absolute bottom-2 left-0 w-8 h-[1500px] bg-gradient-to-t from-[#1883FF] via-neutral-800 to-neutral-900 origin-bottom-left -rotate-[16deg] shadow-[inset_2px_0_4px_rgba(0,0,0,0.5)] dark:shadow-[inset_2px_0_4px_rgba(0,0,0,0.8)] rounded-sm"></div>
                    <div className="absolute bottom-2 right-0 w-8 h-[1500px] bg-gradient-to-t from-[#1883FF] via-neutral-800 to-neutral-900 origin-bottom-right rotate-[16deg] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] dark:shadow-[inset_-2px_0_4px_rgba(0,0,0,0.8)] rounded-sm"></div>
                  </div>

                  {/* Penjepit Baja / Klip - Diperbesar & Di Atas Kartu */}
                  <div className="absolute bottom-[calc(100%-10px)] w-14 h-16 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-t-lg shadow-[0_5px_10px_rgba(0,0,0,0.3)] flex items-end justify-center pb-2.5 z-20 border border-slate-500/80">
                    <div className="w-6 h-2 bg-slate-800/80 rounded-full shadow-inner"></div>
                  </div>

                  {/* Bodi Kartu ID - Ratio 4:5 (280x350) */}
                  <div
                    className="relative w-full h-[350px] bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-10 flex flex-col items-center pt-14 pb-4"
                    onPointerMove={(e) => {
                      if (isDraggingCard.current) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const px = e.clientX - rect.left;
                      const py = e.clientY - rect.top;
                      const normalizedX = (px / rect.width) * 2 - 1;
                      const normalizedY = (py / rect.height) * 2 - 1;
                      setCardTransform(prev => ({
                        ...prev,
                        hoverRx: -normalizedY * 18, // Max tilt pitch
                        hoverRy: normalizedX * 18   // Max tilt yaw
                      }));
                    }}
                    onPointerLeave={() => {
                      setCardTransform(prev => ({
                        ...prev,
                        hoverRx: 0,
                        hoverRy: 0
                      }));
                    }}
                  >

                    {/* Gloss / Glare / Light Reflection Effect */}
                    <div
                      className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 opacity-60 dark:opacity-45"
                      style={{
                        background: `linear-gradient(${135 + ry * 2}deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0) 80%)`,
                        transform: `translateX(${ry * 1.5}px) translateY(${rx * 1.5}px)`,
                        mixBlendMode: 'overlay',
                        transition: (isDraggingCard.current || cardTransform.x !== 0 || cardTransform.y !== 0 || cardTransform.r !== 0 || cardTransform.rx !== 0 || cardTransform.ry !== 0) ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)'
                      }}
                    />

                    {/* Header ID Card - Gradasi Hitam Biru (Tanpa teks IDENTITY CARD) */}
                    <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-r from-neutral-900 to-[#1883FF] flex flex-col items-center justify-end pb-4 shadow-sm">
                    </div>

                    {/* Lubang Lanyard untuk Klip */}
                    <div className="absolute top-3 w-16 h-4 bg-black/40 dark:bg-black/80 rounded-full z-30 shadow-inner"></div>

                    {/* Foto Profil - Rasio 4:5 (144px x 180px), Sudut Sedikit Melengkung */}
                    <div className="relative w-[144px] h-[180px] rounded-2xl border-[6px] border-white dark:border-neutral-800 overflow-hidden bg-slate-100 shadow-lg mb-3 z-20 shrink-0">
                      <img
                        src={fotoBubu}
                        alt="Foto Profil Saya"
                        className="w-full h-full object-cover pointer-events-none"
                        draggable="false"
                      />
                    </div>
                    {/* Nama Lengkap */}
                    <h3 className="font-black text-xl text-slate-900 dark:text-white text-center px-4 leading-tight">Bubu Bukhori Muslim</h3>

                    {/* Posisi Animasi Ketik (Roles) di dalam ID Card */}
                    <div className="flex-1 flex items-start justify-center px-4 mt-2 w-full">
                      <span className="text-xs md:text-sm font-bold text-[#1883FF] text-center typing-cursor leading-snug">
                        {roles[textIndex].substring(0, charIndex)}
                      </span>
                    </div>

                    {/* Barcode Statis (Garis Lancip) Tanpa Teks Angka */}
                    <div className="w-full mt-auto border-t border-slate-100 dark:border-neutral-800 flex flex-col justify-center items-center pt-4 pb-4">
                      <div className="flex items-center gap-[3px] h-8">
                        {barcodeLines.map((width, i) => (
                          <div key={i} className="h-full bg-slate-800 dark:bg-slate-300" style={{ width: `${width}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div className="flex flex-col items-center text-center order-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                  {t.hero.greeting} <br />
                  {/* Teks dengan Gradasi Animasi Sangat Lembut */}
                  <span className="bg-gradient-to-r from-[#1883FF] via-[#52a5ff] to-[#0051b3] dark:from-[#52a5ff] dark:via-white dark:to-[#1883FF] bg-clip-text text-transparent animate-gradient-text pb-1 inline-block">
                    Bubu Bukhori Muslim
                  </span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                  {t.hero.desc}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {/* Tombol Eksplorasi dengan Gaya Glow Merah Baru */}
                  <a href="#proyek" className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${primaryBtnClass}`}>
                    {t.hero.btnProject}
                  </a>
                  {/* Link ke CV di folder public */}
                  <a href="/cv-bubu.pdf" target="_blank" rel="noreferrer" className={`px-6 py-2.5 rounded-xl text-sm glass-panel text-slate-800 dark:text-slate-200 font-bold transition-all flex items-center justify-center gap-2 group ${borderHoverClass}`}>
                    <FileText size={16} className={`${textAccentClass} group-hover:scale-110 transition-transform`} /> {t.hero.btnCV}
                  </a>
                </div>
              </div>

            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 hidden lg:block">
              <ChevronDown size={28} />
            </div>
          </section>

          {/* Bagian Profil & Tools */}
          <section id="tentang" className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-12">
                <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'to-white/20' : 'to-slate-300'}`}></div>
                <h2 className="text-3xl font-black tracking-wide">{t.about.title}</h2>
                <div className={`h-[1px] flex-1 bg-gradient-to-l from-transparent ${isDark ? 'to-white/20' : 'to-slate-300'}`}></div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="glass-panel rounded-3xl p-8 relative overflow-hidden group">
                  <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-medium relative z-10 text-lg">
                    {t.about.desc}
                  </p>
                  <div className="grid grid-cols-3 gap-4 border-t border-slate-300 dark:border-white/20 pt-8 mt-4">
                    {t.about.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-3xl font-black mb-1 ${textAccentClass}`}>{stat.value}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-bold mb-2 ml-2">{t.about.toolsTitle}</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {/* Daftar Tools */}
                    {['Python', 'SQL', 'Tableau', 'Figma', 'Adobe Ai', 'Adobe Ps', 'Streamlit', 'Google Colab'].map((tool, i) => (
                      <div key={i} className={`glass-card aspect-square rounded-2xl flex flex-col items-center justify-center p-4 gap-2 hover:-translate-y-1 transition-transform ${borderHoverClass}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 font-bold ${textAccentClass}`}>
                          {/* Logika Inisial Sederhana */}
                          {tool === 'Streamlit' ? 'ST' : tool === 'Google Colab' ? 'GC' : tool.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian Fokus Layanan (Data & Desain) */}
          <section id="layanan" className="py-24 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-black tracking-wide mb-4">{t.services.title}</h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium">{t.services.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Data Card */}
                <div className="glass-panel p-10 rounded-3xl group hover:-translate-y-2 transition-transform">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    <Database size={32} className={textAccentClass} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{t.services.dataTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">{t.services.dataDesc}</p>
                  <ul className="space-y-3">
                    {t.services.dataItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${bgAccentClass}`}></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Design Card */}
                <div className="glass-panel p-10 rounded-3xl group hover:-translate-y-2 transition-transform">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    <Palette size={32} className={textAccentClass} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">{t.services.designTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 font-medium leading-relaxed">{t.services.designDesc}</p>
                  <ul className="space-y-3">
                    {t.services.designItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${bgAccentClass}`}></div> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian Pendidikan & Pengalaman (Urutan Baru) */}
          <section id="pendidikan" className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto relative">
              <div className="flex items-center gap-4 mb-16">
                <GraduationCap size={32} className={textAccentClass} />
                <h2 className="text-3xl font-black tracking-wide">{t.edu.title}</h2>
              </div>

              {/* Container Relative untuk Garis Vertikal Absolut */}
              <div className="relative">
                {/* Garis Lurus Tengah Menyambung Penuh */}
                <div className={`hidden md:block absolute left-1/3 top-2 bottom-6 w-[3px] -ml-[1.5px] ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>

                <div className="space-y-16">
                  {t.edu.items.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-0 relative group">

                      <div className="md:w-1/3 md:pr-10 flex flex-col md:items-end text-left md:text-right pt-1">
                        <span className={`inline-block px-3 py-1 rounded-lg text-sm font-bold mb-2 ${isDark ? 'bg-white/10' : 'bg-slate-200'} ${textAccentClass}`}>{item.year}</span>
                        <h4 className="font-bold text-lg">{item.school}</h4>
                      </div>

                      {/* Titik Lingkaran di Tengah */}
                      <div className="hidden md:flex flex-col items-center absolute left-1/3 -ml-2.5 top-1.5">
                        <div className={`w-5 h-5 rounded-full border-4 ${isDark ? 'border-black' : 'border-white'} z-10 ${bgAccentClass}`}></div>
                      </div>

                      <div className="md:w-2/3 md:pl-10 pb-4 md:pb-0">
                        <h3 className="text-xl font-black mb-2">{item.degree}</h3>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bagian Proyek (Statis & Berkategori) */}
          <section id="proyek" className="py-24 relative z-10">
            <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
              <h2 className="text-3xl font-black tracking-wide mb-8">{t.projects.title}</h2>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['All', 'AI Application', 'UI/UX Design', 'Computer Vision', 'Machine Learning'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${selectedCategory === cat
                      ? `${bgAccentClass} shadow-md`
                      : `${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'}`
                      }`}
                  >
                    {cat === 'All' ? t.projects.all : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.projects.items
                .filter(project => selectedCategory === 'All' || project.category === selectedCategory)
                .map((project, index) => (
                  <div key={index} className="flex flex-col animate-in fade-in duration-300">
                    <div className={`relative h-full flex flex-col glass-card rounded-2xl overflow-hidden hover:-translate-y-3 transition-all duration-500 ${borderHoverClass}`}>

                      {/* Badge Masih Dalam Pengembangan Berwarna Putih Kaca */}
                      {project.inDev && (
                        <div className="absolute top-4 right-4 bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 text-slate-900 dark:text-slate-100 text-[10px] font-black px-3 py-1.5 rounded-full z-20 shadow-lg">
                          {t.devBadge}
                        </div>
                      )}

                      <div className="relative h-48 shrink-0 overflow-hidden bg-white/5">
                        <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-500"></div>
                        <img src={project.img} alt={project.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 opacity-80 hover:opacity-100 grayscale hover:grayscale-0" />
                      </div>

                      <div className="p-6 flex flex-col grow">
                        <div className={`text-xs font-black mb-2 uppercase tracking-wider ${textAccentClass}`}>{project.category}</div>
                        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-3">{project.desc}</p>

                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex gap-2">
                            {project.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className={`text-[10px] px-2.5 py-1 rounded-md font-bold ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{tag}</span>
                            ))}
                          </div>

                          {/* Tombol Eksternal Link berdasarkan status Development */}
                          {!project.inDev ? (
                            <a href={project.url} target="_blank" rel="noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${bgAccentClass} hover:opacity-80`}>
                              <ExternalLink size={14} />
                            </a>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 italic px-2">{t.comingSoon}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Bagian Sertifikasi (JS Marquee - Arah Berlawanan) */}
          <section id="sertifikasi" className="pb-24 pt-12 relative z-10">
            <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
              <h2 className="text-3xl font-black tracking-wide mb-4">{t.certifications.title}</h2>
            </div>

            <div
              className="w-full overflow-x-auto hidden-scrollbar py-10 -my-10"
              ref={certScrollRef}
              onMouseEnter={() => setIsHoverCert(true)}
              onMouseLeave={() => setIsHoverCert(false)}
              onTouchStart={() => setIsHoverCert(true)}
              onTouchEnd={() => setIsHoverCert(false)}
            >
              <div className="flex w-max pl-6">
                {[...t.certifications.items, ...t.certifications.items].map((cert, index) => (
                  <a key={index} href={cert.url} target="_blank" rel="noreferrer" className="w-[320px] shrink-0 mr-6 block">
                    <div className={`h-full glass-panel p-6 rounded-2xl flex items-start gap-4 hover:-translate-y-2 transition-all ${borderHoverClass}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-300 dark:border-white/10 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <Award size={24} className={textAccentClass} />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base leading-tight pr-2">{cert.title}</h3>
                          <ExternalLink size={14} className="text-slate-400 shrink-0 mt-1" />
                        </div>
                        <p className="text-slate-500 text-xs font-medium mt-1">{cert.org}</p>
                        <div className="flex items-center gap-3 mt-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-200 text-slate-700'}`}>{cert.year}</span>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${isDark ? 'bg-white/5 text-slate-300 border-white/20' : 'bg-white text-slate-700 border-slate-300'}`}>
                            {cert.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Bagian Kontak */}
          <section id="kontak" className="py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="glass-panel rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-6">{t.contact.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
                    {t.contact.desc}
                  </p>

                  <form className="max-w-md mx-auto space-y-4 text-left mb-12" onSubmit={handleSendEmail}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.nameHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#1883FF]' : 'bg-white/80 border-slate-400/70 focus:border-[#1883FF]'} focus:ring-2 focus:ring-[#1883FF]/30 dark:focus:ring-[#1883FF]/30`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.emailHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#1883FF]' : 'bg-white/80 border-slate-400/70 focus:border-[#1883FF]'} focus:ring-2 focus:ring-[#1883FF]/30 dark:focus:ring-[#1883FF]/30`}
                    />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.subjectHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#1883FF]' : 'bg-white/80 border-slate-400/70 focus:border-[#1883FF]'} focus:ring-2 focus:ring-[#1883FF]/30 dark:focus:ring-[#1883FF]/30`}
                    />
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.msgHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all resize-none font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#1883FF]' : 'bg-white/80 border-slate-400/70 focus:border-[#1883FF]'} focus:ring-2 focus:ring-[#1883FF]/30 dark:focus:ring-[#1883FF]/30`}
                    ></textarea>

                    <button type="submit" className={`w-full py-4 rounded-xl font-black shadow-lg transition-all hover:opacity-90 ${bgAccentClass}`}>
                      {t.contact.btn}
                    </button>
                  </form>

                  <div className="flex justify-center gap-6">
                    {/* TAUTAN SOSIAL MEDIA */}
                    {[
                      { icon: <Github size={24} />, name: 'Github', href: 'https://github.com/bukhori80' },
                      { icon: <Linkedin size={24} />, name: 'Linkedin', href: 'https://www.linkedin.com/in/bubu-bukhori-muslim-359912414' },
                      { icon: <Instagram size={24} />, name: 'Instagram', href: 'https://instagram.com/bbukhorim' },
                      { icon: <Mail size={24} />, name: 'Mail', href: '#kontak' }
                    ].map((platform, idx) => {
                      const isAnchor = platform.href.startsWith('#');
                      return (
                        <a
                          key={idx}
                          href={platform.href}
                          target={isAnchor ? undefined : "_blank"}
                          rel={isAnchor ? undefined : "noreferrer"}
                          title={platform.name}
                          className={`p-3 rounded-xl transition-all shadow-sm flex items-center justify-center ${isDark ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white' : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900'}`}
                        >
                          {platform.icon}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 font-bold text-sm relative z-10">
            <p>© {new Date().getFullYear()} Bubu Bukhori Muslim. Dibuat dengan React & Tailwind CSS.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;