"use client";

import { User, Mail, Lock, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground">Account</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="size-4 text-brand" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Display Name
            </label>
            <Input defaultValue="Amr Maher" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Input defaultValue="amrr.maherr24@gmail.com" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <BadgeCheck className="size-3.5" />
                Verified
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Lock className="size-3.5" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BadgeCheck className="size-4 text-brand" />
            Account Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
            <div>
              <p className="text-sm font-medium text-foreground">Status</p>
              <p className="text-xs text-muted-foreground">
                Your account is active and in good standing
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
              <span className="size-1.5 rounded-full bg-green-500" />
              Active
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
