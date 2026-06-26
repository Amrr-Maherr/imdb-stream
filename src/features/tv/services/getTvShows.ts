import axios from "axios";

export type TvFilters = {
  page?: number;
  with_genres?: string;
  with_original_language?: string;
  first_air_date_year?: number;
  vote_average_gte?: number;
  with_origin_country?: string;
  sort_by?:
    | "popularity.desc"
    | "vote_average.desc"
    | "first_air_date.desc";
  include_adult?: boolean;
};

export default async function GetTvShows({
  page = 1,
  with_genres,
  with_original_language,
  first_air_date_year,
  vote_average_gte,
  with_origin_country,
  sort_by = "popularity.desc",
  include_adult,
}: TvFilters) {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/discover/tv`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          include_adult: include_adult ?? false,
          page,
          with_genres,
          with_original_language,
          first_air_date_year,
          with_origin_country,
          sort_by,
          "vote_average.gte": vote_average_gte,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
