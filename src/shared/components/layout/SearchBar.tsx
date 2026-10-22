'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import MultiSearch from '@/features/multiSearch/services/multiSearch';
import { SearchDropdown } from '@/features/multiSearch/components/SearchDropdown';
import type { SearchResult } from '@/features/multiSearch/components/SearchResultItem';

export default function SearchBar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const t = useTranslations('Header');

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastQueryRef = useRef('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (trimmed === lastQueryRef.current) return;

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await MultiSearch({ query: trimmed });
        if (data) {
          lastQueryRef.current = trimmed;
          setResults(data.results ?? []);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, open]);

  useEffect(() => {
    if (open) return;
    setSearchQuery('');
    setResults([]);
    setLoading(false);
    lastQueryRef.current = '';
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onToggle();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onToggle();
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onToggle]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-background/95 px-4 pt-20 backdrop-blur-sm md:px-8 md:pt-24">
      <div ref={containerRef} className="relative w-full max-w-2xl">
        <div className="flex h-10 items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
            aria-label={t('search')}
          />
          <button
            type="button"
            onClick={onToggle}
            className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('closeSearch')}
          >
            <X className="size-4" />
          </button>
        </div>

        <SearchDropdown
          results={results}
          query={searchQuery.trim()}
          loading={loading}
          onNavigate={onToggle}
        />
      </div>
    </div>,
    document.body
  );
}
