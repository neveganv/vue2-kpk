<template>
	<v-navigation-drawer
		fixed
		right
		v-model="isDraw"
		class="overflow-hidden"
		mobile-breakpoint="1626"
		:persistant="$vuetify.breakpoint.mdAndDown"
		:style="
			onActiveHeader ? 'padding-top:62px; transition:.4s' : 'transition:.4s'
		"
	>
		<div class="navigation">
			<v-sheet>
				<v-container style="height: auto">
					<div v-if="$vuetify.breakpoint.mdAndDown">
						<v-list dense>
							<v-list-item-group color="#7E60BC">
								<v-list-item @click="onClickMain">
									<v-list-item-icon style="margin-right: 17px">
										<v-icon dense>mdi-home-circle-outline</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title> Головна</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<!-- <v-list-item @click="onClickAboutCol"> -->
								<!-- <v-list-item-icon
										style="margin-right: 15px; margin-left: 1px"
									>
										<v-icon dense>mdi-information-outline</v-icon>
									</v-list-item-icon> -->
								<!-- <v-list-item-content>
										<v-list-item-title> Про Коледж</v-list-item-title>
									</v-list-item-content> -->
								<!-- </v-list-item> -->
							</v-list-item-group>
							<v-list-group no-action sub-group color="#7E60BC">
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>Абітурієнту</v-list-item-title>
									</v-list-item-content>
								</template>

								<v-list-item
									v-for="(item, i) in entrantPage"
									:key="i"
									@click="onClickEntered(item)"
								>
									<v-list-item-title v-text="item.text"></v-list-item-title>

									<!-- <v-list-item-icon>
										<v-icon small v-text="item.icon"></v-icon>
									</v-list-item-icon> -->
								</v-list-item>
							</v-list-group>
							<v-list-group no-action sub-group color="#7E60BC">
								<template v-slot:activator>
									<v-list-item-content>
										<v-list-item-title>Студентові</v-list-item-title>
									</v-list-item-content>
								</template>

								<v-list-item
									v-for="(item, i) in studentsPage"
									:key="i"
									:to="{ name: item.link }"
								>
									<v-list-item-title v-text="item.text"></v-list-item-title>
								</v-list-item>
								<v-list-item
									:href="'http://dn.khnu.km.ua/kpk/default.aspx'"
									target="_blank"
								>
									<v-list-item-title
										v-text="'Віртуальне середовище'"
									></v-list-item-title>
								</v-list-item>
							</v-list-group>
							<v-list-item @click="onClickInformation">
								<v-list-item-icon style="margin-right: 15px; margin-left: 1px">
									<v-icon dense>mdi-information-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>Освітній процес</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
						<VDivider class="mx-5" />
					</div>
					<my-navigation-list
						v-if="$route.name === 'main-page'"
						:activeNavigator="activeNavigator"
						@scrollTo="scrollTo"
						class="mt-4"
					/>
					<VDivider class="mt-5 mx-4" 	v-if="$route.name === 'main-page'"/>
					<VSubheader>Корисні посилання</VSubheader>
					<div class="sponsor__wrapper mb-5">
						<div
							class="sponsor__inner my-2"
							v-for="sponsor in sponsors"
							:key="sponsor._id"
							@click="onClickSponsor(sponsor.path_link)"
						>
							<div class="img" v-if="!isLoadingSponsor">
								<v-img
									:src="sponsor.path_img"
									:key="sponsor.path_img"
									alt=""
									draggable="false"
								>
									<template v-slot:placeholder>
										<v-row
											class="fill-height ma-0"
											align="center"
											justify="center"
										>
											<v-progress-circular
												indeterminate
												color="grey darken-5"
											></v-progress-circular>
										</v-row> </template
								></v-img>
							</div>

							<div v-if="isLoadingSponsor">
								<v-skeleton-loader
									class="mx-auto"
									type="image"
									style="height: 50px; padding: 4px"
								></v-skeleton-loader>
							</div>
						</div>
					</div>
				</v-container>
			</v-sheet>
		</div>
	</v-navigation-drawer>
</template>

