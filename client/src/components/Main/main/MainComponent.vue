<template>
	<div class="overflow-auto">
		<!-- header  -->
		<my-header />
		<!-- main image -->
		<div class="first-screen my-container">
			<span>Політехніка звучить гордо</span>
			<div class="img_wrapper">
				<div class="main-glass">
					<img :src="require('@/assets/img/main_text.svg')" alt="">
				</div>
			</div>
		</div>
		<!-- cool news -->
		<div class="my-container" style="margin-top: 150px; margin-bottom: 150px">
			<CoolNews />
		</div>
		<!-- specialities  -->
		<div class="my-container">
			<VRow align="center" justify="space-between" style="margin-bottom: 100px">
				<VCol class="title">Спеціальності</VCol>
				<VCol class="sub">
					Коледж готує фахівців освітньо-професійного ступеня «фаховий молодший
					бакалавр» за спеціальностями/освітньо-професійними програмами (ОПП)
				</VCol>
			</VRow>
			<SpecialitiesList />
		</div>
		<!-- news list -->
		<div class="my-container" style="margin-top: 160px">
			<MainNewsList />
		</div>
		<div style="height: 100vh"></div>
	</div>
</template>

<script>
import MyHeader from '../UI/my-header.vue';
import CoolNews from './CoolNews.vue';
import SpecialitiesList from './SpecialitiesList.vue';
import MainNewsList from './MainNewsList.vue';

export default {
	data: () => ({
		mainImage: '../../../assets/img/main-img.jpg',
	}),
	components: {
		MyHeader,
		CoolNews,
		SpecialitiesList,
		MainNewsList,
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
	background-image: url('../../../assets/img/main-img.jpg');
	background-size: cover;
	width: 100%;
	margin-top: 100px;
	height: 700px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: flex-start;
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
	width: 1300px;
	object-fit: cover;
	height: 740px;
	position: relative;
	z-index: 0;
}
.main-glass {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 769.57px;
	height: 217.49px;
	position: absolute;
	border-radius: 20px;
	top: -15%;
	position: relative;
	z-index: 1;
	border: 1px solid rgba(227, 227, 227, 0.4);
	background: rgba(242, 242, 242, 0.6);
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
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
