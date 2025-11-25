export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Our Profile</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">CV. Focus Trading Contractor</h2>
            <p className="mt-4 text-slate-600">
              CV. Focus Trading Contractor adalah perusahaan jasa yang bergerak di bidang Design and Build, Acoustic Installation, Finishing & Infrastructure yang didirikan pada tahun 2011. Dalam menjalin komitmen dengan klien, kami selalu menempatkan mutu hasil sebagai prinsip dasar.
            </p>
            <p className="mt-4 text-slate-600">
              Perusahaan kami memulai langkah sebagai subcontractor interior, kemudian pada 2015 berkembang ke bidang design & build serta pekerjaan infrastruktur untuk memenuhi kebutuhan konsumen yang menuntut mutu dan kecepatan pelaksanaan.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">Sejak</p>
                <p className="mt-2 text-lg font-semibold">2011 • Finishing Contractor & Acoustic Installation</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">Pengembangan</p>
                <p className="mt-2 text-lg font-semibold">2015 • Design and Build, Acoustic Installation,  Finishing and Infrastructure</p>
              </div>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">Mission</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand"></span>
                <span>Memberikan pelayanan, mutu, dan kepuasan terbaik untuk setiap mitra.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <span>Membangun serta menciptakan citra terbaik perusahaan.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-brand"></span>
                <span>Selalu berinovasi, kreatif, dan konsisten dalam memberikan pelayanan.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent"></span>
                <span>Menciptakan lapangan kerja serta berkontribusi untuk pembangunan konstruksi nasional.</span>
              </li>
            </ul>
          </div>
          <div className="rounded-[32px] bg-brand-dark text-white p-8 shadow-soft relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{background: 'radial-gradient(circle at 80% 20%,rgba(255,189,0,.5),transparent 60%)'}}></div>
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Vision & Motto</p>
              <div className="mt-6 space-y-6 text-white/80">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">Vision</p>
                  <p className="mt-2 text-base text-white">
                    Menjadi perusahaan jasa yang bergerak di bidang Design and Build, Acoustic Installation, Finishing & Infrastructure yang kompetitif, berkualitas, dan selalu berusaha memberikan pelayanan terbaik.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-white/60">Tagline</p>
                  <p className="mt-2 text-base text-white">From idea, plan to final solution.</p>
                </div>
              </div>
              <div className="mt-10 rounded-2xl border border-white/20 p-5 text-sm text-white/80">
                <p>"Fast and reliable service for your project or a quick fix, we do it all."</p>
                <p className="mt-4 text-white/60">— CV. Focus Trading Contractor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}