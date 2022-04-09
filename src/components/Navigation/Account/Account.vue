<template>
    <v-menu
    bottom
    :offset-y="true"
    content-class="elevation-0"
    >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
        icon
        small
        v-bind="attrs"
        v-on="on"
        >
            <v-icon>
                mdi-account-outline
            </v-icon>
        </v-btn>
        </template>

        <v-list>
            <v-list-item>
                <Details/>
            </v-list-item>
            <v-list-item>
                <Settings/>
            </v-list-item>
            <v-list-item>
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-hover v-slot="{ hover }">
                            <v-btn
                            v-if="!hover"
                            icon
                            small
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-icon>mdi-logout-variant</v-icon>
                            </v-btn>
                            <v-btn
                            v-else
                            icon
                            small
                            v-bind="attrs"
                            v-on="on"
                            >
                                <v-icon color="red lighten-1">mdi-logout-variant</v-icon>
                            </v-btn>
                        </v-hover>
                    </template>
                    <span>Logout</span>
                </v-tooltip>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
import Settings from './Settings.vue'
import Details from './Details.vue'
export default {
    name: 'Account',
    components: {
        Settings,
        Details
    },
	data: function() {
		return {
            
		}
	},
    methods: {
    }
}
</script>

<style>
</style>