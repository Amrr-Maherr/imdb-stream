'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const IGNORED_PARAM = 'page';

export function useResetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCount = Array.from(searchParams.keys()).filter((key) => key !== IGNORED_PARAM).length;
  const hasFilters = activeCount > 0;

  function handleReset() {
    const params = new URLSearchParams();
    params.set(IGNORED_PARAM, '1');
    router.push(`?${params.toString()}`);
  }

  return { hasFilters, activeCount, handleReset };
}
