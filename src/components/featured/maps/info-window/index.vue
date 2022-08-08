<template>
  <gmap-info-window
    :options="options"
    :position="infoWindow.position"
    :opened="infoWindow.open"
    @closeclick="infoWindow.open = false"
    @mouseleave="infoWindow.open = false"
  >
    <infos
      @mouse-left="infoWindow.open = false"
      :event="event"
      @view-event="$emit('view-event', event)"
    />
  </gmap-info-window>
</template>

<script>
import Infos from "./infos";
export default {
  props: {
    infoWindow: {
      type: Object,
      default: undefined,
    },
    event: {
      type: Object,
      default: undefined,
    },
  },
  components: { Infos },
  data() {
    return {
      options: { maxWidth: 400 },
    };
  },
};
</script>

<style lang="scss" scoped></style>
