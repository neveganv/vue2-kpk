<template>
	<card-swipe v-if="news.length > 0">
		{{ news }}
		<card-swipe-item
			class="card-item"
			v-for="newItem in news"
			:key="newItem._id"
		>
			<div class="card-img">
				<img :src="newItem.main_img" />
				<span class="title">{{ newItem.title }}</span>
				<span class="time">
					{{
						moment(newItem.created_time)
							.locale('uk')
							.startOf('hours')
							.fromNow() || '--'
					}}</span
				>
			</div>
		</card-swipe-item>
	</card-swipe>
</template>

<script>
import { CardSwipe, CardSwipeItem } from '@eshengsky/vue-card-swipe';

export default {
	props: {
		news: {
			required: false,
		},
	},
	watch:{
		news:{
			deep:true,
			handler(e){
				console.log(e)
			}
		}
	},
	components: {
		CardSwipe,
		CardSwipeItem,
	},
	mounted() {
		console.log(this.news);
	},
};
</script>

<style lang="scss" scoped>
.card {
	&-item {
		height: 300px;
	}
	&-img {
		font-family: 'Montserrat', sans-serif !important;
		width: 100%;
		height: 100%;
		position: relative;
		img {
			width: 100%;
			height: 300px;
			object-fit: cover;
		}

		&:before {
			position: absolute;
			top: 0;
			right: 0;
			content: '';
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 1;
		}
		.title {
			position: absolute;
			left: 0;
			top: 0;
			color: white;
			z-index: 100;
			margin: 10px;
		}
		.time {
			position: absolute;
			left: 0;
			bottom: 0;
			color: white;
			z-index: 100;
			margin: 10px;
			font-weight: 600;
		}
	}
}
</style>
