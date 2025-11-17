export default function Hero() {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-brand-dark text-white pt-32 pb-24 hero-mask">
      <div className="absolute inset-0 opacity-80" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
          alt="Gedung modern" 
          className="h-full w-full object-cover mix-blend-soft-light"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#053895]/95 via-[#032257]/85 to-[#021b4f]" aria-hidden="true"></div>
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              CV. Focus Trading Contractor • Est. 2013
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
              Fast and reliable service for your project or a quick fix, we do it all.
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Perusahaan Design & Build, Finishing Contractor, dan Acoustic Installation yang fokus pada hasil terbaik untuk setiap kolaborasi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 hero-cta">
              <a href="#contact" className="rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft">
                Get a Quote
              </a>
              <a href="#projects" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white hover:border-white">
                Portofolio Proyek
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80 hero-tags">
              <span className="rounded-full border border-white/30 px-4 py-2">Design & Build</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Finishing Premium</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Acoustic Treatment</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Infrastructure Works</span>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-10 -left-12 hidden md:block bg-white/10 w-32 h-32 rounded-3xl border border-white/20"></div>
              <div className="rounded-[32px] bg-white/5 border border-white/10 p-6 shadow-soft">
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop" 
                  className="rounded-3xl w-full h-72 object-cover" 
                  alt="Interior kantor premium"
                />
                <div className="mt-6 rounded-2xl bg-white/10 border border-white/15 p-5 space-y-4">
                  <p className="text-xs tracking-[0.25em] uppercase text-white/60">Cuplikan proyek</p>
                  <div>
                    <p className="text-white font-semibold">Ballroom Ciputra World Surabaya</p>
                    <p className="text-white/70 text-sm">Finishing contractor work yang menonjolkan detail premium, cek di Featured Work kami.</p>
                  </div>
                  <a href="#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent">
                    Lihat Featured Work
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6l6 6-6 6"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-6 hidden md:block rounded-3xl bg-white/10 border border-white/20 px-4 py-3 text-sm">
                <p className="text-white/70">Terdaftar sebagai</p>
                <p className="font-semibold">Kontraktor Konstruksi Menengah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}