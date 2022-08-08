<template>
  <carousel
    :per-page="3"
    :navigate-to="someLocalProperty"
    :mouse-drag="true"
    :autoplay="true"
    :autoplayTimeout="3000"
    :loop="true"
  >
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/tunisie_telecom.png" />
      </div>
    </slide>
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/orange.png" />
      </div>
    </slide>
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/ooredoo.jpg" />
      </div>
    </slide>
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/topnet.png" />
      </div>
    </slide>
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/globalnet.png" />
      </div>
    </slide>
    <slide>
      <div class="d-flex justify-content-center">
        <img src="/images/providers/hexabyte.png" />
      </div>
    </slide>
  </carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
};
</script>

<style scoped>
.holder {
  background-color: red;
}
img {
  height: 100px;
}
</style>