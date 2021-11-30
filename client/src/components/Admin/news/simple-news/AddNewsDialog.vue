<template>
	<VDialog v-model="visibility" @click:outside="$v.$reset()">
		<VCard width="700">
			<VCardTitle v-if="visibleEdit"> Оновити новину</VCardTitle>
			<VCardTitle v-else> Створити Новину </VCardTitle>
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
							:error-messages="CategoryError"
							:hide-details="!CategoryError.length"
							outlined
							clearable
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
							v-model="news.title"
							counter="70"
							:error-messages="TitleError"
							maxlength="150"
							@input.native="$v.news.title.$touch()"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<v-file-input
							v-if="!chosenNews"
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
							:error-messages="MainImageError"
							:hide-details="!MainImageError.length && !rules.length"
							@change="onFileChange"
							@input.native="$v.news.main_img.$touch()"
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
						<VCard v-else>
							<v-img
								height="140"
								:lazy-src="news.main_img"
								:src="news.main_img"
							>
								<template v-slot:placeholder>
									<v-row
										class="fill-height ma-0"
										align="center"
										justify="center"
									>
										<v-progress-circular
											indeterminate
											color="primary "
										></v-progress-circular>
									</v-row>
								</template>
							</v-img>
							<v-card-actions>
								Головна картинка
								<v-spacer></v-spacer>
								<v-btn icon color="error">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
								<v-btn icon color="primary" @click="onEditImage">
									<v-icon>mdi-square-edit-outline</v-icon>
								</v-btn>
							</v-card-actions>
							<input
								v-show="!chosenNews && chosenNews"
								type="file"
								ref="image"
								@change="onChangeEditImg"
							/>
						</VCard>
					</VCol>
				</VRow>

				<VRow>
					<VCol>
						<vue-editor @input="test" v-model="news.content"></vue-editor>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onUpdate" v-if="chosenNews">Оновити</VBtn>
				<VBtn color="primary" @click="onCreate" v-else> Створити </VBtn>
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
import { VueEditor } from 'vue2-editor';
import AddNewCategoryDialog from './AddNewCategoryDialog.vue';
import newsService from '@/request/news/newsService';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
	mixins: [validationMixin],
	components: {
		AddNewCategoryDialog,
		VueEditor,
	},

	data: () => ({
		rules: [
			value =>
				!value || value.size < 3000000 || 'Зображення повинне бути менше 3 MB!',
		],
		categories: [],
		news: [],
		visibleAdd: false,
		base64image: '',
	}),

	validations: {
		news: {
			title: {
				maxLength: maxLength(70),
				required,
			},
			main_img: {
				required,
			},
			category: {
				required,
			},
		},
	},
	props: {
		visible: {
			require: false,
		},
		visibleEdit: {
			require: false,
		},
		chosenNews: {
			require: false,
			default: null,
		},
	},
	mounted() {
		this.getCategories();
		this.getChosenNews();
	},
	methods: {
		test(e) {
			console.log(e);
		},
		addCategory() {
			this.visibleAdd = false;
			this.getCategories();
		},
		async getChosenNews() {
			if (this.chosenNews) {
				try {
					console.log(this.chosenNews);
					this.$v.$touch();
					const newNews = await newsService.getSimpleNewsById({
						id: this.chosenNews,
					});
					this.news = newNews;
				} catch (e) {
					alert(e);
				}
			}
		},
		onCancel() {
			this.news = [];
			this.$v.$reset();
			this.$emit('close');
		},
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = [];
					params.title = this.news.title;
					params.category = this.news.category;
					params.main_img = this.base64image;
					params.content = this.news.content;
					console.log('params', params);
					await newsService.addSimpleNew({ ...params });
					this.news = [];
					this.$emit('addNews', params);
					this.$v.$reset();
				} catch (e) {
					alert(e);
				}
			}
		},
		async onUpdate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = [];
					params.id = this.news._id;
					params.title = this.news.title;
					params.category = this.news.category;
					params.content = this.news.content;
					params.main_img = this.news.main_img;
					await newsService.updateSimpleNews({ ...params });
					this.$emit('addNews', params);
					this.news = [];
					this.$v.$reset();
				} catch (e) {
					alert(e);
				}
			}
		},
		onEditImage() {
			this.$nextTick(function () {
				this.$refs.image.click();
			});
		},
		onChangeEditImg(e) {
			console.log(e.target.files[0]);
			this.onFileChange(e.target.files[0]);
		},
		onFileChange(files) {
			console.log(files);
			if (files) {
				const reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = e => {
					this.base64image = e.target.result;
					if (this.chosenNews) {
						this.news.main_img = this.base64image;
					}
				};
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
				if (this.visible === true) {
					return this.visible;
				} else {
					return this.visibleEdit;
				}
			},
			set() {
				this.$emit('close');
			},
		},
		CategoryError() {
			const errors = [];
			if (!this.$v.news.category.$dirty) {
				return errors;
			}
			!this.$v.news.category.required &&
				errors.push('Категорія обов`язкове поле для заповнення');
			return errors;
		},
		TitleError() {
			const errors = [];
			if (!this.$v.news.title.$dirty) {
				return errors;
			}
			if (!this.$v.news.title.maxLength) {
				errors.push('Довжина заголовку має бути менша за 70 символів');
				return errors;
			}
			!this.$v.news.title.required &&
				errors.push('Заголовок обов`язкове поле для заповнення');
			return errors;
		},
		MainImageError() {
			const errors = [];

			if (!this.$v.news.main_img.$dirty) {
				return errors;
			}
			!this.$v.news.main_img.required &&
				errors.push('Головна картинка обов`язкове поле для заповнення');
			return errors;
		},
	},
};
</script>

<style></style>
