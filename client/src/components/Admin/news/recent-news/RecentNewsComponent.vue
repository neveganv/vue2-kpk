<template>
	<div class="simple-new">
		<VRow justify="end" class="p-1">
			<VBtn rounded outlined color="primary" @click="visible = true">
				<v-icon left> mdi-newspaper-plus </v-icon>Створити Нещодавну новину
			</VBtn>
		</VRow>
		<VRow v-if="!loading">
			<VCol>
				<NewsList :news="news" @deleteNew="deleteNew" />
			</VCol>
		</VRow>
		<VRow v-else>
			<div class="w-100 text-center">
				<v-progress-circular color="primary" indeterminate />
			</div>
		</VRow>
		<AddNewDialog
			:visible="visible"
			@close="visible = false"
			@create="createNews"
		/>
	</div>
</template>

<script>
import NewsList from './NewsList.vue';
import AddNewDialog from './AddNewsDialog.vue';
import newsService from '@/request/news/newsService';
import loader from '@/mixins/loader';

export default {
	mixins: [loader],
	components: { NewsList, AddNewDialog },
	data: () => ({
		visible: false,
		news: [],
		sceletonLoader: false,
		loading: false,
	}),
	mounted() {
		this.getNews();
	},
	methods: {
		async deleteNew(e) {
			try {
				this.setLoading(true);
				await newsService.deleteCoolNews({ id: e });
				this.news = this.news.filter(news => news._id !== e);
				this.setLoading(false);
				// this.getNews();
			} catch (e) {
				alert(e);
			}
		},
		createNews(e) {
			this.visible = false;
			this.news.push(e);
		},
		async getNews() {
			try {
				this.loading = true;
				this.news = await newsService.getCoolNews();
				console.log('news', this.news);
				this.loading = false;
			} catch (e) {
				alert(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.simple-new {
	padding: 1rem;
	height: auto;
}
</style>
