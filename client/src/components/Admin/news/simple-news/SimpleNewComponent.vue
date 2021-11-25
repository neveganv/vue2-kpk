<template>
	<div class="simple-new">
		<VRow justify="end" class="p-1">
			<VBtn outlined color="primary" @click="visible = true">
				<v-icon left> mdi-newspaper-plus </v-icon>Створити новину
			</VBtn>
		</VRow>
		<VRow>
			<VCol>
				<NewsList :news="news" @show ="showNews"/>
			</VCol>
		</VRow>
		<AddNewDialog
			@addNews="addNews"
			:visible="visible"
			@close="visible = false"
			v-if="visible"
		/>
		<AddNewDialog
			:visibleEdit="visibleEdit"
			:chosenNews="clickNews"
			@close="visibleEdit = false"
			v-if="visibleEdit"
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
		visibleEdit: false,
		news: [],
		clickNews: []
	}),
	mounted() {
		this.getNews();
	},
	methods: {
		addNews() {
			this.visible = false;
			this.getNews();
		},
		updateNews(){
            this.edit = false;
			this.getNews();
		},
		showNews(e){
			this.visibleEdit =true,
			this.clickNews = e;
		},
		async getNews() {
			try {
				this.news = await newsService.getAllNews();
				console.log(this.news)
			} catch (e) {
				alert(e);
			}
		},
		showEdit(e) {
			this.news = e;
			this.visibleEdit = true;
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
