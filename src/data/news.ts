export type NewsPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category?: string;
  author?: string;
  tags?: string[];
  readTime?: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: 'jasa-pasang-paving-gresik',
    title: 'Jasa Pasang Paving Gresik',
    excerpt:
      'Paving adalah teknik menata permukaan dengan batu atau beton untuk menghasilkan area yang rata, kokoh, dan tahan lama di jalan, trotoar, hingga area parkir.',
    content:
      'Paving yang baik dimulai dari persiapan lahan, pemilihan material, hingga pemasangan presisi. Tim kami berpengalaman menangani kawasan industri dan komersial dengan standar mutu tinggi. Hubungi kami untuk survei lokasi dan estimasi pekerjaan.',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
    date: '2024-10-01',
    category: 'Artikel',
    author: 'Tim Focus Trading',
    tags: ['Paving', 'Konstruksi', 'Gresik', 'Material'],
    readTime: '3 menit',
  },
  {
    slug: 'tukang-plafon-sidoarjo',
    title: 'Tukang Plafon Sidoarjo',
    excerpt:
      'Mengenal profesional yang ahli memasang dan merawat plafon berbagai material untuk hunian maupun bangunan komersial.',
    content:
      'Kami menyediakan layanan pemasangan plafon gypsum, PVC, dan akustik dengan finishing rapi. Layanan meliputi konsultasi desain, material, dan jadwal pengerjaan yang fleksibel sesuai kebutuhan proyek.',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    date: '2024-10-12',
    category: 'Artikel',
    author: 'Tim Focus Trading',
    tags: ['Plafon', 'Gypsum', 'PVC', 'Akustik', 'Sidoarjo'],
    readTime: '4 menit',
  },
  {
    slug: 'jasa-pasang-peredam-suara-malang',
    title: 'Jasa Pasang Peredam Suara Malang',
    excerpt:
      'Peredam suara membantu mengontrol akustik ruangan, mengurangi kebisingan, dan diaplikasikan pada sektor komersial hingga residensial.',
    content:
      'Instalasi akustik kami mencakup treatment dinding, plafon, dan lantai dengan material berkualitas. Cocok untuk ruang meeting, studio, restoran, hingga fasilitas publik.',
    image:
      'https://images.unsplash.com/photo-1518933165971-611dbc9c412d?auto=format&fit=crop&w=1600&q=80',
    date: '2024-10-25',
    category: 'Artikel',
    author: 'Tim Focus Trading',
    tags: ['Peredam Suara', 'Akustik', 'Malang', 'Studio'],
    readTime: '5 menit',
  },
];