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
  const [sectorFilter, setSectorFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

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
      } catch (error) {
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

  const sectorOptions = useMemo(() => {
    return Array.from(new Set(projects.map((item) => item.sector).filter(Boolean))).sort();
  }, [projects]);

  const locationOptions = useMemo(() => {
    return Array.from(new Set(projects.map((item) => item.location).filter(Boolean))).sort();
  }, [projects]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(projects.map((item) => item.status).filter(Boolean))).sort();
  }, [projects]);

  const filteredProjects = projects.filter(project => {
    return (!sectorFilter || project.sector === sectorFilter) &&
           (!locationFilter || project.location === locationFilter) &&
           (!statusFilter || project.status === statusFilter);
  });

  return (
    <section id="projects" className="py-20 bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">Featured Work</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Our Signature Projects That Define Excellence
            </h2>
            <p className="mt-2 text-white/70 max-w-2xl">
              A curated collection of our finest work spanning Design & Build, Finishing, Infrastructure, and Acoustic—showcasing the precision, creativity, and dedication that define our craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs filter-grid w-full">
            <select 
              value={sectorFilter} 
              onChange={(e) => setSectorFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Jenis pekerjaan</option>
              {sectorOptions.map((sector) => (
                <option key={sector}>{sector}</option>
              ))}
            </select>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Lokasi</option>
              {locationOptions.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Label</option>
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {isLoading && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Memuat proyek...
            </div>
          )}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Belum ada proyek yang sesuai.
            </div>
          )}
          {!isLoading && filteredProjects.map((project) => {
            const primaryImage = getPrimaryImage(project.images);

            return (
              <article 
                key={project.id} 
                className="project-card group rounded-[28px] border border-white/15 bg-white/5 backdrop-blur px-6 pt-6 pb-5 focus:outline-none focus:ring-2 focus:ring-accent"
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
                  <span>{project.sector} • {project.location}</span>
                  <span>{project.status}</span>
                </div>
                <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
                <p className="project-desc mt-2 text-sm text-white/70 line-clamp-3">{project.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="badge-status rounded-full bg-emerald-400/20 text-emerald-200 px-3 py-1">
                    {project.badge}
                  </span>
                  <Link
                    href={`/projects/${project.id}`}
                    className="badge-kpi rounded-full bg-white/10 px-3 py-1 hover:bg-white/20 transition-colors"
                    aria-label={`Lihat detail ${project.title}`}
                  >
                    Lihat detail
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
