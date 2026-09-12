import { HeroSection } from '@/features/movies/components/listing/hero-section';
import { HomeSections } from '@/features/movies/components/listing/home-sections';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  return (
    <div className="flex flex-col flex-1">
      <HeroSection locale={locale} />
      <HomeSections locale={locale} />
    </div>
  );
}
