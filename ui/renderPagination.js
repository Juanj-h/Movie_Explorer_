import { state } from "../state.js";
import { renderShows } from "./renderShows.js";

export function renderPage() {
    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;

    renderShows(state.shows.slice(start, end));

    document.getElementById("page").innerText = state.page;
}