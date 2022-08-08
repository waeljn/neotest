<template>
  <div v-if="event" class="container" @mouseleave="handleMouseLeave">
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-row">
          <div class="image-holder">
            <img
              class="image"
              :src="event.photoURL"
              v-if="event.photoURL"
            />
            <img class="image" :src="defaultPhoto" v-else />
          </div>
          <div
            class="texts-holder d-flex flex-column justify-content-around ml-2"
          >
            <div class="text-dark">
              {{ event.displayName }}
            </div>
            <div class="text-muted">
              Tested in
              <span v-if="event.creationTime">{{
                new Date(event.creationTime).toDateString()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4">
        <div>Title</div>
        <p class="text-muted mt-1">{{ event.title }}</p>
      </div>
      <div class="col-4">
        <div>Type</div>
        <p class="text-muted mt-1">{{ event.type }}</p>
      </div>
      <div class="col-4">
        <div>Start Time</div>
        <p class="text-muted mt-1 text-capitalize">{{ event.startTime }}</p>
      </div>
    </div>
    <div class="row mt-2 mb-2">
      <div class="col-12">
        <button
          class="btn btn-primary btn-sm pull-right float-right"
          @click="$emit('view-event')"
        >
          View details
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: { type: Object, default: undefined },
  },
  data() {
    return {
      defaultPhoto: process.env.BASE_URL + "images/avatar.png",
    };
  },
  methods: {
    handleMouseLeave() {
      this.$emit("mouse-left");
    },
  },
};
</script>

<style scoped>
.container {
  color: black;
  width: 360px;
  color: black;
  overflow: hidden;
}
.image-holder {
  width: 48px;
  height: 48px;
}
.image {
  width: 48px;
  height: 48px;
  border-radius: 24px;
}
</style>
