import '@babel/polyfill';
import Vue from 'vue';
import axios from 'axios';
import { mapState, mapMutations, mapGetters } from 'vuex';
import store from './store';

import vFilters from './components/v-filters';
import vState from './components/v-state';

const app = new Vue({
    el: '#app',
    store,
    components: {
        vFilters,
        vState,
    },
    computed: {
        ...mapState('annotations', ['annotations', 'filteredAnnotations']),
        ...mapGetters('annotations', ['columns']),
        ...mapGetters('filters', ['selectedFilterLabel']),
    },
    watch: {
        selectedFilterLabel(value) {
            this.filterAnnotations(value);
        },
    },
    created() {
        const url = 'https://raw.githubusercontent.com/iStuffs/sass-doc-annotations/master/dist/json/annotations.json';
        axios.get(url)
            .then((response) => {
                // handle success
                this.updateAnnotations(response.data.annotations);
                this.updateFilteredAnnotations(this.annotations);
            })
            .catch((error) => {
                // handle error
                console.error(error);
            });
    },
    methods:{
        ...mapMutations('filters', ['updateFilters']),
        ...mapMutations('annotations', ['filterAnnotations', 'updateAnnotations', 'updateFilteredAnnotations']),

        boolClass(value) {
            return value;
        },
        displayAllowedOn(value) {
            return Array.isArray(value) ? value.join(', ') : '';
        },
        filterResults(value) {
            const annotations = JSON.parse(JSON.stringify(this.annotations));
            if (value !== undefined && value !== 'All') {
                const filteredAnnotations = annotations.filter(item => item['Allowed on'].includes(value));
                this.filteredAnnotations = filteredAnnotations;
            } else if (value === 'All') {
                this.filteredAnnotations = annotations;
            }
        },
    },
});
