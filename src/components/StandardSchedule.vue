<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card
                    class="rounded-lg"
                    width="100%"
                    :elevation="5"
                    :dark="dark"
                >
                    <v-card-title>
                    <span class="text-h4 font-weight-light">
                        {{calendar_name}}
                    </span>
                    <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text class="week">
                        <v-row no-gutters>
                            <v-col 
                                :class="index == 0 ? false:'border-left'" 
                                :cols="12/week.length" 
                                v-for="(day, index) in week" 
                                :key="day.date"
                            >
                                <v-card tile elevation="0" width="100%">
                                    <div class="weekdays"> {{ day.weekday }} </div>
                                    <div class="days"> {{ day.day }} </div>
                                    <div 
                                    class="events"
                                    v-for="event in day.events" 
                                    :key="event.index" 
                                    >
                                        <v-card 
                                            
                                            :color=getTheme(event.type)
                                            :height="10*event.duration"
                                            :min-height="70"
                                        >
                                            <v-row class="event event-text">
                                                <v-col>
                                                    <!-- <v-row>
                                                        {{ event.type }} 
                                                        <v-spacer></v-spacer>
                                                    </v-row> -->
                                                    <v-row> 
                                                        {{ time(event.start) }} - {{ time(event.end) }}
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import * as _themes from '../themes/variances/index'
import { calendar } from '../mixins/index'
var _ = require('lodash');

export default ({
    data: function() {
        return {
            calendar_name: this.data.first + ', ' + this.data.last,
            week_offset: 0,
            week_dates: [],
            schedule_variances: [],
            week_events: [],
            calendar_type: "2 Week",
            calendar_variances: this.data.variances,
            variance_theme: this.$store.state.variance_theme,
            variance_themes: _themes['themes'],
            calendar_schedule: this.data.schedule,
            dark: this.$store.state.dark_mode
        }
    },
    mixins: [ calendar ],
    props: [
        'data'
    ],
    methods: {
        ...mapState(['name', 'variances', 'schedule', 'dark_mode']),
        ...mapMutations(['setCalendarType', 'setVarianceTheme', 'setDarkMode']),
        getSchedule: function(date) {
            var schedule = [];
            if (date.weekNumber % 2 == 0){
                schedule.push(this.calendar_schedule[2]);
                schedule.push(this.calendar_schedule[1]);
            }
            else {
                schedule.push(this.calendar_schedule[1]);
                schedule.push(this.calendar_schedule[2]);
            }

            schedule = _.flatten(schedule)
            schedule.forEach((event,index) => {
                event['date'] = this.week_dates[index]
            })
            return _.remove(schedule, function(event) {
                return event.type != null
            })
        }
    },
    computed: {
    }
})
</script>
<style scoped>
.calendar {
    border-radius: 0.25rem;
}
.settings {
    font-size: 12px;
}
.week {
    margin-top: 15px;
}
.weekdays {
    color: #a6a6a6;
    font-size: 12px;
}
.days {
    padding-bottom: 5px;
}
.border-left {
    border-left-style: solid;
    border-left-color: #a6a6a6;
    border-width: 0.1px;
}
.event {
    margin-left: 5%;
    margin-right: 5%;
}
.events {
    margin-top: 10px;
    padding: 2px;
}
.event-text {
    color: #FFFFFF;
    font-size: 12px;
    text-align: left;
    padding: 5px
}
</style>