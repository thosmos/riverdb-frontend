<template>
  <div id="flow-page">
    <sui-container>
      <div class="ui center aligned large header">Flow Information:</div>
      <div class="ui center segment">
        <div class="centered-buttons ui ">
          <div v-for="p in periods"
               :key="p">
            <sui-button @click="selectPeriod(p)"
                        :class="{active: p === period}"
                        compact>
              {{buttonLabel(p)}}
            </sui-button>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <div v-for="i in 7"
             :key="i">
          <skeleton class="graph-skeleton"></skeleton>
        </div>
      </div>
      <div>
        <div v-for="station in stationsCode"
             :key="station">
          <FlowGraph :code="station"
                     :key="`${station}-${key}`"
                     :station="stationInfo(station)"
                     :data="info[station]"></FlowGraph>
        </div>
      </div>
    </sui-container>
  </div>

</template>

 <script>
import FlowGraph from "../components/FlowGraph.vue";
import Skeleton from "../components/Skeleton";
import axios from "axios";
import find from "lodash/find";
import { stations } from "../assets/flowsStations.js";
import { FLOW_API_PORT, FLOW_API_IP } from "../assets/constants";

export default {
  name: "FlowPageWrapper",
  components: { FlowGraph, Skeleton },
  data() {
    return {
      info: {},
      periods: [7, 30, 90, 365],
      period: 7,
      loading: true,
      key: 1
    };
  },
  mounted() {
    let url =
      process.env.NODE_ENV === "development"
        ? `http://localhost:3020/?days=${this.period}`
        : `http://${FLOW_API_IP}:${FLOW_API_PORT}/?days=${this.period}`;
    console.log("url", url);
    axios
      .get(url)
      .then(res => {
        this.info = res.data;
        this.loading = false;
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
    stationInfo: function(abbr) {
      return find(this.stations, o => o.code === abbr);
    },
    buttonLabel: function(p) {
      return `${p} days`;
    },
    selectPeriod: function(p) {
      this.loading = true;
      this.info = {};
      this.period = p;
      let url =
        process.env.NODE_ENV === "development"
          ? `http://localhost:3020/?days=${p}`
          : `http://${FLOW_API_IP}:${FLOW_API_PORT}/?days=${p}`;
      axios
        .get(url)
        .then(res => {
          this.loading = false;
          this.info = res.data;
          // Needs new key for chart refresh!
          this.key++;
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style lang="scss" >
@import "../style/style.scss";

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
  .active {
    font-weight: bold;
    color: $offWhite;
    background: $primaryColor;
  }
  margin-bottom: 50px;
  .graph-skeleton {
    height: 400px;
    margin-bottom: 50px;
  }
}
</style>
