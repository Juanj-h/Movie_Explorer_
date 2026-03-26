import { addFavorite } from "../features/favorites.js";

export function renderDetail(show) {
    const container = document.getElementById("detail");

    container.innerHTML = `
        <div class="detail-card">
            <img src="${show.image?.medium || ''}">
            
            <h2>${show.name}</h2>
            
            <p><strong>Géneros:</strong> ${show.genres.join(", ")}</p>
            <p><strong>Rating:</strong> ⭐ ${show.rating.average || "N/A"}</p>
            <p><strong>Idioma:</strong> ${show.language}</p>
            <p><strong>Estado:</strong> ${show.status}</p>
            <p><strong>Estreno:</strong> ${show.premiered || "N/A"}</p>
            
            <div class="summary">
                ${show.summary || "Sin descripción"}
            </div>

            <button onclick="addFavorite(${show.id})">
                ❤️ Agregar a favoritos
            </button>
        </div>
    `;
}