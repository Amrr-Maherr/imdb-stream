'use client';

import { Loader2, SearchX } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SearchResultItem, type SearchResult } from './SearchResultItem';

type SearchDropdownProps = {
  results: SearchResult[];
  query: string;
  loading?: boolean;
  onNavigate: () => void;
};

export function SearchDropdown({ results, query, loading, onNavigate }: SearchDropdownProps) {
  const t = useTranslations('Header');
  const common = useTranslations('Common');

  if (!query) return null;

  return (
    <div className="scrollbar-thin absolute inset-x-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
      {results.length > 0 ? (
        <div className="py-1">
          {results.slice(0, 8).map((result) => (
            <SearchResultItem
              key={`${result.media_type}-${result.id}`}
              result={result}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span>{common('loading')}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1.5 px-3 py-8 text-center">
          <SearchX className="size-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
