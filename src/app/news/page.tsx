'use client';

import Link from 'next/link';
import { useMemo, useEffect, useState } from 'react';
import { Calendar, Share2, Tag, User } from 'lucide-react';

import ShareButton from '@/components/ShareButton';

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover_image?: string;
  cover_image_url?: string;
  category?: string;
  author?: string;
  tags?: string[];
  status?: string;
  published_at?: string;
  created_at?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

const resolveImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

export default function NewsDetailPage() {
  const [slug, setSlug] = useState('');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsDetail, setNewsDetail] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSlug((params.get('slug') ?? '').trim());
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadNews = async () => {
      setIsLoading(true);
      try {
        const listResponse = await fetch(`${API_BASE}/api/news`, { signal: controller.signal });
        const listPayload = listResponse.ok ? await listResponse.json() : null;
        const listItems = Array.isArray(listPayload?.data) ? listPayload.data : [];
        const publishedItems = listItems.filter((item: NewsItem) => item.status !== 'draft');
        setNewsList(publishedItems);

        if (slug) {
          const detailResponse = await fetch(`${API_BASE}/api/news/${encodeURIComponent(slug)}`, {
            signal: controller.signal,
          });
          if (detailResponse.ok) {
            const detailPayload = await detailResponse.json();
            setNewsDetail(detailPayload?.data ?? detailPayload);
          } else {
            setNewsDetail(null);
          }
        } else {
          setNewsDetail(null);
        }
      } catch {
        if (!controller.signal.aborted) {
          setNewsList([]);
          setNewsDetail(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadNews();
    return () => controller.abort();
  }, [slug]);

  const post = useMemo(() => {
    if (newsDetail) return newsDetail;
    if (!slug) return null;
    return newsList.find((item) => item.slug?.toLowerCase() === slug.toLowerCase()) ?? null;
  }, [newsDetail, newsList, slug]);

  const publishedAt = post?.published_at ?? post?.created_at ?? '';
  const heroImage = resolveImageUrl(post?.cover_image_url ?? post?.cover_image);
  const relatedArticles = newsList.filter((item) => item.slug !== post?.slug).slice(0, 3);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-28 text-slate-600">Memuat artikel...</div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <h1 className="text-2xl font-bold">Artikel tidak ditemukan</h1>
          <p className="mt-2 text-slate-600">Periksa kembali tautan atau pilih artikel lain.</p>
          <Link href="/#news" className="mt-6 inline-block text-brand font-semibold">← Kembali ke News</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative bg-white pt-24 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-16 lg:pt-6 lg:pb-16">
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#news" className="hover:text-brand transition-colors">News</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <span className="px-3 py-1 bg-brand text-white text-sm font-medium rounded-full">
                  {post.category || 'Artikel'}
                </span>
                <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  {post.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>{post.author || 'Tim Focus Trading'}</span>
                </div>
                {publishedAt && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={publishedAt}>
                      {new Date(publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Bagikan Artikel
                </h3>
                <ShareButton url={`https://focustradingcontractor.com/news?slug=${post.slug}`} title={post.title} />
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl shadow-xl mb-12">
          {heroImage ? (
            <img src={heroImage} alt={post.title} className="w-full h-96 object-cover" />
          ) : (
            <div className="w-full h-96 bg-slate-200 flex items-center justify-center text-sm text-slate-500">
              Gambar belum tersedia
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <article className="prose prose-lg prose-slate max-w-none">
          {post.content ? (
            <div className="text-lg leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-line">{post.excerpt}</div>
          )}
        </article>
      </div>

      {relatedArticles.length > 0 && (
        <div className="bg-white border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Artikel Terkait</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <article key={article.slug} className="group">
                  <Link href={`/news?slug=${encodeURIComponent(article.slug)}`} className="block">
                    <div className="overflow-hidden rounded-xl mb-4">
                      {resolveImageUrl(article.cover_image_url ?? article.cover_image) ? (
                        <img
                          src={resolveImageUrl(article.cover_image_url ?? article.cover_image)}
                          alt={article.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                          Gambar belum tersedia
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
