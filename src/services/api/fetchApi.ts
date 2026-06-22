export type FetchApiOptions = {
    endpoint: string;
    cache?: RequestCache;
    revalidate?: number;
};

export async function fetchApi<T = any>({
    endpoint,
    cache = "force-cache",
    revalidate,
}: FetchApiOptions): Promise<T> {
    const res = await fetch(
        `${process.env.TMDB_BASE_URL}/${endpoint}`,
        {
            cache,
            next: revalidate ? { revalidate } : undefined,
            headers: {
                Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(`Request failed: ${endpoint}`);
    }

    return res.json();
}
