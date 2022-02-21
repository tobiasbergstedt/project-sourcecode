<script>
  import NameComponent from '../components/NameComponent.vue'
  import ColorComponent from '../components/ColorComponent.vue'

  export default {
    data() {
      return {
        message: '',
        color: '',
      }
    },
    components: {
      NameComponent,
      ColorComponent,
    },
    methods: {
      onEmitColor(s) {
        this.color = s
      },
    },
  }
</script>

<template>
  <div id="app">
    <div id="container">
      <input v-model="message" />
      <NameComponent :user-name="message" v-if="message" />
      <p v-else>Fyll i ditt namn för att få en välkomsthälsning.</p>
    </div>
    <div id="container">
      <ColorComponent @emit-color="onEmitColor" />
      <div id="color-container">
        <p v-if="this.color">Färgen är {{ this.color }}.</p>
        <p v-else>Färgen är dold.</p>
        <div id="color-box" :style="{ 'background-color': this.color }" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #app {
    display: flex;
  }
  #container {
    display: block;
    margin: 5rem;
  }
  #color-container {
    margin-top: 1rem;
    display: flex;
    justify-content: space-evenly;
    p {
      margin: 0;
      padding: 0;
    }
  }
  #color-box {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 0.4rem;
  }
</style>
