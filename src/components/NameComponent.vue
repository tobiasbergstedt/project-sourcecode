<script>
  export default {
    props: {
      userName: {
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
  <p>Välkommen, {{ userName }}!</p>
</template>
