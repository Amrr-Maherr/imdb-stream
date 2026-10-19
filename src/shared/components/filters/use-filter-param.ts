'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const ANY_VALUE = 'any';
const PAGE_KEY = 'page';

export function useFilterParam(paramKey: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get(paramKey);

  function setValue(next: string | null) {
    const params = new URLSearchParams(searchParams);

    if (next === null || next === ANY_VALUE) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, next);
    }

    params.set(PAGE_KEY, '1');
    router.push(`?${params.toString()}`);
  }

  return { value, setValue };
}
