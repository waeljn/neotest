<template>
  <div class="root">
    <img class="loader" src="/images/loading.gif" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.root {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.loader {
  height: 256px;
}
</style>