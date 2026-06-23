import type React from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: "default" | "featured" | "brand";
};

export function SectionHeader({
  title,
  subtitle,
  action,
  variant = "default",
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div className="flex items-center gap-3">
        {variant === "brand" && (
          <div className="h-6 w-1 rounded-full bg-brand" />
        )}
        <div>
          <h2
            className={
              variant === "featured"
                ? "text-2xl font-bold text-foreground"
                : "text-xl font-bold text-foreground"
            }
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
