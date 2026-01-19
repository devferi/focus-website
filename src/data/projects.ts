export type Project = {
  id: number;
  title: string;
  sector: string;
  location: string;
  status: string;
  image?: string;
  images?: string[];
  description: string;
  badge: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Hotel & Resort Kaliandra – Pandaan',
    sector: 'Infrastructure Project',
    location: 'Pandaan',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Pekerjaan infrastruktur menyeluruh untuk kawasan hotel & resort Kaliandra.',
    badge: 'Infrastructure Project',
  },
  {
    id: 2,
    title: 'Infrastruktur PEMKOT Surabaya',
    sector: 'Infrastructure Project',
    location: 'Surabaya',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Paket pekerjaan infrastruktur untuk Pemerintah Kota Surabaya.',
    badge: 'Infrastructure Project',
  },
  {
    id: 3,
    title: 'Ballroom Ciputra World Surabaya',
    sector: 'Finishing Contractor',
    location: 'Surabaya',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Pekerjaan finishing ballroom dengan standar venue premium.',
    badge: 'Finishing Contractor',
  },
  {
    id: 4,
    title: 'Ruang Musik NSC – Surabaya',
    sector: 'Acoustic Project',
    location: 'Surabaya',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Instalasi akustik untuk New Surabaya College (NSC).',
    badge: 'Acoustic Project',
  },
  {
    id: 5,
    title: 'Meeting Room & Lobby PT. Hertz Flavors',
    sector: 'Design and Build',
    location: 'Mojokerto',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Pembenahan meeting room, office staff, dan lobby di Ngoro – Mojokerto.',
    badge: 'Design and Build',
  },
  {
    id: 6,
    title: 'Director Room PT. Hertz Flavors',
    sector: 'Acoustic Project',
    location: 'Mojokerto',
    status: 'Featured',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80',
    ],
    description: 'Penataan ruang direktur dengan kebutuhan akustik dan finishing khusus.',
    badge: 'Acoustic Project',
  },
];
