<template>
	<VRow no-gutters justify="center" class="category__wrapper m-auto">
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
</template>

<script>
import newsService from '@/request/news/newsService';

export default {
	props: {
		activeCategory: {
			require: false,
		},
	},
	data: () => ({
		categories: [],
	}),
	mounted() {
		console.log(this.activeCategory);
		this.getCategories();
	},
	methods: {
		async getCategories() {
			try {
				this.categories = await newsService.getSimpleNewsCategories();
				this.categories.unshift({ name: 'Всі', _id: 'all' });
			} catch (e) {
				alert(e);
			}
		},
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
		transition: transform .4s ease;
		&:hover{
			opacity: .9;
		}
		&:active{
			transform:scale(.9)
		}
		&.active {
			font-weight: 500;
		}
	}
}
</style>
