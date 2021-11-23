<template>
	<VDialog v-model="visibility" transition="scroll-y-transition" @click:outside="$v.$reset()">
		<VCard width="500">
			<VCardTitle> Додати нову категорію новини </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Назва категорії"
							prepend-icon="mdi-shape"
							outlined
							dense
							v-model="category"
							:hide-details="!NameError.length"
							:error-messages="NameError"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate"> Створити категорію </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import newsService from '@/request/news/newsService';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
	mixins: [validationMixin],
	validations: {
		category: {
			required,
		},
	},
	props: {
		visibleAdd: {
			require: true,
		},
	},
	data: () => ({
		category: '',
	}),
	methods: {

		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = [];
					params.name = this.category;
					await newsService.addSimpleNewCategory({ ...params });
					this.$emit('addCategory', params);
					this.$v.$reset();
					this.category = '';
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.category.$dirty) {
				return errors;
			}
			!this.$v.category.required &&
				errors.push('Назва категорії обов`язкове поле для заповнення');
			return errors;
		},
		visibility: {
			get() {
				return this.visibleAdd;
			},
			set() {
				this.category = '';
				this.$emit('close');
			},
		},
	},
};
</script>

<style></style>
