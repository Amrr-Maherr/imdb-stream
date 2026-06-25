"use client";

import { Slider } from "@/shared/components/ui/slider";

type BannerSectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function BannerSection({
  title,
  subtitle,
  children,
}: BannerSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-muted/30 border border-border/50">
      <div className="p-4 sm:p-6 pb-0">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <Slider
          slidesPerView={5}
          slidesMobilePerView={2.5}
          spaceBetween={14}
          grabCursor
          freeMode
        >
          {children}
        </Slider>
      </div>
    </section>
  );
}
