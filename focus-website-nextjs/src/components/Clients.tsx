export default function Clients() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Clients that trust us</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Partner korporasi dan institusi yang pernah kami bantu.
            </h2>
          </div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <article className="client-card">
            <div className="client-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-6 w-6">
                <path d="M10 40h4V12h-4v28zm8 0h4V8h-4v32zm8 0h4V18h-4v22zm8 0h4V24h-4v16z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Corporate HQ</p>
            <p className="text-xs text-slate-500">Fintech & banking offices.</p>
          </article>
          
          <article className="client-card client-card--accent">
            <div className="client-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-6 w-6">
                <path d="M8 36h32v4H8zm2-14h28l-4 14H14zM18 10h12l4 12H14z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Hospitality</p>
            <p className="text-xs text-slate-500">Hotel & resort upgrades.</p>
          </article>
          
          <article className="client-card">
            <div className="client-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-6 w-6">
                <path d="M10 34h28v-4H10zm0-10h28v-4H10zm0-10h28V10H10z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Industrial</p>
            <p className="text-xs text-slate-500">Factories & control rooms.</p>
          </article>
          
          <article className="client-card client-card--accent">
            <div className="client-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" className="h-6 w-6">
                <path d="M8 34h8v8H8zm12 0h8v8h-8zm12 0h8v8h-8zM8 24h12v8H8zm16 0h16v8H24zM8 10h16v12H8zm20 0h12v12H28z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800">Public Sector</p>
            <p className="text-xs text-slate-500">Pemkot & fasilitas publik.</p>
          </article>
        </div>
      </div>
    </section>
  );
}