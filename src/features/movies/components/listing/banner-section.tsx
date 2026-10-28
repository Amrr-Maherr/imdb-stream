'use client';

import { Rail, type RailProps } from './rail';

/** A rail framed in a tinted panel, used to set "what's on now" rows apart from the rest. */
export function BannerSection(props: Omit<RailProps, 'density'>) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-brand/[0.04] p-4 sm:p-6 lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 -top-24 size-72 rounded-full bg-brand/10 blur-3xl"
      />
      <Rail {...props} className="relative" />
    </div>
  );
}
