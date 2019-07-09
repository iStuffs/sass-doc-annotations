import Vue from 'vue';
import Vuex from 'vuex';
import filters from './modules/filters';
import annotations from './modules/annotations';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        filters,
        annotations,
    },
    strict: process.env.NODE_ENV !== 'production',
});
