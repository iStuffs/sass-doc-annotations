import { mapState, mapMutations } from 'vuex';

const template = /* html */ `
<div class="filters">
  <strong class="filters__title">Filters</strong> :
  <template v-for="(filter, index) in filters" class="filters">
    <a
      href="#"
      class="filter"
      :class="{'is-selected': selectedFilter===index}"
      @click="selectFilter(index)"
    >
      {{ filter}}
    </a>
    <template v-if="index !== lastFilterIndex"> | </template>
  </template>
</div>
`;

export default {
    template,
    computed: {
        ...mapState('filters', ['filters', 'selectedFilter']),
        lastFilterIndex() {
            return this.filters.length - 1;
        },
    },
    methods: {
        ...mapMutations('filters', ['selectFilter']),
    },
};
