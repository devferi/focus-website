export type SectorOption = {
  label: string;
  slug: string;
};

export const SECTOR_OPTIONS: SectorOption[] = [
  { label: 'Design and Build', slug: 'design-and-build' },
  { label: 'Acoustic Project', slug: 'acoustic-project' },
  { label: 'Finishing Contractor', slug: 'finishing-contractor' },
  { label: 'Infrastructure and Others Project', slug: 'infrastructure-project' },
];

export const slugifySector = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const findSectorLabelBySlug = (slug: string) => {
  const normalized = slug.trim().toLowerCase();
  const matched = SECTOR_OPTIONS.find((item) => item.slug === normalized);
  if (matched) return matched.label;
  return '';
};
