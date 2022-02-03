<script>
  export default {
    props: {
      name: {
        type: String,
        default: 'John',
        validator: (value) => {
          return value !== ''
        },
      },
    },
  }
</script>

<template>
  <p>Välkommen, {{ name }}!</p>
</template>

<style lang="scss" scoped></style>
