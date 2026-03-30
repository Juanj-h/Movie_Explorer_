import state from './state.js';
import * as Service from './service.js';
import { UI } from './ui.js';
import { Storage } from './storage.js';

async function init() {
    const data = await Service.getShows();
    state.setShows(data);
    render();
}

function render() {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;

    const shows = state.shows.slice(start, end);

    UI.renderShows(shows);
    UI.updatePagination(state.currentPage);

    attachFavEvents();
}

async function handleSearch(query) {
    const data = await Service.searchShows(query);
    state.setShows(data);
    state.setCurrentPage(1);

    Storage.saveSearch(query);

    render();
}

function attachFavEvents() {
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const show = state.shows.find(s => s.id == id);

            Storage.addFavorite(show);
            alert("Agregado a favoritos");
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    init();

    // buscar
    document.getElementById('search-btn').addEventListener('click', () => {
        const value = document.getElementById('search-input').value;
        handleSearch(value);
    });

    // botones 10 20 50
    document.querySelectorAll('.page-size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const size = Number(btn.dataset.size);

            document.querySelectorAll('.page-size-btn')
                .forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            state.setItemsPerPage(size);
            state.setCurrentPage(1);

            render();
        });
    });

    // anterior
    document.getElementById('prev-page').addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.setCurrentPage(state.currentPage - 1);
            render();
        }
    });

    // siguiente
    document.getElementById('next-page').addEventListener('click', () => {
        const total = Math.ceil(state.shows.length / state.itemsPerPage);

        if (state.currentPage < total) {
            state.setCurrentPage(state.currentPage + 1);
            render();
        }
    });
});