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
import CurrentWeek from '../components/Calendars/CurrentWeek';
export default {
    name: 'dashboard',
    components: {
        CurrentWeek
    },
    created() {
    },
    data: function() {
      return {
      }
    },
    methods: {
    }
}
</script>