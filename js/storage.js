export const Storage = {
    getFavorites() {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    },

    addFavorite(show) {
        const favs = this.getFavorites();

        if (favs.some(f => f.id === show.id)) return;

        favs.push(show);
        localStorage.setItem('favorites', JSON.stringify(favs));
    },

    getHistory() {
        return JSON.parse(localStorage.getItem('history')) || [];
    },

    saveSearch(term) {
        let history = this.getHistory();

        history = history.filter(t => t !== term);
        history.unshift(term);

        localStorage.setItem('history', JSON.stringify(history.slice(0, 5)));
    }
};