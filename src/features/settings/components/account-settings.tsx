'use client';

import { useTranslations } from 'next-intl';
import { User, Mail, Lock, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

export function AccountSettings() {
  const t = useTranslations('Settings.account');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t('heading')}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="size-4 text-brand" />
            {t('profileInfo')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t('displayName')}</label>
            <Input defaultValue="Amr Maher" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t('email')}</label>
            <div className="relative">
              <Input defaultValue="amrr.maherr24@gmail.com" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <BadgeCheck className="size-3.5" />
                {t('verified')}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Lock className="size-3.5" />
            {t('changePassword')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BadgeCheck className="size-4 text-brand" />
            {t('accountStatus')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{t('status')}</p>
              <p className="text-xs text-muted-foreground">{t('statusDesc')}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
              <span className="size-1.5 rounded-full bg-green-500" />
              {t('active')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
