<template>
	<div>
		<my-header />
		<div class="my-container mt-5" :class="{'small' : $vuetify.breakpoint.smAndDown}">
			<VRow no-gutters align="center"
				><VBtn
					:class="{'x-small' : $vuetify.breakpoint.smAndDown}"
					small
					color="primary"
					text
					@click="$router.push({ path: '/' })"
				>
					<VIcon left>mdi-arrow-left</VIcon> На головну</VBtn
				>
					<VDivider /></VRow
			>
		</div>
		<div class="my-container mt-10"  :class="{'small' : $vuetify.breakpoint.smAndDown}">
			<VRow no-gutters>
				<VCol cols="12" xl="8" lg="8" md="8" sm="12">
					<NewsInner :newItem="newItem" :sceletonLoader="sceletonLoader" />
				</VCol>
				<VCol cols="12" xl="4" lg="4" md="4" sm="12">
					<AnotherNewsList :news="news" :sceletonLoader="sceletonLoader" />
				</VCol>
			</VRow>
		</div>
	</div>
</template>

<script>
import MyHeader from '../UI/my-header.vue';
import NewsInner from './NewsInner.vue';
import AnotherNewsList from './AnotherNewsList.vue';

import newsService from '@/request/news/newsService';

export default {
	data: () => ({
		newItem: [],
		news: [],
		sceletonLoader: false,
	}),
	components: {
		MyHeader,
		NewsInner,
		AnotherNewsList,
	},
	watch: {
		$route: {
			deep: true,
			handler(e) {
				this.getNewItem();
				this.getNews();
			},
		},
	},
	mounted() {
		this.getNewItem();
	},
	methods: {
		async getNews() {
			try {
				this.news = await newsService.getAllNews();
				this.news = this.news.filter(e => e._id !== this.$route.params.id);
				this.news.sort((a, b) => b.views - a.views);
				this.sceletonLoader = false;
			} catch (e) {
				alert(e);
			}
		},
		async getNewItem() {
			try {
				this.sceletonLoader = true;
				this.newItem = await newsService.getSimpleNewsById({
					id: this.$route.params.id,
				});
				console.log(this.newItem);
				this.getNews();
			} catch (e) {
				alert(e);
			}
		},
	},
};
</script>

<style></style>
