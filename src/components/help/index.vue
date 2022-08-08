<template>
  <section id="help" class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2>{{ $t("help.title") }}</h2>
          <p class="lead">
            {{ $t("help.description") }}
          </p>
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h4 class="mb-5">{{ $t("help.partners") }}</h4>
          <images-carousel />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ImagesCarousel from "@/components/images-carousel";
export default {
  components: {
    ImagesCarousel,
  },
};
</script>

<style lang="scss" scoped></style>
