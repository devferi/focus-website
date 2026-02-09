'use client';

import { useState } from 'react';
import { FileDown } from 'lucide-react';

type FilePreview = {
  kind: 'image' | 'file';
  src?: string;
  name: string;
  ext: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';
const maxFiles = 5;
const maxFileSize = 5 * 1024 * 1024;

export default function ProjectRequestForm() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [areaEstimate, setAreaEstimate] = useState('');
  const [areaUnit, setAreaUnit] = useState<'m1' | 'm2' | 'm3'>('m2');
  const [projectDescription, setProjectDescription] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [requestErrors, setRequestErrors] = useState<{ phone?: string; areaEstimate?: string }>({});

  const revokePreview = (preview: FilePreview) => {
    if (preview.kind === 'image' && preview.src) {
      URL.revokeObjectURL(preview.src);
    }
  };

  const resetSelectedFiles = () => {
    previews.forEach((preview) => revokePreview(preview));
    setSelectedFiles([]);
    setPreviews([]);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const allowedMimes = new Set(['image/jpeg', 'image/png', 'application/pdf']);
    const allowedExtensions = new Set(['jpg', 'jpeg', 'png', 'pdf', 'dwg', 'dxf']);

    const validFiles = files.filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const validType = allowedMimes.has(file.type) || allowedExtensions.has(ext);
      const validSize = file.size <= maxFileSize;
      return validType && validSize;
    });

    if (validFiles.length !== files.length) {
      alert('Beberapa file tidak valid. Format: JPG, PNG, PDF, DWG, DXF (maks. 5MB per file).');
    }

    const availableSlots = Math.max(0, maxFiles - selectedFiles.length);
    const limitedFiles = validFiles.slice(0, availableSlots);
    if (limitedFiles.length < validFiles.length) {
      alert(`Maksimal ${maxFiles} file. Hanya ${limitedFiles.length} file yang ditambahkan.`);
    }

    setSelectedFiles((prev) => [...prev, ...limitedFiles]);

    const nextPreviews: FilePreview[] = limitedFiles.map((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const isImage = file.type.startsWith('image/') || ext === 'jpg' || ext === 'jpeg' || ext === 'png';

      return {
        kind: isImage ? 'image' : 'file',
        src: isImage ? URL.createObjectURL(file) : undefined,
        name: file.name,
        ext,
      };
    });
    setPreviews((prev) => [...prev, ...nextPreviews]);

    event.target.value = '';
  };

  const removeFile = (index: number) => {
    const preview = previews[index];
    if (preview) {
      revokePreview(preview);
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitState === 'submitting') return;

    const nextErrors: { phone?: string; areaEstimate?: string } = {};
    const normalizedPhone = phone.replace(/\D/g, '');
    const trimmedAreaEstimate = areaEstimate.trim();

    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      nextErrors.phone = 'No Handphone harus 10-15 digit angka.';
    }

    if (!/^\d+$/.test(trimmedAreaEstimate)) {
      nextErrors.areaEstimate = 'Perkiraan Luas wajib angka (contoh: 2500).';
    }

    setRequestErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitState('error');
      setSubmitMessage('Periksa kembali data yang diisi.');
      return;
    }

    setSubmitState('submitting');
    setSubmitMessage('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('company', company);
      formData.append('email', email);
      formData.append('phone', normalizedPhone);
      formData.append('project_location', projectLocation);
      formData.append('area_estimate', trimmedAreaEstimate);
      formData.append('area_unit', areaUnit);
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
      setPhone('');
      setProjectLocation('');
      setAreaEstimate('');
      setProjectDescription('');
      resetSelectedFiles();
      setRequestErrors({});
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengirim.';
      setSubmitState('error');
      setSubmitMessage(message);
    }
  };

  return (
    <div className="rounded-[32px] border border-white/20 bg-white/5 text-white p-8 shadow-soft">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="text-sm font-semibold text-white">Nama :</label>
          <input 
            type="text" 
            required 
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="Nama anda"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-white">Perusahaan :</label>
          <input 
            type="text" 
            required
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="Nama Instansi"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-white">Email :</label>
          <input 
            type="email" 
            required 
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="email@perusahaan.com"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-white">No WhatsApp :</label>
          <input 
            type="tel" 
            required
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (requestErrors.phone) {
                setRequestErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="08xxxxxxxxxx"
          />
          {requestErrors.phone && (
            <p className="mt-1 text-xs text-rose-200">{requestErrors.phone}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-white">Lokasi Proyek :</label>
          <input 
            type="text" 
            required
            name="project_location"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="Kota / Area"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-white">Perkiraan Luas :</label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              required
              name="area_estimate"
              value={areaEstimate}
              onChange={(e) => {
                setAreaEstimate(e.target.value);
                if (requestErrors.areaEstimate) {
                  setRequestErrors((prev) => ({ ...prev, areaEstimate: undefined }));
                }
              }}
              className="w-40 sm:w-48 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40"
              placeholder="2500"
            />
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value as 'm1' | 'm2' | 'm3')}
              className="h-10 rounded-2xl border border-white/20 bg-white/10 px-3 text-sm text-white focus:border-white/40 focus:ring-white/40"
              aria-label="Satuan luas"
            >
              <option value="m1">m1</option>
              <option value="m2">m²</option>
              <option value="m3">m3</option>
            </select>
          </div>
          {requestErrors.areaEstimate && (
            <p className="mt-1 text-xs text-rose-200">{requestErrors.areaEstimate}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-semibold text-white">Deskripsi Proyek :</label>
          <textarea 
            rows={4} 
            required
            name="project_description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/40" 
            placeholder="Ruang lingkup, kebutuhan khusus, standar internal"
          ></textarea>
        </div>
        
        <div>
          <label className="text-sm font-semibold text-white">Lampiran Proyek (Opsional) :</label>
          <div className="mt-2 border-2 border-dashed border-white/20 rounded-xl p-4 text-center hover:border-white/40 transition-colors duration-300">
            <div className="mb-3">
              <svg className="w-8 h-8 text-white/60 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm text-white/80 mb-1">Tambahkan lampiran proyek (maks. 5 file)</p>
              <p className="text-xs text-white/60">Format: JPG, PDF, DWG, Autocad (Maks. 5MB per file)</p>
            </div>
            
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,.dwg,.dxf,image/jpeg,image/png,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="project-images"
            />
            
            <label
              htmlFor="project-images"
              className="inline-flex items-center px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Pilih File
            </label>
          </div>
          
          {previews.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-white/80 mb-2">Preview ({previews.length} file)</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      {preview.kind === 'image' && preview.src ? (
                        <img
                          src={preview.src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
                          <FileDown className="h-6 w-6 text-white/70" />
                          <p className="mt-1 text-[11px] font-medium text-white/90 line-clamp-2">{preview.name}</p>
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/60">{preview.ext || 'file'}</p>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
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
                ? 'bg-emerald-500/10 text-emerald-200'
                : 'bg-rose-500/10 text-rose-200'
            }`}
          >
            {submitMessage}
          </div>
        )}
        <button 
          type="submit"
          className="rounded-2xl bg-accent px-6 py-3 text-white font-semibold hover:opacity-90 disabled:opacity-70"
          disabled={submitState === 'submitting'}
        >
          {submitState === 'submitting' ? 'Mengirim...' : 'Kirim Permintaan'}
        </button>
      </form>
    </div>
  );
}
