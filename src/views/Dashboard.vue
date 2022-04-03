<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <CurrentWeek/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CurrentWeek from '../components/CurrentWeek';
export default {
    name: 'dashboard',
    components: {
        CurrentWeek
    },
    created() {
    },
    data: function() {
      return {
        subscriptions: this.$store.state.store_subscriptions
      }
    },
    methods: {
      ...mapState(['store_subscriptions']),
    }
}
</script>