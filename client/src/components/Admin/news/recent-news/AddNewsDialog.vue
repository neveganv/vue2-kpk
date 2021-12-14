<template>
	<VDialog v-model="visibility" @click:outside="$v.$reset()">
		<VCard width="700">
			<VCardTitle v-if="chosenNews"> Оновити Круту Новину </VCardTitle>
			<VCardTitle v-else> Створити Круту Новину </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
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
			</VCardText>
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
		},
	},
	props: {
		visible: {
			require: true,
		},
		chosenNews: {
			require: false,
		},
	},
	methods: {
		onCancel() {
			this.news = [];
			this.$emit('close');
			this.$v.$reset();
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
			const params = [];
			params.title = this.news.title;
			params.img = this.base64image;
			this.$emit('close');
			await newsService.updateCoolNews({
				...params,
			});
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
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
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
