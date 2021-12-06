<template>
	<div class="my-new">
		<div class="my-new__header">
			<b>{{ newItem.category.name || '--' }}</b>
			<div>
				<span>
					{{ moment(newItem.created_time).locale('uk').format('LL') || '--' }}
				</span>
				<div class="views"><VIcon small >mdi-eye</VIcon>{{newItem.views}}</div>
			</div>
		</div>
		<div class="my-new__content">
			{{ newItem.title }}
		</div>
		<div class="my-new__img">
			<img :src="newItem.main_img" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		newItem: {
			require: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.my-new {
	cursor: pointer;
	max-width: 530px;
	width: 100%;
	height: 440px;
	padding-left: 15px;
	margin: 20px 0;
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
        .views{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            font-size: 13px;
            color:#757575
        }
	}
	&__content {
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: normal;
		width: 80%;
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
		height: 80%;
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
