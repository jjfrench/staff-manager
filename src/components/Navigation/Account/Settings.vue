<template>
    <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    left
    offset-x
    transition="slide-y-transition"
    >
        <template v-slot:activator="{ on: menu, attrs }">
            <v-tooltip left>
                <template v-slot:activator="{ on: tooltip }">
                    <v-btn
                    icon
                    small
                    v-bind="attrs"
                    v-on="{ ...tooltip, ...menu }"
                    >
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-btn>
                </template>
                <span>Settings</span>
            </v-tooltip>
        </template>

        <v-card v-on="{ ...menu }">
            <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-col>
                        <v-row>
                            <v-select
                            v-model="calendar_type"
                            :items="calendar_types"
                            label="weekdays"
                            dense
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-select
                            v-model="variance_theme"
                            :items="variance_themes"
                            label="theme"
                            dense
                            ></v-select>
                        </v-row>
                        <v-row>
                            <v-switch
                            style="padding-left: 10px"
                            v-model="dark"
                            label="dark mode"
                            :value="true"
                            hide-details
                            dense
                            ></v-switch>
                        </v-row>
                    </v-col>
                </v-list-item-content>
            </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                text
                @click="menu = false"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                text
                @click="menu = false"
            >
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import * as _themes from '../../../themes/variances/index'
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'Settings',
	data: function() {
		return {
            menu: false,
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
    methods: {
        ...mapState(['name', 'variances', 'schedule', 'dark_mode']),
        ...mapMutations(['setCalendarType', 'setVarianceTheme', 'setDarkMode']),
    },
    watch: {
        calendar_type() {
            this.setCalendarType(this.calendar_type)
        },
        variance_theme() {
            this.setVarianceTheme(this.variance_theme)
        },
        dark() {
            this.setDarkMode(this.dark)
        }
    }
}
</script>

<style>

</style>