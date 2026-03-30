// main.js
// Intended to work with:
// - service.js: getShows(), searchShows(query), getShowById(id)
// - ui.js: renderMovies(cardsData, container), renderPagination(pages, current, container), renderNoResults(container)
// - state.js: (opcional) estado central en memoria (aquí manejamos un objeto local que puede sincronizarse con state.js si se desea
// - storage.js / persistence.js: funciones para persisted (cargar/guardar) favoritos, historial, perPage
// - The DOM elements deben existir en index.html: #searchForm, #searchInput, #moviesContainer, #paginationContainer, #perPageSelect, #genreFilter, #noResults

import { getShows, searchShows, getShowById } from './service.js';
import { renderMovies } from './ui.js';
import { renderPagination } from './ui.js';
import { saveFavorites, loadFavorites, addFavorite, removeFavorite, loadPerPage, savePerPage } from './storage.js';
import { loadHistory, addQueryToHistory, getHistory } from './persistence.js';

// STATE
const state = {
  results: [],        // current list of shows (after search/filter)
  page: 1,              // current page index (1-based)
  perPage: 10,           // items per page (persists)
  genre: 'All',          // active genre filter
  query: '',               // current search term
  favorites: [],            // list of favorite show IDs (persisted)
  history: [],               // recent searches (persisted)
};

//
// DOM REFERENCES
//
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const moviesContainer = document.getElementById('moviesContainer');
const paginationContainer = document.getElementById('paginationContainer');
const perPageSelect = document.getElementById('perPageSelect');
const genreFilter = document.getElementById('genreFilter');
const noResultsEl = document.getElementById('noResults');

//
// INITIALIZATION
//
async function init() {
  // Cargar preferencias y datos persistidos
  state.perPage = await loadPerPage() ?? 10;
  perPageSelect.value = state.perPage;

  state.favorites = (await loadFavorites()) ?? [];
  state.history = (await loadHistory()) ?? [];

  // Cargar listado inicial (lo hacemos con getShows(), que trae toda la data de TVMaze)
  // Nota: TVMaze /shows devuelve muchos ítems; para un escenario real podría ser limitado o paginado en servidor.
  try {
    const initialShows = await getShows(); // asume array de shows
    state.results = initialShows;
  } catch (e) {
    console.error('Error cargando shows iniciales:', e);
    state.results = [];
  }

  // Render inicial
  renderAll();

  // Eventos
  setupEventListeners();
}

//
// RENDERIZADO COORDINADO
//
function renderAll() {
  renderMoviesList();
  renderPaginationControls();
  // reglas de filtros en DOM (genéricos) pueden ejecutarse aquí si se desea
  // Mostrar mensaje si no hay resultados
  if (state.results.length === 0) {
    noResultsEl.style.display = 'block';
  } else {
    noResultsEl.style.display = 'none';
  }
}

function renderMoviesList() {
  // Aplicar filtrado por género en el cliente
  let items = state.results;
  if (state.genre && state.genre !== 'All') {
    items = items.filter(show => {
      const genres = (show.genres || []);
      return genres.includes(state.genre);
    });
  }

  const start = (state.page - 1) * state.perPage;
  const end = start + state.perPage;
  const pageItems = items.slice(start, end);

  // Construir data para UI
  const cards = pageItems.map(show => ({
    id: show.id,
    title: show.name,
    image: show.image?.medium || '',
    genres: show.genres || [],
    rating: show.rating?.average || 'N/A',
    summary: show.summary || '',
    urlDetail: `show.html?id=${show.id}`,
  }));

  renderMovies(cards, moviesContainer, handleAddToFavorites, handleOpenDetails);
}

function renderPaginationControls() {
  // Calcular paginación basada en resultados y perPage (cliente)
  const totalItems = state.results.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / state.perPage));

  // Crear estructura de navegación simple: anterior, siguiente y páginas
  const frag = document.createDocumentFragment();

  // Anterior
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Anterior';
  prevBtn.disabled = state.page <= 1;
  prevBtn.addEventListener('click', () => {
    if (state.page > 1) {
      state.page--;
      renderAll();
    }
  });
  frag.appendChild(prevBtn);

  // Indicador de página
  const pageInfo = document.createElement('span');
  pageInfo.textContent = `Página ${state.page} de ${totalPages}`;
  pageInfo.style.margin = '0 8px';
  frag.appendChild(pageInfo);

  // Siguiente
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente';
  nextBtn.disabled = state.page >= totalPages;
  nextBtn.addEventListener('click', () => {
    if (state.page < totalPages) {
      state.page++;
      renderAll();
    }
  });
  frag.appendChild(nextBtn);

  // Render en container
  paginationContainer.innerHTML = '';
  paginationContainer.appendChild(frag);
}

//
// EVENTOS
//
function setupEventListeners() {
  // Búsqueda
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = (searchInput.value || '').trim();
      if (!query) return;
      state.query = query;
      state.page = 1;
      try {
        const results = await searchShows(query);
        // TVMaze devuelve un array con matches; adaptamos para nuestro render
        // Cada item de results puede traer show dentro de 'show'
        state.results = results.map(r => r.show);
        // Guardar en historial
        addQueryToHistory(state.history, query);
        await saveHistory(state.history);
        renderAll();
      } catch (err) {
        console.error('Error buscando:', err);
      }
    });
  }

  // Filtro por género (ej. select con opciones)
  if (genreFilter) {
    genreFilter.addEventListener('change', () => {
      state.genre = genreFilter.value;
      // Reiniciar página cuando cambia filtro
      state.page = 1;
      renderAll();
    });
  }

  // Per page
  if (perPageSelect) {
    perPageSelect.addEventListener('change', async () => {
      const value = parseInt(perPageSelect.value, 10);
      if (Number.isFinite(value)) {
        state.perPage = value;
        await savePerPage(value);
        state.page = 1;
        renderAll();
      }
    });
  }
}

//
// INTERACCIONES CON LA UI
//
function handleAddToFavorites(show) {
  const exists = state.favorites.includes(show.id);
  if (exists) {
    // opcional: eliminar si ya existe (toggle)
    state.favorites = state.favorites.filter(id => id !== show.id);
  } else {
    state.favorites.push(show.id);
  }
  // Persistir
  saveFavorites(state.favorites);
  // Opcional: actualizar UI de favoritos en tarjetas si hay estado global
}

function handleOpenDetails(show) {
  // Navegar a la página de detalle
  window.location.href = `show.html?id=${show.id}`;
}

// Helper para UI (se espera que ui.js exponga una función renderMovies que acepte array de cards y callbacks)
//
// NOTAS:
// - En esta versión asumimos que renderMovies(cards, container, onAdd, onOpen) renderiza las tarjetas y
//   añade los handlers para cada carta (agregar a favoritos y ver detalles). Si tu ui.js tiene una firma diferente,
//   adapta las llamadas.
// - Si no tienes el helper de onAdd/onOpen, puedes adaptar renderMovies para aceptar callbacks o usar data attributes.

//
// INICIAR
//
init();
