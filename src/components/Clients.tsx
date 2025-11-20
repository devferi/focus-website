export default function Clients() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Clients Who Trust Us</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Discover the brands that trust us and join them.
            </h2>
          </div>
        </div>
        <div className="mt-10">
          {(() => {
            const logos = [
              { name: 'Vercel', src: 'https://penamerahputih.com/wp-content/uploads/2020/06/logo-PJB.jpg' },
              { name: 'Next.js', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ciputra_World_Surabaya_Logo.png/1200px-Ciputra_World_Surabaya_Logo.png' },
              { name: 'Globe', src: 'https://hertzflavors.co.id/wp-content/uploads/2025/05/cropped-hertz.png' },
              { name: 'Window', src: 'https://kaliandrasejati.com/themes/kaliandra/images/logo.png' },
              { name: 'File', src: 'https://theonsenresort.com/wp-content/uploads/2017/10/Logo-Depan-edit1.png' },
              { name: 'Partner A', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Logo_Siantar_Top.svg/1280px-Logo_Siantar_Top.svg.png' },
            ];

            return (
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                {logos.map((logo, idx) => (
                  <li key={idx} className="border border-slate-200 rounded-2xl bg-white p-4 flex items-center justify-center h-20 shadow-sm">
                    {logo.src ? (
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-600">{logo.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            );
          })()}
        </div>
      </div>
    </section>
  );
}