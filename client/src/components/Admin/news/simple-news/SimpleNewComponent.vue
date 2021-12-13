<template>
	<div class="simple-new">
		<VRow justify="space-between" align="center" no-gutters>
			<VCol cols="auto ">
				<v-select
					v-if="!sceletonLoader"
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
				>
					<template #selection="{ item }">
						<v-chip small color="primary">{{ (tmpGroup = item.name) }}</v-chip>
					</template>
				</v-select>
				<div v-else>
					<v-skeleton-loader light type="heading"></v-skeleton-loader>
				</div>
			</VCol>
			<div >
				<VBtn  rounded outlined color="primary" @click="visible = true">
					<v-icon left> mdi-newspaper-plus </v-icon>Створити новину
				</VBtn>
			</div>
		</VRow>
		<VRow>
			<VCol>
				<NewsList
					:news="news"
					@show="showNews"
					@deleteNew="deleteNew"
					:sceletonLoader="sceletonLoader"
				/>
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

export default {
	components: { NewsList, AddNewDialog },
	data: () => ({
		visible: false,
		news: [],
		clickNews: null,
		sceletonLoader: false,
		categories: [],
		filter: [],
	}),
	mounted() {
		this.getNews();
		this.getCategories();
	},
	methods: {
		addNews() {
			this.visible = false;

			this.getNews();
			console.log(this.news);
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
				this.news = await newsService.deleteSimpleNews({ id: e });
				console.log(this.news);
				this.getNews();
			} catch (e) {
				alert(e);
			}
		},
		async changeCategory(e) {
			if (!e) {
				this.getNews();
			} else {
				console.log(e);
				this.sceletonLoader = true;

				this.news = await newsService.getSimpleNewsByCategories({
					idCategory: e,
				});
				this.sceletonLoader = false;

				console.log(this.news);
			}
		},
		async getNews() {
			try {
				this.sceletonLoader = true;
				this.news = await newsService.getAllNews();
				this.sceletonLoader = false;
				console.log(this.news);
			} catch (e) {
				alert(e);
			}
		},
		async getCategories() {
			try {
				this.categories = await newsService.getSimpleNewsCategories();
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
