<template>
	<div class="specialities-card" >
		<div @click="onClick">
		<v-slide-x-transition>
			<div class="card__title" v-if="!sceletonLoader">
				<div class="title__number">{{ '0' + indexSpecialitie || '--' }}</div>
				<div class="title__text">
					{{ specialitie.name || '--' }} ({{ specialitie.number || '--' }})
				</div>
			</div>
		</v-slide-x-transition>
		<div class="card__title" v-if="sceletonLoader">
			<v-skeleton-loader type="chip"></v-skeleton-loader>
		</div>
		<v-slide-x-transition>
			<div class="card__img" v-if="!sceletonLoader">
				<img :src="specialitie.img" />
			</div>
		</v-slide-x-transition>
		<div v-if="sceletonLoader">
			<v-skeleton-loader
				type="card"
				class="mt-7"
				height="300"
			></v-skeleton-loader>
		</div>
		</div>
		<div class="card__arrow" v-if="!edit">
			<VIcon>mdi-arrow-bottom-left</VIcon>
		</div>

		<div class="card__arrow" v-else>
			<VBtn @click="$emit('edit', specialitie._id)" color="primary">
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
			require: false,
		},
		indexSpecialitie: {
			require: false,
		},
		edit: {
			require: false,
		},
		sceletonLoader: {
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
	cursor: pointer;
	display: flex;
	flex-direction: column;
	width: 300px;
	background: #fff;
	transition: 0.2s ease;
	position: relative;
	padding-left: 15px;
	margin: 20px 10px 20px 0;
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
		max-width: 350px;
		height: 250px;
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
		height: 300px;
		left: 0;
		top: 0;
		background: #b0a8b9;
	}
	&:hover {
		img {
			opacity: 0.9;
		}
	}
	&:active {
		transform: scale(0.95);
	}
}
.card__arrow {
	position: absolute;
	top: 0;
	right: -10px;
}
</style>
