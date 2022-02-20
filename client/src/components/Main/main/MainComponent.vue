<template>
	<div class="overflow-auto">
		<!-- header  -->
		<div>
			<my-header
				@onBurger="onBurger"
				:navigationRight="navigationRight"
				menu="true"
				@onCloseNavigation="onCloseNavigation"
				:onActiveHeader="onActiveHeader"
			/>
			<!-- main image -->
			<div
				class="first-screen my-container"
				:class="{
					md: $vuetify.breakpoint.md,
					sm: $vuetify.breakpoint.sm,
					xs: $vuetify.breakpoint.xs,
				}"
			>
				<span>Політехніка звучить гордо</span>
				<div class="img_wrapper">
					<v-img
						class="img"
						draggable="false"
						:src="require('@/assets/img/main-img.jpg')"
						:lazy-src="require('@/assets/img/main-img.jpg')"
						alt=""
						@load="loadedMain"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									indeterminate
									color="grey darken-5"
								></v-progress-circular>
							</v-row> </template
					></v-img>

					<div class="main-glass unselectable">
						<!-- <img
							draggable="false"
							:src="require('@/assets/img/main_text.svg')"
							alt=""
						/> -->
						<div class="title_text">
							<div>КОЛОМИЙСЬКИЙ ПОЛІТЕХНІЧНИЙ</div>
							<div>ФАХОВИЙ КОЛЕДЖ</div>
						</div>
					</div>
				</div>
			</div>
			<!-- cool news -->
			<div
				class="my-container"
				style="margin-top: 150px; margin-bottom: 150px"
				:class="{ 'my-10': $vuetify.breakpoint.mdAndDown }"
			>
				<CoolNews />
			</div>
			<!-- specialities  -->
			<div class="my-container" v-intersect="onIntersectSpecialities">
				<VRow
					align="center"
					justify="space-between"
					style="margin-bottom: 100px"
					:class="{ 'mb-10': $vuetify.breakpoint.mdAndDown }"
				>
					<VCol
						class="title"
						cols="auto"
						:class="{
							md: $vuetify.breakpoint.md,
							sm: $vuetify.breakpoint.sm,
							xs: $vuetify.breakpoint.xs,
						}"
						>Спеціальності</VCol
					>

					<VCol
						class="sub pr-2"
						:class="{
							md: $vuetify.breakpoint.md,
							sm: $vuetify.breakpoint.sm,
							xs: $vuetify.breakpoint.xs,
						}"
					>
						Коледж готує фахівців освітньо-професійного ступеня «фаховий
						молодший бакалавр» за спеціальностями/освітньо-професійними
						програмами (ОПП)
					</VCol>
				</VRow>
				<SpecialitiesList :isSpecialities="isSpecialities" />
			</div>
			<div class="my-10" id="AboutComponent" v-intersect="onIntersect">
				<about-component :isShowAbout="isShowAbout" />
			</div>
			<!-- news list -->
			<div
				class="my-container"
				v-intersect="onIntersectNews"
				:class="{ 'mt-5': $vuetify.breakpoint.mdAndDown }"
			>
				<MainNewsList :isShowNews="isShowNews" />
			</div>
			<div
				v-intersect="onIntersectFooter"
				class="my-container"
				style="margin-top: 120px"
				id="InformationComponent"
			>
				<FooterComponent :isShowFooter="isShowFooter" />
			</div>
			<div class="my-4">
				<my-header menu="true" @onBurger="onBurger" />
			</div>
		</div>
		<div class="main-navigation-right">
			<right-navigation
				@onBurgerNav="onBurgerNav"
				:navigationRight="navigationRight"
				:onActiveHeader="onActiveHeader"
			/>
		</div>
	</div>
</template>

<script>
import MyHeader from '../UI/my-header.vue';
import CoolNews from './coolNews/CoolNews.vue';
import SpecialitiesList from './specialities/SpecialitiesList.vue';
import MainNewsList from './simpleNews/MainNewsList.vue';
import FooterComponent from './footer/FooterComponent.vue';
import RightNavigation from '../UI/RightNavigation.vue';
import AboutComponent from './about/AboutComponent.vue';

