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
        axios.get('/json/annotations.json')
            .then((response) => {
                // handle success
                this.annotations = response.data.annotations
                this.columns = Object.keys(this.annotations[0]).filter((column)=> (column !== 'Extra notes' && column !== 'Attribute'))
                this.filteredAnnotations = this.annotations;
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    },
    methods:{
        boolClass(value) {
            let className = '';
            if (value === 'true') {
                className = 'true';
            }
            if (value === 'false') {
                className = 'false';
            }
            return className;
        },
        filterResults(value) {
            const annotations = JSON.parse(JSON.stringify(this.annotations))
            if (value !== undefined && value !== 'All') {
                const filteredAnnotations = annotations.filter(item => item['Allowed on'].includes(value))
                this.filteredAnnotations = filteredAnnotations;
            } else if (value === 'All') {
                this.filteredAnnotations = annotations;
            }
        },
    },
    delimiters: ['#{', '}'],
});
