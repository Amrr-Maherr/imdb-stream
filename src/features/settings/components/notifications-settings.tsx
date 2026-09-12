'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Bell, Mail, Smartphone, Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Switch } from '@/shared/components/ui/switch';

export function NotificationsSettings() {
  const t = useTranslations('Settings.notifications');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">{t('heading')}</h2>
        <p className="text-sm text-muted-foreground mt-0.5">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="size-4 text-brand" />
            {t('notificationPreferences')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Mail className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label htmlFor="email-notifs" className="text-sm font-medium text-foreground">
                  {t('emailNotifications')}
                </label>
                <p className="text-xs text-muted-foreground">{t('emailDesc')}</p>
              </div>
            </div>
            <Switch id="email-notifs" checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Smartphone className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label htmlFor="push-notifs" className="text-sm font-medium text-foreground">
                  {t('pushNotifications')}
                </label>
                <p className="text-xs text-muted-foreground">{t('pushDesc')}</p>
              </div>
            </div>
            <Switch id="push-notifs" checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Megaphone className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label htmlFor="marketing" className="text-sm font-medium text-foreground">
                  {t('marketingEmails')}
                </label>
                <p className="text-xs text-muted-foreground">{t('marketingDesc')}</p>
              </div>
            </div>
            <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
