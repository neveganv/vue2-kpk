<template>
	<VRow justify="center" class="category__wrapper m-auto">
		<div
			class="category__inner "
			v-for="categorie in categories"
			:key="categorie._id"
			@click="changeNews(categorie._id)"
		>
			{{ categorie.name }}
		</div>
	</VRow>
</template>

<script>
import newsService from '@/request/news/newsService';

export default {
	data: () => ({
		categories: [],
	}),
	mounted() {
		this.getCategories();
	},
	methods: {
		async getCategories() {
			try {
				this.categories = await newsService.getSimpleNewsCategories();
			} catch (e) {
				alert(e);
			}
		},
		changeNews(e) {
			console.log(e);
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
		&.active {
			font-weight: 500 
		}
	}
}
</style>
