<template>
  <div v-if="data.selectedStation"
       id="table">
    <div class="ui segment"
         s>
      <h3 is="sui-header"
          textAlign="center">{{data.selectedStation.info.StationName}}</h3>

      <v-client-table :data="tableData"
                      :columns="columns"
                      :options="options"></v-client-table>
    </div>
  </div>
</template>

<script>
import uniq from "lodash/uniq";
import { mapState } from "vuex";
import remove from "lodash/remove";

export default {
  name: "DataTable",
  computed: {
    ...mapState({
      data: state => state.data,
      selection: state => state.selection
    }),
    columns: function() {
      let temp =
        (this.data &&
          this.data.selectedStation &&
          this.data.selectedStation.meta &&
          this.data.selectedStation.meta.params) ||
        [];
      if (!Object.keys(temp).includes("date)")) {
        temp.unshift("date");
      }
      if (temp.includes("null_null")) {
        remove(temp, o => o === "null_null");
      }
      return uniq(temp);
    },
    tableData: function() {
      let rawData =
        (this.data &&
          this.data.selectedStation &&
          this.data.selectedStation.data) ||
        [];
      let data = [];
      // Build up all years data
      rawData.map(d => {
        let fields = {};
        Object.keys(d.results).map(k => {
          fields[k] = d.results[k].mean;
        });
        fields.date = d.date;
        if (fields.date.length > 0) {
          data.push(fields);
        }
      });
      // Reduce by selectionRange
      let start = this.selection.selectionRange[0];
      let end = this.selection.selectionRange[1];
      let selectedYearData = [];
      data.map(d => {
        let year = new Date(d.date).getFullYear();
        if (d.date && year >= start && year <= end) {
          selectedYearData.push(d);
        }
      });
      return selectedYearData;
    }
  },
  data: function() {
    return {
      options: {
        filterable: false,
        pagination: {
          dropdown: false
        },
        // see the options API
        perPage: 25
        // TODO: sort icon
      }
    };
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#table {
  td {
    padding: 2px 5px;
  }
}
</style>
