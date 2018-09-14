<template>
  <div id="flow-page">
    <sui-container>
      <h1>Flows</h1>
      <div class="ui center segment">
        <div class="centered-buttons ui ">
          <sui-button-group basic
                            v-for="p in periods"
                            :key="p">
            <sui-button @click="selectPeriod(p)"
                        compact>
              {{buttonLabel(p)}}
            </sui-button>
          </sui-button-group>
        </div>
      </div>
    </sui-container>
  </div>
</template>

<script>
import axios from "axios";
import { stations } from "../assets/flowsStations.js";
export default {
  name: "FlowPageWrapper",
  data() {
    return {
      info: [],
      periods: [7, 30, 365],
      period: 7
    };
  },
  async mounted() {
    let url = `http://localhost:3000/?days=${this.period}`;
    axios
      .get(url)
      .then(res => {
        console.log("res.data", res.data);
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  computed: {
    stationArr: function() {
      return stations.map(s => s.code);
    }
  },
  methods: {
    buttonLabel: function(p) {
      return `${p} days`;
    },
    selectPeriod: function(p) {
      console.log("p", p);

      let url = `http://localhost:3000/?days=${p}`;
      axios
        .get(url)
        .then(res => {
          console.log("res.data", res.data);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style>
</style>
