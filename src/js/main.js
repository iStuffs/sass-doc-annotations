import '@babel/polyfill';
import Vue from 'vue';
import axios from 'axios';
import { mapMutations } from 'vuex';
import store from './store';

import vTableData from './components/v-table-data';
import vFilters from './components/v-filters';
import vFooter from './components/v-footer';
import vHeader from './components/v-header';
import vStatus from './components/v-status';

const app = new Vue({
    el: '#app',
    store,
    components: {
        vTableData,
        vFilters,
        vFooter,
        vHeader,
        vStatus,
    },
    data: {
        dataLoaded: false,
        dataUrl: 'https://raw.githubusercontent.com/iStuffs/sass-doc-annotations/master/dist/json/annotations.json',
    },
    created() {
        this.loadData();
    },
    methods:{
        ...mapMutations('annotations', ['updateAnnotations']),

        loadData() {
            axios.get(this.dataUrl)
                .then((response) => {
                    // handle success
                    this.updateAnnotations(response.data.annotations);
                    this.dataLoaded = true;
                })
                .catch((error) => {
                    // handle error
                    console.error(error);
                });
        },
    },
});
