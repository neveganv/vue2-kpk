<template>
	<div>
		<VRow no-gutters justiyfy="center">
			<div
				class="my-title"
				:class="{
					md: $vuetify.breakpoint.md,
					sm: $vuetify.breakpoint.sm,
					xs: $vuetify.breakpoint.xs,
				}"
			>
				Новини коледжу
			</div>
		</VRow>
		<div>
			<MainNewsCategoryList
				@clickCategory="clickCategory"
				:activeCategory="activeCategory"
				:sceletonLoader="sceletonCategory"
				:categories="categories"
			/>
		</div>
		<div>
			<NewsList :news="news" :sceletonLoader="sceletonLoader" />
			<v-pagination
				color="#ff8066"
				@input="changePage"
				circle
				v-model="page"
				:length="newsLength"
				:total-visible="5"
				:disabled="sceletonLoader"
				v-if="news.length"
			>
			</v-pagination>
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
		sceletonLoader: true,
		newsLength: 0,
		recentPage: 1,
		page: 1,
		news: [],
		changeNews: [],
		categories: [],
		sceletonCategory: false,
		isIntersectFirst: false,
	}),
	props: {
		isShowNews: {
			require: true,
		},
	},
	watch: {
		isShowNews: {
			deep: true,
			handler(e) {
				if (e && this.news.length === 0 && !this.isIntersectFirst) {
				}
			},
		},
	},
	components: {
		MainNewsCategoryList,
		NewsList,
	},
	mounted() {
		this.getNews();
		this.getCategories();
	},
	methods: {
		changePage(e) {
			if (this.recentPage != e) {
				this.recentPage = e;
				this.getNews();
			}
		},
		clickCategory(e) {
			if (this.activeCategory != e) {
				this.activeCategory = e;
				this.page = 1;
				this.getNews();
			}
		},
		async getNews() {
			try {
				this.sceletonLoader = true;
				this.isIntersectFirst = true;
				let params = [];
				params.limit = this.$vuetify.breakpoint.smAndDown ? 2 : 4; // ліміт потім треба буде оголосити в компутеді
				params.page = this.page;
				if (this.activeCategory != 'all') {
					params.category = this.activeCategory;
				}
				await newsService.getAllNews({ ...params }).then(res => {
					this.news = res.result;
					this.newsLength = Math.ceil(res.length / params.limit);
				});
				this.changeNews = this.news;
				this.sceletonLoader = false;
			} catch (e) {
				alert(e);
			}
		},
		async getCategories() {
			try {
				this.sceletonCategory = true;
				this.isIntersectFirst = true;
				const newCategorie = await newsService.getSimpleNewsCategories();
				this.categories = newCategorie.result;
				this.categories.unshift({ name: 'Всі', _id: 'all' });
				this.sceletonCategory = false;
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
