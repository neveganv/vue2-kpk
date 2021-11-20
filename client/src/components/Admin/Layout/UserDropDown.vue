<template>
	<VMenu offset-y >
		<template v-slot:activator="{ on, attrs }">
			<span v-bind="attrs" v-on="on">
				<span class="d-flex align-center">
					<VIcon class="mr-2" size="38">mdi-account-circle</VIcon>
					<VIcon v-if="attrs['aria-expanded'] === 'false'">mdi-menu-down</VIcon>
					<VIcon v-else>mdi-menu-up</VIcon>
				</span>
			</span>
		</template>
	</VMenu>
</template>

<script>
export default {};
</script>

<style></style>
