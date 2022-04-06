<template>
	<v-app-bar
	app
	color="white"
	flat
	>
		<v-btn 
			icon 
			small
			v-show="$vuetify.breakpoint.smOnly" 
		>
			<v-icon dense>mdi-menu</v-icon>
		</v-btn>
		<div v-show="$vuetify.breakpoint.mdAndUp" >
			<v-btn small v-for="link in links" :key="link" plain :to="'/' + link"> {{link}} </v-btn>
		</div>
		<v-spacer></v-spacer>
		<h1>SAM</h1>
		<v-chip
		class="ma-2"
		color="green"
		label
		outlined
		>
			beta
		</v-chip>

		<v-spacer></v-spacer>
		<v-text-field
			dense
			rounded
			outlined
			clearable
			label="Search"
			append-icon="mdi-magnify"
			class="search"
		></v-text-field>
		<Account/>
		<Notifications/>
  </v-app-bar>
</template>
<script>
import Notifications from './Notifications.vue';
import Account from '../Navigation/Account/Account.vue';
export default ({
	name: 'Navigation',
	components: {
		Notifications,
		Account
	},
	data: function() {
		return {
			collapse: true,
			links: ["schedules", "variances", "homerooms", "users"]
		}
	}
})
</script>
<style>
.navlink {
  padding-left: 20px;
  text-decoration: none;
  color: inherit;
}
.search {
	max-width: 250px;
	height:69%;
}
</style>