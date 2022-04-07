<template>
    <v-app id="app">
    <v-main>
        <Navigation/>
        <v-container class="page">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </v-container>
    </v-main>
    </v-app>
</template>

<script>
import Navigation from './components/Navigation/Navigation.vue';

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style scoped>
.page {
    margin-top: 2%;
}
</style>
