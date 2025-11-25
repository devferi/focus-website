'use client';

import { useState, useEffect } from 'react';

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: "Design and Build",
      description: "Mengikuti tren desain komersial global sambil mempertahankan keunikan budaya lokal berdasarkan riset dan wawancara mendalam dengan klien.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="20" width="24" height="18" rx="2" fill="rgba(255,255,255,.15)"></rect>
          <path d="M6 26h24M12 20v18M18 20v18M24 20v18" strokeLinecap="round"></path>
          <path d="M30 14l6-4 6 4v14H30V14z" fill="rgba(255,255,255,.2)"></path>
          <path d="M32 16h8M32 20h8M32 24h8" strokeLinecap="round"></path>
        </svg>
      ),
      color: "#043796",
      featured: true
    },
    {
      id: 2,
      title: "Acoustic Installation",
      description: "Instalasi peredam untuk ruang meeting, soundroom, hingga private room demi kenyamanan dan fokus pengguna.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 18v12" strokeLinecap="round"></path>
          <path d="M18 14v20" strokeLinecap="round"></path>
          <path d="M24 10v28" strokeLinecap="round"></path>
          <path d="M30 14v20" strokeLinecap="round"></path>
          <path d="M36 18v12" strokeLinecap="round"></path>
          <path d="M9 24h30" strokeLinecap="round"></path>
          <circle cx="24" cy="24" r="4" fill="rgba(255,255,255,.3)"></circle>
        </svg>
      ),
      color: "#ffbd00",
    },
    {
      id: 3,
      title: "Finishing Contractor",
      description: "Pelayanan menyeluruh dengan motto 'Totally Work' agar bangunan impian terwujud sesuai mutu finishing yang disepakati.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 30h28v8a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2v-8z" fill="rgba(255,255,255,.18)"></path>
          <path d="M14 26h20v4H14z" fill="rgba(255,255,255,.25)"></path>
          <path d="M18 22h12v4H18z" fill="rgba(255,255,255,.35)"></path>
          <path d="M17 18c0-3.866 3.582-7 8-7s8 3.134 8 7v4H17v-4z" fill="rgba(255,255,255,.2)"></path>
          <path d="M12 38h24M24 11v27" strokeLinecap="round"></path>
        </svg>
      ),
      color: "#043796",
    },
    {
      id: 4,
      title: "Infrastructure Project",
      description: "Penyedia jasa pekerjaan infrastruktur dari awal hingga akhir, dipercaya pada proyek hotel, pemerintahan, dan fasilitas komersial.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 36h36v4H6z" fill="rgba(255,255,255,.2)"></path>
          <path d="M14 20h8v16h-8zM26 16h8v20h-8z" fill="rgba(255,255,255,.25)"></path>
          <path d="M6 20h8m14-4h8M6 24h8m14-4h8" strokeLinecap="round"></path>
          <path d="M10 14l14-8 14 8" strokeLinecap="round"></path>
          <path d="M24 6v4" strokeLinecap="round"></path>
        </svg>
      ),
      color: "#ffbd00",
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className={`flex flex-wrap items-end justify-between gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Layanan</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
              Rangkaian layanan menyeluruh dari konseptual hingga maintenance.
            </h2>
          </div>
          <a href="https://focustradingcontractor.com/wp-content/uploads/2020/06/Company-Profile-Cv.-Focus-Trading-Contractor-2020.pdf" className="text-sm font-semibold text-brand hover:text-accent transition-colors">
            Unduh Company Profile →
          </a>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* Card 1 - Design and Build */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article 
              className={`group relative rounded-2xl p-6 h-full text-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl service-card-hover`}
              style={{ backgroundColor: services[0].color }}
              onMouseEnter={() => setExpandedCard(1)}
              onMouseLeave={() => setExpandedCard(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect">
                <div className="absolute inset-0 bg-white/10 transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              </div>

              {/* Icon */}
              <div className={`relative mb-4 transform transition-all duration-500 ${expandedCard === 1 ? 'scale-125 rotate-12' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                  <div className="w-6 h-6 text-white">
                    {services[0].icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {services[0].title}
                </h3>
                <p className={`text-white/90 leading-relaxed transition-all duration-500 ${expandedCard === 1 ? 'text-sm' : 'text-xs group-hover:text-sm'}`}>
                  {services[0].description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/5 rounded-full transform transition-transform duration-700 group-hover:scale-125 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            </article>
          </div>

          {/* Card 2 - Finishing Contractor */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article 
              className={`group relative rounded-2xl p-6 h-full text-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl service-card-hover`}
              style={{ backgroundColor: services[1].color }}
              onMouseEnter={() => setExpandedCard(2)}
              onMouseLeave={() => setExpandedCard(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect">
                <div className="absolute inset-0 bg-white/10 transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              </div>

              {/* Icon */}
              <div className={`relative mb-4 transform transition-all duration-500 ${expandedCard === 2 ? 'scale-125 rotate-12' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                  <div className="w-6 h-6 text-white">
                    {services[1].icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {services[1].title}
                </h3>
                <p className={`text-white/90 leading-relaxed transition-all duration-500 ${expandedCard === 2 ? 'text-sm' : 'text-xs group-hover:text-sm'}`}>
                  {services[1].description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/5 rounded-full transform transition-transform duration-700 group-hover:scale-125 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            </article>
          </div>

          {/* Card 3 - Infrastructure Project */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article 
              className={`group relative rounded-2xl p-6 h-full text-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl service-card-hover`}
              style={{ backgroundColor: services[2].color }}
              onMouseEnter={() => setExpandedCard(3)}
              onMouseLeave={() => setExpandedCard(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect">
                <div className="absolute inset-0 bg-white/10 transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              </div>

              {/* Icon */}
              <div className={`relative mb-4 transform transition-all duration-500 ${expandedCard === 3 ? 'scale-125 rotate-12' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                  <div className="w-6 h-6 text-white">
                    {services[2].icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {services[2].title}
                </h3>
                <p className={`text-white/90 leading-relaxed transition-all duration-500 ${expandedCard === 3 ? 'text-sm' : 'text-xs group-hover:text-sm'}`}>
                  {services[2].description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/5 rounded-full transform transition-transform duration-700 group-hover:scale-125 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            </article>
          </div>

          {/* Card 4 - Acoustic Project */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <article 
              className={`group relative rounded-2xl p-6 h-full text-white overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl service-card-hover`}
              style={{ backgroundColor: services[3].color }}
              onMouseEnter={() => setExpandedCard(4)}
              onMouseLeave={() => setExpandedCard(null)}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shine-effect">
                <div className="absolute inset-0 bg-white/10 transform rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              </div>

              {/* Icon */}
              <div className={`relative mb-4 transform transition-all duration-500 ${expandedCard === 4 ? 'scale-125 rotate-12' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
                  <div className="w-6 h-6 text-white">
                    {services[3].icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {services[3].title}
                </h3>
                <p className={`text-white/90 leading-relaxed transition-all duration-500 ${expandedCard === 4 ? 'text-sm' : 'text-xs group-hover:text-sm'}`}>
                  {services[3].description}
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/5 rounded-full transform transition-transform duration-700 group-hover:scale-125 group-hover:-translate-x-1 group-hover:-translate-y-1"></div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}