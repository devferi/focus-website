'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

import Footer from '@/components/Footer';
import { findSectorLabelBySlug, SECTOR_OPTIONS, slugifySector } from '@/data/sectors';

type ProjectImage = {
  id: number;
  image?: string;
  image_url?: string;
  sort_order?: number;
};

type Project = {
  id: number;
  title: string;
  sector?: string;
  sectors?: {
    id: number;
    name: string;
    slug: string;
  }[];
  is_active?: boolean;
  images?: ProjectImage[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

const resolveImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

const getPrimaryImage = (images?: ProjectImage[]) => {
  if (!images || images.length === 0) return '';
  const sorted = [...images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const primary = sorted[0];
  return resolveImageUrl(primary.image_url ?? primary.image);
};

function PortfolioPageContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const searchParams = useSearchParams();
  const sectorSlug = (searchParams.get('sector') ?? '').trim().toLowerCase();

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load projects');
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setProjects(items.filter((item: Project) => item.is_active !== false));
      } catch {
        if (!controller.signal.aborted) {
          setProjects([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBack(window.scrollY > window.innerHeight);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const matchedSector = findSectorLabelBySlug(sectorSlug);
  const filteredProjects = useMemo(() => {
    if (!sectorSlug) return projects;
    return projects.filter((item) => {
      if (item.sectors?.length) {
        return item.sectors.some((sector) => sector.slug?.toLowerCase() === sectorSlug);
      }
      if (item.sector) {
        return slugifySector(item.sector) === sectorSlug;
      }
      return false;
    });
  }, [projects, sectorSlug]);

  return (
    <>
      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <section className="mx-auto max-w-6xl px-4">
        <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Portofolio</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Portofolio Proyek</h1>
        <p className="mt-2 text-slate-600 max-w-3xl">
          Koleksi dokumentasi proyek berdasarkan kategori layanan.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/portfolio"
            className={`inline-flex h-10 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
              !sectorSlug
                ? 'bg-brand text-white border-brand'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Semua Kategori
          </Link>
          {SECTOR_OPTIONS.map((sector) => (
            <Link
              key={sector.slug}
              href={`/portfolio?sector=${sector.slug}`}
              className={`inline-flex h-10 items-center rounded-full border px-5 text-sm font-medium transition-colors ${
                sector.slug === sectorSlug
                  ? 'bg-brand text-white border-brand'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {sector.label}
            </Link>
          ))}
        </div>

        {matchedSector && (
          <p className="mt-4 text-sm text-slate-500">
            Menampilkan kategori: <span className="font-semibold text-slate-700">{matchedSector}</span>
          </p>
        )}

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full text-sm text-slate-500 text-center py-12">
              Memuat portfolio...
            </div>
          )}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="col-span-full text-sm text-slate-500 text-center py-12">
              Belum ada proyek untuk kategori ini.
            </div>
          )}
          {!isLoading && filteredProjects.map((project) => {
            const imageSrc = getPrimaryImage(project.images);

            return (
              <article key={project.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                      Gambar belum tersedia
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-base font-semibold text-slate-900">{project.title}</h2>
                </div>
              </article>
            );
          })}
        </div>
        </section>
      </main>
      {showBack && (
        <Link
          href="/#services"
          className="fixed bottom-24 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#FFBD00] px-5 py-3 text-slate-900 shadow-soft border border-white/10 hover:bg-[#e0a800] transition"
        >
          <span aria-hidden="true">←</span>
          kembali ke layanan
        </Link>
      )}
      <Footer />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense
      fallback={
        <>
          <main className="min-h-screen bg-slate-50 pt-28 pb-20">
            <section className="mx-auto max-w-6xl px-4">
              <p className="text-sm text-slate-500 py-12 text-center">Memuat Portofolio...</p>
            </section>
          </main>
          <Footer />
        </>
      }
    >
      <PortfolioPageContent />
    </Suspense>
  );
}
