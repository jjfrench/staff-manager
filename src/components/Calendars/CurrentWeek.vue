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
                        Week of
                        <v-btn 
                        icon 
                        small
                        v-if="week_offset != 0"
                        @click="week_offset -= 7; setYear();"
                        >
                            <v-icon dense>
                                mdi-chevron-left
                            </v-icon>
                        </v-btn>
                        <v-scroll-x-reverse-transition> 
                            <span class="text-h4 font-weight-light">
                                {{current_week_header}}
                            </span>
                        </v-scroll-x-reverse-transition>
                    </span>
                    <v-btn 
                    icon 
                    small
                    @click="week_offset += 7; setYear();"
                    >
                        <v-icon dense>
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
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
                                    <div class="holidays"> {{ getHoliday(day.date, day.year) }} </div>
                                    <div 
                                    class="events"
                                    v-for="event in day.events" 
                                    :key="event.index"
                                    >
                                        <v-card
                                        :color=getTheme(event.type)
                                        :height="duration(event.start, event.end)"
                                        :min-height="55"
                                        >
                                            <v-row class="event event-text">
                                                <v-col>
                                                    <v-row>
                                                        {{ event.type }}
                                                        <v-spacer></v-spacer>
                                                    </v-row>
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
                    
                    <v-card-actions>
                        <v-chip
                        v-for="key in legend"
                        :key="key.index"
                        class="ma-2"
                        :color="key.color"
                        label
                        :outlined="!dark"
                        >
                            <v-icon
                            v-if="!dark"
                            small
                            :color="key.color"
                            style="padding-right:5px;"
                            >
                                mdi-checkbox-blank-circle
                            </v-icon>
                            {{key.name}}
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-btn outlined color="primary">
                            Add Variance
                        </v-btn>

                        <v-btn text>
                            Edit Variances
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { calendar } from '../../mixins/calendar/index'

export default {
    data: function() {
        return {
        }
    },
    mixins: [ calendar ],
}
</script>

<style scoped>
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
.holidays {
    height: 25px;
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