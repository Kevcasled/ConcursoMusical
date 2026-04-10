<template>
  <div id="app">
    <HeaderComponent />
    <RouterView />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
