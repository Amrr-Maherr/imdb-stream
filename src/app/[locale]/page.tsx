import { HeroSection } from "@/features/movies/components/listing/hero-section";
import { HomeSections } from "@/features/movies/components/listing/home-sections";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSection />
      <HomeSections />
    </div>
  );
}
