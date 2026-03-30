const state = {
    shows: [],
    currentPage: 1,
    itemsPerPage: 20,

    setShows(data) {
        this.shows = data;
    },

    setCurrentPage(page) {
        this.currentPage = page;
    },

    setItemsPerPage(size) {
        this.itemsPerPage = size;
        localStorage.setItem("itemsPerPage", size);
    }
};

export default state;