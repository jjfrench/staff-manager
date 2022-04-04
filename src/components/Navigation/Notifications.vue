<template>
    <v-menu
        :close-on-content-click="false"
        bottom
        offset-y
        class="mx-auto"
        max-width="400"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-badge
                bordered
                dot
                color="error"
                overlap
                class="navlink"
            >
                <v-btn 
                    icon 
                    small
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
                <template v-for="item in this.$store.state.notifications">
                <v-list-item 
                    :key="item.title"
                >
                    <template v-slot:default="{  }">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.user"></v-list-item-title>

                        <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.type"
                        ></v-list-item-subtitle>

                        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <!-- <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                        <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                        >
                        mdi-star-outline
                        </v-icon>

                        <v-icon
                        v-else
                        color="yellow darken-3"
                        >
                        mdi-star
                        </v-icon> -->
                    </v-list-item-action>
                    </template>
                </v-list-item>

                <!-- <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                ></v-divider> -->
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
            selected: [2]
		}
	},
    methods: {
    }
}
</script>

<style>

</style>