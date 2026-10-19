'use client';

import { useTranslations } from 'next-intl';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import { useFilterParam } from './use-filter-param';

function AdultToggle({ paramKey }: { paramKey: string }) {
  const t = useTranslations('Filters');
  const { value, setValue } = useFilterParam(paramKey);
  const checked = value === 'true';

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="adult-toggle"
        checked={checked}
        onCheckedChange={(next) => setValue(next ? 'true' : null)}
      />
      <Label htmlFor="adult-toggle" className="text-xs font-medium cursor-pointer">
        {t('adult')}
      </Label>
    </div>
  );
}

export { AdultToggle };
