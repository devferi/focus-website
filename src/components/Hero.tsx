'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type FeaturedProject = {
  id: number;
  title: string;
  scope: string;
  description: string;
  image?: string;
  image_url?: string;
  size?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';
const isDev = process.env.NODE_ENV === 'development';

const resolveImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

const formatSize = (size?: string) => {
  if (!size) return '';
  if (/^\d+$/.test(size)) {
    return `${Number(size).toLocaleString('id-ID')} m²`;
  }
  return size;
};

export default function Hero() {
  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadFeaturedProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/featured-projects`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load featured projects');
        const payload = await response.json();
        setFeaturedProjects(Array.isArray(payload?.data) ? payload.data : []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setFeaturedProjects([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadFeaturedProjects();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (featuredProjects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProjects.length]);

  useEffect(() => {
    if (currentSlide >= featuredProjects.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, featuredProjects.length]);

  const nextSlide = () => {
    if (featuredProjects.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    if (featuredProjects.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-brand-dark text-white pt-32 pb-24 hero-mask">
      <div className="absolute inset-0 opacity-80" aria-hidden="true">
        <Image 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
          alt="Gedung modern" 
          fill
          sizes="100vw"
          priority
          className="object-cover mix-blend-soft-light"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#053895]/95 via-[#032257]/85 to-[#021b4f]" aria-hidden="true"></div>
      <div className="mx-auto max-w-6xl px-4 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              CV. Focus Trading Contractor • Est. 2011
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
              Fast and reliable service for your project or a quick fix, we do it all.
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Perusahaan jasa yang bergerak di bidang Design and Build, Acoustic Installation, Finishing & Infrastructure yang fokus pada hasil terbaik untuk setiap kolaborasi.
            </p>
          </div>
          
          {/* Project Slider */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="absolute -top-10 -left-12 hidden md:block bg-white/10 w-32 h-32 rounded-3xl border border-white/20"></div>
              
              <div className="rounded-[32px] bg-white/5 border border-white/10 p-6 shadow-soft overflow-hidden">
                {/* Slider Header */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs tracking-[0.25em] uppercase text-white/60">Project Unggulan</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Previous project"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Next project"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Slider Content */}
                <div className="relative">
                  {isLoading && (
                    <div className="text-white/70 text-sm py-10 text-center">
                      Memuat proyek unggulan...
                    </div>
                  )}
                  {!isLoading && featuredProjects.length === 0 && (
                    <div className="text-white/70 text-sm py-10 text-center">
                      Belum ada proyek unggulan.
                    </div>
                  )}
                  {featuredProjects.map((project, index) => {
                    const imageSrc = resolveImageUrl(project.image_url ?? project.image);
                    return (
                      <div
                        key={project.id}
                        className={`transition-all duration-500 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0'}`}
                        style={{ transform: index === currentSlide ? 'translateX(0)' : index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)' }}
                      >
                        <div className="relative h-56">
                          {imageSrc ? (
                            <Image 
                              src={imageSrc} 
                              alt={project.title}
                              fill
                              sizes="(min-width: 1024px) 480px, 90vw"
                              priority={index === 0}
                              unoptimized={isDev}
                              className="rounded-2xl object-cover"
                            />
                          ) : (
                            <div className="h-56 rounded-2xl bg-white/10 flex items-center justify-center text-white/60 text-xs">
                              Gambar belum tersedia
                            </div>
                          )}
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-white/60">{project.scope}</span>
                          </div>
                          <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                          <p className="text-white/70 text-sm">{project.description}</p>
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            <span>📏 {formatSize(project.size)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Slider Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-accent' : 'bg-white/30'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      disabled={featuredProjects.length === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
