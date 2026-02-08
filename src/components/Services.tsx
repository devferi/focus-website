import Link from 'next/link';

import { SECTOR_OPTIONS } from '@/data/sectors';

export default function Services() {
  const serviceDescriptions: Record<string, string> = {
    'design-and-build': 'Perencanaan hingga eksekusi rancang bangun terpadu.',
    'acoustic-project': 'Installasi akustik peredaman suara untuk ruang meeting, ruang karaoke dan komersial.',
    'finishing-contractor': 'Penyelesaian akhir bangunan dengan kualitas presisi.',
    'infrastructure-project': 'Beberapa proyek infrastruktur dan pekerjaan lainnya.',
  };

  return (
    <section
      id="services"
      className="py-16 text-white"
      style={{ background: 'linear-gradient(140deg, #032868 0%, #043178 55%, #02255f 100%)' }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold tracking-[0.3em] text-white/65 uppercase">Layanan</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
          Pilih kategori layanan untuk melihat portofolio proyek.
        </h2>

        <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {SECTOR_OPTIONS.map((sector, index) => (
            <Link
              key={sector.slug}
              href={`/portfolio?sector=${sector.slug}`}
              className="group block focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-2xl"
              aria-label={`Lihat proyek kategori ${sector.label}`}
            >
              <span
                className={`flex min-h-12 w-full items-center gap-2 rounded-full border py-2 pl-5 pr-3 text-sm font-semibold leading-tight shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg md:text-[15px] ${
                  index % 2 === 0
                    ? 'bg-[#0b3f9e] border-[#3f66bb] text-white'
                    : 'bg-[#ffbd00] border-[#f0cb52] text-[#0a2458]'
                }`}
              >
                <span className="block min-w-0 flex-1 whitespace-normal text-left">{sector.label}</span>
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm ${
                    index % 2 === 0 ? 'bg-white/15 text-white' : 'bg-white/35 text-[#0a2458]'
                  }`}
                  aria-hidden
                >
                  →
                </span>
              </span>
              <p
                className={`mt-2 text-xs leading-relaxed ${
                index % 2 === 0
                  ? 'text-white/80'
                  : 'text-white/85'
              }`}
              >
                {serviceDescriptions[sector.slug] ?? 'Lihat project berdasarkan kategori layanan ini.'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
