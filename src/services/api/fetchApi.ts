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
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${process.env.TMDB_BASE_URL}/${endpoint}${separator}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

    const res = await fetch(url, {
        cache,
        next: revalidate ? { revalidate } : undefined,
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${endpoint}`);
    }

    return res.json();
}
