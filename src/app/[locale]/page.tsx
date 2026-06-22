import { HeroSection } from "@/components/movies/hero-section";
import { HomeSections } from "@/components/movies/home-sections";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSection />
      <HomeSections />
    </div>
  );
}
