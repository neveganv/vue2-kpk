<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle> Створити Новину </VCardTitle>
			<VCardText>
				<VRow>
					<VCol cols="6">
						<v-select
							prepend-icon="mdi-shape"
							:items="Object.values(categories)"
							:item-value="'_id'"
							:item-text="'name'"
							v-model="news.category"
							label="Категорія"
							hide-details
							outlined
							dense
						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.name }}</v-chip>
							</template></v-select
						>
					</VCol>
					<VCol cols="6">
						<VBtn text color="primary" @click="visibleAdd = true">
							<VIcon left>mdi-plus</VIcon>Додати нову категорію</VBtn
						>
					</VCol>
				</VRow>

				<VRow>
					<VCol>
						<VTextField
							label="Заголовок"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							hide-details
							v-model="news.title"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<v-file-input
							dense
							counter
							label="Головна картинка"
							placeholder="Головна картинка"
							prepend-icon="mdi-camera"
							outlined
							accept="image/png, image/jpeg, image/svg"
							:show-size="1000"
							:rules="rules"
							v-model="news.main_img"
						>
							<template v-slot:selection="{ index, text }">
								<v-chip v-if="index < 2" label small>
									{{ text }}
								</v-chip>

								<span
									v-else-if="index === 2"
									class="text-overline grey--text text--darken-3 mx-2"
								>
									+{{ news.main_img.length - 2 }} File(s)
								</span>
							</template>
						</v-file-input>
					</VCol>
				</VRow>

				тут буде едітор, но його поки немає
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onCreate"> Створити </VBtn>
			</VCardActions>
		</VCard>
		<add-new-category-dialog
			@addCategory="addCategory"
			:visibleAdd="visibleAdd"
			@close="visibleAdd = false"
		/>
	</VDialog>
</template>

<script>
import AddNewCategoryDialog from './AddNewCategoryDialog.vue';
import newsService from '@/request/news/newsService';

export default {
	components: {
		AddNewCategoryDialog,
	},
	data: () => ({
		rules: [
			value =>
				!value || value.size < 3000000 || 'Зображення повинне бути менше 3 MB!',
		],
		categories: [],
		news: [],
		visibleAdd: false,
	}),
	props: {
		visible: {
			require: true,
		},
	},
	mounted() {
		this.getCategories();
	},
	methods: {
		addCategory() {
			this.visibleAdd = false;
			this.getCategories();
		},

		onCancel() {
			this.news = [];
			this.$emit('close');
		},
		async onCreate() {
			try {
				const params = [];

				params.title = this.news.title;
				params.categoryId = this.news.category;
				params.main_img = this.news.main_img.name;
				await newsService.addSimpleNew({ ...params });
				this.news = [];
				this.$emit('addNews',params);
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
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
			},
		},
	},
};
</script>

<style></style>
