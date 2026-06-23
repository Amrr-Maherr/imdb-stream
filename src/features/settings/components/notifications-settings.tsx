"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function NotificationsSettings() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Notifications</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Choose what notifications you receive
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="size-4 text-brand" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Mail className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label
                  htmlFor="email-notifs"
                  className="text-sm font-medium text-foreground"
                >
                  Email notifications
                </label>
                <p className="text-xs text-muted-foreground">
                  Receive updates about your account and activity
                </p>
              </div>
            </div>
            <Switch
              id="email-notifs"
              checked={emailNotifs}
              onCheckedChange={setEmailNotifs}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Smartphone className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label
                  htmlFor="push-notifs"
                  className="text-sm font-medium text-foreground"
                >
                  Push notifications
                </label>
                <p className="text-xs text-muted-foreground">
                  Get notified about new releases and updates
                </p>
              </div>
            </div>
            <Switch
              id="push-notifs"
              checked={pushNotifs}
              onCheckedChange={setPushNotifs}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <Megaphone className="size-4 text-muted-foreground mt-0.5" />
              <div className="space-y-0.5">
                <label
                  htmlFor="marketing"
                  className="text-sm font-medium text-foreground"
                >
                  Marketing
                </label>
                <p className="text-xs text-muted-foreground">
                  Receive promotional offers and recommendations
                </p>
              </div>
            </div>
            <Switch
              id="marketing"
              checked={marketing}
              onCheckedChange={setMarketing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
