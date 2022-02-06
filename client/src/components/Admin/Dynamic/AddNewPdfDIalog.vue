<template>
	<VDialog v-model="visiblity" @click:outside="this.$v.$reset()">
		<VCard :width="500">
			<VCardTitle>Додати PDF-файл</VCardTitle>
			<VCardText class="mt-4">
				<VRow>
					<VCol>
						<VTextField
							label="Заголовок"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							v-model="pdf.title"
							counter="150"
							maxlength="150"
							@blur="$v.pdf.title.$touch()"
							hide-details="auto"
							:error-messages="TitleError"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<v-file-input
							dense
							counter
							label="PDF-Файл"
							prepend-icon="mdi-file-pdf-box"
							outlined
							accept="application/pdf"
							:show-size="1000"
							:rules="rules"
							v-model="pdf.file"
							@change="onFileChange"
							hide-details="auto"
							:error-messages="FileError"
						>
							<template v-slot:selection="{ index, text }">
								<v-chip v-if="index < 2" label small>
									{{ text }}
								</v-chip>

								<span
									v-else-if="index === 2"
									class="text-overline grey--text text--darken-3 mx-2"
								>
									+{{ pdf.file.length - 2 }} File(s)
								</span>
							</template>
						</v-file-input>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />

				<VBtn color="error" @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onCreate">Зберегти </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
	mixins: [validationMixin],
	props: {
		visible: {
			require: true,
		},
	},
	data: () => ({
		pdf: [],
		rules: [
			value =>
				!value ||
				value.size < 5e7 ||
				'Розмір файлу повинен бути менше 50 MB!',
		],
	}),
	validations: {
		pdf: {
			title: {
				required,
				maxLength: maxLength(150),
			},
			file: {
				required,
			},
		},
	},
	methods: {
		onCancel() {
			this.$v.$reset();
			this.pdf = [];
			this.$emit('close');
		},
		onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = {};
					params.title = this.pdf.title;
					params.file = this.base64pdf;
					params.id = Date.now();
                    this.$emit('onAddPDF',params)
                    this.onCancel()
				} catch (e) {
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
					this.base64pdf = e.target.result;
				};
			}
		},
	},
	computed: {
		visiblity: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close');
			},
		},
		TitleError() {
			const errors = [];
			if (!this.$v.pdf.title.$dirty) {
				return errors;
			}
			if (!this.$v.pdf.title.maxLength) {
				errors.push('Довжина заголовку має бути менша за 150 символів');
				return errors;
			}
			!this.$v.pdf.title.required &&
				errors.push('Заголовок обов`язкове поле для заповнення');
			return errors;
		},
		FileError() {
			const errors = [];
			if (!this.$v.pdf.file.$dirty) {
				return errors;
			}
			!this.$v.pdf.file.required &&
				errors.push('Файл обов`язкове поле для заповнення');
			return errors;
		},
	},
};
</script>

<style></style>
