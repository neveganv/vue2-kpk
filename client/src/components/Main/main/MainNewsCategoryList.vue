<template>
	<div>
		<VRow
			no-gutters
			justify="center"
			class="category__wrapper m-auto"
			v-if="!sceletonLoader"
		>
			<div
				class="category__inner"
				v-for="categorie in categories"
				:key="categorie._id"
				@click="changeNews(categorie._id)"
				:class="{ active: categorie._id === activeCategory }"
			>
				{{ categorie.name }}
			</div>
		</VRow>
		<VRow v-else no-gutters justify="center" class="category__wrapper m-auto">
			<div class="category__inner" v-for="item in 4" :key="item">
				<v-skeleton-loader
					type="chip"
					style="padding: 15px"
				></v-skeleton-loader>
			</div>
		</VRow>
	</div>
</template>

<script>
export default {
	props: {
		activeCategory: {
			require: false,
		},
		categories: {
			require: true,
		},
		sceletonLoader: {
			require: false,
		},
	},

	mounted() {
		console.log(this.activeCategory);
	},
	methods: {
		changeNews(e) {
			this.$emit('clickCategory', e);
		},
	},
};
</script>

<style lang="scss" scoped>
.category__wrapper {
	margin-top: 30px;
	margin-bottom: 90px;
	.category__inner {
		margin-left: 50px;
		font-family: Montserrat;
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		line-height: 24px;
		color: #4b4453;
		cursor: pointer;
		transition: transform 0.4s ease;
		&:hover {
			opacity: 0.9;
		}
		&:active {
			transform: scale(0.9);
		}
		&.active {
			font-weight: 500;
		}
	}
}
</style>
