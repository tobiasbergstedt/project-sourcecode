<script>
  import NameComponent from '../components/NameComponent.vue'

  export default {
    data() {
      return {
        message: '',
      }
    },
    components: {
      NameComponent,
    },
  }
</script>

<template>
  <div id="app">
    <input v-model="message" />
    <NameComponent :name="message" v-if="message" />
    <p v-else>Fyll i ditt namn för att få en välkomsthälsning.</p>
  </div>
</template>
