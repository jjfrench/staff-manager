<template>
    <v-speed-dial
    direction="bottom"
    open-on-hover
    transition="slide-y-transition"
    >
        <template v-slot:activator>
            <v-btn
            icon
            small
            >
                <v-icon>
                    mdi-account-outline
                </v-icon>
            </v-btn>
        </template>
        <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-btn
                icon
                small
                v-on="on"
                >
                    <v-icon>mdi-information-outline</v-icon>
                </v-btn>
            </template>
            <span>Account information</span>
        </v-tooltip>
        <v-tooltip left>
            <template v-slot:activator="{ on }">
                <v-btn
                icon
                small
                v-on="on"
                >
                    <v-icon>mdi-cog-outline</v-icon>
                </v-btn>
            </template>
            <span>Settings</span>
        </v-tooltip>


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
    </v-speed-dial>
    
</template>

<script>
// import Settings from './Settings.vue'
export default {
    name: 'Account',
    components: {
        // Settings
    },
	data: function() {
		return {
            selected: [],
            links: ["settings"]
		}
	},
    methods: {
    }
}
</script>

<style>

</style>