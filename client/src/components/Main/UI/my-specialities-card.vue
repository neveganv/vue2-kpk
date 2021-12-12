<template>
	<div class="specialities-card" @click="onClick">
		<div class="card__title">
			<div class="title__number">{{ '0' + indexSpecialitie || '--' }}</div>
			<div class="title__text">
				{{ specialitie.name || '--' }} ({{ specialitie.number || '--' }})
			</div>
		</div>
		<div class="card__img">
			<img :src="specialitie.img" />
		</div>
		<div class="card__arrow" v-if="!edit">
			<VIcon>mdi-arrow-bottom-left</VIcon>
		</div>
		<div class="card__arrow" v-else>
			<VBtn color="primary">
				<VIcon>mdi-square-edit-outline</VIcon>
			</VBtn>
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
		indexSpecialitie: {
			require: true,
		},
		edit: {
			require: false,
		},
	},
	methods: {
		onClick() {
			this.$router.push({
				name: 'main-speciality-page',
				params: { id: this.specialitie._id },
			});
		},
	},
};
</script>

<style lang="scss">
.specialities-card {
	margin: auto;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	max-width: 350px;
	width: auto;
	// height: 300px;
	background: #fff;
	transition: 0.2s ease;
	position: relative;
	padding-left: 15px;
	.card__title {
		display: flex;
		justify-content: flex-start;
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
			max-width: 250px;
			width: 100%;
			height: 65px;
			font-weight: 600;
			font-size: 15px;
			line-height: 15px;
		}
	}
	.card__img {
		align-self: flex-end;
		max-width: 450px;
		height: 100%;
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
		height: 350px;
		left: 0;
		top: 0;
		background: #b0a8b9;
	}
	&:hover {
		img {
			opacity: 0.9;
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
	&:active {
		transform: scale(0.95);
	}
}
.card__arrow {
	position: absolute;
	top: 0;
	right: 0;
}
</style>
