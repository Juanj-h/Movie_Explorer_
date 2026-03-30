import * as Service from './service.js';
import { Storage } from './storage.js';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const container = document.getElementById('show-details-container');

async function init() {
    const show = await Service.getShowById(id);

    const image = show.image?.medium || 'https://via.placeholder.com/300x400';

    container.innerHTML = `
        <div class="detail-card">
            <img src="${image}">
            <h1>${show.name}</h1>
            <p>${show.genres.join(', ')}</p>
            <p>⭐ ${show.rating?.average || 'N/A'}</p>
            <p>${show.language}</p>
            <p>${show.status}</p>
            <p>${show.premiered}</p>
            <div>${show.summary}</div>

            <button id="fav-btn">+ Favorito</button>
        </div>
    `;

    document.getElementById('fav-btn').addEventListener('click', () => {
        Storage.addFavorite(show);
        alert("Agregado a favoritos");
    });
}

init();