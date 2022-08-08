<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      :options="{
        fullscreenControl: false,
      }"
      map-type-id="hybrid"
      class="maps"
      @click="handleClick"
    >
      <gmap-marker
        v-for="(event, index) in events"
        :key="index"
        :position="event.position"
        :clickable="true"
        :icon="getMarkerIcon(event)"
        @mouseover="openInfoWindowTemplate(event)"
      ></gmap-marker>

      <info-window
        :infoWindow="infoWindow"
        :event="event"
        v-if="event"
        @view-event="handleViewEvent"
      />
    </GmapMap>
    <event-data
      ref="event-data"
      :key="event.id"
      v-if="event"
      :eventProp="event"
      @add-to-comparaison="handleAddToComparaison"
      @update-events="$emit('update-events')"
    />
  </div>
</template>

<script>
var $ = window.$

import {
  RED_MARKER_IMAGE,
  GREEN_MARKER_IMAGE,
  BLUE_MARKER_IMAGE,
  ARROW_DOWN_GREEN_IMAGE,
  ARROW_DOWN_RED_IMAGE,
} from '@/constants'
import InfoWindow from './info-window'
import EventData from '@/components/event/data'

export default {
  components: { InfoWindow, EventData },
  props: {
    zoom: {
      type: Number,
      default: 12,
    },
    center: {
      type: Object,
    },
    events: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      loaded: false,
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
      },
      event: {},
    }
  },
  name: 'Maps',
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.loaded = true
      this.$emit('map-loaded', map)
    })
  },
  methods: {
    toggleModal() {
      $('#myModal').modal('toggle')
    },
    openInfoWindowTemplate(marker) {
      this.infoWindow.position = marker.position
      this.infoWindow.open = true
      this.event = marker.data
    },
    handleClick($event) {
      const latitude = $event.latLng.lat()
      const longitude = $event.latLng.lng()
      this.$emit('position-marked', {
        latitude,
        longitude,
      })
      this.events.push({
        position: { lat: latitude, lng: longitude },
      })
    },
    handleViewEvent() {
      this.$refs['event-data'].handleToggleModal()
    },
    handleAddToComparaison($event) {
      this.$emit('add-to-comparaison', $event)
    },
    getMarkerIcon({ data }) {
      const event = data
      if (event && event.type === 'cultural') {
        const { latitude, longitude } = this.$route.query
        if (
          latitude !== undefined &&
          longitude !== undefined &&
          event &&
          event.latitude !== undefined &&
          event.longitude !== undefined &&
          event.longitude == longitude &&
          event.latitude == latitude
        ) {
          return ARROW_DOWN_RED_IMAGE
        }
        return RED_MARKER_IMAGE
      } else if (event && event.type !== undefined) {
        const { latitude, longitude } = this.$route.query
        if (
          latitude !== undefined &&
          longitude !== undefined &&
          event.latitude !== undefined &&
          event.longitude !== undefined &&
          event.longitude == longitude &&
          event.latitude == latitude
        ) {
          return ARROW_DOWN_GREEN_IMAGE
        }
        return GREEN_MARKER_IMAGE
      }
      return BLUE_MARKER_IMAGE
    },
  },
}
</script>

<style scoped>
.maps {
  width: 100%;
  height: 400px;
}
</style>
