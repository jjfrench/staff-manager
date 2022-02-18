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
		<div class="navlink">
			<v-btn icon small >
				<v-icon dense>mdi-account-outline</v-icon>
			</v-btn>
		</div>
		<v-badge
			bordered
			dot
			color="error"
			overlap
			class="navlink"
		>
		<v-btn icon small>
			<v-icon dense>mdi-message-outline</v-icon>
		</v-btn>
		</v-badge>
  </v-app-bar>
</template>
<script>
export default ({
  name: 'Navigation',
  data: function() {
    return {
      collapse: true,
      links: ["Schedules", "variances", "homerooms", "users"]
    }
  }
})
</script>
<style scoped>
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