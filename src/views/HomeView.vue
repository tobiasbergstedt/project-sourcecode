<script>
  import ShowsList from '../components/ShowsList.vue'

  export default {
    data() {
      return {
        showName: '',
      }
    },
    components: {
      ShowsList,
    },
  }
</script>

<template>
  <div class="container my-container">
    <h1>Home</h1>
    <ShowsList />
  </div>
</template>

<style lang="scss" scoped>
  .my-container {
    text-align: center;
  }
</style>
