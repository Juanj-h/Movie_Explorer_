// persistence.js
// Manejo de datos persistentes en localStorage

const KEYS = {
    FAVORITES: "movie_explorer_favorites",
    SEARCH_HISTORY: "movie_explorer_search_history",
    ITEMS_PER_PAGE: "movie_explorer_items_per_page"
};

/* =========================
   FAVORITOS
========================= */

// Obtener favoritos
export function getFavorites() {
    const data = localStorage.getItem(KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
}

// Guardar favoritos
function saveFavorites(favorites) {
    localStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
}

// Agregar a favoritos
export function addFavorite(show) {
    const favorites = getFavorites();

    // evitar duplicados
    const exists = favorites.some(fav => fav.id === show.id);
    if (!exists) {
        favorites.push(show);
        saveFavorites(favorites);
    }
}

// Eliminar favorito
export function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== id);
    saveFavorites(favorites);
}

// Verificar si es favorito
export function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
}


/* =========================
   HISTORIAL DE BÚSQUEDAS
========================= */

// Obtener historial
export function getSearchHistory() {
    const data = localStorage.getItem(KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
}

// Guardar historial
function saveSearchHistory(history) {
    localStorage.setItem(KEYS.SEARCH_HISTORY, JSON.stringify(history));
}

// Agregar búsqueda
export function addSearch(query) {
    if (!query) return;

    let history = getSearchHistory();

    // eliminar si ya existe para evitar duplicados
    history = history.filter(item => item.toLowerCase() !== query.toLowerCase());

    // agregar al inicio
    history.unshift(query);

    // limitar historial (ej: 10 búsquedas)
    if (history.length > 10) {
        history.pop();
    }

    saveSearchHistory(history);
}

// Limpiar historial
export function clearSearchHistory() {
    localStorage.removeItem(KEYS.SEARCH_HISTORY);
}


/* =========================
   CONFIGURACIÓN (PAGINACIÓN)
========================= */

// Obtener items por página
export function getItemsPerPage() {
    const data = localStorage.getItem(KEYS.ITEMS_PER_PAGE);
    return data ? parseInt(data) : 10; // default 10
}

// Guardar items por página
export function setItemsPerPage(value) {
    localStorage.setItem(KEYS.ITEMS_PER_PAGE, value);
}