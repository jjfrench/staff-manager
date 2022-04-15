<template>
    <v-card flat text-align="left">
        <v-tabs
        vertical 
        class="my-tabs"
        >
            <v-tab v-for="manager in managers" v-bind:key="manager.user">
                {{ manager.last }}, {{ manager.first }}
            </v-tab>
            <v-tab-item v-for="manager in managers" v-bind:key="manager.user">
                <v-expansion-panels
                elevation="1"
                accordion
                multiple
                :value="expanded"
                >
                    <v-expansion-panel
                    v-for="(user,i) in users(manager.homeroom)"
                    :key="i"
                    >
                        <v-expansion-panel-header>{{ user.last }}, {{ user.first }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
var _ = require('lodash');
export default {
    name: "Homerooms",
    data () {
        return {
            checkbox: true,
            tab: null,
            expanded: [...Array(100).keys()]
        }   
    },
    methods: {
        manager(user_id) {
            return _.find(this.$store.state.users, {'user': user_id});
        },
        users(homeroom_id) {
            return _.sortBy(_.filter(this.$store.state.users, {'homeroom': homeroom_id}), 'last');
        },
    },
    computed: {
        homerooms() {
            return this.$store.state.homerooms;
        },
        managers() {
            let tabs = [];
            _.forEach(this.homerooms, head => {
                tabs.push(this.manager(head.user));
            });
            return _.sortBy(tabs, 'last');
        }
    }
}
</script>

<style>
div.my-tabs [role="tab"] {
  justify-content: flex-start;
}
</style>