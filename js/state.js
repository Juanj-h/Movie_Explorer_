
const state = {

    shows: [],


    searchResults: [],


    currentPage: 1,
    itemsPerPage: parseInt(localStorage.getItem('itemsPerPage')) || 20,

    activeGenre: 'all',


    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],


    setShows(newShows) {
        this.shows = newShows;
    },


    setCurrentPage(page) {
        this.currentPage = page;
    },



    setGenre(genre) {
        this.activeGenre = genre;
        this.currentPage = 1;
    },


    setItemsPerPage(count) {
        this.itemsPerPage = count;
        localStorage.setItem('itemsPerPage', count);
        this.currentPage = 1;
    }
};

export default state;
