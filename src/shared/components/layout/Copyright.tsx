'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from '@/shared/components/ui/language-switcher';
import ThemeToggle from '@/shared/components/ui/theme-toggle';

export default function Copyright() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: '/privacy', label: t('legalLinks.privacy') },
    { href: '/terms', label: t('legalLinks.terms') },
    { href: '/cookies', label: t('legalLinks.cookies') },
  ];

  return (
    <div className="border-t border-border">
      <div className="app-container flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1 text-center lg:text-start">
          <p className="text-xs text-muted-foreground">{t('copyright', { year })}</p>
          <p className="text-xs text-muted-foreground/70">{t('attribution')}</p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-end">
          <nav aria-label={t('legal')} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm text-xs text-muted-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
