<template>
  <v-app id="app">
    <v-main>
      <Navigation/>
      <v-container>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation';

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">

</style>
