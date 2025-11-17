'use client';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Terima kasih, tim kami akan menghubungi Anda.');
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