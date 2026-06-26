export function getPageNumbers(current: number, total: number) {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const rangeWithDots: (number | "ellipsis")[] = [];

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  let prev: number | null = null;
  for (const page of range) {
    if (typeof page !== "number") continue;
    if (prev !== null && page - prev !== 1) {
      rangeWithDots.push("ellipsis");
    }
    rangeWithDots.push(page);
    prev = page;
  }

  return rangeWithDots;
}