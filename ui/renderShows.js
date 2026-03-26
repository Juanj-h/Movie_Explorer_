import { addFavorite } from "../features/favorites.js";

export function renderShows(shows) {
    const container = document.getElementById("shows");
    container.innerHTML = "";

    shows.forEach(show => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${show.image?.medium || ''}">
            <h3>${show.name}</h3>
            <p>${show.genres.join(", ")}</p>
            <p>⭐ ${show.rating.average || "N/A"}</p>
            <button onclick="location.href='show.html?id=${show.id}'">Ver</button>
            <button onclick="addFavorite(${show.id})">❤️</button>
        `;

        container.appendChild(div);
    });
}