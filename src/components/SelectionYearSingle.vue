<template>
  <div v-if="data.startYear"
       class="m-t-xl m-b-lg">
    <div class="ui grid centered">
      <span v-if="year > data.startYear"
            @click="moveBackward">
        <sui-icon size="large"
                  name="backward" />
      </span>
      <div v-else>
        <span class="invisible">xxxz</span>
      </div>
      <span>
        <h4>{{year}}</h4>
      </span>
      <span @click="moveForward"
            v-if="year < data.endYear">
        <sui-icon size="large"
                  name="forward" />
      </span>
      <div v-else>
        <span class="invisible">xxxz</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "SelectionYearSingle",
  props: {
    selection: Object,
    data: Object
  },
  mounted() {
    // setting 'startYear' to 'endYear' of range
    if (this.selection && this.selectionRange) {
      this.$store.commit("selection/SET_YEAR_RANGE", [
        this.selection.selectionRange[1],
        this.selection.selectionRange[1]
      ]);
    }
  },
  computed: {
    year: function() {
      // if in single year mode only use selection.selectionRange[1]
      if (this.selection.selectionRange) {
        return this.selection.selectionRange[1];
      } else {
        return "n/a";
      }
    }
  },
  methods: {
    moveBackward: function() {
      if (this.year > this.data.startYear) {
        let newValue = this.year - 1;
        this.$store.commit("selection/SET_YEAR_RANGE", [newValue, newValue]);
      }
    },
    moveForward: function() {
      if (this.year < this.data.endYear) {
        let newValue = this.year + 1;
        this.$store.commit("selection/SET_YEAR_RANGE", [newValue, newValue]);
      }
    }
  }
};
</script>

<style >
span.invisible {
  opacity: 0;
}
</style>
