'use client';

import { useSearchParams } from 'next/navigation';
import Projects from './Projects';

export default function ProjectsSection() {
  const searchParams = useSearchParams();
  const sector = searchParams?.get('sector') ?? '';

  return <Projects initialSector={sector} />;
}
