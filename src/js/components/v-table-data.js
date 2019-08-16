import { mapGetters } from 'vuex';

const template = /* html */ `
<table class="table-data">

    <thead>
        <tr>
            <th v-for="(column, index) in columns" :key="'th-' + index">{{ column }}</th>
        </tr>
    </thead>

      <transition-group
        tag="tbody"
        name="custom-classes-transition"
        enter-active-class="animated fadeInDown"
        leave-active-class="animated bounceOutRight"
      >
        <tr
          v-for="(annotation, index) in filteredAnnotations"
          :key="'row-' + annotation.Annotation"
        >
            <!-- Column Annotation -->
            <td>
              <div class="has-tooltip">
                <span class="tooltip">{{ annotation.Description }}</span>
                {{ annotation.Annotation }}
              </div>
            </td>

            <!-- Column Description -->
            <td>{{ annotation.Description }}</td>

            <!-- Column Multiple -->
            <td :class="boolClass(annotation.Multiple)">
              <span :class="annotation.Multiple === 'true' ? 'icon-true' : 'icon-false'">{{ annotation.Multiple }}</span>
            </td>

            <!-- Column Default -->
            <td><strong>{{ annotation.Default }}</strong></td>

            <!-- Column Aliases -->
            <td><em>{{ annotation.Aliases }}</em></td>

            <!-- Column Autofilled -->
            <td :class="boolClass(annotation.Autofilled)">
              <span :class="annotation.Multiple === 'true' ? 'icon-true' : 'icon-false'">{{ annotation.Autofilled }}</span>
            </td>

            <!-- Column Allowed On -->
            <td>{{ displayAllowedOn(annotation['Allowed on']) }}</td>
        </tr>
      </transition-group>
</table>
`;
export default {
    template,
    computed: {
        ...mapGetters('annotations', ['columns', 'filteredAnnotations']),
    },
    methods: {
        boolClass(value) {
            return value;
        },
        displayAllowedOn(value) {
            return Array.isArray(value) ? value.join(', ') : '';
        },
    },
};
