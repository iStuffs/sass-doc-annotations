import { mapGetters } from 'vuex';

const template = /* html */ `
<p class="state">{{ filteredAnnotationsLength }} of {{ annotationsLength }} annotations</p>
`;

export default {
    template,
    computed: {
        ...mapGetters('annotations', ['annotationsLength', 'filteredAnnotationsLength']),
    },
};
