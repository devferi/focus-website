'use client';

import { useState, useEffect } from 'react';

const featuredProjects = [
  {
    id: 1,
    title: "Kaliandra Resort — Pandaan",
    scope: "Design and Build",
    description: "Pekerjaan infrastruktur menyeluruh untuk kawasan resort",
    image: "https://cdn.rri.co.id/berita/Malang/o/1714714653918-WhatsApp_Image_2024-05-03_at_12.04.33/poe9mvbz2386oy7.jpeg",
    size: "> 15.000 m²"
  },
  {
    id: 2,
    title: "Konstruksi Baja",
    scope: "Design and Build",
    description: "Pekerjaan struktur baja untuk fasilitas industri",
    image: "https://mandorpro.id/wp-content/uploads/2024/07/harga-borongan-baja-1.webp",
    size: "± 5.000 m²"
  },
  {
    id: 3,
    title: "Proyek PEMKOT Surabaya",
    scope: "Infrastructure",
    description: "Paket pekerjaan infrastruktur untuk Pemerintah Kota Surabaya",
    image: "https://asiacon.co.id/wp-content/uploads/2024/12/Efisiensi-Biaya-dengan-Menggunakan-U-Ditch-Beton-dalam-Proyek-Konstruksi-1_11zon-1.jpg",
    size: "± 12.000 m²"
  },
  {
    id: 4,
    title: "Icon Mall Gresik",
    scope: "Finishing",
    description: "Pekerjaan finishing area komersial pusat perbelanjaan",
    image: "https://www.rumah123.com/seo-cms/assets/large_Perpaduan_Konsep_Natural_dan_Futuristik_285437ee5c/large_Perpaduan_Konsep_Natural_dan_Futuristik_285437ee5c.png",
    size: "± 8.000 m²"
  },
  {
    id: 5,
    title: "PT. Hertz Flavors Makmur Indonesia",
    scope: "Design & Build • Acoustic Installation • Finishing",
    description: "Pekerjaan rancang bangun fasilitas kantor",
    image: "https://tobaccoreporter.com/wp-content/uploads/2023/11/OUTSIDE-FACTORY.jpg",
    size: "± 6.000 m²"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-brand-dark text-white pt-32 pb-24 hero-mask">
      <div className="absolute inset-0 opacity-80" aria-hidden="true">
        <img 
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
          alt="Gedung modern" 
          className="h-full w-full object-cover mix-blend-soft-light"
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
            <div className="mt-8 flex flex-wrap items-center gap-4 hero-cta">
              <a href="#contact" className="rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft">
                Get a Quote
              </a>
              <a href="#projects" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 hover:text-white hover:border-white">
                Portofolio Proyek
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80 hero-tags">
              <span className="rounded-full border border-white/30 px-4 py-2">Design & Build</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Finishing Contractor</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Infrastructure Project</span>
              <span className="rounded-full border border-white/30 px-4 py-2">Acoustic Project</span>
            </div>
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
                  {featuredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`transition-all duration-500 ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 absolute inset-0'}`}
                      style={{ transform: index === currentSlide ? 'translateX(0)' : index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)' }}
                    >
                      <img 
                        src={project.image} 
                        className="rounded-2xl w-full h-56 object-cover" 
                        alt={project.title}
                      />
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.2em] text-white/60">{project.scope}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                        <p className="text-white/70 text-sm">{project.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span>📏 {project.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
