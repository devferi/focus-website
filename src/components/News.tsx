import Link from 'next/link';
import { newsPosts } from '@/data/news';

export default function News() {
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
          {newsPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col news-card">
              <img className="h-40 w-full object-cover" src={post.image} alt={post.title} />
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">{post.category || 'Artikel'}</div>
                <h3 className="mt-1 font-bold">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-600 flex-1">{post.excerpt}</p>
                <Link href={`/news/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent">
                  Read more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}