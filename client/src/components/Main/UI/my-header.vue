<template>
	<div class="header">
		<v-fade-transition>
			<div class="my-container mt-5">
				<VRow no-gutters aling="center" justify="space-between" class="py-2">
					<div style="width: 50px">
						<VBadge color="error" overlap right bottom text content="pre-alpha">
							<img
								@click="$router.push({ path: '/' }).catch(err => err)"
								:src="require('@/assets/img/main-logo.svg')"
								width="210"
								height="81"
								alt=""
								class="p-0 m-0"
								style="cursor: pointer"
							/>
						</VBadge>
					</div>

					<div class="nav">
						<div class="nav__inner">Головна</div>
						<div class="nav__inner">Про коледж</div>
						<div class="nav__inner">Студентові</div>
						<div class="nav__inner">Абітурієнту</div>
					</div>

					<div class="d-flex justify-center align-center">
						<VRow>
							<VTextField dense v-if="searchShow" v-model="search" />
							<VBtn icon @click="searchData">
								<VIcon> mdi-magnify</VIcon>
							</VBtn>
							<v-fade-transition>
								<VBtn icon @click="onBurger">
									<VIcon> mdi-menu</VIcon>
								</VBtn>
							</v-fade-transition>
						</VRow>
					</div>
				</VRow>
			</div>
		</v-fade-transition>
	</div>
</template>

<script>
export default {
	data: () => ({
		searchShow: true,
		search: '',
	}),
	props: ['navigationRight'],
	methods: {
		searchData() {
			this.$router.push({ name: 'search', params: { query: this.search } });
		},
		onBurger() {
			this.$emit('onBurger');
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	transition: 0.4s ease;
}
.nav {
	color: #4b4453;

	font-family: 'Montserrat', sans-serif;
	max-width: 620px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.nav__inner {
	padding-left: 1rem;
	cursor: pointer;
}
</style>
