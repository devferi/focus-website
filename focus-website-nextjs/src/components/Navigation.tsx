'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-2xl glass text-white border border-white/20 px-5 py-3">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3"
          >
            <img 
              src="https://focustradingcontractor.com/wp-content/uploads/2023/12/LogoBiru-removebg.png" 
              alt="Focus Trading Contractor" 
              className="h-10 w-auto object-contain"
            />
          </button>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button 
              onClick={() => scrollToSection('about')} 
              className="hover:text-accent transition"
            >
              About us
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="hover:text-accent transition"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('news')} 
              className="hover:text-accent transition"
            >
              Update & News
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-accent transition"
            >
              Contact us
            </button>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+62318765432" className="text-xs text-white/70">+62 318 765 432</a>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90"
            >
              Get A Quote
            </button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden rounded-xl border border-white/30 p-2 text-white" 
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16"/>
            </svg>
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl glass border border-white/20 px-5 py-4 text-white text-sm">
            <nav className="grid gap-3">
              <button onClick={() => scrollToSection('about')}>About us</button>
              <button onClick={() => scrollToSection('projects')}>Projects</button>
              <button onClick={() => scrollToSection('news')}>Update & News</button>
              <button onClick={() => scrollToSection('contact')}>Contact us</button>
            </nav>
            <a href="tel:+62318765432" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-white">
              Hubungi Kami
            </a>
          </div>
        )}
      </div>
    </header>
  );
}