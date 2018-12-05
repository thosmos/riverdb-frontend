<template>
  <modal name="station-info-modal"
         scrollable
         height="auto"
         width="50%"
         @closed="modalClosed">
    <div id="station-info-modal">
      <h3 is="sui-header"
          textAlign="center">{{ui.showInfoModalStation.StationName}}</h3>
      <sui-grid>
        <sui-grid-row :columns="2">
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
        </sui-grid-row>

        <img id="station-image" />
        <skeleton v-if="imgLoading"
                  id="img-placeholder"></skeleton>
        <!-- <sui-image :src="imageURL"
                 fluid /> -->
      </sui-grid>
      <div v-if="imgError"
           class="img-error-msg"> <b>No image available for the site</b></div>
    </div>
  </modal>
</template>

<script>
import Skeleton from "./Skeleton";
import forkNames from "../assets/riverForkNames.js";
import { CLOUDINARY_URL } from "../assets/constants.js";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "StationInfoModal",
  components: {
    Skeleton
  },
  props: {
    station: Object
  },
  data() {
    return {
      imgLoading: true,
      imgError: false
    };
  },
  mounted() {
    this.showModal();
    axios
      .get(this.imageURL, { responseType: "blob" })
      .then(res => {
        let imageElement = document.getElementById("station-image");
        let reader = new window.FileReader();
        reader.readAsDataURL(res.data);
        this.imgLoading = false;
        reader.onload = function() {
          let imageDataUrl = reader.result;
          imageElement.setAttribute("src", imageDataUrl);
          imageElement.style.height = "400px";
          imageElement.style.width = "auto";
          imageElement.style.maxWidth = "100%";
          imageElement.style.padding = "0";
          imageElement.style.boxShadow = "0px 7px 24px 3px rgba(0,0,0,0.25)";
          imageElement.style.borderRadius = "5px";
          imageElement.style.margin = "0 auto";
        };
      })
      .catch(err => {
        this.imgLoading = false;
        this.imgError = true;
      });
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
      let str = `${CLOUDINARY_URL}/${this.organizationName}/${
        this.ui.showInfoModalStation.StationID
      }.jpg`;
      return str;
    }
  },
  watch: {
    ui: {
      handler: function(val, oldVal) {
        if (val.showInfoModal) {
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
      this.$store.commit("ui/TOGGLE_STATION_INFO_MODAL", null);
    },
    showModal() {
      this.$modal.show("station-info-modal");
    },
    hideModal() {
      this.$modal.hide("station-info-modal");
    }
  }
};
</script>

<style lang="scss">
@import "../style/style.scss";
#station-info-modal {
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
</style>
