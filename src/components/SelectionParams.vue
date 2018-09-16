<template>
  <div id="selection-params"
       class="">
    <small v-if="canHaveSecondaryParam()">
      <b>Primary Parameter: </b>
    </small>
    <br/>
    <div class="flex-row">
      <div v-for="p in allParams"
           :key="p">
        <sui-button @click="selectParam(p, $event)"
                    :class="{active: p === selection.activeParam}">
          {{parameterName(p)}}
        </sui-button>
      </div>
    </div>
    <div v-if="canHaveSecondaryParam()"
         class="">
      <small>
        <b>Secondary Parameter: </b>
      </small>
      <br/>
      <div class="flex-row seconday-param-row">
        <div v-for="(p2,index) in allSecondaryParams"
             :key="index">
          <sui-button @click="selectSecondaryParam(p2, $event) "
                      :class="{active: p2===selection.secondaryParam}"> {{parameterName(p2)}}
          </sui-button>
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
    },
    allSecondaryParams: function() {
      return this.allParams.filter(p => p !== this.selection.activeParam);
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
  .flex-row {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    > div {
      flex-grow: 1;
      margin: 2px;
      > button.button {
        width: 100%;
      }
    }
    &.seconday-param-row > div > button.ui.button {
      font-size: 0.85rem;
    }
  }
  button.ui.button {
    border: $lightBlack solid 1px;
    background: $offWhite;
    &.active {
      background: $lightGrey;
    }
  }
}
</style>
