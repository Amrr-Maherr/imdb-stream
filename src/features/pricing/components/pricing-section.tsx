'use client';

import { useState } from 'react';
import { Check, Crown, Sparkles, Building2, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/shared/utils/utils';

type Billing = 'monthly' | 'annual';

const PLANS = [
  { key: 'free', icon: Sparkles, popular: false },
  { key: 'pro', icon: Crown, popular: true },
  { key: 'enterprise', icon: Building2, popular: false },
] as const;

/** How many plan features a card lists before linking to the full comparison. */
const FEATURE_PREVIEW = 5;

type PricingSectionProps = {
  /** Compact mode shows a feature preview and a link to the full plans page (home page). */
  compact?: boolean;
  /** Renders the section heading; off when the host page has its own hero. */
  showHeading?: boolean;
};

export function PricingSection({ compact = false, showHeading = true }: PricingSectionProps) {
  const t = useTranslations('Pricing');
  const ts = useTranslations('Subscription');
  const [billing, setBilling] = useState<Billing>('monthly');

  return (
    <section aria-labelledby={showHeading ? 'pricing-heading' : undefined}>
      {showHeading && (
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand ring-1 ring-brand/30">
            <Crown className="size-3.5" />
            {t('eyebrow')}
          </span>
          <h2
            id="pricing-heading"
            className="mt-4 text-3xl font-black tracking-tight text-foreground text-balance md:text-5xl"
          >
            {t('title')}
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">{t('subtitle')}</p>
        </div>
      )}

      {/* Billing toggle */}
      <div className="mt-8 flex justify-center">
        <div
          role="radiogroup"
          aria-label={t('billing')}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
        >
          {(['monthly', 'annual'] as const).map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={billing === option}
              onClick={() => setBilling(option)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                billing === option
                  ? 'bg-brand text-brand-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t(option)}
              {option === 'annual' && (
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[10px] font-bold',
                    billing === 'annual'
                      ? 'bg-brand-foreground/15 text-brand-foreground'
                      : 'bg-brand/15 text-brand'
                  )}
                >
                  {t('save')}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3 md:items-stretch lg:gap-6">
        {PLANS.map(({ key, icon: Icon, popular }) => {
          const features = ts.raw(`plans.${key}.features`) as string[];
          const shown = compact ? features.slice(0, FEATURE_PREVIEW) : features;
          const price = billing === 'annual' ? t(`annualPrice_${key}`) : ts(`plans.${key}.price`);

          return (
            <article
              key={key}
              className={cn(
                'relative flex flex-col rounded-3xl border p-6 transition-all duration-300 md:p-8',
                popular
                  ? 'border-brand bg-card shadow-glow md:-my-3 md:py-11'
                  : 'border-border bg-card/60 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg'
              )}
            >
              {popular && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-brand-foreground shadow-md rtl:translate-x-1/2">
                  {ts('plans.pro.popular')}
                </span>
              )}

              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-11 items-center justify-center rounded-2xl',
                    popular ? 'bg-brand text-brand-foreground' : 'bg-muted text-foreground'
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{ts(`plans.${key}.name`)}</h3>
                  <p className="text-xs text-muted-foreground">{ts(`plans.${key}.description`)}</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-black tracking-tight text-foreground">{price}</span>
                <span className="text-sm text-muted-foreground">{t('perMonth')}</span>
              </div>
              <p className="mt-1 h-4 text-xs text-muted-foreground">
                {billing === 'annual' && key !== 'free' ? t('billedAnnually') : ''}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {shown.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
                    <span
                      className={cn(
                        'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
                        popular ? 'bg-brand text-brand-foreground' : 'bg-brand/15 text-brand'
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
                {compact && features.length > shown.length && (
                  <li className="ps-8 text-xs text-muted-foreground">
                    {t('moreFeatures', { count: features.length - shown.length })}
                  </li>
                )}
              </ul>

              <Link
                href="/subscription"
                className={cn(
                  'mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  popular
                    ? 'bg-brand text-brand-foreground hover:bg-brand/90'
                    : 'border border-border bg-background text-foreground hover:border-brand/50 hover:bg-muted'
                )}
              >
                {ts(`plans.${key}.cta`)}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </article>
          );
        })}
      </div>

      {compact && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link
            href="/subscription"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            {t('compareAll')}
          </Link>
        </p>
      )}
    </section>
  );
}
