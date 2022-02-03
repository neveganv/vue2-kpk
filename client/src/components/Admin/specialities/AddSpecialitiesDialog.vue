<template>
	<VDialog v-model="visibility" @click:outside="$v.$reset()" scrollable>
		<VCard width="700">
			<VCardTitle v-if="edit">
				Змінити спеціальність
				<VSpacer />
				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<VBtn
							v-on:dblclick="onDelete"
							text
							color="error"
							v-on="on"
							v-bind="attrs"
						>
							<VIcon left> mdi-delete </VIcon>
							видалити
						</VBtn>
					</template>
					<span>Щоб видалити, потрібно натиснути двічі</span>
				</v-tooltip>
				<VIcon color="primary"> mdi-square-edit-outline </VIcon>
			</VCardTitle>
			<VCardTitle v-else>
				Додати нову спеціальність
				<VSpacer />
				<VIcon color="primary"> mdi-folder-account </VIcon>
			</VCardTitle>
			<VDivider class="mx-5" />
			<VCardText>
				<VRow class="my-5">
					<VCol class="pb-0">
						<VTextField
							label="Назва спеціальності"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							v-model="specialities.name"
							counter="150"
							:error-messages="TitleError"
						>
						</VTextField>
					</VCol>
					<VCol class="pb-0">
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

				<VRow v-if="!edit">
					<VCol class="py-0">
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
				<VCard v-else>
					<v-img
						height="140"
						:lazy-src="specialities.img"
						:src="specialities.img"
					>
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

				<VDivider class="mt-5" />
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
			<VDivider class="mx-5" />
			<VCardActions>
				<VSpacer />
				<VBtn text color="error" @click="onCancel">Скасувати</VBtn>
				<VBtn
					color="primary"
					:loading="isLoading"
					:disabled="isLoading"
					@click="edit ? onUpdate() : onCreate()"
				>
					{{ edit ? 'Оновити' : 'Додати' }}
				</VBtn>
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
			require: false,
		},
		edit: {
			require: false,
		},
		specialityId: {
			require: false,
		},
	},
	validations: {
		specialities: {
			name: {
				maxLength: maxLength(150),
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
		isLoading: false,
		specialities: {
			name: '',
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
	mounted() {
		if (this.edit) {
			this.getSpecialty();
		}
	},
	methods: {
		onDelete() {
			this.$emit('onDelete');
		},
		onEditImage() {
			this.$nextTick(function () {
				this.$refs.image.click();
			});
		},
		onCancel() {
			this.$emit('close', this.edit);
			this.specialities = {
				name: '',
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
					params.name = this.specialities.name;
					params.img = this.base64image;
					params.courses = this.specialities.courses;
					params.content = this.specialities.content;
					params.number = this.specialities.number;
					const res = await specialityService.addSpecialty({ ...params });
					this.$emit('addSpeciality', res);
					this.$v.$reset();
					this.specialities = {
						name: '',
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
					if (this.edit) {
						this.specialities.img = this.base64image;
					}
				};
			}
		},
		onChangeEditImg(e) {
			this.onFileChange(e.target.files[0]);
		},
		async onUpdate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.id = this.specialityId;
					params.name = this.specialities.name;
					params.img = this.base64image;
					params.courses = this.specialities.courses;
					params.content = this.specialities.content;
					params.number = this.specialities.number;
					await specialityService.updateSpecialty({ ...params });
					this.$emit('specialitiesModified');
					this.$v.$reset();
					this.specialities = {
						name: '',
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
		async getSpecialty() {
			try {
				this.isLoading = true;
				const res = await specialityService.getById({ id: this.specialityId });
				// this.specialities = res[0]
				this.specialities.name = res.name;
				this.specialities.number = res.number;
				this.specialities.img = res.img;
				this.specialities.content = res.content;
				if (res.courses) {
					this.specialities.courses = res.courses;
				}
				console.log(res);
				this.isLoading = false;
			} catch (e) {
				this.isLoading = false;
				alert(e);
			}
		},
	},
	watch: {
		edit: {
			deep: true,
			handler(e) {
				if (e) {
					this.getSpecialty();
				}
			},
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close', this.edit);
			},
		},
		TitleError() {
			const errors = [];
			if (!this.$v.specialities.name.$dirty) {
				return errors;
			}
			if (!this.$v.specialities.name.maxLength) {
				errors.push('Довжина заголовку має бути менша за 150 символів');
				return errors;
			}
			!this.$v.specialities.name.required &&
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
