/**
 * Capa de servicios para interactuar con la API de TVMaze
 */

const BASE_URL = 'https://api.tvmaze.com';

const service = {
    /**
     * Obtiene la lista general de series (Página principal)
     * @returns {Promise<Array>} Lista de series
     */
    async getShows() {
        try {
            const response = await fetch(`${BASE_URL}/shows`);
            if (!response.ok) throw new Error('Error al obtener las series');
            return await response.json();
        } catch (error) {
            console.error("Service Error [getShows]:", error);
            return [];
        }
    },

    /**
     * Busca series por nombre
     * @param {string} query - Término de búsqueda
     * @returns {Promise<Array>} Resultados de búsqueda
     */
    async searchShows(query) {
        try {
            const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Error en la búsqueda');
            const data = await response.json();
            // TVMaze devuelve un array de objetos { score, show }. 
            // Mapeamos para devolver solo el objeto 'show'.
            return data.map(item => item.show);
        } catch (error) {
            console.error("Service Error [searchShows]:", error);
            return [];
        }
    },

    /**
     * Obtiene los detalles de una serie específica por su ID
     * @param {string|number} id - ID de la serie
     * @returns {Promise<Object|null>} Datos de la serie
     */
    async getShowById(id) {
        try {
            const response = await fetch(`${BASE_URL}/shows/${id}`);
            if (!response.ok) throw new Error('Error al obtener el detalle de la serie');
            return await response.json();
        } catch (error) {
            console.error("Service Error [getShowById]:", error);
            return null;
        }
    }
};

export default service;