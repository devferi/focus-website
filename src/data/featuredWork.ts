export type FeaturedWorkItem = {
  sectorSlug: string;
  sectorLabel: string;
  title: string;
  description: string;
  ctaLabel: string;
};

export const featuredWork: FeaturedWorkItem[] = [
  {
    sectorSlug: 'design-and-build',
    sectorLabel: 'Design and Build',
    title: 'Pembangunan Kolam Renang Kaliandra Hotel and Resort Pandaan',
    description:
      'Proyek ini berlokasi di Pandaan, seluas kurang lebih 2.500 m2. Kami kerjakan pada tahun 2018 dengan masa penyelesaian 4 bulan.',
    ctaLabel: 'Lihat lebih banyak proyek Design and Build',
  },
  {
    sectorSlug: 'acoustic-project',
    sectorLabel: 'Acoustic Project',
    title: 'Pekerjaan Akustik Peredaman Suara Meeting Room Onsen Resort Malang',
    description:
      'Proyek ini berlokasi di Malang, seluas kurang lebih 800 m2. Kami kerjakan pada tahun 2019 dengan masa penyelesaian 90 hari.',
    ctaLabel: 'Lihat lebih banyak proyek Acoustic Installation',
  },
  {
    sectorSlug: 'finishing-contractor',
    sectorLabel: 'Finishing Contractor',
    title: 'Pekerjaan Finishing Proyek Koridor Extension LG - Icon Mall Gresik',
    description:
      'Proyek ini berlokasi di Gresik, seluas kurang lebih 1.500 m2. Kami kerjakan pada tahun 2025 dengan masa penyelesaian 90 hari.',
    ctaLabel: 'Lihat lebih banyak proyek Finishing Contractor',
  },
  {
    sectorSlug: 'infrastructure-project',
    sectorLabel: 'Infrastructure and Others Project',
    title: 'Pembangunan Saluran Air dan Pemasangan Paving - Pemkot Surabaya',
    description:
      'Proyek ini berlokasi di Surabaya, seluas kurang lebih 3.500 m2. Kami kerjakan pada tahun 2024 dengan masa penyelesaian 90 hari.',
    ctaLabel: 'Lihat lebih banyak proyek Infrastructure and Others Project',
  },
];
