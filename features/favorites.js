import { getFavs, saveFavs } from "../storage/storage.js";

export function addFavorite(id) {
    let favs = getFavs();

    if (!favs.includes(id)) {
        favs.push(id);
        saveFavs(favs);
    }
}