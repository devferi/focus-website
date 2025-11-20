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
            <p className="mt-2 text-white text-lg font-semibold">Design & Build • Fit-Out • Acoustic</p>
          </div>
          <div className="flex gap-4 text-sm">
            <a href="#services" className="hover:text-white">Layanan</a>
            <a href="#projects" className="hover:text-white">Portofolio</a>
            <a href="#contact" className="hover:text-white">Kontak</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm">
          <p>© {year} Focus Trading Contractor. Seluruh hak cipta.</p>
          <p>Kualitas & Ketepatan Waktu • Solusi Konstruksi Terintegrasi</p>
        </div>
      </div>
    </footer>
  );
}