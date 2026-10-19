import type { FilterOption } from './types';

export function buildYearOptions(from = 1900): FilterOption[] {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: currentYear - from + 1 }, (_, index) => {
    const year = String(currentYear - index);
    return { value: year, label: year };
  });
}
