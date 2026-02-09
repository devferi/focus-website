'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navigateToSection = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setIsMenuOpen(false);
        return;
      }
    }
    router.push(`/#${sectionId}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-2xl glass text-white border border-white/20 px-5 py-3 backdrop-blur-lg">
          <button 
            onClick={() => navigateToSection('hero')} 
            className="flex items-center gap-3"
          >
            <img 
              src="/logo.png" 
              alt="Focus Trading Contractor" 
              className="h-10 w-auto object-contain"
            />
          </button>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button 
              onClick={() => navigateToSection('about')} 
              className="hover:text-accent transition"
            >
              About us
            </button>
            <button 
              onClick={() => navigateToSection('services')} 
              className="hover:text-accent transition"
            >
              Projects
            </button>
            <button 
              onClick={() => navigateToSection('news')} 
              className="hover:text-accent transition"
            >
              Update & News
            </button>
            <button 
              onClick={() => navigateToSection('contact')} 
              className="hover:text-accent transition"
            >
              Contact us
            </button>
          </nav>
          
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90"
            >
              Get A Quote
            </Link>
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
          <div className="md:hidden mt-2 mb-4 rounded-2xl glass border border-white/20 px-5 py-4 text-white text-sm">
            <nav className="grid gap-3">
              <button onClick={() => navigateToSection('about')}>About us</button>
              <button onClick={() => navigateToSection('services')}>Projects</button>
              <button onClick={() => navigateToSection('news')}>Update & News</button>
              <button onClick={() => navigateToSection('contact')}>Contact us</button>
            </nav>
            <Link
              href="/get-quote"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
