import { cloneDeep } from 'lodash';

const state = {
    annotations: [{}],
};

const getters = {
    annotationsLength: (state) => state.annotations.length,
    columns: (state) => Object.keys(state.annotations[0]).filter((column) => (column !== 'Extra notes' && column !== 'Attribute')),
    filteredAnnotations: (state, getters, rootState, rootGetters) => {
        const selectedFilterLabel = rootGetters['filters/selectedFilterLabel'];
        const annotations = cloneDeep(state.annotations);
        return selectedFilterLabel !== undefined && selectedFilterLabel !== 'All'
            ? annotations.filter((item) => item['Allowed on'].includes(selectedFilterLabel))
            : annotations;
    },
    filteredAnnotationsLength: (state, getters) => getters.filteredAnnotations.length,
};

const mutations = {
    updateAnnotations: (state, array) => {
        state.annotations = cloneDeep(array);
    },
    updateFilteredAnnotations: (state, array) => {
        state.filteredAnnotations = cloneDeep(array);
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
