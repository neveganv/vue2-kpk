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
			/>
		</div>
		<div>
			<NewsList :news="SortedNews" />
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
