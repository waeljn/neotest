<template>
  <div container="text-dark">
    <div class="row">
      <div class="col-md-6">
        <user-data
          :title="event.displayName"
          :subtitle="
            'Test time: ' + new Date(event.creationTime).toDateString()
          "
          :photo="event.photoURL || defaultPhoto"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-12">
        <h5>Event</h5>
        <div>
          <h6 class="mt-3">
            Location
            <a
              v-show="showVisit"
              v-if="event && event.latitude && event.longitude"
              :href="
                '?latitude=' + event.latitude + '&longitude=' + event.longitude
              "
              target="_blank"
            >
              <small>(Visit)</small>
            </a>
            <button
              @click="handleShare"
              v-show="showVisit"
              class="btn btn-secondary btn-sm ml-2"
            >
              <i class="fa fa-share"></i>
            </button>
            <span class="text text-muted ml-3" v-show="showText">Copied</span>
          </h6>
          <div class="row">
            <div class="col-md-4 text-dark">Latitude: {{ event.latitude }}</div>
            <div class="col-md-4 text-dark">
              Longitude: {{ event.longitude }}
            </div>
          </div>
        </div>
        <div>
          <h6 class="mt-3">
            Details
            <small>({{ event.type }})</small>
          </h6>
          <div class="row">
            <div class="col-md-4 text-dark">Title: {{ event.title }}</div>
            <div class="col-md-4 text-dark">Type: {{ event.type }}</div>
            <div class="col-md-4 text-dark">
              Start Time: {{ event.startTime }}
            </div>
          </div>
        </div>
        <div>
          <h6 class="mt-3">Description</h6>
          <div class="row">
            <p class="col-md-12 text-dark">
              {{ event.description }}
            </p>
          </div>
        </div>
        <div class="">
          <img :src="event.picture" class="picture"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserData from '../user-data'
import firebase from 'firebase'

export default {
  props: {
    event: { type: Object, default: undefined },
  },
  data() {
    return {
      defaultPhoto: process.env.BASE_URL + 'images/avatar.png',
      showText: false,
      showVisit: false,
      uid: undefined,
      userId: undefined,
    }
  },
  components: {
    UserData,
  },
  mounted() {
    if (firebase.auth().currentUser.uid === this.event.userId) {
      this.showVisit = true
    }
  },
  methods: {
    handleShare() {
      navigator.clipboard
        .writeText(
          location.host +
            '?latitude=' +
            this.event.latitude +
            '&longitude=' +
            this.event.longitude,
        )
        .then(() => {
          this.showText = true

          setTimeout(() => {
            this.showText = false
          }, 2500)
        })
        .catch((error) => alert(error))
    },
  },
}
</script>

<style scoped>
.container {
  color: black;
}
.picture{
  height: 128px;
  width: auto;
}
</style>
