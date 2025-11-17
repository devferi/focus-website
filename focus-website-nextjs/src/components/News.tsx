export default function News() {
  return (
    <section id="news" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Update & Berita</h2>
            <p className="mt-3 text-slate-600">Artikel terbaru dari focustradingcontractor.com.</p>
          </div>
          <a 
            href="https://focustradingcontractor.com/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm font-semibold hover:text-brand"
          >
            Lihat semua →
          </a>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col news-card">
            <img 
              className="h-40 w-full object-cover" 
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80" 
              alt="Jasa Pasang Paving Gresik"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">Artikel</div>
              <h3 className="mt-1 font-bold">Jasa Pasang Paving Gresik</h3>
              <p className="mt-2 text-sm text-slate-600 flex-1">
                Paving adalah teknik menata permukaan dengan batu atau beton untuk menghasilkan area yang rata, kokoh, dan tahan lama di jalan, trotoar, hingga area parkir.
              </p>
              <a 
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent" 
                href="https://focustradingcontractor.com/jasa-pasang-paving-di-gresik/" 
                target="_blank" 
                rel="noreferrer"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6 6 6-6 6"/>
                </svg>
              </a>
            </div>
          </article>
          
          <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col news-card">
            <img 
              className="h-40 w-full object-cover" 
              src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80" 
              alt="Tukang plafon Sidoarjo"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">Artikel</div>
              <h3 className="mt-1 font-bold">Tukang Plafon Sidoarjo</h3>
              <p className="mt-2 text-sm text-slate-600 flex-1">
                Mengenal profesional yang ahli memasang dan merawat plafon berbagai material untuk hunian maupun bangunan komersial.
              </p>
              <a 
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent" 
                href="https://focustradingcontractor.com/tukang-plafon-sidoarjo/" 
                target="_blank" 
                rel="noreferrer"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6 6 6-6 6"/>
                </svg>
              </a>
            </div>
          </article>
          
          <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col news-card">
            <img 
              className="h-40 w-full object-cover" 
              src="https://images.unsplash.com/photo-1518933165971-611dbc9c412d?auto=format&fit=crop&w=1600&q=80" 
              alt="Jasa pasang peredam suara Malang"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">Artikel</div>
              <h3 className="mt-1 font-bold">Jasa Pasang Peredam Suara Malang</h3>
              <p className="mt-2 text-sm text-slate-600 flex-1">
                Peredam suara membantu mengontrol akustik ruangan, mengurangi kebisingan, dan diaplikasikan pada sektor komersial hingga residensial.
              </p>
              <a 
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent" 
                href="https://focustradingcontractor.com/jasa-pasang-peredam-suara-di-malang/" 
                target="_blank" 
                rel="noreferrer"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6 6 6-6 6"/>
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}