import { cloneDeep } from 'lodash';

const state = {
    annotations: [{}],
    filteredAnnotations: [{}],
};

const getters = {
    filteredAnnotationsLength: state => state.filteredAnnotations.length,
    annotationsLength: state => state.annotations.length,
    columns: state => Object.keys(state.annotations[0]).filter(column => (column !== 'Extra notes' && column !== 'Attribute')),
};

const mutations = {
    updateAnnotations: (state, array) => {
        state.annotations = cloneDeep(array);
    },
    updateFilteredAnnotations: (state, array) => {
        state.filteredAnnotations = cloneDeep(array);
    },
    filterAnnotations: (state, value) => {
        const annotations = cloneDeep(state.annotations);
        state.filteredAnnotations = value !== undefined && value !== 'All'
            ? annotations.filter(item => item['Allowed on'].includes(value))
            : annotations;
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
