import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Clients from '@/components/Clients';
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
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
