'use client';

import { useTranslations } from 'next-intl';

type PersonSidebarProps = {
  gender: number;
  popularity: number;
  adult: boolean;
};

export function PersonSidebar({ gender, popularity, adult }: PersonSidebarProps) {
  const t = useTranslations('Person');

  function genderLabel(gender: number): string {
    if (gender === 1) return t('female');
    if (gender === 2) return t('male');
    return t('nonBinary');
  }

  return (
    <aside className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
          {t('personalInfo')}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">{t('gender')}</h4>
            <p className="text-sm text-foreground mt-0.5">{genderLabel(gender)}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">
              {t('popularity')}
            </h4>
            <p className="text-sm text-foreground mt-0.5">{popularity.toFixed(0)}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">{t('adult')}</h4>
            <p className="text-sm text-foreground mt-0.5">{adult ? t('yes') : t('no')}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
