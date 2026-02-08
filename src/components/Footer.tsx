'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState(0);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-brand-dark text-white/70">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 py-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Focus Trading Contractor</p>
            <p className="mt-2 text-white text-lg font-semibold">Design & Build • Acoustic Project • Finishing Contractor • Infrastructure</p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/#services" className="hover:text-white">Layanan</Link>
            <Link href="/portfolio" className="hover:text-white">Portofolio</Link>
            <Link href="/#contact" className="hover:text-white">Kontak</Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
          <div className="flex flex-col gap-1">
            <p>© {year} Seluruh hak cipta. CV. Focus Trading Contractor. </p>
            <p>
              Designed by{' '}
              <a
                href="http://morrusdigitalconnecting.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Morrus Digital Connecting
              </a>
            </p>
          </div>
          <p>Kualitas & Ketepatan Waktu • Solusi Konstruksi Terintegrasi</p>
        </div>
      </div>
    </footer>
  );
}
