'use client';

import { useTranslations } from 'next-intl';

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text }: AuthDividerProps) {
  const t = useTranslations('Common');
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{text || t('or')}</span>
      </div>
    </div>
  );
}
