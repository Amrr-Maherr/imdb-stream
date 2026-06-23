"use client";

import { Slider } from "@/components/ui/slider";

type MagazineRowProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  featured?: React.ReactNode;
};

export function MagazineRow({
  title,
  subtitle,
  children,
  featured,
}: MagazineRowProps) {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {featured && (
          <div className="lg:w-1/3 flex-shrink-0">{featured}</div>
        )}
        <div className={featured ? "flex-1 min-w-0" : "w-full"}>
          <Slider
            slidesPerView={featured ? 3.5 : 5.5}
            slidesMobilePerView={featured ? 2.5 : 2.5}
            spaceBetween={14}
            grabCursor
            freeMode
          >
            {children}
          </Slider>
        </div>
      </div>
    </section>
  );
}
