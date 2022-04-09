<template>
    <v-tooltip left>
        <template v-slot:activator="{ on }">
            <v-btn
            icon
            small
            v-on="on"
            @click.stop=""
            >
                <v-icon>mdi-information-outline</v-icon>
            </v-btn>
        </template>
        <span>Account information</span>
    </v-tooltip>
</template>

<script>
export default {

}
</script>

<style>

</style>