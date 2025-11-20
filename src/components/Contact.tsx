'use client';

import { useState } from 'react';

export default function Contact() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    // Validasi file (hanya gambar)
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // Max 5MB
    );

    if (validFiles.length !== files.length) {
      alert('Beberapa file tidak valid. Pastikan hanya gambar dengan ukuran maksimal 5MB.');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);

    // Buat preview untuk gambar yang dipilih
    validFiles.forEach(file => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedFiles.length > 0) {
      alert(`Terima kasih! Permintaan Anda dengan ${selectedFiles.length} gambar telah dikirim. Tim kami akan menghubungi Anda.`);
    } else {
      alert('Terima kasih, tim kami akan menghubungi Anda.');
    }
    
    // Reset form
    setSelectedFiles([]);
    setPreviews([]);
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
              <p className="text-white/70 mt-2">Design and Build, Finishing Contractor & Acoustic Installation sejak 2013.</p>
              <div className="mt-4 space-y-2">
                <a href="https://wa.me/6281229750999" target="_blank" className="flex items-center gap-2 text-white/80" rel="noreferrer">
                  <span className="text-accent">WA</span> +62 812-2975-0999
                </a>
                <a href="https://www.facebook.com/focustradingcontractor/" target="_blank" className="flex items-center gap-2 text-white/80" rel="noreferrer">
                  <span className="text-accent">FB</span> Focus Trading Contractor
                </a>
                <a href="https://focustradingcontractor.com/" target="_blank" className="flex items-center gap-2 text-white/80" rel="noreferrer">
                  <span className="text-accent">WEB</span> focustradingcontractor.com
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
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Perusahaan</label>
                  <input 
                    type="text" 
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
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="email@perusahaan.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Lokasi Proyek</label>
                  <input 
                    type="text" 
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand" 
                    placeholder="Kota / Area"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Perkiraan Luas</label>
                  <select className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand">
                    <option value="">Pilih luas</option>
                    <option>&lt; 300 m²</option>
                    <option>300 – 1.000 m²</option>
                    <option>1.000 – 5.000 m²</option>
                    <option>&gt; 5.000 m²</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Timeline</label>
                  <select className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-brand focus:ring-brand">
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
              <button 
                type="submit"
                className="rounded-2xl bg-brand px-6 py-3 text-white font-semibold hover:bg-brand/90"
              >
                Kirim Permintaan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}