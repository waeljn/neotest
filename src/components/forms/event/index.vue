<template>
  <div class="col-md-10 mx-auto mt-5">
    <event-details ref="event-details" />
    <div class="mt-3"></div>
    <button
      class="btn btn-primary mt-4 mb-4"
      @click="handleClickSubmit"
      :disabled="loading"
    >
      <i v-show="loading" class="fa fa-circle-o-notch fa-spin"></i>
      Submit your test
    </button>
    <hr />
    <div class="mt-5"></div>
  </div>
</template>

<script>
import EventDetails from '@/components/forms/event/details'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    remoteLoading: {
      type: Boolean,
      default: false,
    },
    isEmployee: {
      type: Boolean,
      default: false,
    },
  },
  components: { EventDetails },
  methods: {
    handleClickSubmit() {
      const { title, type, startTime, description, picture } = this.$refs[
        'event-details'
      ]
      let e = {
        title,
        type,
        startTime,
        description,
        picture,
      }
      this.$emit('submit', e)
    },
  },
}
</script>

<style scoped></style>
