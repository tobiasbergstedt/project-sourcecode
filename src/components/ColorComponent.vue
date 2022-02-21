<script>
  export default {
    data() {
      return {
        color: 'red',
      }
    },
    emits: ['emit-color'],
    methods: {
      onClick() {
        this.$emit('emit-color', this.color)
      },
    },
  }
</script>

<template>
  <input
    type="button"
    @click="onClick"
    value="Klicka här för att se vilken färgen är."
  />
</template>

<style lang="scss" scoped>
  p {
    cursor: pointer;
  }
</style>
