const state = {
    filters: ['All', 'functions', 'mixins', 'placeholders', 'variables'],
    selectedFilter: 0,
};

const getters = {
    selectedFilterLabel: state => state.filters[state.selectedFilter],
};

const mutations = {
    // updateFilters: (state, array) => {
    //     state.filters = array;
    // },
    selectFilter: (state, number) => {
        state.selectedFilter = number;
    },
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true,
};
