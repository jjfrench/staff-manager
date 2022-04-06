<template>
    <v-menu
        :close-on-content-click="false"
        transition="slide-y-transition"
        bottom
        offset-y
        class="mx-auto"
        max-width="400"
        max-height="500"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-badge
                bordered
                dot
                :color="notifications.length > 0 ? 'error' : null"
                overlap
                class="navlink"
            >
                <v-btn 
                    icon 
                    small
                    :disabled="notifications.length > 0 ? false : true"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon dense>mdi-message-outline</v-icon>
                </v-btn>
            </v-badge>
        </template>

        <v-list two-line>
            <v-list-item-group
                v-model="selected"
                active-class="primary--text"
                multiple
            >
                <template v-for="item in notifications">
                    <v-hover v-slot="{ hover }" :key="item.title">
                        <v-list-item>
                            <template v-slot:default="{  }">
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.user"></v-list-item-title>

                                    <v-list-item-subtitle
                                    class="text--primary"
                                    v-text="item.type"
                                    ></v-list-item-subtitle>

                                    <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action v-show="hover">
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
                                                    <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    v-else
                                                    icon
                                                    small
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon color="primary lighten-1">mdi-information-outline</v-icon>
                                                </v-btn>
                                            </v-hover>
                                        </template>
                                        <span>Details</span>
                                    </v-tooltip>
                                    <v-tooltip left>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-hover v-if="item.approval" v-slot="{ hover }">
                                                <v-btn
                                                    v-if="!hover"
                                                    icon
                                                    small
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon color="grey lighten-1">mdi-check-circle-outline</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    v-else-if="item.approved"
                                                    icon
                                                    small
                                                    v-bind="attrs"
                                                    v-on="item.approved = true"
                                                >
                                                    <v-icon color="green lighten-1">mdi-check-circle-outline</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    v-else
                                                    icon
                                                    small
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon color="green lighten-1">mdi-check-circle-outline</v-icon>
                                                </v-btn>
                                            </v-hover>
                                        </template>
                                        <span>Approve</span>
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
                                                    <v-icon color="grey lighten-1">mdi-close-circle-outline</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    v-else
                                                    icon
                                                    small
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >
                                                    <v-icon color="red lighten-1">mdi-close-circle-outline</v-icon>
                                                </v-btn>
                                            </v-hover>
                                        </template>
                                        <span>Dismiss</span>
                                    </v-tooltip>
                                </v-list-item-action>
                            </template>
                        </v-list-item>
                    </v-hover>
                </template>
            </v-list-item-group>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'Notifications',
	data: function() {
		return {
            selected: [],
            notifications: this.$store.state.notifications
		}
	},
    methods: {

    }
}
</script>

<style>

</style>