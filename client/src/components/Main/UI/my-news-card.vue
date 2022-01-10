<template>
	<div class="my-new" @click="onClick">
		<div class="my-new__header" v-if="!sceletonLoader">
			<b> {{ newItem.category.name || '--' }}</b>

			<div class="text-right">
				<span >
					{{ moment(newItem.created_time).locale('uk').format('LL') || '--' }}
				</span>
				<div class="views" v-if="newItem.views >0 "><VIcon left small>mdi-eye</VIcon>{{ newItem.views }}</div>
				<div class="views" v-else><VIcon left small>mdi-eye</VIcon>немає переглядів</div>
			</div>
		</div>
		<div class="my-new__header" v-else>
			<v-skeleton-loader
				type="article"
				style="width: 530px"
			></v-skeleton-loader>
		</div>
		<div class="my-new__content" v-if="!sceletonLoader">
			{{ newItem.title }}
			
		</div>
		<div class="my-new__img" v-if="!sceletonLoader">
			<img :src="newItem.main_img" draggable="false" />
		</div>
		<div class="my-new__img" v-else>
			<v-skeleton-loader
				type="image"
				style="width: 530px; padding: 15px"
			></v-skeleton-loader>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		newItem: {
			require: true,
		},
		sceletonLoader: {
			require: false,
		},
	},
	methods:{
		onClick(){

			this.$router.push({
				path:`/news-${this.newItem._id}`
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.my-new {
	cursor: pointer;
	width: 530px;
	height: 440px;
	padding-left: 15px;
	margin: 20px 0 70px 0;
	position: relative;
	transition: 0.2s ease;
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		b,
		span {
			font-style: normal;
			font-weight: 600;
			font-size: 20px !important;
			line-height: 24px;

			color: #000000;
		}
		span {
			
			font-size: 11px !important;
			line-height: 13px;
			font-weight: 300;
		}
		.views {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: 13px;
			color: #757575;
		}
	}
	&__content {
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: normal;
		width: 80%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	&__img {
		height: 320px;
		width: 510px;

		img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	&::after {
		position: absolute;
		content: '';
		width: 2px;
		left: 0;
		top: 0;
		height: 90%;
		background: #757575;
	}
	&:hover {
		opacity: 0.9;
	}
	&:active {
		transform: scale(0.95);
	}
}
</style>
