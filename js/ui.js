export const UI = {
    grid: document.getElementById('movies-grid'),
    pageIndicator: document.getElementById('page-indicator'),

    renderShows(shows) {
        this.grid.innerHTML = '';

        if (!shows || shows.length === 0) {
            this.grid.innerHTML = '<p>No hay resultados</p>';
            return;
        }

        shows.forEach(show => {
            const div = document.createElement('div');
            div.className = 'movie-card';

            const image = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';

            div.innerHTML = `
                <img src="${image}">
                <h3>${show.name}</h3>
                <p>${show.genres?.join(', ') || ''}</p>
                <p>⭐ ${show.rating?.average || 'N/A'}</p>

                <a href="show.html?id=${show.id}">Ver detalles</a>
                <button class="btn-fav" data-id="${show.id}">+ Favorito</button>
            `;

            this.grid.appendChild(div);
        });
    },

    updatePagination(page) {
        this.pageIndicator.textContent = `Página ${page}`;
    }
};