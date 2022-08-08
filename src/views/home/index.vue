<template>
  <div>
    <navbar @toggle-modal="handleToggleModal" />
    <featured
      :centerProp="center"
      :zoomProp="zoom"
      @add-to-comparaison="handleAddToComparaison"
    />
    <app-footer />
    <fab @toggle-modal="handleToggleModal" />
    <authentication-form ref="authentication-form" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/navbar";
import Featured from "@/components/featured";
import AppFooter from "@/components/app-footer";
import Fab from "@/components/buttons/fab";
import AuthenticationForm from "@/components/forms/authentication";
export default {
  data() {
    return {
      center: undefined,
      zoom: undefined,
      comparaisonElements: [],
    };
  },
  name: "Home",
  components: {
    Navbar,
    Featured,
    AppFooter,
    Fab,
    AuthenticationForm,
  },
  mounted() {
    const { latitude, longitude } = this.$route.query;
    if (latitude !== undefined && longitude !== undefined) {
      this.center = {
        lat: Number(latitude),
        lng: Number(longitude),
      };
      this.zoom = 18;
    }
    setTimeout(() => {
      this.$refs["tutorial-modal"].handleToggleModal();
    }, 1000);
  },
  methods: {
    handleToggleModal() {
      this.$refs["authentication-form"].handleToggleModal();
    },
    handleAddToComparaison($event) {
      if (this.comparaisonElements.length < 4) {
        this.comparaisonElements.push($event);
      } else {
        alert(
          "You cannot add any element to compare, you already have 4 elements."
        );
      }
    },
    handleRemoveElement(index) {
      if (confirm("Are you sure to delete this item?")) {
        this.comparaisonElements.splice(index, 1);
      }
    },
    handleClearElements() {
      if (confirm("Are you sure to clear all items?")) {
        this.comparaisonElements = [];
      }
    },
  },
};
</script>
<style scoped>
header {
  padding: 156px 0 100px;
}

section {
  padding: 150px 0;
}
</style>
