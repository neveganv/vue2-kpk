<template>
	<div>
		<my-header />
		<div
			class="my-container mt-5"
			:class="{ small: $vuetify.breakpoint.smAndDown }"
		>
			<VRow no-gutters align="center"
				><VBtn
					:class="{ 'x-small': $vuetify.breakpoint.smAndDown }"
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
		<div
			class="my-container mt-10"
			:class="{ small: $vuetify.breakpoint.smAndDown }"
		>
			<VRow no-gutters>
				<VCol cols="12" xl="8" lg="8" md="8" sm="12">
					<PageInner
						:page="page"
						:sceletonLoader="sceletonLoader"
						:PageDeleted="PageDeleted"
					/>
				</VCol>
				
				<VCol cols="12" xl="4" lg="4" md="4" sm="12">
					<AnotherNewsList :news="news" :sceletonLoader="sceletonLoader" />
				</VCol>
				<footer-component />
			</VRow>
		</div>
	</div>
</template>

<script>
import pageService from '@/request/page/pageService';
import MyHeader from '../UI/my-header.vue';
import PageInner from './PageInner.vue';
import newsService from '@/request/news/newsService';
import AnotherNewsList from '../news/AnotherNewsList.vue';
import FooterComponent from '../main/footer/FooterComponent.vue';

export default {
	data: () => ({
		page: [],
		sceletonLoader: false,
		news: [],
		PageDeleted: false,
	}),
	watch: {
		$route: {
			deep: true,
			handler(e) {
				this.getPage();
			},
		},
	},
	components: {
		MyHeader,
		PageInner,
		AnotherNewsList,
		FooterComponent,
	},
	mounted() {
		this.getPage();
	},
	methods: {
		async getPage() {
			this.sceletonLoader = true;
			const newPage = await pageService.getOne({ _id: this.$route.params.id });
			this.page = newPage[0];
			console.log('my-page', this.page);
			console.log(newPage);
			if (!this.page) {
				this.PageDeleted = true;
				this.sceletonLoader = false;
			}
			this.getNews();
		},
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
	},
};
</script>

<style lang="scss"></style>
