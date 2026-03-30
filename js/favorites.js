import { Storage } from './storage.js';

const container = document.getElementById('favorites-container');

function loadFavorites() {
    const favorites = Storage.getFavorites();

    if (!favorites || favorites.length === 0) {
        container.innerHTML = "<p>No tienes favoritos aún</p>";
        return;
    }

    container.innerHTML = '';

    favorites.forEach(show => {
        const div = document.createElement('div');
        div.className = 'movie-card';

        const image = show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';

        div.innerHTML = `
    <img src="${image}" alt="${show.name}">

    <div class="movie-info">
        <h3>${show.name}</h3>

        <div class="card-btns">
            <a href="show.html?id=${show.id}" class="button">Ver detalles</a>
            <button class="remove-btn button" data-id="${show.id}">Eliminar</button>
        </div>
    </div>
`;

        container.appendChild(div);
    });

    attachRemoveEvents();
}

function attachRemoveEvents() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;

            let favs = Storage.getFavorites();
            favs = favs.filter(f => f.id != id);

            localStorage.setItem('favorites', JSON.stringify(favs));

            loadFavorites(); // 🔥 recargar lista
        });
    });
}

document.addEventListener('DOMContentLoaded', loadFavorites);