<template>
	<div class="specialities-card">
		<div class="card__title">
			<div class="title__number">{{ specialitie.number }}</div>
			<div class="title__text">{{ specialitie.title }}</div>
		</div>
		<div class="card__img">
			<img src="https://picsum.photos/350/165?random">
		</div>
		<div class="card__arrow">
			<VIcon>mdi-arrow-bottom-left</VIcon>
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-specialities-item',
	props: {
		specialitie: {
			type: Object,
			require: true,
		},
	},
};
</script>

<style lang="scss">
.specialities-card {
    transform: scale(.9);
    margin: auto;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	max-width: 475px;
	width: auto;
	height: 420px;
	background: #fff;
    transition:.2s ease;
	position: relative;
    	padding-left: 15px;
	.card__title {
		display: flex;
		justify-content: space-between;
		padding-top: 7px;
	
		max-width: 350px;
		.title__number {
			font-weight: 800;
			font-size: 21px;
			line-height: 26px;
		}
		.title__text {
			padding-left: 10px;
			padding-top: 7px;
			max-width: 300px;
			width: 100%;
			height: 65px;
			font-weight: 600;
			font-size: 21px;
			line-height: 26px;
		}
	}
	.card__img {
		align-self: flex-end;
		max-width: 450px;
		height: 400px;
		width: 100%;

		img {
            object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	&:after {
		content: '';
		position: absolute;
		width: 2px;
		height: 400px;
		left: 0;
		top: 0;
		background: #b0a8b9;
	}
	&:hover {
		img {
			opacity: 0.8;
		}
	}
	&.card-2 {
		margin-top: 200px;
	}
	&.card-3 {
		margin-left: 200px;
	}
	&.card-4 {
		margin-top: 600px;
	}
	&.card-5 {
		margin-top: -300px;
	}
    &:active{
        transform: scale(.8);
    }
}
.card__arrow {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
