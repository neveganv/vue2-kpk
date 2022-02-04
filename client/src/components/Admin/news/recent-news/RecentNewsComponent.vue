<template>
	<div class="simple-new">
		<VRow justify="space-between" class="p-1">
			<VCol cols="3">
				<v-select
					prepend-inner-icon="mdi-filter-variant"
					:items="categories"
					:item-value="'value'"
					:item-text="'title'"
					v-model="filter"
					label="Сортування"
					outlined
					clearable
					hide-details
					dense
					rounded
					:menu-props="{ bottom: true, offsetY: true }"
				>
					<template #selection="{ item }">
						<v-chip small color="primary">{{ (tmpGroup = item.title) }}</v-chip>
					</template>
				</v-select>
			</VCol>
			<VCol cols="auto">
				<VBtn rounded outlined color="primary" @click="visible = true">
					<v-icon left> mdi-newspaper-plus </v-icon>Створити Нещодавну новину
				</VBtn>
			</VCol>
		</VRow>
		<VRow v-if="!loading">
			<VCol>
				<NewsList :news="news" @show="showNews" @deleteNew="deleteNew" />
			</VCol>
		</VRow>
		<VRow v-else>
			<div class="w-100 text-center">
				<v-progress-circular color="primary" indeterminate />
			</div>
		</VRow>
		<AddNewDialog
			:visible="visible"
			:detailNews="detailNews"
			:chosenNews="isEdit"
			@close="close"
			@update="onUpdate"
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
		detailNews: [],
		isEdit: false,
		sceletonLoader: false,
		loading: false,
		filter: '',
		categories: [
			{ id: 2, title: 'Активні', value: 'available' },
			{ id: 3, title: 'Архівовані', value: 'archived' },
		],
	}),
	mounted() {
		this.getNews({status:'all'});
	},
	watch:{
		filter(e){
				this.getNews({status:e});
		}
	},
	methods: {
		showNews(e) {
			this.detailNews = e;
			this.visible = true;
			this.isEdit = true;
		},
		onUpdate() {
			this.news = [];
			this.getNews({status:'all'});
			this.close();
		},
		close() {
			this.isEdit = false;
			this.detailNews = [];
			this.visible = false;
		},
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
		async getNews(params = {}) {
			try {
				this.loading = true;
				this.news = await newsService.getCoolNews({ ...params });
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
