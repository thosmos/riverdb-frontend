<template>
  <div id="selection-params"
       class="m-t-xl">
    <!-- <sui-divider></sui-divider> -->
    <div class="centered-buttons ui segment  ">
      <sui-button-group basic
                        v-for="p in allParams"
                        :key="p">
        <sui-button @click="selectParam(p)"
                    compact
                    :class="{active: p === selection.activeParam}">
          {{p}}
        </sui-button>
      </sui-button-group>
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

#selection-params {
  .centered-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  // .ui.button {
  //   background: $darkWhite;
  // }
  .ui.buttons > button {
    // background: $offWhite;
    &.active {
      background: lighten($lightGrey, 5%);
      box-shadow: inset 3 0 3px #000000;
    }
  }
}
</style>
