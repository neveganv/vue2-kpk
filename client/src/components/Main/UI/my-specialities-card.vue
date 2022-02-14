<template>
	<div class="specialities-card mt-5 mx-1"  :class="{'edit' : edit}" >
		<div @click="onClick">
		<v-slide-x-transition>
			<div class="card__title" v-if="!sceletonLoader">
				<div class="title__number">{{ '0' + indexSpecialitie || '--' }}</div>
				<div class="title__text text-truncate" :class="{'edit' : edit}">
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
				class="mt-5"
				height="250"
			></v-skeleton-loader>
		</div>
		</div>
		<div class="card__arrow" v-if="!edit">
			<VIcon>mdi-arrow-bottom-left</VIcon>
		</div>

		<div class="card__arrow" v-else @click="onClick">

				<VIcon color="primary">mdi-square-edit-outline</VIcon>
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
			if(!this.edit){
				this.$router.push({
					name: 'main-speciality-page',
				params: { id: this.specialitie._id },
			});
		}else{
			if(!this.sceletonLoader){
				this.$emit('edit', this.specialitie._id)
			}
		}
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
	.card__title {
		display: flex;
		justify-content: flex-start;
		padding-top: 7px;
		max-width: 320px;
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
			height: 45px;
			font-weight: 600;
			font-size: 15px;
			line-height: 15px;
			&.edit{
				max-width: 230px;
			}
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
		height: 280px;
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
