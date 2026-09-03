import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Github, Linkedin, Mail, ExternalLink, ChevronDown,
  FileText, Award, Database, Settings, Moon, Sun,
  Palette, GraduationCap, X, Instagram, Edit3
} from 'lucide-react';
import { loadPortfolioData, fetchPortfolioJSON, savePortfolioData, resetPortfolioData } from './data/portfolioData';
import { AdminModal } from './components/AdminModal';

const fotoBubu = '/foto-profil.jpg';

const App = () => {
  // Global States
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState('id');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Portfolio Data State
  const [portfolioData, setPortfolioData] = useState(() => loadPortfolioData());

  // Sync with /portfolio-data.json on load
  useEffect(() => {
    fetchPortfolioJSON().then((data) => {
      if (data) {
        setPortfolioData(data);
        savePortfolioData(data);
      }
    });
  }, []);

  const handleSavePortfolioData = (newData) => {
    setPortfolioData(newData);
    savePortfolioData(newData);
  };

  const handleResetPortfolioData = () => {
    const defaultData = resetPortfolioData();
    setPortfolioData(defaultData);
  };

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
  const t = portfolioData[lang] || portfolioData['id'];
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



  // CSS Variabel untuk Apple Light Interface
  const bgAccentClass = "bg-[#0066cc] dark:bg-[#2997ff] text-white dark:text-black hover:opacity-90 transition-all duration-[200ms] ease-[cubic-bezier(0.4,0,0.6,1)]";
  const primaryBtnClass = "bg-[#0066cc] dark:bg-[#2997ff] text-white dark:text-black shadow-md hover:shadow-lg transition-all duration-[200ms] ease-[cubic-bezier(0.4,0,0.6,1)] rounded-[980px]";
  const textAccentClass = "text-[#0066cc] dark:text-[#2997ff]";
  const borderHoverClass = "hover:border-[#0066cc]/50 dark:hover:border-[#2997ff]/50";
  const textGradientClass = "bg-gradient-to-r from-[#0066cc] to-[#2997ff]";

  // Combined transform variables for ID card (physics + hover)
  const rx = (cardTransform.rx || 0) + (cardTransform.hoverRx || 0);
  const ry = (cardTransform.ry || 0) + (cardTransform.hoverRy || 0);
  const r = (cardTransform.r || 0);

  return (
    <div className={`${isDark ? 'dark' : ''}`}>


      {/* Background Latar Utama */}
      <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#ffffff] font-body transition-colors duration-[200ms] ease-[cubic-bezier(0.4,0,0.6,1)] relative overflow-x-hidden selection:bg-[#0066cc]/20 dark:selection:bg-[#2997ff]/30">

        {/* CSS Custom */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .glass-nav {
            background: ${isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(245, 245, 247, 0.65)'};
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(29, 29, 31, 0.08)'};
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
          }
          .glass-panel {
            background: ${isDark ? 'rgba(15, 15, 15, 0.35)' : 'rgba(245, 245, 247, 0.45)'};
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(29, 29, 31, 0.09)'};
            box-shadow: 0 8px 32px ${isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(29, 29, 31, 0.03)'};
          }
          .glass-card {
            background: ${isDark ? 'linear-gradient(135deg, rgba(20, 20, 20, 0.4) 0%, rgba(10, 10, 10, 0.5) 100%)' : 'linear-gradient(135deg, rgba(245, 245, 247, 0.55) 0%, rgba(245, 245, 247, 0.3) 100%)'};
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(29, 29, 31, 0.08)'};
            box-shadow: 0 8px 32px 0 ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(29, 29, 31, 0.02)'};
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

                <div className="pt-2 border-t border-slate-300 dark:border-white/10">
                  <button
                    onClick={() => { setIsSettingsOpen(false); setIsAdminOpen(true); }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105"
                  >
                    <Edit3 size={14} />
                    <span>Form Edit Data</span>
                  </button>
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
              <a href="#" className="text-xl font-black tracking-wider bg-gradient-to-r from-[#0066cc] via-[#2997ff] to-[#0066cc] dark:from-[#2997ff] dark:via-white dark:to-[#2997ff] bg-clip-text text-transparent animate-gradient-text">
                {t.nav.logo}
              </a>
              <div className="hidden md:flex space-x-8 text-sm font-bold text-slate-600 dark:text-slate-300">
                <a href="#beranda" className={`hover:${textAccentClass} transition-colors`}>{t.nav.home}</a>
                <a href="#tentang" className={`hover:${textAccentClass} transition-colors`}>{t.nav.about}</a>
                <a href="#layanan" className={`hover:${textAccentClass} transition-colors`}>{t.nav.services}</a>
                <a href="#proyek" className={`hover:${textAccentClass} transition-colors`}>{t.nav.project}</a>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs font-bold transition-all"
                >
                  <Edit3 size={14} />
                  <span>Form Edit Data</span>
                </button>
                <a href="#kontak" className={`px-5 py-2 rounded-full border border-slate-400/80 dark:border-white/30 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-sm font-bold`}>
                  {t.nav.contact}
                </a>
              </div>
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
                    <div className="absolute bottom-2 left-0 w-8 h-[1500px] bg-gradient-to-t from-[#0066cc] dark:from-[#2997ff] via-neutral-800 to-neutral-900 origin-bottom-left -rotate-[16deg] shadow-[inset_2px_0_4px_rgba(0,0,0,0.5)] dark:shadow-[inset_2px_0_4px_rgba(0,0,0,0.8)] rounded-sm"></div>
                    <div className="absolute bottom-2 right-0 w-8 h-[1500px] bg-gradient-to-t from-[#0066cc] dark:from-[#2997ff] via-neutral-800 to-neutral-900 origin-bottom-right rotate-[16deg] shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)] dark:shadow-[inset_-2px_0_4px_rgba(0,0,0,0.8)] rounded-sm"></div>
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
                    <div className="absolute top-0 left-0 w-full h-[70px] bg-gradient-to-r from-neutral-900 via-neutral-800 to-[#0066cc] dark:to-[#2997ff] flex flex-col items-center justify-end pb-4 shadow-sm">
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
                      <span className="text-xs md:text-sm font-bold text-[#0066cc] dark:text-[#2997ff] text-center typing-cursor leading-snug">
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
                  <span className="bg-gradient-to-r from-[#0066cc] via-[#2997ff] to-[#0066cc] dark:from-[#2997ff] dark:via-white dark:to-[#2997ff] bg-clip-text text-transparent animate-gradient-text pb-1 inline-block">
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
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#2997ff]' : 'bg-white/80 border-slate-400/70 focus:border-[#0066cc]'} focus:ring-2 focus:ring-[#0066cc]/30 dark:focus:ring-[#2997ff]/30`}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.emailHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#2997ff]' : 'bg-white/80 border-slate-400/70 focus:border-[#0066cc]'} focus:ring-2 focus:ring-[#0066cc]/30 dark:focus:ring-[#2997ff]/30`}
                    />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.subjectHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#2997ff]' : 'bg-white/80 border-slate-400/70 focus:border-[#0066cc]'} focus:ring-2 focus:ring-[#0066cc]/30 dark:focus:ring-[#2997ff]/30`}
                    />
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      placeholder={t.contact.msgHolder}
                      className={`w-full px-5 py-4 rounded-xl border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none transition-all resize-none font-medium ${isDark ? 'bg-white/5 border-white/20 focus:border-[#2997ff]' : 'bg-white/80 border-slate-400/70 focus:border-[#0066cc]'} focus:ring-2 focus:ring-[#0066cc]/30 dark:focus:ring-[#2997ff]/30`}
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

      {/* Admin Modal Form untuk Edit Data */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={portfolioData}
        onSave={handleSavePortfolioData}
        onReset={handleResetPortfolioData}
      />
    </div>
  );
};

export default App;