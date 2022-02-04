<template>
	<VDialog v-model="visibility" @click:outside="$v.$reset()" scrollable>
		<VCard width="700" :color="isArchived === 0 ? 'white' : 'grey lighten-3'" :disabled="isLoading">
			<VCardTitle v-if="chosenNews">
				Оновити Нещодавну Новину
				<VSpacer />
				<VBtn
					@click="isArchived === 0 ? (isArchived = 1) : (isArchived = 0)"
					text
					:color="isArchived === 0 ? 'error' : 'grey darken-1'"
				>
					<VIcon left>
						{{ ` mdi-package-${isArchived === 0 ? 'down' : 'up'}` }}
					</VIcon>
					{{ isArchived === 0 ? 'Архівувати' : 'Розархівувати' }}
				</VBtn>
			</VCardTitle>
			<VCardTitle v-else> Створити Нещодавну Новину </VCardTitle>
			<VDivider class="mx-5" />
			<VCardText>
				<VRow class="my-5">
					<VCol class="pb-0">
						<VTextField
							label="Заголовок"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							:error-messages="TitleError"
							v-model="news.title"
							counter
							maxlength="70"
						>
						</VTextField>
					</VCol>
				</VRow>

				<VRow v-if="!chosenNews">
					<VCol class="pt-0">
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
							@change="onFileChange"
							:error-messages="MainImageError"
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
				<VCard v-else :color="isArchived === 0 ? 'white' : 'grey lighten-3'">
					<v-img height="140" :lazy-src="news.img" :src="news.img">
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
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
						<!-- <v-btn icon color="error">
							<v-icon>mdi-delete</v-icon>
						</v-btn> -->
						<v-btn text color="primary" @click="onEditImage" small>
							<v-icon left>mdi-square-edit-outline</v-icon>
							Редагувати
						</v-btn>
					</v-card-actions>
					<input
						v-show="false"
						type="file"
						ref="image"
						accept="image/png, image/jpeg, image/svg"
						@change="onChangeEditImg"
					/>
				</VCard>
				<VDivider v-if="chosenNews" class="my-5" />
				<!-- <VRow>
					<VCol>
						<v-autocomplete
							outlined
							dense
							prepend-icon="mdi-archive"
							v-model="news.isArchived"
							:items="Object.values(archived)"
							:item-value="'value'"
							:item-text="'text'"
							label="Архівувати"
						/>
					</VCol>
				</VRow> -->
				<VRow>
					<VCol>
						<v-textarea
							append-icon="mdi-information"
							v-model="news.content"
							label="Інформація"
							counter
							no-resize
							rows="10"
							maxlength="1550"
							outlined
							:error-messages="ContentError"
							auto-grow
						></v-textarea>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider class="mx-5" />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onUpdate"
					v-if="chosenNews"
					:disabled="isLoading"
					:loading="isLoading"
				>
					Оновити
				</VBtn>
				<VBtn
					color="primary"
					@click="onCreate"
					v-else
					:disabled="isLoading"
					:loading="isLoading"
				>
					Створити
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import moment from 'moment';
import newsService from '@/request/news/newsService';
export default {
	mixins: [validationMixin],

	data: () => ({
		rules: [
			value =>
				!value || value.size < 3000000 || 'Зображення повинне бути менше 3 MB!',
		],
		isLoading: false,
		news: [],
		base64image: '',
		isArchived: 0,
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
			content: {
				required,
				maxLength: maxLength(1550),
			},
		},
	},
	props: {
		visible: {
			require: true,
		},
		chosenNews: {
			require: false,
		},
		detailNews: {
			require: false,
		},
	},
	methods: {
		onCancel() {
			this.news = [];
			this.$emit('close', this.chosenNews);
			this.$v.$reset();
		},
		onEditImage() {
			this.$nextTick(function () {
				this.$refs.image.click();
			});
		},
		onChangeEditImg(e) {
			this.onFileChange(e.target.files[0]);
		},
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.title = this.news.title;
					params.img = this.base64image;
					params.created_time = this.getCurrentTime;
					params.content = this.news.content;
					const res = await newsService.addCoolNews({
						...params,
					});
					this.$emit('create', res);
					this.news = [];
					this.$v.$reset();
					this.isLoading = false;
				} catch (e) {
					alert(e);
				}
			}
		},
		async onUpdate() {
			this.$v.$touch();
			try {
				this.isLoading = true;
				const params = [];
				params.id = this.news._id;
				params.title = this.news.title;
				params.img = this.base64image || this.news.img;
				params.content = this.news.content;
				params.isArchived = this.isArchived;
				this.$v.$reset();
				await newsService.updateCoolNews({
					...params,
				});
				this.$emit('update', this.chosenNews);
				this.isLoading = false;
			} catch (e) {
				alert(e);
			}
		},
		onFileChange(files) {
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
	},
	watch: {
		chosenNews: {
			deep: true,
			handler(e) {
				console.log(this.detailNews);
				this.news = this.detailNews;
				this.isArchived = this.news.isArchived;
			},
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close', this.chosenNews);
			},
		},
		getCurrentTime() {
			const currentTIme = `${moment(new Date().toISOString())
				.locale('uk')
				.format()}`;
			return currentTIme;
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
		ContentError() {
			const errors = [];
			if (!this.$v.news.content.$dirty) {
				return errors;
			}
			if (!this.$v.news.content.maxLength) {
				errors.push('Довжина Інфорамації має бути менша за 1550 символів');
				return errors;
			}
			!this.$v.news.content.required &&
				errors.push('Інформація обов`язкове поле для заповнення');
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
