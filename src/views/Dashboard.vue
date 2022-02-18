<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <CurrentWeek/>
                <!-- <StandardSchedule
                    v-for="schedule in subscriptions"
                    :key="schedule.index"
                    :data="schedule"
                ></StandardSchedule> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CurrentWeek from '../components/CurrentWeek';
// import StandardSchedule from '../components/StandardSchedule';
export default {
    name: 'dashboard',
    components: {
        CurrentWeek,
        // StandardSchedule
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