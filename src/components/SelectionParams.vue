<template>
  <div id="selection-params"
       class="m-t-xl ui segment">
    <div class="centered-buttons ui ">
      <sui-button-group basic
                        v-for="p in allParams"
                        :key="p">
        <sui-button @click="selectParam(p, $event)"
                    compact
                    :class="{active: p === selection.activeParam}">
          {{parameterName(p)}}
        </sui-button>
      </sui-button-group>
      <div class="centered-buttons ui">
        <div v-if="canHaveSecondaryParam()"
             class="p-t-md">
          <sui-divider></sui-divider>
          <small>
            <b>Secondary Parameter: </b>
          </small>
          <br/>
          <sui-button-group basic
                            class="secondary-param"
                            v-for="(p2,index) in allParams"
                            :key="index">
            <sui-button v-if="p2 !== selection.activeParam"
                        @click="selectSecondaryParam(p2, $event) "
                        compact
                        :class="{active: p2===selection.secondaryParam}
            "> {{parameterName(p2)}}
            </sui-button>
          </sui-button-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";
import names from "../assets/parameterNames.js";

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
      // remove date
      const dateRegex = RegExp("date");
      temp = temp.filter(t => !dateRegex.test(t));
      // return alphabetically sorted
      return temp.sort();
    }
  },
  methods: {
    parameterName: function(p) {
      try {
        return names[p].text;
      } catch (err) {
        return "";
      }
    },
    canHaveSecondaryParam: function() {
      if (
        // only LINE charts work with secondary param
        this.selection.chartType === "LINE_MULTI" ||
        this.selection.chartType === "LINE_SINGLE"
      ) {
        if (this.data.loadedStations.length === 1) {
          // only allows secondaryParam if only one station is selected
          return true;
        }
      }
      return false;
    },
    selectParam: function(param, $event) {
      this.$store.commit("data/GENERATE_KEY");
      if (!$event.shiftKey) {
        this.$store.commit("selection/SELECT_ACTIVE_PARAM", param);
        this.$ga.event("Select", "Param  ", param);
      }
    },
    selectSecondaryParam: function(param) {
      if (param === this.selection.secondaryParam) {
        this.$store.commit("selection/SELECT_SECONDARY_PARAM", null);
      }
      // param is different from activeParam
      else if (param !== this.selection.activeParam) {
        this.$store.commit("selection/SELECT_SECONDARY_PARAM", param);
        this.$ga.event("Select", "Secondary Param  ", param);
      }
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
    &.secondaryActive {
      background: lighten($lightGrey, 10%) !important;
      box-shadow: inset 3 0 3px #000000;
      color: $primaryColor !important;
    }
  }
  div.secondary-param {
    button {
      font-size: 0.85srem;
    }
  }
}
</style>
