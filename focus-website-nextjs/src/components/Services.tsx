export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Layanan</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
              Rangkaian layanan menyeluruh dari konseptual hingga maintenance.
            </h2>
          </div>
          <a href="#contact" className="text-sm font-semibold text-brand hover:text-accent">
            Unduh Company Profile →
          </a>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="rounded-2xl p-6 service-card service-card--design">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="20" width="24" height="18" rx="2" fill="rgba(255,255,255,.15)"></rect>
                <path d="M6 26h24M12 20v18M18 20v18M24 20v18" strokeLinecap="round"></path>
                <path d="M30 14l6-4 6 4v14H30V14z" fill="rgba(255,255,255,.2)"></path>
                <path d="M32 16h8M32 20h8M32 24h8" strokeLinecap="round"></path>
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Design and Build</h3>
            <p className="mt-2 text-sm text-white/90">
              Mengikuti tren desain komersial global sambil mempertahankan keunikan budaya lokal berdasarkan riset dan wawancara mendalam dengan klien.
            </p>
          </article>
          
          <article className="rounded-2xl p-6 service-card service-card--finishing">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 30h28v8a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-8z" fill="rgba(255,255,255,.18)"></path>
                <path d="M14 26h20v4H14z" fill="rgba(255,255,255,.25)"></path>
                <path d="M18 22h12v4H18z" fill="rgba(255,255,255,.35)"></path>
                <path d="M17 18c0-3.866 3.582-7 8-7s8 3.134 8 7v4H17v-4z" fill="rgba(255,255,255,.2)"></path>
                <path d="M12 38h24M24 11v27" strokeLinecap="round"></path>
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Finishing Contractor</h3>
            <p className="mt-2 text-sm text-white/90">
              Pelayanan menyeluruh dengan motto "Totally Work" agar bangunan impian terwujud sesuai mutu finishing yang disepakati.
            </p>
          </article>
          
          <article className="rounded-2xl p-6 service-card service-card--infra">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 36h36v4H6z" fill="rgba(255,255,255,.2)"></path>
                <path d="M14 20h8v16h-8zM26 16h8v20h-8z" fill="rgba(255,255,255,.25)"></path>
                <path d="M6 20h8m14-4h8M6 24h8m14-4h8" strokeLinecap="round"></path>
                <path d="M10 14l14-8 14 8" strokeLinecap="round"></path>
                <path d="M24 6v4" strokeLinecap="round"></path>
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Infrastructure Project</h3>
            <p className="mt-2 text-sm text-white/90">
              Penyedia jasa pekerjaan infrastruktur dari awal hingga akhir, dipercaya pada proyek hotel, pemerintahan, dan fasilitas komersial.
            </p>
          </article>
          
          <article className="rounded-2xl p-6 service-card service-card--acoustic">
            <div className="service-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 18v12" strokeLinecap="round"></path>
                <path d="M18 14v20" strokeLinecap="round"></path>
                <path d="M24 10v28" strokeLinecap="round"></path>
                <path d="M30 14v20" strokeLinecap="round"></path>
                <path d="M36 18v12" strokeLinecap="round"></path>
                <path d="M9 24h30" strokeLinecap="round"></path>
                <circle cx="24" cy="24" r="4" fill="rgba(255,255,255,.3)"></circle>
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold">Acoustic Project</h3>
            <p className="mt-2 text-sm text-white/90">
              Instalasi peredam untuk ruang meeting, soundroom, hingga private room demi kenyamanan dan fokus pengguna.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}