"use client";

import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  LogIn,
  Smartphone,
  Key,
  Globe,
  BadgeCheck,
  Star,
  Shield,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import { ProfileSkeleton } from "@/shared/components/skeletons";
import { useAuth } from "@/shared/provider/authProvider";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getYearsSince = (dateStr: string) => {
    const joined = new Date(dateStr);
    const now = new Date();
    const years = now.getFullYear() - joined.getFullYear();
    return years > 0
      ? `${years} ${years === 1 ? "year" : "years"}`
      : "< 1 year";
  };

  const providerIcon = (providerId: string) => {
    if (providerId === "google.com") return <Globe className="size-4" />;
    if (providerId === "password") return <Key className="size-4" />;
    if (providerId === "phone") return <Smartphone className="size-4" />;
    return <LogIn className="size-4" />;
  };

  const providerLabel = (providerId: string) => {
    if (providerId === "google.com") return "Google";
    if (providerId === "password") return "Email & Password";
    if (providerId === "phone") return "Phone";
    return providerId;
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 px-4">
        <User className="size-12 text-muted-foreground" />
        <h1 className="text-xl font-bold text-foreground">Not Signed In</h1>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          Sign in to view your profile and manage your account.
        </p>
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          <LogIn className="size-4" />
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="app-container pt-20 pb-12">
      {/* Profile Header — IMDb style */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-border sm:size-28">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt={user.displayName || "Profile"}
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <User className="size-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-start sm:gap-1">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {user.displayName || "User"}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>Joined {formatDate(user.metadata.creationTime ?? "")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="size-3.5" />
            <span>{user.email}</span>
            {user.emailVerified && (
              <BadgeCheck className="size-4 text-green-500" />
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold text-brand">
              <Award className="size-3" />
              IMDb Member {getYearsSince(user.metadata.creationTime ?? "")}
            </span>
            {user.emailVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                <BadgeCheck className="size-3" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Member since"
          value={formatDate(user.metadata.creationTime ?? "").split(",")[0]}
        />
        <StatCard
          icon={Clock}
          label="Last login"
          value={formatDate(user.metadata.lastSignInTime ?? "").split(",")[0]}
        />
        <StatCard
          icon={Shield}
          label="Account type"
          value={user.isAnonymous ? "Anonymous" : "Registered"}
        />
        <StatCard
          icon={Star}
          label="Providers"
          value={String(user.providerData?.length || 1)}
        />
      </div>

      {/* Connected Accounts */}
      {user.providerData && user.providerData.length > 0 && (
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Shield className="size-5 text-brand" />
            Connected Accounts
          </h2>
          <div className="mt-4 space-y-2">
            {user.providerData.map((provider, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-brand/30"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  {providerIcon(provider.providerId)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {providerLabel(provider.providerId)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {provider.email || provider.uid}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[11px] font-medium text-green-600 dark:text-green-400">
                  Connected
                </span>
                <ChevronRight className="size-4 text-muted-foreground/40" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Account Details */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <User className="size-5 text-brand" />
          Account Details
        </h2>
        <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          <DetailRow label="User ID" value={user.uid} mono />
          <DetailRow label="Email" value={user.email ?? ""} />
          <DetailRow
            label="Email verified"
            value={user.emailVerified ? "Yes" : "No"}
          />
          <DetailRow
            label="Display name"
            value={user.displayName || "\u2014"}
          />
          <DetailRow
            label="Anonymous"
            value={user.isAnonymous ? "Yes" : "No"}
          />
          <DetailRow
            label="Sign-in method"
            value={user.providerData[0]?.providerId || "unknown"}
            capitalize
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </div>
      <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  capitalize,
}: {
  label: string;
  value: string;
  mono?: boolean;
  capitalize?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium text-foreground truncate max-w-[300px] text-right ${
          mono ? "font-mono text-xs tracking-tight" : ""
        } ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
