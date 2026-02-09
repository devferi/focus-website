import Footer from '@/components/Footer';
import ProjectRequestForm from '@/components/ProjectRequestForm';

export default function GetQuotePage() {
  return (
    <>
      <main className="min-h-screen bg-brand-dark pt-28 pb-20 text-white">
        <section className="mx-auto max-w-6xl px-4">
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-white">Request Penawaran</h1>
          <p className="mt-2 text-white/70 max-w-3xl">
            Isi formulir dibawah ini untuk mendapatkan penawaran harga spesial dari kami.
          </p>
          <div className="mt-8">
            <ProjectRequestForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
