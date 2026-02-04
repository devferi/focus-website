import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Clients from '@/components/Clients';
import Projects from '@/components/Projects';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

type HomeProps = {
  searchParams?: {
    sector?: string;
  };
};

export default function Home({ searchParams }: HomeProps) {
  const initialSector = searchParams?.sector ?? '';
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Clients />
      <Projects initialSector={initialSector} />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
