import Link from "next/link";
import { AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/ui/button";

interface ErrorStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  action?: React.ReactNode;
  className?: string;
}

function ErrorState({
  title,
  description,
  icon: Icon = AlertCircle,
  actionLabel,
  actionHref,
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-1 flex-col items-center justify-center bg-background h-screen p-8",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <Icon className="size-12 text-brand" aria-hidden="true" />

        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        {description && <p className="text-muted-foreground">{description}</p>}

        {action ? (
          action
        ) : actionLabel && actionHref ? (
          <Button asChild className="mt-2">
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : actionLabel ? (
          <Button className="mt-2">{actionLabel}</Button>
        ) : null}
      </div>
    </div>
  );
}

export { ErrorState };
