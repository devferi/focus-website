'use client';

import { useState } from 'react';
import { Facebook, Instagram, FileDown } from 'lucide-react';

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41L3.2 28.8l6.61-1.72A12.74 12.74 0 0 0 16 28.8c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.799-12.8zm0 23.04c-2.01 0-3.98-.53-5.7-1.54l-.41-.24-3.93 1.02 1.05-3.83-.27-.39A10.57 10.57 0 0 1 5.44 16c0-5.83 4.73-10.56 10.56-10.56 5.83 0 10.56 4.73 10.56 10.56 0 5.83-4.73 10.56-10.56 10.56zm5.81-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.61-1.89-1.8-2.21-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.62-.53-.54-.71-.55-.18-.01-.39-.01-.6-.01-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.65 0 1.56 1.15 3.07 1.31 3.29.16.21 2.27 3.47 5.51 4.73.77.3 1.37.48 1.84.61.77.2 1.47.17 2.02.1.62-.09 1.89-.77 2.16-1.51.27-.74.27-1.37.19-1.51-.08-.14-.29-.21-.61-.37z" />
    </svg>
  );
}

export default function Contact() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [areaEstimate, setAreaEstimate] = useState('');
  const [timeline, setTimeline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [cpName, setCpName] = useState('');
  const [cpPhone, setCpPhone] = useState('');
  const [cpDomisili, setCpDomisili] = useState('');
  const [cpStatus, setCpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [cpMessage, setCpMessage] = useState('');
  const [cpErrors, setCpErrors] = useState<{ name?: string; phone?: string; domicile?: string }>({});
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';
  const maxFiles = 5;

  const validateCompanyProfile = () => {
    const nextErrors: { name?: string; phone?: string; domicile?: string } = {};
    const trimmedName = cpName.trim();
    const trimmedDomisili = cpDomisili.trim();
    const phoneDigits = cpPhone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      nextErrors.name = 'Nama minimal 2 karakter.';
    }

    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      nextErrors.phone = 'Nomor HP harus 10–15 digit.';
    }

    if (!trimmedDomisili) {
      nextErrors.domicile = 'Domisili wajib diisi.';
    }

    setCpErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCompanyProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cpStatus === 'submitting') return;

    if (!validateCompanyProfile()) {
      setCpStatus('error');
      setCpMessage('Periksa kembali data Anda.');
      return;
    }

    setCpStatus('submitting');
    setCpMessage('');

    try {
      const payload = {
        name: cpName.trim(),
        phone: cpPhone.replace(/\D/g, ''),
        domicile: cpDomisili.trim(),
      };

      const response = await fetch(`${API_BASE}/api/company-profile-downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'Gagal mengirim data. Coba lagi.';
        try {
          const data = await response.json();
          if (data?.message) {
            errorMessage = data.message;
          }
        } catch {
          // ignore parse error
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const downloadUrl = data?.download_url;

      if (!downloadUrl) {
        throw new Error('Download URL tidak tersedia.');
      }

      setCpStatus('success');
      setCpMessage('Berhasil! Mengunduh Company Profile...');
      setCpName('');
      setCpPhone('');
      setCpDomisili('');
      setCpErrors({});

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.click();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan.';
      setCpStatus('error');
      setCpMessage(message);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validasi file (hanya gambar)
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // Max 5MB
    );

    if (validFiles.length !== files.length) {
      alert('Beberapa file tidak valid. Pastikan hanya gambar dengan ukuran maksimal 5MB.');
    }

    const availableSlots = Math.max(0, maxFiles - selectedFiles.length);
    const limitedFiles = validFiles.slice(0, availableSlots);
    if (limitedFiles.length < validFiles.length) {
      alert(`Maksimal ${maxFiles} gambar. Hanya ${limitedFiles.length} gambar yang ditambahkan.`);
    }

    setSelectedFiles(prev => [...prev, ...limitedFiles]);

    // Buat preview untuk gambar yang dipilih
    limitedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitState === 'submitting') return;

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('company', company);
      formData.append('email', email);
      formData.append('project_location', projectLocation);
      formData.append('area_estimate', areaEstimate);
      formData.append('timeline', timeline);
      formData.append('project_description', projectDescription);
      selectedFiles.forEach((file) => {
        formData.append('project_images[]', file);
      });

      const response = await fetch(`${API_BASE}/api/project-requests`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Gagal mengirim permintaan. Coba lagi.';
        try {
          const payload = await response.json();
          if (payload?.message) {
            errorMessage = payload.message;
          }
        } catch {
          // ignore parse errors
        }
        throw new Error(errorMessage);
      }

      setSubmitState('success');
      setSubmitMessage('Terima kasih! Permintaan Anda sudah kami terima.');
      setName('');
      setCompany('');
      setEmail('');
      setProjectLocation('');
      setAreaEstimate('');
      setTimeline('');
      setProjectDescription('');
      setSelectedFiles([]);
      setPreviews([]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim.';
      setSubmitState('error');
      setSubmitMessage(message);
    }
  };

  return (
    <section id="contact" className="py-20 bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">Hubungi Kami</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Sampaikan kebutuhan proyek Anda.</h2>
            <p className="mt-3 text-white/80">
              Pesan cepat via WhatsApp sesuai form di website resmi kami. Sertakan detail pekerjaan agar tim bisa menindaklanjuti dari idea hingga final solution.
            </p>
            <div className="mt-6 rounded-3xl border border-white/20 bg-white/5 p-6 text-sm">
              <p className="font-semibold text-lg">CV. Focus Trading Contractor</p>
              <p className="text-white/70 mt-2">Design and Build, Acoustic Installation, Finishing & Infrastructure sejak 2011.</p>
              <div className="mt-4 space-y-2">
                <a href="https://wa.me/6281229750999" target="_blank" className="flex items-center gap-3 text-white/90 hover:text-white" rel="noreferrer">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/20">
                    <WhatsAppIcon className="w-6 h-6" />
                  </span>
                  <span className="font-medium">+62 812-2975-0999</span>
                </a>

                <a href="https://www.instagram.com/focustrad/" target="_blank" className="flex items-center gap-3 text-white/90 hover:text-white" rel="noreferrer">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/20">
                    <Instagram className="w-6 h-6" />
                  </span>
                  <span className="font-medium">@focustrad</span>
                </a>

                <a href="https://www.facebook.com/focustradingcontractor/?__tn__=%2Cd%2CP-R&eid=ARAoKUaqwuZRDHskxxvMly9HaPdvKKgJSm3ITDn2EyGBxT-h6XB7yUnt90ee6wLxW9tZpim3n-nHt8Lq" target="_blank" className="flex items-center gap-3 text-white/90 hover:text-white" rel="noreferrer">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/20">
                    <Facebook className="w-6 h-6" />
                  </span>
                  <span className="font-medium">Focus Trading Contractor</span>
                </a>

              </div>
            </div>
          </div>
          <div className="rounded-[32px] bg-white text-slate-900 p-8 shadow-soft">
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Nama</label>
                  <input 
                    type="text" 
                    required 
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Perusahaan</label>
                  <input 
                    type="text" 
                    required
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="PT Anda"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Email</label>
                  <input 
                    type="email" 
                    required 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="email@perusahaan.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Lokasi Proyek</label>
                  <input 
                    type="text" 
                    required
                    name="project_location"
                    value={projectLocation}
                    onChange={(e) => setProjectLocation(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="Kota / Area"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Perkiraan Luas</label>
                  <select 
                    required
                    name="area_estimate"
                    value={areaEstimate}
                    onChange={(e) => setAreaEstimate(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand"
                  >
                    <option value="">Pilih luas</option>
                    <option>&lt; 300 m²</option>
                    <option>300 – 1.000 m²</option>
                    <option>1.000 – 5.000 m²</option>
                    <option>&gt; 5.000 m²</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Timeline</label>
                  <select 
                    required
                    name="timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand"
                  >
                    <option value="">Pilih timeline</option>
                    <option>Segera</option>
                    <option>1 – 3 bulan</option>
                    <option>3 – 6 bulan</option>
                    <option>&gt; 6 bulan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Deskripsi Proyek</label>
                <textarea 
                  rows={4} 
                  required
                  name="project_description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                  placeholder="Ruang lingkup, kebutuhan khusus, standar internal"
                ></textarea>
              </div>
              
              {/* Upload Gambar */}
              <div>
                <label className="text-sm font-medium text-slate-600">Gambar Proyek (Opsional)</label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors duration-300">
                  <div className="mb-3">
                    <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-1">Tambahkan gambar proyek (maks. 5 gambar)</p>
                    <p className="text-xs text-gray-500">Format: JPG, PNG, GIF (Maks. 5MB per file)</p>
                  </div>
                  
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="project-images"
                  />
                  
                  <label
                    htmlFor="project-images"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Pilih Gambar
                  </label>
                </div>
                
                {/* Preview Gambar */}
                {previews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-600 mb-2">Preview ({previews.length} gambar)</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 text-xs"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {submitMessage && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm ${
                    submitState === 'success'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {submitMessage}
                </div>
              )}
              <button 
                type="submit"
                className="rounded-2xl bg-brand px-6 py-3 text-white font-semibold hover:bg-brand/90 disabled:opacity-70"
                disabled={submitState === 'submitting'}
              >
                {submitState === 'submitting' ? 'Mengirim...' : 'Kirim Permintaan'}
              </button>
            </form>
          </div>
        </div>

        {/* Unduh Company Profile */}
        <div className="mt-8 rounded-3xl border border-white/20 bg-white/5 p-6">
          <form onSubmit={handleCompanyProfileSubmit}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">Unduh Company Profile</p>
                <p className="mt-2 text-white/80 text-sm">Isi data singkat di bawah ini untuk mengunduh dokumen resmi perusahaan.</p>
              </div>
              <div className="w-full lg:w-auto grid sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-1 ${
                      cpErrors.name ? 'border-rose-300/80 focus:ring-rose-200' : 'border-white/20 focus:ring-white/50'
                    }`}
                    placeholder="Nama"
                    value={cpName}
                    onChange={(e) => {
                      setCpName(e.target.value);
                      if (cpErrors.name) setCpErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                  />
                  {cpErrors.name && <p className="mt-1 text-xs text-rose-200">{cpErrors.name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-1 ${
                      cpErrors.phone ? 'border-rose-300/80 focus:ring-rose-200' : 'border-white/20 focus:ring-white/50'
                    }`}
                    placeholder="Nomor HP"
                    value={cpPhone}
                    onChange={(e) => {
                      setCpPhone(e.target.value);
                      if (cpErrors.phone) setCpErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                  {cpErrors.phone && <p className="mt-1 text-xs text-rose-200">{cpErrors.phone}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    className={`w-full rounded-2xl border bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-1 ${
                      cpErrors.domicile ? 'border-rose-300/80 focus:ring-rose-200' : 'border-white/20 focus:ring-white/50'
                    }`}
                    placeholder="Domisili"
                    value={cpDomisili}
                    onChange={(e) => {
                      setCpDomisili(e.target.value);
                      if (cpErrors.domicile) setCpErrors((prev) => ({ ...prev, domicile: undefined }));
                    }}
                  />
                  {cpErrors.domicile && <p className="mt-1 text-xs text-rose-200">{cpErrors.domicile}</p>}
                </div>
              </div>
            </div>
            {cpMessage && (
              <div
                className={`mt-4 rounded-xl px-4 py-2 text-sm ${
                  cpStatus === 'success' ? 'bg-emerald-500/10 text-emerald-200' : 'bg-rose-500/10 text-rose-200'
                }`}
              >
                {cpMessage}
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-white/60">Data Anda hanya digunakan untuk keperluan tindak lanjut dan arsip internal.</p>
              <button
                type="submit"
                disabled={cpStatus === 'submitting'}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90 disabled:opacity-60"
              >
                <FileDown className="w-4 h-4" />
                {cpStatus === 'submitting' ? 'Memproses...' : 'Unduh PDF'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
