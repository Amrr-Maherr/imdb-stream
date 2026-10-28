import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Check, X } from 'lucide-react';
import { PricingSection } from '@/features/pricing/components/pricing-section';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Subscription' });
  return { title: t('title') };
}

const comparisonFeatures = [
  'browsing',
  'ratings',
  'watchlist',
  'adFree',
  'aiRecommendations',
  'earlyAccess',
  'prioritySupport',
  'apiAccess',
  'analytics',
  'teamFeatures',
] as const;

const featureMatrix: Record<string, Record<string, boolean>> = {
  free: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: false,
    aiRecommendations: false,
    earlyAccess: false,
    prioritySupport: false,
    apiAccess: false,
    analytics: false,
    teamFeatures: false,
  },
  pro: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: true,
    aiRecommendations: true,
    earlyAccess: true,
    prioritySupport: true,
    apiAccess: false,
    analytics: false,
    teamFeatures: false,
  },
  enterprise: {
    browsing: true,
    ratings: true,
    watchlist: true,
    adFree: true,
    aiRecommendations: true,
    earlyAccess: true,
    prioritySupport: true,
    apiAccess: true,
    analytics: true,
    teamFeatures: true,
  },
};

export default async function SubscriptionPage() {
  const t = await getTranslations('Subscription');

  const plans = ['free', 'pro', 'enterprise'] as const;

  const faqs = [1, 2, 3, 4, 5] as const;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand/10 pb-20 pt-24">
        <div className="app-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">{t('hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <div className="app-container -mt-8 pb-16">
        <PricingSection showHeading={false} />
      </div>

      {/* Feature Comparison */}
      <section className="bg-muted/50 py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t('comparison.heading')}
          </h2>

          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    {t('comparison.feature')}
                  </th>
                  {plans.map((key) => (
                    <th
                      key={key}
                      className="px-6 py-4 text-center text-sm font-semibold text-foreground"
                    >
                      {t(`comparison.${key}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature}
                    className={`border-b border-border text-sm ${
                      i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                    }`}
                  >
                    <td className="px-6 py-4 text-foreground">{t(`comparison.rows.${feature}`)}</td>
                    {plans.map((key) => {
                      const isAvailable = featureMatrix[key]?.[feature] ?? false;
                      return (
                        <td key={key} className="px-6 py-4 text-center">
                          {isAvailable ? (
                            <Check className="mx-auto h-5 w-5 text-brand" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 md:hidden">
            {plans.map((key) => (
              <Card key={key} className="border-border">
                <CardHeader>
                  <CardTitle className="text-xl">{t(`comparison.${key}`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {comparisonFeatures.map((feature) => {
                      const isAvailable = featureMatrix[key]?.[feature] ?? false;
                      return (
                        <li key={feature} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t(`comparison.rows.${feature}`)}
                          </span>
                          {isAvailable ? (
                            <Check className="h-4 w-4 text-brand" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="app-container">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">
            {t('faq.heading')}
          </h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((num) => (
              <details
                key={num}
                className="group rounded-xl border border-border bg-card transition-colors open:border-brand/30"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-base font-medium text-foreground">
                  {t(`faq.q${num}.q`)}
                  <span className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="border-t border-border px-6 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`faq.q${num}.a`)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand/10 py-20">
        <div className="app-container relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{t('cta.heading')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t('cta.subheading')}</p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                asChild
              >
                <Link href="#">{t('cta.button')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
