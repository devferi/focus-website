'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image?: string;
  cover_image_url?: string;
  category?: string;
  author?: string;
  tags?: string[];
  status?: string;
  published_at?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

const resolveImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

export default function News() {
  const [newsPosts, setNewsPosts] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadNews = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/news`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load news');
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        const published = items.filter((item: NewsItem) => item.status !== 'draft');
        setNewsPosts(published);
      } catch (error) {
        if (!controller.signal.aborted) {
          setNewsPosts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();

    return () => controller.abort();
  }, []);

  return (
    <section id="news" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Updates & News</h2>
            <p className="mt-3 text-slate-600">Latest articles and insights from our team.</p>
          </div>
          {/* Removed list page link as requested */}
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {isLoading && (
            <div className="col-span-full text-center text-sm text-slate-500 py-8">
              Memuat berita...
            </div>
          )}
          {!isLoading && newsPosts.length === 0 && (
            <div className="col-span-full text-center text-sm text-slate-500 py-8">
              Belum ada berita terbaru.
            </div>
          )}
          {!isLoading && newsPosts.map((post) => {
            const imageSrc = resolveImageUrl(post.cover_image_url ?? post.cover_image);
            return (
              <article key={post.slug || post.id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col news-card">
                {imageSrc ? (
                  <img className="h-40 w-full object-cover" src={imageSrc} alt={post.title} />
                ) : (
                  <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                    Gambar belum tersedia
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">{post.category || 'Artikel'}</div>
                  <h3 className="mt-1 font-bold">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 flex-1 line-clamp-3">{post.excerpt}</p>
                  <Link href={`/news?slug=${encodeURIComponent(post.slug)}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
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
