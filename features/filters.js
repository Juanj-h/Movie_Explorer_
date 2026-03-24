import { state } from "../state.js";
import { renderPage } from "../ui/renderPagination.js";

export function filterByGenre(genre) {
    state.genre = genre;
    state.page = 1;

    applyFilters();
}

export function applyFilters() {
    if (state.genre === "All") {
        state.filtered = [...state.shows];
    } else {
        state.filtered = state.shows.filter(show =>
            show.genres.includes(state.genre)
        );
    }

    renderPageFiltered();
}

function renderPageFiltered() {
    const start = (state.page - 1) * state.perPage;
    const end = start + state.perPage;

    const paginated = state.filtered.slice(start, end);

    import("../ui/renderShows.js").then(module => {
        module.renderShows(paginated);
    });

    document.getElementById("page").innerText = state.page;

    renderPage();
}