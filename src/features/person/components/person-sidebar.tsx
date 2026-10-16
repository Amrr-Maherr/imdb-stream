'use client';

import { useTranslations } from 'next-intl';

type PersonSidebarProps = {
  gender: number;
  alsoKnownAs: string[];
};

export function PersonSidebar({ gender, alsoKnownAs }: PersonSidebarProps) {
  const t = useTranslations('Person');

  function genderLabel(value: number): string {
    if (value === 1) return t('female');
    if (value === 2) return t('male');
    return t('nonBinary');
  }

  const showGender = gender === 1 || gender === 2 || gender === 3;
  const aliases = alsoKnownAs.filter((name) => name.trim().length > 0);

  if (!showGender && aliases.length === 0) return null;

  return (
    <aside className="space-y-8">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
          {t('personalInfo')}
        </h3>
        <div className="space-y-4">
          {showGender && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t('gender')}
              </h4>
              <p className="text-sm text-foreground mt-0.5">{genderLabel(gender)}</p>
            </div>
          )}
          {aliases.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                {t('alsoKnownAs')}
              </h4>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {aliases.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
