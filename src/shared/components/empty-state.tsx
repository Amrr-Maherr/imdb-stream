"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  actionHref?: string;
  action?: React.ReactNode;
  className?: string;
}

function EmptyState({
  title,
  description,
  icon: Icon = Heart,
  actionLabel,
  actionHref,
  action,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "flex flex-1 flex-col items-center justify-center bg-background p-8 h-screen",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex size-16 items-center justify-center rounded-full bg-muted"
        >
          <Icon className="size-7 text-muted-foreground" aria-hidden="true" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>

          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {action ? (
          action
        ) : actionLabel && actionHref ? (
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : actionLabel ? (
          <Button>{actionLabel}</Button>
        ) : null}
      </div>
    </motion.div>
  );
}

export { EmptyState };
