<template>
  <button
    class="btn btn-dark fab btn-rounded"
    id="btn-add-event"
    data-toggle="tooltip"
    data-placement="top"
    title="Add your own event"
    @click="handleFabActionClick"
  >
    Add event
  </button>
</template>

<script>
const $ = window.$;
import firebase from "firebase";
export default {
  methods: {
    handleFabActionClick() {
      if (firebase.auth().currentUser) {
        $("#btn-add-event").tooltip("hide");
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.$router.push({ path: "/events/new" });
      } else {
        this.$emit("toggle-modal");
      }
    },
  },
};
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 48px;
  right: 48px;
}
.btn-rounded {
  border-radius: 24px;
  box-shadow: 0px 4px 2px #333;
}
</style>
