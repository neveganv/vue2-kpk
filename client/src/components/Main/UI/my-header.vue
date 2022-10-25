<template>
	<div
		class="header"
		:class="{
			small: $vuetify.breakpoint.smAndDown,
		}"
	>
		<v-fade-transition>
			<div
				no-gutters
				:class="{ 'active-header': onActiveHeader }"
				class="not-active pr-5 w-100"
			>
				<div
					class="my-container"
					style="position: relative"
					:class="{
						small: $vuetify.breakpoint.smAndDown,
					}"
				>
					<VRow no-gutters aling="center" justify="space-between" class="py-2">
						<div :style="onActiveHeader ? 'width: 45px' : ' width:90px'">
								<img
									@click="$router.push({ path: '/' }).catch(err => err)"
									:src="require('@/assets/img/main-logo.svg')"
									:height="onActiveHeader ? 45 : 80"
									:width="onActiveHeader ? 130 : 200"
									alt="logo"
									class="p-0 m-0 logo"
									:class="{
										sm: $vuetify.breakpoint.sm,
										md: $vuetify.breakpoint.md,
										xs: $vuetify.breakpoint.xs,
										'logo_active-header': onActiveHeader,
									}"
									style="cursor: pointer"
								/>
						</div>
						<v-fade-transition>
							<div class="nav" v-if="!$vuetify.breakpoint.mdAndDown">
								<div class="nav__inner" @click="onClickMain">Головна</div>
								<!-- <div class="nav__inner" @click="onClickAboutCol">
									Про коледж
								</div> -->
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
									<VSheet :min-width="280" :max-width="400">
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
												<VDivider class="mx-5" />
												<div>
													<v-list-item
														:href="'http://dn.khnu.km.ua/kpk/default.aspx'"
														target="_blank"
													>
														<v-list-item-content>
															<VRow
																no-gutters
																align="center"
																justify="space-around"
															>
																<VCol cols="3">
																	<v-icon dense v-text="virtual_environment">
																	</v-icon>
																</VCol>
																<VCol cols="9"> Віртуальне середовище</VCol>
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
													<v-list-item @click="onClickEntered(item)">
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
									class="nav__inner d-flex align-center"
									@click="onClickInformation"
								>
									<span style="text-align:center;line-height:normal">
									Освітній процес
									</span>
								</div>
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
			</div>
		</v-fade-transition>
	</div>
</template>

<script>
import icons from '@/mixins/icons';

export default {
	mixins: [icons],
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
			{
				text: 'Вступна кампанія',
				icon: 'mdi-account-multiple',
				link: 'main-entrant-prepare',
				value: 'scroll-to-bottom'
			},
		],
	}),
	props: {
		onActiveHeader: {
			require: true,
		},
		menu: {
			default: false,
		},
	},
	watch: {
		getWindowOffset: {
			deep: true,
			handler() {
				console.log(e);
			},
		},
	},
	methods: {
		onClickEntered({link,value}){
			if(value){

				this.onClickInformation()
			}
			else{
				this.$router.push({name:link})
			}

		},
		onClickMain() {
			if (this.$route.name === 'main-page') {
				window.scrollTo(0, 0);
			} else {
				this.$router.push({ path: '/' }).catch(err => err);
			}
		},
		onClickInformation() {
			let InformationComponent = document.querySelector(
				'#InformationComponent'
			);
			if (this.$route.name !== 'main-page') {
				this.$router.push({
					name: 'main-page',
					params: { isInformation: true },
				});
				return;
			}
			console.log(InformationComponent.offsetTop);
			window.scrollTo(0, InformationComponent.offsetTop);
		},

		onClickAboutCol() {
			let AboutComponent = document.querySelector('#AboutComponent');
			if (this.$route.name !== 'main-page') {
				this.$router.push({ name: 'main-page', params: { isAbout: true } });
				return;
			}
			console.log(AboutComponent.offsetTop);
			window.scrollTo(0, AboutComponent.offsetTop);
			this.$emit('onCloseNavigation');
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
.not-active {
}
.active-header {
	background: white;
	position: fixed;
	top: 0;
	width: 100%;
	margin: auto;
	z-index: 100;
	box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.247);
	transition: 0.4s;
	transform: translateY(-100%);
	transform: translateY(0);
}
.header {
	height: 128px;
	// transition: 0.4s ease;

	&.small {
		margin-top: 5px;
		height: 85px;
	}
}
.logo {
	transition: 0.4s ease;
	&_active-header {
		transition: 0s ease;
	}
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
