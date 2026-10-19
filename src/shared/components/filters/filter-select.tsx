'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { cn } from '@/shared/utils/utils';
import { useFilterParam } from './use-filter-param';
import type { FilterOption } from './types';

interface FilterSelectProps {
  paramKey: string;
  options: FilterOption[];
  placeholder: string;
  anyLabel?: string;
  defaultValue?: string;
  contentClassName?: string;
}

function FilterSelect({
  paramKey,
  options,
  placeholder,
  anyLabel,
  defaultValue,
  contentClassName,
}: FilterSelectProps) {
  const { value: current, setValue } = useFilterParam(paramKey);
  const value = current ?? defaultValue ?? 'any';
  const isActive = current != null && current !== defaultValue;

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className={cn(
          'h-9 w-full text-xs transition-colors',
          isActive && 'border-foreground/25 bg-accent font-medium text-foreground'
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        {anyLabel && <SelectItem value="any">{anyLabel}</SelectItem>}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.badge ? (
              <span className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-[2px] border border-border bg-muted text-[9px] font-medium text-muted-foreground">
                  {option.badge}
                </span>
                {option.label}
              </span>
            ) : (
              option.label
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { FilterSelect };
