<template>
  <div v-if="data.selectedStation"
       class="container"
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
      data: state => state.data
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
      return data;
    }
  },
  data: function() {
    return {
      //     tableData: [
      //       { id: 1, name: "John", age: "20" },
      //       { id: 2, name: "Jane", age: "24" },
      //       { id: 3, name: "Susan", age: "16" },
      //       { id: 4, name: "Chris", age: "55" },
      //       { id: 5, name: "Dan", age: "40" }
      //     ],
      options: {
        filterable: false,
        pagination: {
          dropdown: false
        },
        // see the options API
        perPage: 25
        // sortIcon: {
        //   base: "glyphicon",
        //   up: "glyphicon-chevron-up",
        //   down: "glyphicon-chevron-down",
        //   is: "glyphicon-sort"
        // }
        // sortable: ["date"],
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
