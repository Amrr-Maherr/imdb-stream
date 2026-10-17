'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/shared/utils/utils';

interface LazySectionProps {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  className?: string;
}

export function LazySection({
  children,
  fallback,
  rootMargin = '300px',
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        isVisible &&
          'motion-reduce:animate-none animate-in fade-in-0 slide-in-from-bottom-2 duration-500 ease-out'
      )}
    >
      {isVisible ? children : fallback}
    </div>
  );
}
