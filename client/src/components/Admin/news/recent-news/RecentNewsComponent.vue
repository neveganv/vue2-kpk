<template>
	<div class="simple-new">
		<VRow justify="end" class="p-1">
			<VBtn outlined color="primary" @click="visible = true">
				<v-icon left> mdi-newspaper-plus </v-icon>Створити круту новину
			</VBtn>
		</VRow>
		<VRow>
			<VCol>
				<NewsList :news="news" @deleteNew="deleteNew" :sceletonLoader="sceletonLoader"/>
			</VCol>
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

export default {
	components: { NewsList, AddNewDialog },
	data: () => ({
		visible: false,
		news: [],
		sceletonLoader:false
	}),
	mounted() {
		this.getNews();
	},
	methods: {
		async deleteNew(e) {
			try {
				await newsService.deleteCoolNews({id:e})
			
				console.log(	this.news.splice(e,1));
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
				this.sceletonLoader = true
				this.news = await newsService.getCoolNews();
				this.sceletonLoader = false
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
