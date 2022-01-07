<template>
	<v-navigation-drawer fixed right v-model="navVisible" class="overflow-hidden">
		<v-app-bar
        dense
			absolute
			color="white"
			elevate-on-scroll
			scroll-target="#scrolling-techniques-7"
		>
			<v-app-bar-nav-icon @click="onBurger"></v-app-bar-nav-icon>
		</v-app-bar>

		<v-sheet id="scrolling-techniques-7" max-height="600">
			<v-container style="height: 1500px"> </v-container>
		</v-sheet>
	</v-navigation-drawer>
</template>

<script>
export default {
	methods: {
		onBurger() {
			this.$emit('onBurgerNav');
		},
	},
	watch: {
		navigationRight: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	computed: {
		navVisible: {
			get() {
				return this.navigationRight;
			},
			set(e) {
				return e;
			},
		},
	},
	props: {
		navigationRight: {
			require: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.navigation {
	padding-top: 50px;
}
</style>
