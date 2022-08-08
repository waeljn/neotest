<template>
  <header :class="theme">
    <div class="container">
      <div class="col-md-8 mb-3">
        <p>{{ $t("featured.text") }}</p>

        <search-form v-if="map" @place-changed="handlePlaceChange" />
      </div>
      <div class="col-md-12">
        <maps
          :center="center"
          :zoom="zoom"
          :key="center.lat"
          :events="events"
          @map-loaded="handleMapLoaded"
          @position-marked="handlePositionMarking"
          @add-to-comparaison="handleAddToComparaison"
          @update-events="handleUpdateEvents"
        />
      </div>
      <p class="lead col-md-12 mt-2">
        <i class="fa fa-map-marker text-success mr-1"></i>
        <small>{{ $t("featured.legend_sport") }}</small>
        <i class="fa fa-map-marker text-danger ml-4 mr-1"></i>
        <small>{{ $t("featured.legend_cultural") }}</small>
      </p>
    </div>
  </header>
</template>

<script>
import SearchForm from "@/components/featured/maps/search-form";
import Maps from "@/components/featured/maps/index.vue";
import firebase from "firebase";
export default {
  props: {
    zoomProp: {
      type: Number,
      default: undefined,
    },
    centerProp: {
      type: Object,
      default: undefined,
    },
    theme: {
      type: String,
      default: "bg-primary text-white"
    }
  },
  data() {
    return {
      map: null,
      longitude: null,
      latitude: null,
      events: [],
      center: { lat: 36.7951872, lng: 10.1941248 },
      zoom: 12,
      gmara: false
    };
  },
  components: {
    SearchForm,
    Maps,
  },
  mounted() {
    const firestore = firebase.firestore();
    const collection = firestore.collection("events");
    collection
      .get()
      .then(({ docs }) => {
        docs.forEach((event) => {
          const position = {
            lat: event.data().latitude,
            lng: event.data().longitude,
          };
          const data = {
            ...event.data(),
          };
          const sub = { position, data };
          this.events.push(sub);
        });
      })
      .catch((error) => console.log(error));
  },
  methods: {
    handleMapLoaded(map) {
      this.map = map;
      if (this.centerProp !== undefined) {
        this.center = this.centerProp;
      }
      if (this.zoomProp !== undefined) {
        this.zoom = this.zoomProp;
      }
    },
    handlePlaceChange(place) {
      this.center = place.center;
      this.zoom = place.zoom;
    },
    handlePositionMarking(position) {
      this.longitude = position.longitude;
      this.latitude = position.latitude;
      this.gmara = true
    },
    handleAddToComparaison($event) {
      this.$emit("add-to-comparaison", $event);
    },
    handleUpdateEvents() {
      const firestore = firebase.firestore();
      const collection = firestore.collection("events");
      collection
        .get()
        .then(({ docs }) => {
          docs.forEach((event) => {
            const position = {
              lat: event.data().latitude,
              lng: event.data().longitude,
            };
            const data = {
              ...event.data(),
            };
            const sub = { position, data };
            this.events.push(sub);
          });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
.bg-wael {
  background-color: gray;
}
</style>