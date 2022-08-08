<template>
  <div
    class="modal fade"
    id="eventDetailsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            :class="`modal-title with-pointer ${
              step === 'COMMENTS' ? 'text-muted' : ''
            }`"
            @click="handleSetStep('DETAILS')"
          >
            Details
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="handleToggleModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <report v-show="step === 'DETAILS'" v-if="event" :event="event" />
        </div>
        <div class="modal-footer">
          <button
            @click="handleToggleModal"
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleAddUpdate(event)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const $ = window.$
import Report from './report'
import firebase from 'firebase'
import { randomString } from '@/utils'
import { RANDOM_CARTOON_AVATAR_URL } from '@/constants'
export default {
  props: {
    eventProp: {
      type: Object,
      default: undefined,
    },
  },
  components: {
    Report,
  },
  data() {
    return {
      event: undefined,
      step: 'DETAILS',
      displayName: undefined,
      photoURL: undefined,
      userId: undefined,
      loading: false,
    }
  },
  mounted() {
    if (this.eventProp) {
      this.event = this.eventProp
    }

    this.displayName = 'Guest_' + randomString(5)
    this.photoURL =
      RANDOM_CARTOON_AVATAR_URL + Math.floor(Math.random() * 100) + '.png'

    const user = firebase.auth().currentUser
    if (user && user.displayName) {
      this.displayName = user.displayName
    }
    if (user && user.photoURL) {
      this.photoURL = user.photoURL
    }
    if (user && user.uid) {
      this.userId = user.uid
    }
  },
  methods: {
    handleSetStep(step) {
      this.step = step
    },
    handleToggleModal() {
      $('#eventDetailsModal').modal('toggle')
    },
    handleAddUpdate(event) {
      this.handleToggleModal()
      this.$emit('add-to-comparaison', event)
    },
    handleAddComment($event) {
      const comment = {
        text: $event,
        id: randomString(15),
        displayName: this.displayName,
        creationTime: new Date().getTime(),
        photoURL: this.photoURL,
      }
      if (this.userId) {
        comment['userId'] = this.userId
      }
      const comments = [...this.event.comments, comment]
      const firestore = firebase.firestore()
      const collection = firestore.collection('events')
      this.loading = true
      collection
        .doc(this.event.id)
        .update({
          comments,
        })
        .then(() => {
          collection
            .doc(this.event.id)
            .get()
            .then((response) => {
              this.event = response.data()
              this.$emit('update-events')
              this.loading = false
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style scoped>
.with-pointer {
  cursor: pointer;
}
</style>
