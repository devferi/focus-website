import { newsPosts } from '@/data/news';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  const slugVariants = new Set<string>([
    normalizedSlug,
    normalizedSlug.replace(/-di-/g, '-'),
  ]);
  const post = newsPosts.find((p) => {
    const s = p.slug.trim().toLowerCase();
    if (slugVariants.has(s)) return true;
    // Fallback lenient match
    return s.includes(normalizedSlug) || normalizedSlug.includes(s);
  });

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

  // Get related articles (excluding current post)
  const relatedArticles = newsPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-white pt-24 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"></div>
        <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-16 lg:pt-6 lg:pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-6 mt-0 lg:mt-0">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#news" className="hover:text-brand transition-colors">News</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{post.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-brand text-white text-sm font-medium rounded-full">
                    {post.category || 'Artikel'}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  {post.title}
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User className="w-4 h-4" />
                  <span>{post.author || 'Tim Focus Trading'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('id-ID', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </time>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Share Section */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Bagikan Artikel
                </h3>
                <ShareButton url={`https://focustradingcontractor.com/news/${post.slug}`} title={post.title} />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-brand hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="mb-12">
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-96 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Article Body */}
            <article className="prose prose-lg prose-slate max-w-none">
              <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-line">
                {post.content}
              </div>
            </article>

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Artikel ini bermanfaat? Bagikan kepada rekan Anda.
                </p>
                <ShareButton url={`https://focustradingcontractor.com/news/${post.slug}`} title={post.title} />
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Informasi Cepat</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Kategori:</span>
                    <span className="font-medium text-slate-900">{post.category || 'Artikel'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Penulis:</span>
                    <span className="font-medium text-slate-900">{post.author || 'Tim Focus Trading'}</span>
                  </div>
                  {post.readTime && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Waktu Baca:</span>
                      <span className="font-medium text-slate-900">{post.readTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-brand to-blue-700 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Butuh Konsultasi?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Tim ahli kami siap membantu mewujudkan proyek Anda.
                </p>
                <Link 
                  href="/#contact" 
                  className="inline-flex items-center px-4 py-2 bg-white text-brand font-medium rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-white border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Artikel Terkait</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <article key={article.slug} className="group">
                  <Link href={`/news/${article.slug}`} className="block">
                    <div className="overflow-hidden rounded-xl mb-4">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand transition-colors mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </time>
                    </div>
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