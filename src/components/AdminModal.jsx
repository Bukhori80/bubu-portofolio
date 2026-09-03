import React, { useState, useEffect } from 'react';
import {
  X, Plus, Trash2, Edit3, Save, Download, Upload, RotateCcw,
  CheckCircle2, Briefcase, FolderGit2, Award, User, HardDrive, Languages,
  Github, Send, Loader2, Key, ExternalLink, RefreshCw, AlertCircle
} from 'lucide-react';
import {
  exportPortfolioJSON,
  importPortfolioJSON,
  getSavedGitHubConfig,
  saveGitHubConfig,
  commitToGitHub
} from '../data/portfolioData';

export const AdminModal = ({ isOpen, onClose, data, onSave, onReset }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('github'); // 'github', 'edu', 'projects', 'certs', 'profile', 'backup'
  const [activeLang, setActiveLang] = useState('id'); // 'id' or 'en'
  const [toastMessage, setToastMessage] = useState('');

  // GitHub Auto-Sync States
  const [githubToken, setGithubToken] = useState('');
  const [githubRepo, setGithubRepo] = useState('bukhori80/bubu-portofolio');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(null);

  // Load saved GitHub PAT config on open
  useEffect(() => {
    const config = getSavedGitHubConfig();
    setGithubToken(config.token);
    setGithubRepo(config.repo);
  }, [isOpen]);

  // Editing state for Education/Experience
  const [editingEduIndex, setEditingEduIndex] = useState(null);
  const [eduForm, setEduForm] = useState({ year: '', school: '', degree: '', desc: '' });

  // Editing state for Projects
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [projectForm, setProjectForm] = useState({ title: '', category: '', img: '', desc: '', tags: '', inDev: false, url: '' });

  // Editing state for Certifications
  const [editingCertIndex, setEditingCertIndex] = useState(null);
  const [certForm, setCertForm] = useState({ title: '', org: '', year: '', status: 'Selesai', url: '' });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    heroGreeting: data[activeLang]?.hero?.greeting || '',
    heroDesc: data[activeLang]?.hero?.desc || '',
    aboutTitle: data[activeLang]?.about?.title || '',
    aboutDesc: data[activeLang]?.about?.desc || '',
    contactDesc: data[activeLang]?.contact?.desc || ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const updateDataState = (updater) => {
    const newData = JSON.parse(JSON.stringify(data));
    updater(newData);
    onSave(newData);
    showToast('Data disimpan secara lokal! Jangan lupa klik tab GitHub untuk publish ke Vercel.');
  };

  // --- GITHUB PUBLISH HANDLER ---
  const handlePublishToGitHub = async () => {
    if (!githubToken.trim()) {
      alert('Silakan masukkan GitHub Personal Access Token (PAT) Anda terlebih dahulu.');
      return;
    }

    saveGitHubConfig(githubToken.trim(), githubRepo.trim());
    setIsPublishing(true);
    setPublishStatus('Memeriksa koneksi ke repositori GitHub...');
    setPublishSuccess(null);

    try {
      setPublishStatus('Meng-commit data ke public/portfolio-data.json di GitHub...');
      const commitRes = await commitToGitHub({
        data,
        token: githubToken.trim(),
        repoFull: githubRepo.trim(),
        message: `Update data portofolio via Admin Form (${new Date().toLocaleDateString('id-ID')})`
      });

      setPublishStatus('Success');
      setPublishSuccess({
        commitUrl: commitRes.commit?.html_url || `https://github.com/${githubRepo.trim()}/commits/main`,
        message: 'Data berhasil di-push ke GitHub! Vercel sedang me-redeploy situs Anda secara otomatis (estimasi 10-20 detik).'
      });
      showToast('🚀 Berhasil dipublish ke GitHub & Vercel!');
    } catch (err) {
      console.error(err);
      setPublishSuccess({
        error: true,
        message: err.message || 'Gagal meng-commit data ke GitHub.'
      });
    } finally {
      setIsPublishing(false);
    }
  };

  // --- EDU / EXPERIENCE HANDLERS ---
  const handleOpenEduForm = (index = null) => {
    if (index !== null) {
      setEditingEduIndex(index);
      setEduForm({ ...data[activeLang].edu.items[index] });
    } else {
      setEditingEduIndex('new');
      setEduForm({ year: '', school: '', degree: '', desc: '' });
    }
  };

  const handleSaveEdu = (e) => {
    e.preventDefault();
    if (!eduForm.school || !eduForm.degree) return;

    updateDataState((draft) => {
      const items = draft[activeLang].edu.items;
      if (editingEduIndex === 'new') {
        items.unshift(eduForm);
      } else {
        items[editingEduIndex] = eduForm;
      }
    });
    setEditingEduIndex(null);
  };

  const handleDeleteEdu = (index) => {
    if (window.confirm('Yakin ingin menghapus pengalaman ini?')) {
      updateDataState((draft) => {
        draft[activeLang].edu.items.splice(index, 1);
      });
    }
  };

  // --- PROJECT HANDLERS ---
  const handleOpenProjectForm = (index = null) => {
    if (index !== null) {
      const item = data[activeLang].projects.items[index];
      setEditingProjectIndex(index);
      setProjectForm({
        ...item,
        tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || ''
      });
    } else {
      setEditingProjectIndex('new');
      setProjectForm({ title: '', category: 'AI Application', img: '', desc: '', tags: 'Python, Machine Learning', inDev: false, url: '' });
    }
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const formattedTags = typeof projectForm.tags === 'string'
      ? projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : projectForm.tags;

    const newProject = {
      ...projectForm,
      tags: formattedTags
    };

    updateDataState((draft) => {
      const items = draft[activeLang].projects.items;
      if (editingProjectIndex === 'new') {
        items.unshift(newProject);
      } else {
        items[editingProjectIndex] = newProject;
      }
    });
    setEditingProjectIndex(null);
  };

  const handleDeleteProject = (index) => {
    if (window.confirm('Yakin ingin menghapus proyek ini?')) {
      updateDataState((draft) => {
        draft[activeLang].projects.items.splice(index, 1);
      });
    }
  };

  // --- CERTIFICATION HANDLERS ---
  const handleOpenCertForm = (index = null) => {
    if (index !== null) {
      setEditingCertIndex(index);
      setCertForm({ ...data[activeLang].certifications.items[index] });
    } else {
      setEditingCertIndex('new');
      setCertForm({ title: '', org: '', year: new Date().getFullYear().toString(), status: 'Selesai', url: '' });
    }
  };

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title) return;

    updateDataState((draft) => {
      const items = draft[activeLang].certifications.items;
      if (editingCertIndex === 'new') {
        items.unshift(certForm);
      } else {
        items[editingCertIndex] = certForm;
      }
    });
    setEditingCertIndex(null);
  };

  const handleDeleteCert = (index) => {
    if (window.confirm('Yakin ingin menghapus sertifikat ini?')) {
      updateDataState((draft) => {
        draft[activeLang].certifications.items.splice(index, 1);
      });
    }
  };

  // --- PROFILE HANDLERS ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateDataState((draft) => {
      draft[activeLang].hero.greeting = profileForm.heroGreeting;
      draft[activeLang].hero.desc = profileForm.heroDesc;
      draft[activeLang].about.title = profileForm.aboutTitle;
      draft[activeLang].about.desc = profileForm.aboutDesc;
      draft[activeLang].contact.desc = profileForm.contactDesc;
    });
  };

  // --- BACKUP HANDLERS ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imported = await importPortfolioJSON(file);
      onSave(imported);
      showToast('Data berhasil di-import!');
    } catch (err) {
      alert(err.message || 'Gagal meng-import JSON.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua data ke setelan awal default? Data lokal saat ini akan terhapus.')) {
      onReset();
      showToast('Data berhasil direset ke default.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Form Manajemen Data Portofolio</h2>
              <p className="text-xs text-slate-400">Edit isi portofolio & Auto-Deploy langsung ke Vercel via GitHub API</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setActiveLang('id')}
                className={`px-3 py-1 rounded-md transition ${activeLang === 'id' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                🇮🇩 ID
              </button>
              <button
                onClick={() => setActiveLang('en')}
                className={`px-3 py-1 rounded-md transition ${activeLang === 'en' ? 'bg-cyan-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
              >
                🇬🇧 EN
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl flex items-center gap-2 text-sm font-medium animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 overflow-x-auto text-sm font-medium">
          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'github' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>🚀 Publish ke GitHub & Vercel</span>
          </button>

          <button
            onClick={() => setActiveTab('edu')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'edu' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Pengalaman & Edu
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'projects' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            Proyek ({data[activeLang]?.projects?.items?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'certs' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Sertifikasi ({data[activeLang]?.certifications?.items?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'profile' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Profil & Bio
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'backup' ? 'border-cyan-400 text-cyan-400 font-semibold' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            Export / Import Data
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* TAB GITHUB & VERCEL AUTO-SYNC */}
          {activeTab === 'github' && (
            <div className="space-y-6">
              
              {/* Box Status Publish Utama */}
              <div className="p-5 bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 border border-cyan-500/30 rounded-2xl space-y-4 shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
                      <Github className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">Publish ke GitHub & Trigger Vercel Deploy</h3>
                      <p className="text-xs text-slate-400">
                        Otomatis commit data portofolio ke repositori <code className="text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">{githubRepo}</code>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    GitHub Personal Access Token (PAT)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Key className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      placeholder="github_pat_11AAA..."
                      value={githubToken}
                      onChange={(e) => {
                        setGithubToken(e.target.value);
                        saveGitHubConfig(e.target.value, githubRepo);
                      }}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-cyan-400 text-slate-200 font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    * Token hanya disimpan secara aman di peramban browser Anda (`localStorage`) dan tidak pernah dikirim ke siapapun selain GitHub API resmi.
                  </p>
                </div>

                {/* Status Result Message */}
                {publishSuccess && (
                  <div className={`p-4 rounded-xl text-sm font-medium border flex items-start gap-3 ${
                    publishSuccess.error 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}>
                    {publishSuccess.error ? (
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p>{publishSuccess.message}</p>
                      {publishSuccess.commitUrl && (
                        <a
                          href={publishSuccess.commitUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline font-semibold"
                        >
                          Lihat Commit di GitHub <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Tombol Publish Utama */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={handlePublishToGitHub}
                    disabled={isPublishing}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02]"
                  >
                    {isPublishing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{publishStatus || 'Mengirim ke GitHub...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>🚀 Publish & Push ke GitHub (Live di Vercel)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Panduan Membuat Token */}
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  Cara Membuat GitHub Personal Access Token (Hanya 1 Menit)
                </h4>
                <ol className="list-decimal list-inside text-xs text-slate-400 space-y-2 pl-1 leading-relaxed">
                  <li>
                    Buka halaman Token GitHub di{' '}
                    <a
                      href="https://github.com/settings/tokens?type=beta"
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      github.com/settings/tokens <ExternalLink className="w-3 h-3" />
                    </a>
                  </li>
                  <li>
                    Klik <strong>"Generate new token"</strong> (Fine-grained atau Classic).
                  </li>
                  <li>
                    Beri nama token (contoh: <code className="text-slate-200">Portfolio Admin</code>), pilih repositori <code className="text-cyan-300">bukhori80/bubu-portofolio</code>, dan beri akses <strong>Contents: Read and Write</strong> (atau centang centang <code className="text-slate-200">repo</code> untuk token classic).
                  </li>
                  <li>
                    Salin token yang diawali <code className="text-slate-200">github_pat_...</code> lalu paste pada kolom di atas!
                  </li>
                </ol>
              </div>

            </div>
          )}

          {/* TAB 1: PENDIDIKAN & PENGALAMAN */}
          {activeTab === 'edu' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-300">
                  Daftar Pengalaman & Pendidikan ({activeLang.toUpperCase()})
                </h3>
                <button
                  onClick={() => handleOpenEduForm(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Pengalaman
                </button>
              </div>

              {/* Form Input if editing/adding */}
              {editingEduIndex !== null && (
                <form onSubmit={handleSaveEdu} className="p-4 bg-slate-800/80 border border-cyan-500/30 rounded-xl mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {editingEduIndex === 'new' ? 'Tambah Pengalaman Baru' : 'Edit Pengalaman'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Periode / Tahun</label>
                      <input
                        type="text"
                        placeholder="Contoh: Jan 2026 - Sekarang"
                        value={eduForm.year}
                        onChange={(e) => setEduForm({ ...eduForm, year: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Instansi / Perusahaan</label>
                      <input
                        type="text"
                        placeholder="Contoh: Google / IT Garut"
                        value={eduForm.school}
                        onChange={(e) => setEduForm({ ...eduForm, school: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Posisi / Peran / Jurusan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Google Student Ambassador"
                      value={eduForm.degree}
                      onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows={3}
                      placeholder="Penjelasan aktivitas atau peran Anda..."
                      value={eduForm.desc}
                      onChange={(e) => setEduForm({ ...eduForm, desc: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingEduIndex(null)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold shadow"
                    >
                      <Save className="w-4 h-4" /> Simpan Item
                    </button>
                  </div>
                </form>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {data[activeLang]?.edu?.items?.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-xl flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                          {item.year}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-200">{item.degree}</h4>
                      </div>
                      <p className="text-xs font-medium text-slate-400">{item.school}</p>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEduForm(idx)}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEdu(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROYEK */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-300">
                  Daftar Proyek Portofolio ({activeLang.toUpperCase()})
                </h3>
                <button
                  onClick={() => handleOpenProjectForm(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Proyek Baru
                </button>
              </div>

              {/* Form Input Proyek */}
              {editingProjectIndex !== null && (
                <form onSubmit={handleSaveProject} className="p-4 bg-slate-800/80 border border-cyan-500/30 rounded-xl mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {editingProjectIndex === 'new' ? 'Tambah Proyek Baru' : 'Edit Proyek'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Judul Proyek</label>
                      <input
                        type="text"
                        placeholder="Contoh: Recall - Application AI"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Kategori</label>
                      <input
                        type="text"
                        placeholder="Contoh: AI Application, Machine Learning, UI/UX Design"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">URL Gambar (Image Link)</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={projectForm.img}
                        onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Link Demo / GitHub / Figma</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={projectForm.url}
                        onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Tags (Pisahkan dengan koma)</label>
                    <input
                      type="text"
                      placeholder="Python, Machine Learning, AI"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Deskripsi Proyek</label>
                    <textarea
                      rows={3}
                      placeholder="Penjelasan singkat mengenai proyek ini..."
                      value={projectForm.desc}
                      onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="inDev"
                      checked={projectForm.inDev}
                      onChange={(e) => setProjectForm({ ...projectForm, inDev: e.target.checked })}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <label htmlFor="inDev" className="text-xs text-slate-300">
                      Tandai sebagai "Masih dalam Pengembangan" (In Development)
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingProjectIndex(null)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold shadow"
                    >
                      <Save className="w-4 h-4" /> Simpan Proyek
                    </button>
                  </div>
                </form>
              )}

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data[activeLang]?.projects?.items?.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-semibold text-slate-200 mt-1">{item.title}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenProjectForm(idx)}
                            className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(idx)}
                            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3">{item.desc}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                      <span>{Array.isArray(item.tags) ? item.tags.join(', ') : item.tags}</span>
                      {item.inDev && <span className="text-amber-400 font-semibold">Dev</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERTIFIKASI */}
          {activeTab === 'certs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-slate-300">
                  Daftar Sertifikasi & Pencapaian ({activeLang.toUpperCase()})
                </h3>
                <button
                  onClick={() => handleOpenCertForm(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold transition"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Sertifikat
                </button>
              </div>

              {/* Form Input Sertifikat */}
              {editingCertIndex !== null && (
                <form onSubmit={handleSaveCert} className="p-4 bg-slate-800/80 border border-cyan-500/30 rounded-xl mb-6 space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {editingCertIndex === 'new' ? 'Tambah Sertifikat Baru' : 'Edit Sertifikat'}
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Nama Sertifikasi / Pelatihan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Belajar Machine Learning untuk Pemula"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Penyelenggara / Penerbit</label>
                      <input
                        type="text"
                        placeholder="Contoh: Dicoding Indonesia / Google"
                        value={certForm.org}
                        onChange={(e) => setCertForm({ ...certForm, org: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tahun Kelulusan</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={certForm.year}
                        onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">URL / Link Sertifikat (PDF / Credential)</label>
                    <input
                      type="url"
                      placeholder="https://www.dicoding.com/certificates/..."
                      value={certForm.url}
                      onChange={(e) => setCertForm({ ...certForm, url: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingCertIndex(null)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-xs font-semibold shadow"
                    >
                      <Save className="w-4 h-4" /> Simpan Sertifikat
                    </button>
                  </div>
                </form>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {data[activeLang]?.certifications?.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-800/40 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                      <p className="text-xs text-slate-400">
                        {item.org} &bull; <span className="text-cyan-400 font-medium">{item.year}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCertForm(idx)}
                        className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFIL & HERO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">
                Edit Teks Utama & Profil ({activeLang.toUpperCase()})
              </h3>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Salam Utama Hero (Greeting)</label>
                <input
                  type="text"
                  value={profileForm.heroGreeting}
                  onChange={(e) => setProfileForm({ ...profileForm, heroGreeting: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Deskripsi Hero Utama</label>
                <textarea
                  rows={3}
                  value={profileForm.heroDesc}
                  onChange={(e) => setProfileForm({ ...profileForm, heroDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Judul Seksi Profil Singkat</label>
                <input
                  type="text"
                  value={profileForm.aboutTitle}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Deskripsi Profil Singkat</label>
                <textarea
                  rows={3}
                  value={profileForm.aboutDesc}
                  onChange={(e) => setProfileForm({ ...profileForm, aboutDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Teks Seksi Kontak</label>
                <textarea
                  rows={2}
                  value={profileForm.contactDesc}
                  onChange={(e) => setProfileForm({ ...profileForm, contactDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-cyan-400 text-slate-200"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-800">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl text-xs font-semibold shadow transition"
                >
                  <Save className="w-4 h-4" /> Simpan Perubahan Profil
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: BACKUP / EXPORT & IMPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Export / Download Data JSON</h4>
                    <p className="text-xs text-slate-400">Unduh seluruh data portofolio yang sudah Anda edit dalam bentuk file .json.</p>
                  </div>
                </div>
                <button
                  onClick={() => exportPortfolioJSON(data)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 rounded-xl text-xs font-semibold transition"
                >
                  <Download className="w-4 h-4" /> Download Portfolio JSON
                </button>
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">Import / Restore File JSON</h4>
                    <p className="text-xs text-slate-400">Upload file data JSON portofolio untuk me-restore atau memperbarui data secara cepat.</p>
                  </div>
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 rounded-xl text-xs font-semibold cursor-pointer transition">
                  <Upload className="w-4 h-4" /> Upload File JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-rose-300">Reset Data Ke Bawaan Default</h4>
                    <p className="text-xs text-rose-400/80">Hapus perubahan di localStorage browser dan kembalikan data awal portofolio.</p>
                  </div>
                </div>
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow transition"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Data
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
