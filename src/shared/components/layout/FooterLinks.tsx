'use client';

import { useTranslations } from 'next-intl';
import FooterBrand from './FooterBrand';
import FooterColumn from './FooterColumn';
import { FOOTER_COLUMNS } from '@/shared/config/footer';

export default function FooterLinks() {
  const t = useTranslations('Footer');
  const tGenres = useTranslations('Filters.genres');

  const columns = FOOTER_COLUMNS.map((column) => ({
    title: t(column.titleKey),
    links: column.links.map((link) => ({
      href: link.href,
      label: link.namespace ? tGenres(link.labelKey) : t(link.labelKey),
      accent: link.accent,
      withArrow: link.withArrow,
    })),
  }));

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
      <FooterBrand />
      {columns.map((column) => (
        <FooterColumn key={column.title} title={column.title} links={column.links} />
      ))}
    </div>
  );
}
