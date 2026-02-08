'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  sort_order?: number;
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">Featured Work</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Our Signature Projects That Define Excellence
            </h2>
            <p className="mt-2 text-white/70 max-w-2xl">
              Highlights from our recent projects across design, finishing, infrastructure, and acoustic work.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex h-10 items-center rounded-full border border-white/30 px-5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 hover:border-white/50 transition-colors"
          >
            Lihat Semua Portfolio
          </Link>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {isLoading && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Memuat proyek...
            </div>
          )}
          {!isLoading && featuredProjects.length === 0 && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Belum ada proyek unggulan.
            </div>
          )}
          {!isLoading && featuredProjects.map((project) => {
            const primaryImage = getPrimaryImage(project.images);

            return (
              <article
                key={project.id}
                className="project-card group rounded-[28px] border border-white/15 bg-white/5 backdrop-blur px-6 pt-6 pb-5"
              >
                <div className="overflow-hidden rounded-2xl">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={project.title}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-64 w-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                      Gambar belum tersedia
                    </div>
                  )}
                </div>
                <div className="project-meta mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                  <span>{project.sector}</span>
                </div>
                <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                <p className="project-desc mt-2 text-sm text-white/70 line-clamp-3">{project.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