export default {
	data: () => ({
		mainImage: '../../../assets/img/main-img.jpg',
		navigationRight: '',
		windowTop: 0,
		oldValueTop: 0,
		onActiveHeader: false,
		isShowFooter: false,
		isShowNews: false,
		isShowAbout: false,
		isSpecialities: false,
		globalRightNavigation: '',
	}),
	components: {
		MyHeader,
		CoolNews,
		SpecialitiesList,
		MainNewsList,
		FooterComponent,
		RightNavigation,
		AboutComponent,
	},

	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll);
	},
	watch: {
		windowTop(e) {
			if (this.oldValueTop > e && e > 0) {
				this.onActiveHeader = true;
			} else {
				this.onActiveHeader = false;
			}
		},
	},
	mounted() {
		this.globalRightNavigation =
			this.$vuetify.breakpoint.width <= 1626 ? false : true;
		console.log(this.$vuetify.breakpoint);
		window.addEventListener('scroll', this.onScroll);
		if (this.$vuetify.breakpoint.mdAndDown) {
			this.navigationRight = false;
		} else {
			this.navigationRight = true;
		}

		setTimeout(() => {
			let AboutComponent = document.querySelector('#AboutComponent');

			if (this.$route.params.isAbout) {
				this.navigationRight = false;
				window.scrollTo(0, AboutComponent.offsetTop);
			}
		}, 500);

		setTimeout(() => {
			let InformationComponent = document.querySelector(
				'#InformationComponent'
			);

			if (this.$route.params.isInformation) {
				window.scrollTo(0, InformationComponent.offsetTop);
			}
		}, 500);
	},
	methods: {
		onScroll(e) {
			this.oldValueTop = this.windowTop;
			this.windowTop = e.target.documentElement.scrollTop;
		},
		onIntersect(entries, observer) {
			if (!this.$vuetify.breakpoint.mdAndDown && this.globalRightNavigation) {
				this.navigationRight = !entries[0].isIntersecting;
			}
			this.isShowAbout = entries[0].isIntersecting;
		},
		onIntersectFooter(entries, observer) {
			this.isShowFooter = entries[0].isIntersecting;
		},
		onIntersectNews(entries, observer) {
			this.isShowNews = entries[0].isIntersecting;
		},
		onIntersectSpecialities(entries, observer) {
			this.isSpecialities = entries[0].isIntersecting;
		},
		onCloseNavigation() {
			this.navigationRight = false;
		},
		onBurgerNav(e) {
			this.navigationRight = e;
		},
		loadedMain() {},
		onBurger(e) {
			this.navigationRight = !this.navigationRight;
			this.globalRightNavigation = !this.globalRightNavigation;
		},
	},
};
</script>
<style lang="scss">
.first-screen {
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: 0.5s ease;
	span {
		margin-top: 80px;
		margin-bottom: 40px;
		font-family: 'Montserrat', sans-serif;
		font-style: normal;
		font-weight: normal;
		color: #4b4453;
		font-size: 41px;
	}
	&.md {
		span {
			margin-top: 50px;
			font-size: 30px;
		}
		.img_wrapper {
			margin-top: 30px;
			height: 500px;
			max-width: 800px;
		}
		.main-glass {
			max-width: 500px;
			height: 150px;
			padding: 20px 30px;
			border-radius: 10px;
			top: -8%;
			.title_text {
				font-size: 22px;
			}
		}
	}
	&.sm {
		span {
			margin-top: 50px;
			font-size: 30px;
		}
		.img_wrapper {
			margin-top: 30px;
			height: 400px;
			max-width: 600px;
		}
		.main-glass {
			max-width: 400px;
			height: 100px;
			padding: 20px 30px;
			border-radius: 10px;
			top: -10%;
			.title_text {
				font-size: 100%;
			}
		}
	}
	&.xs {
		span {
			margin-top: 40px;
			font-size: 15px;
		}
		.img_wrapper {
			margin-top: 5px;
			height: 180px;
			max-width: 320px;
		}
		.main-glass {
			max-width: 170px;
			height: auto;
			padding: 20px 10px;
			border-radius: 5px;
			top: -20%;
			.title_text {
				font-size: 7px;
			}
		}
	}
}
.img_wrapper {
	transition: 0.5s ease;
	background: white;
	margin-top: 100px;
	height: 650px;
	display: flex;
	position: relative;
	justify-content: center;
	align-items: flex-start;
	max-width: 1300px;
	width: 100%;
	.glass {
		top: -100px;
		position: absolute;
		z-index: 1;
	}
}
.title,
.sub {
	transition: 0.1s ease;
	font-family: 'Montserrat', sans-serif;
	font-style: normal;
	font-weight: 600;
	font-size: 62px !important;
	line-height: 78px;

	color: #4b4453;
}
.title {
	&.md {
		font-size: 44px !important;
	}
	&.sm {
		font-size: 34px !important;
	}
	&.xs {
		font-size: 15px !important;
	}
}
.sub {
	font-weight: 500;
	line-height: 29px;
	font-size: 24px !important;
	&.md {
		font-size: 15px !important;
		line-height: 20px;
	}
	&.sm {
		font-size: 10px !important;
		line-height: 15px;
	}
	&.xs {
		font-size: 10px !important;
		line-height: 15px;
	}
}
.img {
	width: 100%;
	object-fit: cover;
	height: 100%;
	z-index: 0;
	max-width: 1300px;
}
.main-glass {
	transition: 0.5s ease;
	max-width: 780px;
	width: 100%;
	height: 220px;
	border-radius: 20px;
	top: -15%;
	z-index: 1;
	position: absolute !important;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid rgba(227, 227, 227, 0.4);
	background: rgba(255, 254, 254, 0.772);
	overflow: hidden;
	.title_text {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 35px;
		font-weight: bold;
		font-family: 'Montserrat', sans-serif;
		color: #4b4453;
	}

	// &::before {
	// 	content: '';
	// 	background: inherit;
	// 	z-index: -1;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
	// 	filter: blur(10px);
	// 	margin: -20px;
	// }
}
</style>
