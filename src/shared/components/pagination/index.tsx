"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getPageNumbers } from "@/shared/utils/pagination";
import { useChangePage } from "@/shared/hooks/useChangePage";

export function PaginationDemo({ total_pages, page }: { total_pages: number; page: number }) {
  const changePage = useChangePage();
  const pages = getPageNumbers(page, total_pages);
  const isFirst = page <= 1;
  const isLast = page >= total_pages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className={isFirst ? "pointer-events-none opacity-50" : "cursor-pointer"}
          onClick={() => !isFirst && changePage(page - 1)}
        >
          <PaginationPrevious href="#" />
        </PaginationItem>
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p} className="cursor-pointer" onClick={() => changePage(p)}>
              <PaginationLink href="#" isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem
          className={isLast ? "pointer-events-none opacity-50" : "cursor-pointer"}
          onClick={() => !isLast && changePage(page + 1)}
        >
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}