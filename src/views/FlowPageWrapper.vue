<template>
  <div id="flow-page">
    <sui-container>
      <h1>Flows</h1>
      <div class="ui center segment">
        <div class="centered-buttons ui ">
          <div v-for="p in periods"
               :key="p">
            <sui-button @click="selectPeriod(p)"
                        compact>
              {{buttonLabel(p)}}
            </sui-button>
          </div>
        </div>
      </div>
      <div>
        <div v-for="station in stationsCode"
             :key="station">
          <FlowGraph :code="station"
                     :data="info[station]"></FlowGraph>
        </div>
      </div>
    </sui-container>
  </div>

</template>

<script>
import FlowGraph from "../components/FlowGraph.vue";
import axios from "axios";
import { stations } from "../assets/flowsStations.js";
export default {
  name: "FlowPageWrapper",
  components: { FlowGraph },
  data() {
    return {
      info: {},
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
        this.info = res.data;
      })
      .catch(err => {
        console.log("err", err);
      });
  },
  computed: {
    stationsCode: function() {
      return stations.map(s => s.code);
    },
    stations: function() {
      return stations;
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
          this.info = res.data;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
#flow-page {
  .centered-buttons {
    display: flex;
    flex-direction: row;
    > div {
      flex-grow: 1;
      padding: 0.5rem;
      > button.button {
        width: 100%;
      }
    }
  }
}
</style>
