<template>
  <!-- Footer -->
  <footer class="py-5 bg-dark">
    <div class="container d-flex justify-content-center align-items-center">
      <p class="m-0 text-center text-white d-inline mr-2">
        Copyright &copy; Neopolis
      </p>
      <locale-changer />
    </div>
    <!-- /.container -->
    <tutorial-modal ref="tutorial-modal" />
  </footer>
</template>

<script>
import LocaleChanger from "./locale-changer";
import TutorialModal from "@/components/help/tutorial/modal";

export default {
  components: { LocaleChanger, TutorialModal },
  methods: {
    handleToggleModal() {
      this.$refs["tutorial-modal"].handleToggleModal();
    },
  },
};
</script>

<style scoped>
.with-cursor {
  cursor: pointer;
}
</style>
