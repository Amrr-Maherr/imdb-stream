"use client";

import { useRouter, useSearchParams } from "next/navigation";

const IGNORED_PARAM = "page";

export function useResetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.keys()).some(
    (key) => key !== IGNORED_PARAM
  );

  function handleReset() {
    const params = new URLSearchParams();
    params.set(IGNORED_PARAM, "1");
    router.push(`?${params.toString()}`);
  }

  return { hasFilters, handleReset };
}