'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type FeaturedWorkApiItem = {
  id: number;
  sector_slug: string;
  sector_label: string;
  title: string;
  description: string;
  cta_label?: string;
  cta_url?: string;
  image?: string;
  image_url?: string;
  sort_order?: number;
  is_active?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

const resolveImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

export default function Projects() {
  const [featuredItems, setFeaturedItems] = useState<FeaturedWorkApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadFeaturedWork = async () => {
      try {
        setHasLoadError(false);
        const response = await fetch(`${API_BASE}/api/featured-work`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load featured work');
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setFeaturedItems(
          items
            .filter((item: FeaturedWorkApiItem) => item.is_active !== false)
            .sort((a: FeaturedWorkApiItem, b: FeaturedWorkApiItem) => {
              const sortA = a.sort_order ?? Number.MAX_SAFE_INTEGER;
              const sortB = b.sort_order ?? Number.MAX_SAFE_INTEGER;
              if (sortA !== sortB) return sortA - sortB;
              return a.id - b.id;
            })
        );
      } catch {
        if (!controller.signal.aborted) {
          setHasLoadError(true);
          setFeaturedItems([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadFeaturedWork();

    return () => controller.abort();
  }, []);

  const featuredCards = useMemo(
    () =>
      featuredItems.map((item) => ({
        id: item.id,
        sectorSlug: item.sector_slug,
        sectorLabel: item.sector_label,
        title: item.title,
        description: item.description,
        ctaLabel: item.cta_label || 'Lihat detail proyek',
        ctaUrl: item.cta_url || `/portfolio?sector=${item.sector_slug}`,
        imageSrc: resolveImageUrl(item.image_url ?? item.image),
      })),
    [featuredItems]
  );

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
              Memuat gambar proyek...
            </div>
          )}
          {hasLoadError && !isLoading && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Data featured work belum tersedia.
            </div>
          )}
          {!isLoading && !hasLoadError && featuredCards.length === 0 && (
            <div className="col-span-full text-sm text-white/70 text-center py-10">
              Belum ada featured work aktif.
            </div>
          )}
          {featuredCards.map((item) => (
            <article
              key={item.id}
              className="project-card group rounded-[28px] border border-white/15 bg-white/5 backdrop-blur px-6 pt-6 pb-5"
            >
              <div className="overflow-hidden rounded-2xl">
                {item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-64 w-full bg-white/10 flex items-center justify-center text-xs text-white/60">
                    Gambar belum tersedia
                  </div>
                )}
              </div>
              <div className="project-meta mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <span>{item.sectorLabel}</span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
              <p className="project-desc mt-2 text-sm text-white/70">{item.description}</p>
              <Link
                href={item.ctaUrl}
                className="mt-4 inline-flex items-center text-sm font-semibold text-accent hover:text-accent/90"
              >
                {item.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
