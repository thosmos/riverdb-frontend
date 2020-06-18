<template>
  <modal name="safetoswim-modal"
         scrollable
         height="auto"
         width="80%"
         @closed="modalClosed">
    <div id="safetoswim-modal">
      <!-- <h3 is="sui-header"
          textAlign="center">{{ui.showInfoModalStation.StationName}}</h3> -->
      <sui-grid>
        <sui-grid-row :columns="1">
          <sui-grid-column>
            <div>
              <!-- STUFF {{ui.showInfoModalStation.values}} -->
              <charts-safe-swim class="chart chart-spacer"
              :swimstation="ui.showInfoModalStation"></charts-safe-swim>
            </div>
          </sui-grid-column>
        </sui-grid-row>
        <!-- <sui-grid-row :columns="2">
          <sui-grid-column>
            <b>Waterbody: </b>
            <span>{{ui.showInfoModalStation.LocalWaterbody}}</span>
          </sui-grid-column>
          <sui-grid-column>
            <b>Watershed: </b>
            <span>{{ui.showInfoModalStation.LocalWatershed}}</span>
          </sui-grid-column>
          <sui-grid-column>
            <b>Riverfork: </b>
            <span>{{fork()}}</span>
          </sui-grid-column>
          <sui-grid-column>
            <b>Station ID: </b>
            <span>{{ui.showInfoModalStation.StationID}}</span>
          </sui-grid-column>
          <sui-grid-column>
            <b>Latitude: </b>
            <span>{{ui.showInfoModalStation.TargetLat}}</span>
          </sui-grid-column>
          <sui-grid-column>
            <b>Longitude: </b>
            <span>{{ui.showInfoModalStation.TargetLong}}</span>
          </sui-grid-column>
        </sui-grid-row> -->
        <!-- <sui-grid-row> -->
        <!-- <sui-grid-column centered> -->

        <!-- <img id="station-image" />
        <skeleton v-if="imgLoading"
                  id="img-placeholder"></skeleton> -->
        <!-- <sui-grid-row :columns="1">
          <sui-grid-column>
            <div v-if="stationWatershed">
              <station-info-map v-if="stationWatershed"
                                :station="ui.showInfoModalStation"
                                :watershed="stationWatershed"></station-info-map>
            </div>
          </sui-grid-column>
        </sui-grid-row> -->
      </sui-grid>
    </div>
  </modal>
</template>

<script>
import Skeleton from "./Skeleton";
import StationInfoMap from "./StationInfoMap";
import OrgPageOverviewMap from "./OrgPageOverviewMap";
import forkNames from "../assets/riverForkNames.js";
import { CLOUDINARY_URL } from "../assets/constants.js";
import { mapState } from "vuex";
import axios from "axios";
import { WS_API_IP, WS_API_PORT } from "../assets/constants";
import ChartsSafeSwim from "../components/ChartsSafeSwim";

export default {
  name: "StationInfoModal",
  components: {
    Skeleton,
    StationInfoMap,
    OrgPageOverviewMap,
    ChartsSafeSwim
  },
  props: {
    station: Object
  },
  data() {
    return {
      imgLoading: true,
      imgError: false,
      stationWatershed: null
    };
  },
  mounted() {
    this.showModal();
    // axios
    //   .get(this.imageURL, { responseType: "blob" })
    //   .then(res => {
    //     let imageElement = document.getElementById("station-image");
    //     let reader = new window.FileReader();
    //     reader.readAsDataURL(res.data);
    //     this.imgLoading = false;
    //     reader.onload = function() {
    //       let imageDataUrl = reader.result;
    //       imageElement.setAttribute("src", imageDataUrl);
    //       imageElement.style.height = "400px";
    //       imageElement.style.width = "auto";
    //       imageElement.style.maxWidth = "100%";
    //       imageElement.style.padding = "0";
    //       imageElement.style.boxShadow = "0px 7px 24px 3px rgba(0,0,0,0.25)";
    //       imageElement.style.borderRadius = "5px";
    //       imageElement.style.margin = "0 auto";
    //     };
    //   })
    //   .catch(err => {
    //     this.imgLoading = false;
    //     this.imgError = true;
    //   });
    // axios
    //   .get(
    //     `http://${WS_API_IP}:${WS_API_PORT}?river=${
    //       this.ui.showInfoModalStation.StationCode
    //     }`
    //   )
    //   .then(res => {
    //     this.stationWatershed = res.data.info;
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  },
  computed: {
    ...mapState({
      organization: state => state.organization,
      ui: state => state.ui,
      data: state => state.data
    }),
    organizationName: function() {
      return this.organization.activeOrganization;
    },
    imageURL: function() {
      console.log("PROJECT IMAGE", this.organizationName, this.ui.showInfoModalStation.StationID)
      // TODO _1 is for RM project, will have to be flexible in the end
      let str = `${CLOUDINARY_URL}/${this.organizationName}_1/${
        this.ui.showInfoModalStation.StationID
      }.jpg`;
      return str;
    }
  },
  watch: {
    ui: {
      handler: function(val, oldVal) {
        if (val.showSafetoswim) {
          this.showModal();
        } else {
          this.hideModal();
        }
      },
      deep: true
    }
  },
  methods: {
    fork: function() {
      if (forkNames[this.ui.showInfoModalStation.ForkTribGroup]) {
        return forkNames[this.ui.showInfoModalStation.ForkTribGroup];
      } else {
        return this.ui.showInfoModalStation.ForkTribGroup;
      }
    },
    modalClosed() {
      this.$store.commit("ui/TOGGLE_SAFETOSWIM_MODAL", null);
    },
    showModal() {
      this.$modal.show("safetoswim-modal");
    },
    hideModal() {
      this.$modal.hide("safetoswim-modal");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/style.scss";

#safetoswim-modal {
  margin: 2rem;
  z-index: 3000;
  .column {
    margin: 0.25rem 0;
  }
}
#img-placeholder {
  height: 400px;
  width: 100%;
}
#station-image {
  height: 0;
}
.v--modal-overlay {
  background: rgba(0, 0, 0, 0.6);
}
.v--modal.v--modal-box {
  background: $midWhite;
}
.img-error-msg {
  text-align: center;
  margin-top: 1rem;
}
.v--modal-box.v--modal {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
