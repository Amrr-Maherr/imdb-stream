import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // `locale` is only set when a caller passes one explicitly (e.g. getTranslations({ locale }));
  // otherwise the locale comes from the `[locale]` segment via `requestLocale`.
  const requested = locale ?? (await requestLocale);
  const currentLocale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale: currentLocale,
    messages: (await import(`../messages/${currentLocale}.json`)).default,
  };
});
