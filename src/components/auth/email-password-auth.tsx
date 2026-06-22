import { Mail, Eye } from "lucide-react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EmailPasswordAuth() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="auth-email">Email</Label>
        <div className="relative">
          <Input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            className="peer pe-9"
            autoComplete="email"
          />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="auth-password">Password</Label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-brand hover:text-brand/80 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="auth-password"
            type="password"
            placeholder="Enter your password"
            className="peer pe-9"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 hover:text-foreground transition-colors"
            tabIndex={-1}
            aria-label="Show password"
          >
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-brand hover:text-brand/80 font-medium transition-colors"
        >
          Create your account
        </Link>
      </p>
    </div>
  );
}