<script>
import partnersService from '@/request/partners/partnersService';
import loader from '@/mixins/loader';
import icons from '@/mixins/icons';
import myNavigationList from './my-navigation-list.vue';

export default {
	components: { myNavigationList },
	mixins: [loader, icons],
	methods: {
		onClickEntered({ link, value }) {
			if (value) {
				this.onClickInformation();
			} else {
				this.$router.push({ name: link });
			}
		},
		scrollTo(id) {
			this.$emit('scrollTo', id);
		},
		onClickAboutCol() {
			let AboutComponent = document.querySelector('#AboutComponent');
			if (this.$route.name !== 'main-page') {
				this.$router.push({ name: 'main-page', params: { isAbout: true } });
				return;
			}
			window.scrollTo(0, AboutComponent.offsetTop);
			if (this.$vuetify.breakpoint.mdAndDown) {
				this.isDraw = false;
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
			if (this.$vuetify.breakpoint.mdAndDown) {
				this.isDraw = false;
			}
		},

		onClickMain() {
			this.$router.push({ path: '/' }).catch(() => {});
			if (this.$vuetify.breakpoint.mdAndDown) {
				this.isDraw = false;
			}
		},
		onBurger() {
			this.$emit('onBurgerNav');
		},
		onClickSponsor(link) {
			window.open(link, '_blank');
		},
		async getPartners() {
			try {
				this.isLoadingSponsor = true;
				let response = await partnersService.getAll();
				this.sponsors = response.result;

				this.isDraw = this.$vuetify.breakpoint.width <= 1626 ? false : true;
				this.isLoadingSponsor = false;
			} catch (e) {
				this.isLoadingSponsor = false;
				alert(e);
			}
		},
	},
	watch: {
		isDraw: {
			handler(e) {
				this.$emit('onBurgerNav', e);
			},
		},
		navigationRight: {
			deep: true,
			handler(e) {
				this.isDraw = e;
			},
		},
	},
	mounted() {
		this.getPartners();
	},
	data: () => ({
		isLoadingSponsor: false,
		activationEvents: false,
		activationEventsEntrance: false,
		isDraw: false,
		sponsors: [],
		studentsPage: [
			{
				text: 'Розклад занять',
				icon: 'mdi-calendar',
				link: 'main-student-shedule',
			},
		],
		entrantPage: [
			{
				text: 'Підготовчі курси',
				icon: 'mdi-school',
				link: 'main-entrant-prepare',
			},
			{
				text: 'Вступна кампанія',
				icon: 'mdi-account-multiple',
				link: 'main-entrant-prepare',
				value: 'scroll-to-bottom',
			},
		],
	}),

	props: {
		activeNavigator: {
			require: true,
		},
		onActiveHeader: {
			require: true,
		},
		navigationRight: {
			require: true,
		},
	},
};
</script>

<style lang="scss">
.navigation {
	&::-webkit-scrollbar {
		width: 8px !important;
		height: 12px;
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(113, 113, 113, 0.3);
		border: thin solid rgb(245, 245, 244);
		border-radius: 9em;
	}
	&::-webkit-scrollbar-thumb:hover {
		background-color: darken(rgba(113, 113, 113, 0.5), 4);
	}
}
.sponsor__wrapper {
	width: 100%;
	padding-left: 20px;
	.sponsor__inner {
		max-width: 170px;
		height: 50px;
		width: 100%;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
		padding: 4px;
		.v-image__image--cover {
			background-size: contain !important;
		}
		.img {
			width: 100%;
			height: 100%;
			overflow: hidden;
			&:hover {
				opacity: 0.9;
				&::after {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;
					background: rgba(#0000, 0.03);
					border-radius: 5px;
					z-index: 100;
				}
			}
		}
		.v-image {
			width: 100%;
			height: 100%;
		}
		.v-responsive__sizer {
			padding: 0 !important;
		}
	}
}
.v-application--is-ltr
	.v-list--dense
	.v-list-group--sub-group
	.v-list-group__header {
	padding-left: 16px;
}
.v-application--is-ltr
	.v-list-group--no-action.v-list-group--sub-group
	> .v-list-group__items
	> .v-list-item {
	padding-left: 80px;
}
</style>
