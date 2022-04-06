<template>
    <v-tooltip left>
        <template v-slot:activator="{ }">
            <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            >
                <template v-slot:activator="{ on, attrs}">
                    <v-btn
                    icon
                    small
                    v-bind="attrs"
                    v-on="on"
                    >
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    Hello
                </v-card>
            </v-menu>
        </template>
        <span>Settings</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'Settings',
	data: function() {
		return {
            fav: true,
            menu: false,
            message: false,
            hints: true,
		}
	},
    methods: {
    }
}
</script>

<style>

</style>