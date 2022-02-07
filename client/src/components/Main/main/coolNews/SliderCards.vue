<template>
	<div class="my-swiper" 		:class="{
				md: $vuetify.breakpoint.md,
				sm: $vuetify.breakpoint.sm,
				xs: $vuetify.breakpoint.xs,
			}">
		<swiper
			class="swiper"
			:options="swiperOption"
			@swiper="onSwiper"
			@slideChange="onSlideChange(news)"
			ref="swiperName"
			:class="{
				md: $vuetify.breakpoint.md,
				sm: $vuetify.breakpoint.sm,
				xs: $vuetify.breakpoint.xs,
			}"
		>
			<swiper-slide
				v-for="item in news"
				:key="item._id"
				:class="{
					md: $vuetify.breakpoint.md,
					sm: $vuetify.breakpoint.sm,
					xs: $vuetify.breakpoint.xs,
				}"
			>
				<img :src="item.img" alt="" />
				<div style="display: none">{{ item._id }}</div>
			</swiper-slide>

			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	props: {
		news: {
			require: true,
		},
	},
	methods: {
		onSwiper(swiper) {
			console.log(swiper);
		},
		onSlideChange() {
			this.$emit('changeSlider', this.$refs.swiperName.$swiper.activeIndex);
		},
	},
	data: () => ({
		swiperOption: {
			effect: 'cube',
			grabCursor: true,
			cubeEffect: {
				shadow: true,
				slideShadows: true,
				shadowOffset: 10,
				shadowScale: 0.85,
			},
			pagination: {
				el: '.swiper-pagination',
			},
		},
	}),
};
</script>

<style lang="scss" >
.my-swiper {
	position: relative;
	overflow: hidden;
	height: 380px;
		&.xs {
		height: 280px!important;

	}
}

.swiper {
	width: 340px !important;
	height: 300px !important;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -150px;
	margin-top: -150px;
	&.xs {
		height: 230px!important;
		width: 300px!important;
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-weight: bold;
		font-size: 20px;
		background-color: #2c8dfb;
		background-position: center;
		background-size: cover;
		color: white;
		&.xs {
			width: 300px!important;
		}
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			position: relative;
			display: block;
			z-index: -1;
		}
		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(#0000, 0.3);
			z-index: 1;
		}
	}

	.swiper-pagination {
		.swiper-pagination-bullet.swiper-pagination-bullet-active {
			background-color: rgba(255, 255, 255, 0.767);
		}
	}
}
</style>
