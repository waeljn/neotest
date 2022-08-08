<template>
  <div class="d-flex">
    <div class="image-holder">
      <img :src="photo" class="image" />
    </div>
    <div class="ml-2 d-flex flex-column justify-content-around">
      <div class="text-dark" v-show="strong">
        <b>
          {{ title }} (owner)
          <i class="fa fa-check"></i>
        </b>
      </div>
      <div class="text-dark" v-show="!strong">{{ title }}</div>
      <small class="text-muted">{{ subtitle }}</small>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: String,
      default: process.env.BASE_URL + 'images/avatar.png',
    },
    title: {
      type: String,
      default: undefined,
    },
    subtitle: {
      type: String,
      default: undefined,
    },
    strong: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.image-holder {
  height: 48px;
  width: 48px;
}
.image {
  height: 48px;
  width: 48px;
  border-radius: 24px;
}
</style>
