<template>
  <div>
    <full-page-loader v-show="showLoader" />
    <div v-show="!showLoader">
      <navbar />
      <featured ref="featured" theme="bg-wael text-white" />
      <event-form
        @submit="handleSubmit"
        :loading="loading"
        :isEmployee="isEmployee"
      />
      <app-footer />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Featured from '@/components/featured'
import EventForm from '@/components/forms/event'
import AppFooter from '@/components/app-footer'
import firebase from 'firebase'
import Swal from 'sweetalert2'
import { randomString } from '@/utils'
import { BUSINESS_DOMAIN } from '../../../constants'
import FullPageLoader from '@/components/loaders/full-page-loader'
export default {
  name: 'NewEvent',
  components: {
    Navbar,
    Featured,
    EventForm,
    AppFooter,
    FullPageLoader,
  },
  data() {
    return { showLoader: true, loading: false, isEmployee: false }
  },
  mounted() {
    setTimeout(() => {
      this.showLoader = false
    }, 100)
    if (!firebase.auth().currentUser) {
      this.$router.push({ path: '/' })
    }
    if (
      firebase.auth().currentUser.email.includes(BUSINESS_DOMAIN) &&
      !firebase.auth().currentUser.emailVerified
    ) {
      alert('Please verify your email')
      location.replace('/')
    }
    if (
      firebase.auth().currentUser.email.includes(BUSINESS_DOMAIN) &&
      firebase.auth().currentUser.emailVerified
    ) {
      this.isEmployee = true
    }
  },
  methods: {
    handleSubmit(data) {
      const featured = this.$refs['featured']
      const { latitude, longitude } = featured
      if (!latitude || !longitude) {
        alert('Please pick a location on the map')
      } else {
        const {
          email,
          displayName,
          photoURL,
          uid,
        } = firebase.auth().currentUser
        const id = randomString(15)
        const event = {
          ...data,
          email,
          displayName,
          photoURL,
          uid,
          latitude,
          longitude,
          id,
        }
        const firestore = firebase.firestore()
        const collection = firestore.collection('events')
        collection
          .doc(id)
          .set(event)
          .then(() => {
            this.loading = false
            Swal.fire({
              title: 'Event created',
              text: 'Do you want to view its details?',
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'View details',
              cancelButtonText: 'Dismiss',
            }).then((result) => {
              if (result.value) {
                this.$router.push({
                  path: `/?latitude=${featured.latitude}&longitude=${featured.longitude}`,
                })
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            })
          })
          .catch((error) => {
            this.loading = false
            Swal.fire('Oops...', 'Something went wrong!', 'error')
            console.log(error)
          })
      }
    },
  },
}
</script>
<style scoped>
header {
  padding: 156px 0 100px;
}

section {
  padding: 150px 0;
}
</style>
