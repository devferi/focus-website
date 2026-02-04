import { Suspense } from 'react';

import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Clients from '@/components/Clients';
import ProjectsSection from '@/components/ProjectsSection';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Clients />
      <Suspense fallback={null}>
        <ProjectsSection />
      </Suspense>
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
