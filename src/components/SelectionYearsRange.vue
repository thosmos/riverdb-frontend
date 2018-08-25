<template>
  <div v-if="data.startYear"
       class="m-t-xl">

    <vue-slider v-bind="settings"
                @drag-end="dragEnd"
                v-model="selection.selectionRange"></vue-slider>
  </div>
</template>

<script>
import vueSlider from "vue-slider-component";

export default {
  name: "SelectionYearsRange",
  components: { vueSlider },
  props: { data: Object, selection: Object },
  data() {
    return {
      range: [
        this.selection.selectionRange[0],
        this.selection.selectionRange[1]
      ]
    };
  },
  computed: {
    min: function() {
      return this.data.startYear;
    },
    max: function() {
      return this.data.endYear;
    },
    settings: function() {
      return {
        min: this.min,
        max: this.max,
        interval: 1,
        piecewise: true,
        piecewiseLabel: true
      };
    }
  },

  methods: {
    dragEnd: function(v) {
      this.$store.commit("selection/SET_YEAR_RANGE", v.getValue());
    }
  }
};
</script>

<style>
</style>
