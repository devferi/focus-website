'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Hotel & Resort Kaliandra – Pandaan",
    sector: "Infrastructure Project",
    location: "Pandaan",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    description: "Pekerjaan infrastruktur menyeluruh untuk kawasan hotel & resort Kaliandra.",
    badge: "Infrastructure Project"
  },
  {
    id: 2,
    title: "Infrastruktur PEMKOT Surabaya",
    sector: "Infrastructure Project",
    location: "Surabaya",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80",
    description: "Paket pekerjaan infrastruktur untuk Pemerintah Kota Surabaya.",
    badge: "Infrastructure Project"
  },
  {
    id: 3,
    title: "Ballroom Ciputra World Surabaya",
    sector: "Finishing Contractor",
    location: "Surabaya",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    description: "Pekerjaan finishing ballroom dengan standar venue premium.",
    badge: "Finishing Contractor"
  },
  {
    id: 4,
    title: "Ruang Musik NSC – Surabaya",
    sector: "Acoustic Project",
    location: "Surabaya",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    description: "Instalasi akustik untuk New Surabaya College (NSC).",
    badge: "Acoustic Project"
  },
  {
    id: 5,
    title: "Meeting Room & Lobby PT. Hertz Flavors",
    sector: "Design and Build",
    location: "Mojokerto",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    description: "Pembenahan meeting room, office staff, dan lobby di Ngoro – Mojokerto.",
    badge: "Design and Build"
  },
  {
    id: 6,
    title: "Director Room PT. Hertz Flavors",
    sector: "Acoustic Project",
    location: "Mojokerto",
    status: "Featured",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
    description: "Penataan ruang direktur dengan kebutuhan akustik dan finishing khusus.",
    badge: "Acoustic Project"
  }
];

export default function Projects() {
  const [sectorFilter, setSectorFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProjects = projects.filter(project => {
    return (!sectorFilter || project.sector === sectorFilter) &&
           (!locationFilter || project.location === locationFilter) &&
           (!statusFilter || project.status === statusFilter);
  });

  return (
    <section id="projects" className="py-20 bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">Featured Work</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Our Signature Projects That Define Excellence
            </h2>
            <p className="mt-2 text-white/70 max-w-2xl">
              A curated collection of our finest work spanning Design & Build, Finishing, Infrastructure, and Acoustic—showcasing the precision, creativity, and dedication that define our craftsmanship.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs filter-grid w-full">
            <select 
              value={sectorFilter} 
              onChange={(e) => setSectorFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Jenis pekerjaan</option>
              <option>Design and Build</option>
              <option>Finishing Contractor</option>
              <option>Infrastructure Project</option>
              <option>Acoustic Project</option>
            </select>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Lokasi</option>
              <option>Pandaan</option>
              <option>Surabaya</option>
              <option>Mojokerto</option>
            </select>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 focus:border-accent focus:ring-0 w-full"
            >
              <option value="">Label</option>
              <option>Featured</option>
            </select>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article 
              key={project.id} 
              className="project-card group rounded-[28px] border border-white/15 bg-white/5 backdrop-blur px-6 pt-6 pb-5 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="project-meta mt-5 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <span>{project.sector} • {project.location}</span>
                <span>{project.status}</span>
              </div>
              <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
              <p className="project-desc mt-2 text-sm text-white/70">{project.description}</p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="badge-status rounded-full bg-emerald-400/20 text-emerald-200 px-3 py-1">
                  {project.badge}
                </span>
                <span className="badge-kpi rounded-full bg-white/10 px-3 py-1">Lihat detail</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}