<template>
  <select v-model="$root.$i18n.locale" class="form-control locale-changer">
    <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
      {{ lang.toUpperCase() }}
    </option>
  </select>
</template>

<script>
export default {
  name: "locale-changer",
  data() {
    return { langs: ["fr", "en"] };
  },
};
</script>
<style scoped>
.locale-changer {
  width: 96px;
}
</style>
