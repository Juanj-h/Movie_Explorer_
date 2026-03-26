const API = "https://api.tvmaze.com";

export async function getShows() {
    const res = await fetch(`${API}/shows`);
    return await res.json();
}

export async function searchShows(query) {
    const res = await fetch(`${API}/search/shows?q=${query}`);
    const data = await res.json();
    return data.map(r => r.show);
}

export async function getShowById(id) {
    const res = await fetch(`${API}/shows/${id}`);
    return await res.json();
}