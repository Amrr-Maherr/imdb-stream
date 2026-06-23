import { cn } from "@/lib/utils";

type MovieSectionProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
};

export function MovieSection({
  title,
  icon,
  children,
  className,
}: MovieSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}
