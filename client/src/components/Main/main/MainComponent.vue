<template>
	<div class="overflow-auto">
		<!-- header  -->
		<my-header />
		<!-- main image -->
		<div class="first-screen my-container">
			<span>Політехніка звучить гордо</span>
			<div class="img_wrapper">
				<img :src="require('@/assets/img/test_img.jpg')" alt="main_img" />
				<img
					class="glass"
					:src="require('@/assets/img/main-glass.svg')"
					alt="main_img"
				/>
			</div>
		</div>
		<!-- cool news -->
		<div class="my-container" style="margin-top: 150px; margin-bottom: 150px">
			<CoolNews />
		</div>
		<!-- specialities  -->
		<div class="my-container" >
			<VRow align="center" justify="space-between" style="margin-bottom:100px">
				<VCol class="title">Спеціальності</VCol>
				<VCol class="sub">
					Коледж готує фахівців освітньо-професійного ступеня «фаховий молодший
					бакалавр» за спеціальностями/освітньо-професійними програмами (ОПП)
				</VCol>
			</VRow>
			<SpecialitiesList />
		</div>
		<!-- news list -->
			<div class="my-container" style="margin-top:160px">
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
	components: {
		MyHeader,
		CoolNews,
		SpecialitiesList,
		MainNewsList
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
	margin-top: 100px;
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
</style>
