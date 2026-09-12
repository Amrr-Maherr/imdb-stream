'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Shield, Eye, Database, LogOut, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Switch } from '@/shared/components/ui/switch';
import { Button } from '@/shared/components/ui/button';

export function PrivacySettings() {
  const t = useTranslations('Settings.privacy');
  const [watchHistoryVisible, setWatchHistoryVisible] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t('heading')}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="size-4 text-brand" />
            {t('privacySettings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="watch-history" className="text-sm font-medium text-foreground">
                {t('activityVisibility')}
              </label>
              <p className="text-xs text-muted-foreground">{t('activityVisibilityDesc')}</p>
            </div>
            <Switch
              id="watch-history"
              checked={watchHistoryVisible}
              onCheckedChange={setWatchHistoryVisible}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Database className="size-4 text-brand" />
            {t('privacySettings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="data-collection" className="text-sm font-medium text-foreground">
                {t('profileVisibility')}
              </label>
              <p className="text-xs text-muted-foreground">{t('profileVisibilityDesc')}</p>
            </div>
            <Switch
              id="data-collection"
              checked={dataCollection}
              onCheckedChange={setDataCollection}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="size-4 text-brand" />
            {t('securitySettings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="size-3.5" />
            {t('sessions')}
          </Button>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">{t('sessions')}</p>
              <p className="text-xs text-muted-foreground">{t('sessionsDesc')}</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-destructive">
              <Trash2 className="size-3.5" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
