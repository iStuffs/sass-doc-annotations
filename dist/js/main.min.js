const app = new Vue({
    el: '#app',
    data: {
        annotations: [],
        filteredAnnotations: [],
        filters: ['All', 'functions', 'mixins', 'placeholders', 'variables'],
        selectedFilter: 0,
        columns: [],
    },
    created() {
        const url = 'https://raw.githubusercontent.com/iStuffs/sass-doc-annotations/master/dist/json/annotations.json';
        axios.get(url)
            .then((response) => {
                // handle success
                this.annotations = response.data.annotations;
                this.columns = Object.keys(this.annotations[0]).filter(column => (column !== 'Extra notes' && column !== 'Attribute'));
                this.filteredAnnotations = this.annotations;
            })
            .catch((error) => {
                // handle error
                console.error(error);
            });
    },
    methods:{
        boolClass(value) {
            return value;
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
    delimiters: ['#{', '}'],
});
