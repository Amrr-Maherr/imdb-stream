type Genre = {
  id: number;
  name: string;
};

type GenreTagsProps = {
  genres: Genre[];
  overlay?: boolean;
};

export function GenreTags({ genres, overlay }: GenreTagsProps) {
  if (genres.length === 0) return null;

  const tagClass = overlay
    ? 'rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'
    : 'rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground';

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <span key={genre.id} className={tagClass}>
          {genre.name}
        </span>
      ))}
    </div>
  );
}
