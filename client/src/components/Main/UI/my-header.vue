<template>
	<div class="header">
		<v-fade-transition>
			<div class="my-container mt-5">
				<VRow no-gutters aling="center" justify="space-between" class="py-2">
					<div style="width: 90px">
						<VBadge color="error" overlap right bottom text content="pre-alpha">
							<img
								@click="$router.push({ path: '/' }).catch(err => err)"
								:src="require('@/assets/img/main-logo.svg')"
								width="200"
								height="81"
								alt=""
								class="p-0 m-0 logo"
								:class="{
									sm: $vuetify.breakpoint.sm,
									md: $vuetify.breakpoint.md,
									xs: $vuetify.breakpoint.xs,
								}"
								style="cursor: pointer"
							/>
						</VBadge>
					</div>
					<v-fade-transition>
						<div class="nav" v-if="!$vuetify.breakpoint.mdAndDown">
							<div
								class="nav__inner"
								@click="$router.push({ path: '/' }).catch(err => err)"
							>
								Головна
							</div>
							<div class="nav__inner">Про коледж</div>
							<div class="nav__inner">Студентові</div>
							<div class="nav__inner">Абітурієнту</div>
						</div>
					</v-fade-transition>

					<div class="d-flex justify-center align-center">
						<VRow>
							<v-menu
								bottom
								left
								transition="slide-x-transition"
								:close-on-content-click="false"
								content-class="elevation-4"
							>
								<template v-slot:activator="{ on, attrs }">
									<VBtn icon v-bind="attrs" v-on="on">
										<VIcon> mdi-magnify</VIcon>
									</VBtn>
								</template>

								<VTextField
									dense
									v-model="search"
									solo
									hide-details
									label="Пошук.."
								>
									<template slot="append">
										<v-slide-x-transition>
											<VIcon v-if="search.length > 0" @click="searchData">
												mdi-magnify</VIcon
											>
										</v-slide-x-transition>
									</template>
								</VTextField>
							</v-menu>

							<VBtn icon @click="onBurger" v-if="menu">
								<VIcon> mdi-menu</VIcon>
							</VBtn>
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
	props: {
		menu: {
			default: false,
		},
	},
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
.logo {
	transition: 0.4s ease;
	&.md {
		width: 170px;
		height: auto;
	}
	&.sm {
		width: 120px;
		height: auto;
	}
	&.xs {
		width: 100px;
		height: auto;
	}
}
.nav {
	color: #4b4453;
	font-family: 'Montserrat', sans-serif;
	max-width: 510px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 15px;
}
.nav__inner {
	padding-left: 0.1rem;
	cursor: pointer;
}
</style>
