'use client';

import { useTranslations } from 'next-intl';
import Logo from './Logo';

export default function FooterBrand() {
  const t = useTranslations('Footer');

  return (
    <div className="col-span-2 flex flex-col gap-4 sm:col-span-3 lg:col-span-1 lg:max-w-xs">
      <Logo />
      <p className="text-sm leading-relaxed text-muted-foreground">{t('description')}</p>
    </div>
  );
}
