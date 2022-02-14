<template>
	<div>
		<my-header
			@onBurger="onBurger"
			:navigationRight="navigationRight"
			menu="true"
		/>
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
				<VDivider
			/></VRow>
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
					<AnotherNewsList
						:news="news"
						:sceletonLoader="anotherSceletonLoader"
					/>
				</VCol>
				<footer-component
					:isShowFooter="isShowFooter"
					v-intersect="onIntersectFooter"
				/>
			</VRow>
		</div>
		<div class="main-navigation-right">
			<right-navigation
				@onBurgerNav="onBurgerNav"
				:navigationRight="navigationRight"
			/>
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
import RightNavigation from '../UI/RightNavigation.vue';

export default {
	data: () => ({
		page: [],
		sceletonLoader: false,
		news: [],
		PageDeleted: false,
		navigationRight: '',
		anotherSceletonLoader: false,
		isShowFooter: false,
	}),
	watch: {
		$route: {
			deep: true,
			handler(e) {
				window.scrollTo(0, 0);
				this.getPage();
			},
		},
	},
	components: {
		MyHeader,
		PageInner,
		AnotherNewsList,
		FooterComponent,
		RightNavigation,
	},
	mounted() {
		this.getPage();
		this.getNews();
	},
	methods: {
		onIntersectFooter(entries, observer) {
			this.isShowFooter = entries[0].isIntersecting;
		},
		onBurgerNav(e) {
			this.navigationRight = e;
		},
		onBurger() {
			this.navigationRight = !this.navigationRight;
		},
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
			this.sceletonLoader = false;
		},
		async getNews() {
			try {
				this.anotherSceletonLoader = true;
				await newsService
					.getAllNews({
						limit: 4,
						page: 1,
					})
					.then(res => {
						this.news = res.result;
						this.news = this.news.filter(e => e._id !== this.$route.params.id);
						this.news.sort((a, b) => b.views - a.views);
						this.anotherSceletonLoader = false;
					});
			} catch (e) {
				this.anotherSceletonLoader = false;
				alert(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped></style>
