import { getShows } from "./service/api.js";
import { state } from "./state.js";
import { renderPage } from "./ui/renderPagination.js";
import { searchHandler } from "./features/search.js";

window.search = async function () {
    const q = document.getElementById("searchInput").value;
    await searchHandler(q);
    renderPage();
};

window.nextPage = function () {
    state.page++;
    renderPage();
};

window.prevPage = function () {
    if (state.page > 1) state.page--;
    renderPage();
};

window.changePerPage = function () {
    state.perPage = parseInt(document.getElementById("perPage").value);
    state.page = 1;
    renderPage();
};

async function init() {
    state.shows = await getShows();
    renderPage();
}

init();