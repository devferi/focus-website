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
  const [cpName, setCpName] = useState('');
  const [cpCompanyName, setCpCompanyName] = useState('');
  const [cpWhatsapp, setCpWhatsapp] = useState('');
  const [cpCity, setCpCity] = useState('');
  const [cpStatus, setCpStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [cpMessage, setCpMessage] = useState('');
  const [cpErrors, setCpErrors] = useState<{ name?: string; companyName?: string; whatsapp?: string; city?: string }>({});
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

  const validateCompanyProfile = () => {
    const nextErrors: { name?: string; companyName?: string; whatsapp?: string; city?: string } = {};
    const trimmedName = cpName.trim();
    const trimmedCompany = cpCompanyName.trim();
    const trimmedCity = cpCity.trim();
    const whatsappDigits = cpWhatsapp.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      nextErrors.name = 'Nama minimal 2 karakter.';
    }

    if (!trimmedCompany) {
      nextErrors.companyName = 'Nama perusahaan wajib diisi.';
    }

    if (whatsappDigits.length < 10 || whatsappDigits.length > 15) {
      nextErrors.whatsapp = 'Nomor WhatsApp harus 10–15 digit.';
    }

    if (!trimmedCity) {
      nextErrors.city = 'Kota / Area wajib diisi.';
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
        company_name: cpCompanyName.trim(),
        whatsapp: cpWhatsapp.replace(/\D/g, ''),
        city: cpCity.trim(),
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
      setCpCompanyName('');
      setCpWhatsapp('');
      setCpCity('');
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
                <a href="tel:+62317425366" className="flex items-center gap-3 text-white/90 hover:text-white">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white border border-white/20">
                    <img src="/telephone_icon_white.svg" alt="Telephone" className="w-6 h-6" />
                  </span>
                  <span className="font-medium">+6231 7425 366</span>
                </a>

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
            <form onSubmit={handleCompanyProfileSubmit} className="grid gap-4">
              <div>
                <p className="text-lg font-bold text-slate-900 text-center">Unduh Company Profile</p>
                <p className="mt-1 text-xs text-slate-500 text-center whitespace-nowrap">Isi data singkat di bawah ini untuk mengunduh dokumen resmi perusahaan.</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">Nama :</label>
                <input
                  type="text"
                  className="mt-1 w-full h-10 rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand focus:ring-brand"
                  placeholder="Nama Anda"
                  value={cpName}
                  onChange={(e) => {
                    setCpName(e.target.value);
                    if (cpErrors.name) setCpErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                />
                {cpErrors.name && <p className="mt-1 text-xs text-rose-500">{cpErrors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">Nama Perusahaan :</label>
                <input
                  type="text"
                  className="mt-1 w-full h-10 rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand focus:ring-brand"
                  placeholder="Nama Instansi"
                  value={cpCompanyName}
                  onChange={(e) => {
                    setCpCompanyName(e.target.value);
                    if (cpErrors.companyName) setCpErrors((prev) => ({ ...prev, companyName: undefined }));
                  }}
                />
                {cpErrors.companyName && <p className="mt-1 text-xs text-rose-500">{cpErrors.companyName}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">Nomor WhatsApp :</label>
                <input
                  type="tel"
                  className="mt-1 w-full h-10 rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand focus:ring-brand"
                  placeholder="08xxxxxxxxxx"
                  value={cpWhatsapp}
                  onChange={(e) => {
                    setCpWhatsapp(e.target.value);
                    if (cpErrors.whatsapp) setCpErrors((prev) => ({ ...prev, whatsapp: undefined }));
                  }}
                />
                {cpErrors.whatsapp && <p className="mt-1 text-xs text-rose-500">{cpErrors.whatsapp}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-600">Lokasi :</label>
                <input
                  type="text"
                  className="mt-1 w-full h-10 rounded-2xl border border-slate-200 px-4 text-sm text-slate-900 placeholder-slate-400 focus:border-brand focus:ring-brand"
                  placeholder="Kota / Area"
                  value={cpCity}
                  onChange={(e) => {
                    setCpCity(e.target.value);
                    if (cpErrors.city) setCpErrors((prev) => ({ ...prev, city: undefined }));
                  }}
                />
                {cpErrors.city && <p className="mt-1 text-xs text-rose-500">{cpErrors.city}</p>}
              </div>
              {cpMessage && (
                <div
                  className={`rounded-xl px-4 py-2 text-sm ${
                    cpStatus === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {cpMessage}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">Data Anda hanya digunakan untuk keperluan tindak lanjut dan arsip internal.</p>
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
      </div>
    </section>
  );
}
