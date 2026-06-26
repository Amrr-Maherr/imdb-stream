import axios from "axios";
type MultiSearchProps = {
    query: string
}
export default async function MultiSearch({ query }: MultiSearchProps) {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
            params: {
                query,
                language: "en-US",
                page: 1,
                include_adult: true,
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}