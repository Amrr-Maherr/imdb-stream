import axios from "axios";

export type MovieFilters = {
    page?: number;
    with_genres?: string;
    with_original_language?: string;
    primary_release_year?: number;
    vote_average_gte?: number;
    region?: string;
    sort_by?:
    | "popularity.desc"
    | "vote_average.desc"
    | "primary_release_date.desc"
    | "revenue.desc";
    include_adult?: boolean;

};

export default async function GetMovies({
    page = 1,
    with_genres,
    with_original_language,
    primary_release_year,
    vote_average_gte,
    region,
    sort_by = "popularity.desc",
    include_adult,
}: MovieFilters) {
    try {
        const response = await axios.get(
            `${process.env.TMDB_BASE_URL}/discover/movie`,
            {
                params: {
                    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    include_adult: include_adult ?? false,

                    page,
                    with_genres,
                    with_original_language,
                    primary_release_year,
                    region,
                    sort_by,

                    "vote_average.gte": vote_average_gte,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}