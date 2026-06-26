import axios from "axios";

export type PeopleFilters = {
  page?: number;
};

export default async function GetPeople({ page = 1 }: PeopleFilters) {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/person/popular`,
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          language: "en-US",
          page,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
