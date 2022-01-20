<template>
	<VDialog v-model="visibility" scrollable @click:outside="$v.$reset()">
		<VCard width="700">
			<VCardTitle> Додати нову спеціальність </VCardTitle>
			<VCardText>
				<VRow class="my-5">
					<VCol>
						<VTextField
							label="Назва спеціальності"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							v-model="specialities.title"
							counter="70"
							:error-messages="TitleError"
						>
						</VTextField>
					</VCol>
					<VCol>
						<VTextField
							label="Номер спеціальності"
							prepend-icon="mdi-counter"
							outlined
							dense
							v-model="specialities.number"
							:error-messages="NumberError"
							type="number"
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
							v-model="specialities.img"
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
				<v-subheader>Опис Інформація на кожному курсі</v-subheader>
				<VRow>
					<VCol>
						<v-expansion-panels v-model="panel" multiple>
							<v-expansion-panel v-for="(item, key) in 4" :key="key">
								<v-expansion-panel-header
									>{{ key + 1 }} курс</v-expansion-panel-header
								>
								<v-expansion-panel-content>
									<v-textarea
										outlined
										auto-grow
										:label="`${'Опис діяльності на  ' + (key + 1) + ' курсі'}`"
										rows="5"
										row-height="20"
										v-model="specialities.courses[key + 1]"
										:counter="210"
										maxlength="210"
									></v-textarea>
								</v-expansion-panel-content>
							</v-expansion-panel>
						</v-expansion-panels>
					</VCol>
				</VRow>
				<VRow>
					<VCol v-if="!showEditorText">
						<vue-editor v-model="specialities.content"></vue-editor>
					</VCol>

					<VCol v-else>
						<div v-html="specialities.content" class="editor-view"></div>
					</VCol>
					<VBtn icon color="primary" @click="showEditorText = !showEditorText"
						><VIcon>mdi-eye</VIcon></VBtn
					>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn text color="error" @click="onCancel">Скасувати</VBtn>
				<VBtn color="primary" @click="onCreate" :loading="isLoading" :disabled="isLoading">Додати</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import specialityService from '@/request/specialty/specialtyService';

export default {
	components: {
		VueEditor,
	},
	mixins: [validationMixin],
	props: {
		visible: {
			require: true,
		},
	},
	validations: {
		specialities: {
			title: {
				maxLength: maxLength(70),
				required,
			},
			img: {
				required,
			},
			number: {
				required,
			},
		},
	},
	data: () => ({
		isLoading:false,
		specialities: {
			title: '',
			img: null,
			courses: {},
			content: '',
			number: '',
		},
		showEditorText: false,
		rules: [
			value =>
				!value || value.size < 3000000 || 'Зображення повинне бути менше 3 MB!',
		],
		panel: [0, 1, 2, 3],
	}),
	methods: {
		onCancel() {
			this.$emit('close');
			this.specialities = {
				title: '',
				img: null,
				courses: {},
				content: '',
				number: '',
			};
			this.$v.$reset();
		},
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.name = this.specialities.title;
					params.img = this.base64image;
					params.courses = this.specialities.courses;
					params.content = this.specialities.content;
					params.number = this.specialities.number;
					const res = await specialityService.addSpecialty({ ...params });
					this.$emit('addSpeciality', res);
					this.$v.$reset();
					this.specialities = {
						title: '',
						img: null,
						courses: {},
						content: '',
						number: '',
					};
					this.isLoading = false;
				} catch (e) {
					this.isLoading = false;
					alert(e);
				}
			}
		},
		onFileChange(files) {
			console.log(files);
			if (files) {
				const reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = e => {
					this.base64image = e.target.result;
					// if (this.chosenSpecialities) {
					// 	this.specialities.main_img = this.base64image;
					// }
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
				return this.$emit('close');
			},
		},
		TitleError() {
			const errors = [];
			if (!this.$v.specialities.title.$dirty) {
				return errors;
			}
			if (!this.$v.specialities.title.maxLength) {
				errors.push('Довжина заголовку має бути менша за 70 символів');
				return errors;
			}
			!this.$v.specialities.title.required &&
				errors.push('Заголовок обов`язкове поле для заповнення');
			return errors;
		},
		NumberError() {
			const errors = [];
			if (!this.$v.specialities.number.$dirty) {
				return errors;
			}
			!this.$v.specialities.number.required &&
				errors.push('Номер спеціальності обов`язкове поле для заповнення');
			return errors;
		},
		MainImageError() {
			const errors = [];

			if (!this.$v.specialities.img.$dirty) {
				return errors;
			}
			!this.$v.specialities.img.required &&
				errors.push('Головна картинка обов`язкове поле для заповнення');
			return errors;
		},
	},
};
</script>

<style lang="scss" scoped>
.editor-view {
	border: 1px solid #e3e3e3;
	padding: 5px;
	width: 100%;
	min-height: 283px;
	p {
		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	}
}
</style>
