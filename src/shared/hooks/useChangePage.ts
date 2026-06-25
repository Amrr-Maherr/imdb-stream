"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useChangePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function changePage(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  }

  return changePage;
}