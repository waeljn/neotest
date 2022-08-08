<template>
  <div class="d-flex">
    <vue-google-autocomplete
      :enable-geolocation="true"
      :geolocationOptions="{}"
      :country="['tn']"
      types="(cities)"
      id="map"
      classname="form-control"
      placeholder="Start typing"
      v-on:placechanged="handlePlaceChange"
    >
    </vue-google-autocomplete>
    <button
      class="btn btn-primary d-flex align-items-center"
      data-toggle="tooltip"
      data-placement="top"
      title="Validate the search term"
    >
      <i class="fa fa-search mr-2"></i> Search
    </button>
    <button
      class="btn btn-secondary d-flex align-items-center"
      data-toggle="tooltip"
      data-placement="top"
      title="Find your location automatically"
      @click="handleAutoLocation"
    >
      <i v-show="loading" class="fa fa-circle-o-notch fa-spin mr-2"></i
      ><span v-show="loading">Finding</span>

      <i v-show="!loading" class="fa fa-map-marker mr-2"></i
      ><span v-show="!loading">Location</span>
    </button>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { getAccurateCurrentPosition } from "./geo";
export default {
  components: { VueGoogleAutocomplete },
  data() {
    return { loading: false };
  },
  methods: {
    handlePlaceChange(data) {
      this.$emit("place-changed", {
        center: { lat: data.latitude, lng: data.longitude },
        zoom: 16,
      });
    },
    handleAutoLocation() {
      if (navigator.geolocation) {
        this.loading = true;
        const that = this;
        getAccurateCurrentPosition(
          function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            that.loading = false;
            that.$emit("place-changed", {
              center: { lat, lng },
              zoom: 18,
            });
          },
          function(error) {
            console.log(error);
          },
          function(progress) {
            console.log(progress);
          },
          {
            maximumAge: 600000,
            timeout: 10000,
            enableHighAccuracy: true,
          }
        );
      } else {
        // Fallback for no geolocation
        console.log("No geolocation available.");
      }
    },
  },
};
</script>

<style scoped>
.btn-lg {
  width: 240px;
}
</style>
