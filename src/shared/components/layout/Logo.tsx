import Image from '@/shared/components/ui/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Logo() {
  const t = useTranslations('Common');
  return (
    <Link href="/" className="shrink-0">
      <Image
        src="/logo.svg"
        alt={t('siteName')}
        width={64}
        height={32}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}
