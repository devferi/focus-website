'use client';

import { useEffect, useState } from 'react';

type ClientLogo = {
  id: number;
  name: string;
  logo?: string;
  logo_url?: string;
  sort_order?: number;
  is_active?: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8000';

const resolveLogoUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path}`;
};

export default function Clients() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadClients = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/clients`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Failed to load clients');
        const payload = await response.json();
        const items = Array.isArray(payload?.data) ? payload.data : [];
        setLogos(items.filter((item: ClientLogo) => item.is_active !== false));
      } catch (error) {
        if (!controller.signal.aborted) {
          setLogos([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadClients();

    return () => controller.abort();
  }, []);
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-slate-500 uppercase">Clients Who Trust Us</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Discover the brands that trust us and join them.
            </h2>
          </div>
        </div>
        <div className="mt-10">
          {isLoading && (
            <div className="text-sm text-slate-500 text-center py-6">
              Memuat logo client...
            </div>
          )}
          {!isLoading && logos.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-6">
              Belum ada logo client.
            </div>
          )}
          {logos.length > 0 && (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {logos.map((logo) => {
                const logoSrc = resolveLogoUrl(logo.logo_url ?? logo.logo);
                return (
                  <li key={logo.id} className="border border-slate-200 rounded-2xl bg-white p-4 flex items-center justify-center h-20 shadow-sm">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={logo.name}
                        className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-600">{logo.name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
