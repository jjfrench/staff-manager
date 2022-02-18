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
                    <span class="text-h4 font-weight-light">
                        Week of
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
                        <v-btn
                            icon
                            @click="settings = !settings"
                        >
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>

                        <v-navigation-drawer
                            v-model="settings"
                            absolute
                            temporary
                            right
                        >
                        <v-list-item class="text-center" v-if="settings">
                            Settings
                        </v-list-item>
                        <v-list-item class="settings">
                            <v-list-item-content v-if="settings">
                                <v-select
                                v-model="calendar_type"
                                :items="calendar_types"
                                label="weekdays"
                                dense
                                ></v-select>
                                <v-select
                                v-model="variance_theme"
                                :items="variance_themes"
                                label="theme"
                                dense
                                ></v-select>
                                <v-switch
                                style="padding-left: 10px"
                                v-model="dark"
                                label="dark mode"
                                :value="true"
                                hide-details
                                dense
                                ></v-switch>
                            </v-list-item-content>
                        </v-list-item>
                        </v-navigation-drawer>
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
                                            :height="10*event.duration"
                                            :min-height="70"
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
/* eslint-disable */
import { mapMutations, mapState } from 'vuex'
import * as _themes from '../themes/variances/index'
import { calendar } from '../mixins/index'
var _ = require('lodash');

export default {
    data: function() {
        return {
            current_week_header: '',
            settings: false,
            calendar_types: [
                "Sat - Fri",
                "Sun - Sat",
                "Mon - Sun",
                "Mon - Fri",
                "Mon - Thu"
            ],
            calendar_type: this.$store.state.calendar_type,
            calendar_variances: this.$store.state.variances,
            variance_theme: this.$store.state.variance_theme,
            variance_themes: _themes['themes'],
            calendar_schedule: this.$store.state.schedule,
            dark: this.$store.state.dark_mode
        }
    },
    created() {
        
    },
    mixins: [ calendar ],
    methods: {
        ...mapState(['name', 'variances', 'schedule', 'dark_mode']),
        ...mapMutations(['setCalendarType', 'setVarianceTheme', 'setDarkMode']),
    },
    watch: {
        calendar_select() {
            setCalendarType(this.calendar_types)
            // this.calendar_type = this.calendar_types
        },
        theme_select() {
            setVarianceTheme(this.variance_theme)
        }
    }
}
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