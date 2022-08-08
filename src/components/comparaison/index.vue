<template>
  <section id="comparaison">
    <div class="container">
      <div class="row mx-auto">
        <comparaison-table :elements="elements" @remove="handleRemoveElement" @clear="$emit('clear')" />
      </div>
    </div>
  </section>
</template>

<script>
import ComparaisonTable from "@/components/comparaison/table";
export default {
  props: {
    elements: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { ComparaisonTable },
  methods: {
    handleRemoveElement(index){
      this.$emit('remove', index)
    }
  }
};
</script>

<style lang="scss" scoped></style>
