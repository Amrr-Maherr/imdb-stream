import type { Metadata } from 'next';
import { ErrorState } from '@/shared/components/error-state';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('Offline');
  return { title: t('title') };
}

export default async function OfflinePage() {
  const t = await getTranslations('Offline');
  return (
    <ErrorState
      title={t('title')}
      description={t('description')}
      actionLabel={t('retryButton')}
      actionHref="/"
    />
  );
}
