<template>
	<div class="header pr-5">
		<v-fade-transition>
			<div
				class="my-container mt-5"
				:class="{ small: $vuetify.breakpoint.smAndDown }"
			>
				<VRow no-gutters aling="center" justify="space-between" class="py-2">
					<div style="width: 90px">
						<VBadge color="error" overlap right bottom text content="Beta">
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
							<div class="nav__inner" @click="onClickAboutCol">Про коледж</div>
							<VMenu
								offset-y
								transition="slide-y-transition"
								rounded="lg"
								:close-on-content-click="false"
							>
								<template v-slot:activator="{ on, attrs }">
									<div class="nav__inner" v-on="on" v-bind="attrs">
										Студентові
									</div>
								</template>
								<VSheet :min-width="200" :max-width="400">
									<v-list dense>
										<v-list-item-group color="purple">
											<div v-for="(item, i) in studentsPage" :key="i">
												<VDivider v-if="i > 0" class="mx-5" />
												<v-list-item :to="{ name: item.link }">
													<v-list-item-content>
														<VRow
															no-gutters
															align="center"
															justify="space-around"
														>
															<VCol cols="3">
																<v-icon v-text="item.icon" dense></v-icon>
															</VCol>
															<VCol cols="9" v-text="item.text"></VCol>
														</VRow>
													</v-list-item-content>
												</v-list-item>
											</div>
										</v-list-item-group>
									</v-list>
								</VSheet>
							</VMenu>
							<VMenu
								offset-y
								transition="slide-y-transition"
								rounded="lg"
								:close-on-content-click="false"
							>
								<template v-slot:activator="{ on, attrs }">
									<div class="nav__inner" v-on="on" v-bind="attrs">
										Абітурієнту
									</div>
								</template>
								<VSheet :min-width="200" :max-width="400">
									<v-list dense>
										<v-list-item-group color="purple">
											<div v-for="(item, i) in enteredPage" :key="i">
												<VDivider v-if="i > 0" class="mx-5" />
												<v-list-item :to="{ name: item.link }">
													<v-list-item-content>
														<VRow
															no-gutters
															align="center"
															justify="space-around"
														>
															<VCol cols="3">
																<v-icon v-text="item.icon" dense></v-icon>
															</VCol>
															<VCol cols="9" v-text="item.text"></VCol>
														</VRow>
													</v-list-item-content>
												</v-list-item>
											</div>
										</v-list-item-group>
									</v-list>
								</VSheet>
							</VMenu>
									<div
								class="nav__inner d-flex  align-center"
								@click="$router.push({ path: '/' }).catch(err => err)"
							>
							<VIcon small>
								mdi-information-outline
								</VIcon>
								Інформація
							</div>
						</div>
					</v-fade-transition>

					<div class="d-flex justify-center align-center" >
						<VRow>
							<v-menu
								bottom
								left
								transition="slide-x-transition"
								:close-on-content-click="false"
								content-class="elevation-4"
							>
								<template v-slot:activator="{ on, attrs }">
									<VBtn icon v-bind="attrs" v-on="on" v-if="false">
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
		studentsPage: [
			{
				text: 'Розклад занять',
				icon: 'mdi-calendar',
				link: 'main-student-shedule',
			},
		],
		enteredPage: [
			{
				text: 'Підготовчі курси',
				icon: 'mdi-school',
				link: 'main-entrant-prepare',
			},
		],
	}),
	props: {
		menu: {
			default: false,
		},
	},
	methods: {
		onClickAboutCol() {
			console.log();
			let AboutComponent = document.querySelector('#AboutComponent');
			if (this.$route.name !== 'main-page') {
				this.$router.push({ name: 'main-page', params: { isAbout: true } });
				return;
			}
			console.log(AboutComponent.offsetTop);
			window.scrollTo(0, AboutComponent.offsetTop);
			this.$emit('onCloseNavigation')

		},
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
