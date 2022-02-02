<template>
	<div class="overflow-auto">
		<!-- header  -->
		<div>
			<my-header
				@onBurger="onBurger"
				:navigationRight="navigationRight"
				menu="true"
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
						<img
							draggable="false"
							:src="require('@/assets/img/main_text.svg')"
							alt=""
						/>
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
			<div class="my-container">
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
				<SpecialitiesList />
			</div>
			<!-- news list -->
			<div
				class="my-container"
				style="margin-top: 160px"
				:class="{ 'mt-5': $vuetify.breakpoint.mdAndDown }"
			>
				<MainNewsList />
			</div>
			<div class="my-container" style="margin-top:120px">
				<FooterComponent />
			</div>
			<div class="my-4">
				<my-header menu="true" @onBurger="onBurger" />
			</div>
		</div>
		<div class="main-navigation-right">
			<right-navigation
				@closeNavigation="onCloseNavigation"
				@onBurgerNav="onBurger"
				:navigationRight="navigationRight"
			/>
		</div>
	</div>
</template>

<script>
import MyHeader from '../UI/my-header.vue';
import CoolNews from './CoolNews.vue';
import SpecialitiesList from './SpecialitiesList.vue';
import MainNewsList from './MainNewsList.vue';
import FooterComponent from './FooterComponent.vue';
import RightNavigation from './RightNavigation.vue';

export default {
	data: () => ({
		mainImage: '../../../assets/img/main-img.jpg',
		navigationRight: '',
	}),
	components: {
		MyHeader,
		CoolNews,
		SpecialitiesList,
		MainNewsList,
		FooterComponent,
		RightNavigation,
	},
	mounted() {
		if (this.$vuetify.breakpoint.mdAndDown) {
			this.navigationRight = false;
		} else {
			this.navigationRight = true;
		}
	},
	methods: {
		onCloseNavigation() {
			this.navigationRight = false;
		},
		loadedMain() {
			console.log(123);
		},
		onBurger() {
			this.navigationRight = !this.navigationRight;
		},
	},
};
</script>
<style lang="scss" scoped>
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
			img {
				width: 95%;
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
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 769.57px;
	width: 100%;
	height: 217.49px;
	border-radius: 20px;
	top: -15%;
	z-index: 1;
	position: absolute !important;

	border: 1px solid rgba(227, 227, 227, 0.4);
	background: rgba(255, 254, 254, 0.772);
	overflow: hidden;
	img {
		position: absolute;
		width: 85%;
	}

	&::before {
		content: '';
		background: inherit;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
		filter: blur(10px);
		margin: -20px;
	}
}
</style>
