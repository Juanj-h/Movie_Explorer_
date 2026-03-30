const BASE_URL = "https://api.tvmaze.com";

async function fetchAPI(endpoint) {
    try {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error("Error API");
        return await res.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function getShows() {
    return await fetchAPI("/shows");
}

export async function searchShows(query) {
    if (!query) return [];

    const data = await fetchAPI(`/search/shows?q=${encodeURIComponent(query)}`);

    // 🔥 CLAVE
    return data.map(item => item.show);
}

export async function getShowById(id) {
    return await fetchAPI(`/shows/${id}`);
}