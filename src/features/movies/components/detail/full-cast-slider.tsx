import { Slider } from '@/shared/components/ui/slider';
import { CastCard } from './cast-card';

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  credit_id: string;
};

type FullCastSliderProps = {
  cast: CastMember[];
};

export function FullCastSlider({ cast }: FullCastSliderProps) {
  if (cast.length === 0) return null;

  return (
    <Slider
      slidesPerView={6}
      slidesMobilePerView={2.5}
      spaceBetween={16}
      grabCursor
      freeMode
      className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pb-8"
    >
      {cast.map((person, index) => (
        <CastCard
          key={person.credit_id || `${person.id}-${index}`}
          id={person.id}
          name={person.name}
          character={person.character}
          profilePath={person.profile_path}
          creditId={person.credit_id || `${person.id}-${index}`}
        />
      ))}
    </Slider>
  );
}
