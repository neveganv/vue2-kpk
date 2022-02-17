<template>
	<div class="simple-new">
		<VRow justify="space-between" align="center" no-gutters>
			<VCol cols="3">
				<v-select
					prepend-inner-icon="mdi-filter-variant"
					:items="Object.values(categories)"
					:item-value="'_id'"
					:item-text="'name'"
					v-model="filter.category"
					label="Оберіть категорію"
					outlined
					@change="changeCategory"
					clearable
					hide-details
					dense
					rounded
					:menu-props="{bottom:true,offsetY:true}"
				>
					<template #selection="{ item }">
						<v-chip small color="primary">{{ (tmpGroup = item.name) }}</v-chip>
					</template>
				</v-select>
			</VCol>
			<VCol cols="auto">
				<VBtn rounded outlined color="primary" @click="visible = true">
					<v-icon left> mdi-newspaper-plus </v-icon>Створити новину
				</VBtn>
			</VCol>
		</VRow>
		<VRow>
			<VCol>
				<NewsList :news="news" @show="showNews" @deleteNew="deleteNew" />
			</VCol>
		</VRow>
		<AddNewDialog
			@addNews="addNews"
			:visible="visible"
			@close="
				visible = false;
				clickNews = null;
			"
			v-if="visible"
			:chosenNews="clickNews"
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
		clickNews: null,
		categories: [],
		filter: [],
		chosenCategory: '',
		changeNews: [],
	}),
	mounted() {
		this.getNews();
		console.log(this.news);
		this.getCategories();
	},
	computed: {
		sortedNews() {
			if (!this.chosenCategory) {
				return this.news;
			} else {
				console.log(this.chosenCategory);
				console.log(this.news);
				return [
					...(this.changeNews = this.news.filter(
						item => item.category._id == this.chosenCategory
					)),
				];
			}
		},
	},
	methods: {
		changeCategory(e) {
			this.chosenCategory = e;
		},
		addNews() {
			this.visible = false;
			this.getNews();
		},
		updateNews() {
			this.edit = false;
			this.getNews();
		},
		showNews(e) {
			(this.visible = true), (this.clickNews = e._id);
		},
		async deleteNew(e) {
			try {
				this.setLoading(true);
				await newsService.deleteSimpleNews({ id: e });
				this.news = this.news.filter(item => item._id !== e);
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		async getNews() {
			try {
				this.setLoading(true);
				await newsService.getAllNews().then((res) => {
					this.news = res.result
				});
				this.changeNews = this.news;
				this.setLoading(false);
			} catch (e) {
				alert(e);
			}
		},
		async getCategories() {
			try {
				await newsService.getSimpleNewsCategories().then((res) => {
					this.categories = res.result
				});
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
