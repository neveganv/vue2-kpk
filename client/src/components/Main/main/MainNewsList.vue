<template>
	<div>
		<VRow no-gutters>
			<div class="my-title">
				<VBadge top overlap color="purple darken-2" content="Новинка">
					Інформація про коледж
				</VBadge>
			</div>
		</VRow>
		<div>
			<MainNewsCategoryList
				@clickCategory="clickCategory"
				:activeCategory="activeCategory"
				:sceletonLoader="sceletonLoader"
				:categories="categories"
			/>
		</div>
		<div>
			<NewsList :news="SortedNews" :sceletonLoader="sceletonLoader" />
		</div>
	</div>
</template>

<script>
import MainNewsCategoryList from './MainNewsCategoryList';
import newsService from '@/request/news/newsService';
import NewsList from './NewsList';

export default {
	data: () => ({
		activeCategory: 'all',
		sceletonLoader: false,
		news: [],
		changeNews: [],
		categories:[]
	}),
	components: {
		MainNewsCategoryList,
		NewsList,
	},
	mounted() {
		this.getNews();
	},
	methods: {
		clickCategory(e) {
			this.activeCategory = e;
		},
		async getNews() {
			try {
				this.sceletonLoader = true;
				this.news = await newsService.getAllNews();
				this.changeNews = this.news;
				this.getCategories()
			} catch (e) {
				alert(e);
			}
		},
		async getCategories() {
			try {
				this.categories = await newsService.getSimpleNewsCategories();
				this.categories.unshift({ name: 'Всі', _id: 'all' });
				this.sceletonLoader = false;
			} catch (e) {
				alert(e);
			}
		},
	},
	computed: {
		SortedNews() {
			if (this.activeCategory === 'all') {
				return this.news;
			} else {
				return [
					...(this.changeNews = this.news.filter(
						item => item.category._id == this.activeCategory
					)),
				];
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
