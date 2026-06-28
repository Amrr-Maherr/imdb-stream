import { fetchApi } from "@/shared/services/fetchApi";
import { ErrorState } from "@/shared/components/error-state";
import { ListHero } from "@/features/list/components/list-hero";
import { ListMainContent } from "@/features/list/components/list-main-content";
import { ListSidebar } from "@/features/list/components/list-sidebar";
interface Props {
  params: Promise<{ locale: string; slug: string; id: string }>;
}

type TMDBListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  overview: string;
};

type TMDBListDetails = {
  id: number;
  name: string;
  description: string;
  favorite_count: number;
  item_count: number;
  list_type: string;
  poster_path: string | null;
  items: TMDBListItem[];
};

async function getList(id: string) {
  return fetchApi<TMDBListDetails>({
    endpoint: `list/${id}`,
    revalidate: 3600,
  });
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const list = await getList(id);
    return {
      title: list.name,
      description: list.description?.slice(0, 160),
    };
  } catch {
    return { title: "List" };
  }
}

export default async function ListPage({ params }: Props) {
  const { id } = await params;

  let list: TMDBListDetails;
  try {
    list = await getList(id);
  } catch {
    return (
      <ErrorState
        title="List not found"
        description="We couldn't find the list you're looking for."
        actionLabel="Go Home"
        actionHref="/"
      />
    );
  }

  const items = list.items ?? [];

  return (
    <div className="flex flex-col flex-1 bg-background">
      <ListHero
        name={list.name}
        description={list.description}
        itemCount={items.length}
        favoriteCount={list.favorite_count}
      />

      <div className="w-full mx-auto app-container mt-8 md:mt-10 pb-16 space-y-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          <ListMainContent
            name={list.name}
            description={list.description}
            items={items}
          />
          <ListSidebar
            name={list.name}
            description={list.description}
            itemCount={items.length}
            favoriteCount={list.favorite_count}
            listType={list.list_type}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}
