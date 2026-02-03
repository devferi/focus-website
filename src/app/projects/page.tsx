'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type ProjectImage = {
  id: number;
  image?: string;
  image_url?: string;
  sort_order?: number;
};

type Project = {
  id: number;
  title: string;
  sector: string;
  location: string;
  status: string;
  description: string;
  badge: string;
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

const sortImages = (images?: ProjectImage[]) => {
  if (!images || images.length === 0) return [];
  return [...images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
};

export default function ProjectDetailPage() {
  const [projectId, setProjectId] = useState<number>(NaN);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setProjectId(Number.parseInt(params.get('id') ?? '', 10));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/projects`, { signal: controller.signal });
        const payload = response.ok ? await response.json() : null;
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setProjects(items.filter((item: Project) => item.is_active !== false));
      } catch {
        if (!controller.signal.aborted) setProjects([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadProjects();
    return () => controller.abort();
  }, []);

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId]
  );

  const projectImages = sortImages(project?.images);
  const primaryImage = projectImages[0]
    ? resolveImageUrl(projectImages[0].image_url ?? projectImages[0].image)
    : '';
  const galleryImages = projectImages
    .slice(1)
    .map((item) => resolveImageUrl(item.image_url ?? item.image))
    .filter(Boolean);
  const relatedProjects = projects.filter((item) => item.id !== project?.id).slice(0, 3);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-28 text-slate-600">Memuat proyek...</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-2xl font-bold">Proyek tidak ditemukan</h1>
          <p className="mt-2 text-slate-600">Periksa kembali tautan atau pilih proyek lain.</p>
          <Link href="/#projects" className="mt-6 inline-block text-brand font-semibold">
            ← Kembali ke Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative bg-white pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-4">
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#projects" className="hover:text-brand transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>{project.sector}</span>
                <span>•</span>
                <span>{project.location}</span>
                <span>•</span>
                <span>{project.status}</span>
              </div>
              <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {project.title}
              </h1>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              {primaryImage ? (
                <>
                  <img src={primaryImage} alt={project.title} className="w-full h-96 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"></div>
                </>
              ) : (
                <div className="w-full h-96 bg-slate-200 flex items-center justify-center text-sm text-slate-500">
                  Gambar belum tersedia
                </div>
              )}
            </div>

            <div className="space-y-6 text-slate-700">
              <p className="text-lg leading-relaxed">{project.description}</p>
              <p className="text-sm text-slate-500">
                Ingin tahu lebih banyak tentang detail pengerjaan atau jadwal proyek ini? Hubungi tim kami untuk informasi lengkap.
              </p>
            </div>

            {galleryImages.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Galeri Proyek
                </h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={`${project.id}-${index}`} className="overflow-hidden rounded-xl">
                      <img src={image} alt={`${project.title} gallery ${index + 1}`} className="h-48 w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Proposal</p>
              <div className="mt-3 flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Butuh Proposal Proyek?</h3>
                  <p className="text-sm text-slate-600">
                    Tim kami siap membantu mulai dari konsultasi hingga eksekusi.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className="bg-white border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Proyek Lainnya</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((item) => {
                const relatedImage = sortImages(item.images)[0];
                const relatedImageUrl = relatedImage
                  ? resolveImageUrl(relatedImage.image_url ?? relatedImage.image)
                  : '';

                return (
                  <article key={item.id} className="group">
                    <Link href={`/projects?id=${item.id}`} className="block">
                      <div className="overflow-hidden rounded-xl mb-4">
                        {relatedImageUrl ? (
                          <img
                            src={relatedImageUrl}
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                            Gambar belum tersedia
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-brand transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                      <div className="mt-3 text-xs text-slate-500 uppercase tracking-[0.2em]">
                        {item.location}
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
