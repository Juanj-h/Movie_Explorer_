import { searchShows } from "../service/api.js";
import { state } from "../state.js";

export async function searchHandler(query) {
    const results = await searchShows(query);
    state.shows = results;
    state.page = 1;
}