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
			<div class="first-screen my-container">
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
									color="grey lighten-5"
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
			<div class="my-container" style="margin-top: 150px; margin-bottom: 150px">
				<CoolNews />
			</div>
			<!-- specialities  -->
			<div class="my-container">
				<VRow
					align="center"
					justify="space-between"
					style="margin-bottom: 100px"
				>
					<VCol class="title">Спеціальності</VCol>
					<VCol class="sub">
						Коледж готує фахівців освітньо-професійного ступеня «фаховий
						молодший бакалавр» за спеціальностями/освітньо-професійними
						програмами (ОПП)
					</VCol>
				</VRow>
				<SpecialitiesList />
			</div>
			<!-- news list -->
			<div class="my-container" style="margin-top: 160px">
				<MainNewsList />
			</div>
			<div class="my-container">
				<FooterComponent />
			</div>
			<div class="my-4">
				<my-header  menu="true" @onBurger="onBurger" />
			</div>
		</div>
		<div class="main-navigation-right">
			<right-navigation
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
		navigationRight: true,
	}),
	components: {
		MyHeader,
		CoolNews,
		SpecialitiesList,
		MainNewsList,
		FooterComponent,
		RightNavigation,
	},
	methods: {
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
	span {
		margin-top: 80px;
		margin-bottom: 40px;
		font-family: 'Montserrat', sans-serif;
		font-style: normal;
		font-weight: normal;
		color: #4b4453;
		font-size: 41px;
	}
}
.img_wrapper {
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
	font-family: 'Montserrat', sans-serif;
	font-style: normal;
	font-weight: 600;
	font-size: 64px !important;
	line-height: 78px;

	color: #4b4453;
}
.sub {
	font-weight: 500;
	line-height: 29px;
	font-size: 24px !important;
}
.img {
	width: 100%;
	object-fit: cover;
	height: 100%;
	z-index: 0;
	max-width: 1300px;
}
.main-glass {
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
	background: rgba(242, 242, 242, 0.6);
	overflow: hidden;
	img {
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
