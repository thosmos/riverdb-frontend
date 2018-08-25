<template>
  <div id="selection-params"
       class="m-t-lg">
    <!-- <sui-divider></sui-divider> -->
    <div class="ui centered grid stackable ">
      <div v-for="p in allParams"
           :key="p">
        <div @click="selectParam(p)"
             class="ui segment"
             :class="{active: p === selection.activeParam}">
          <span>{{p}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

export default {
  name: "SelectionParams",
  computed: {
    ...mapState({
      selection: state => state.selection,
      data: state => state.data
    }),
    allParams: function() {
      // Gets all params of all loaded stations
      let temp = this.data.loadedStations.map(s => s.meta.params);
      temp = uniq(flatten(temp));
      // Remove stupid null_null value
      const nullRegex = RegExp("null");
      temp = temp.filter(t => !nullRegex.test(t));
      // return alphabetically sorted
      return temp.sort();
    }
  },
  methods: {
    selectParam: function(param) {
      this.$store.commit("selection/SELECT_ACTIVE_PARAM", param);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/_variables.scss";
.active {
  font-weight: bold;
  border: 2px $primaryColor solid;
}
#selection-params div.ui.segment {
  transition: all 0.2s ease-in;
  &:hover {
    background: $darkWhite;
  }
}
</style>
