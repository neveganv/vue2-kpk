<template>
	<VDialog
		v-model="visibility"
		transition="scroll-y-transition"
		@click:outside="$v.$reset()"
	>
		<VCard width="500">
			<VCardTitle> Додати нову пару  </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Назва пари"
							prepend-icon="mdi-account-multiple-plus"
							outlined
							dense
							v-model="className"
							:hide-details="!NameError.length"
							:error-messages="NameError"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate">Додати пару</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import classService from '@/request/class/classService';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
	mixins: [validationMixin],
	validations: {
		className: {
			required,
		},
	},
	props: {
		visible: {
			require: true,
		},
	},
	data: () => ({
		className: '',
	}),
	methods: {
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = [];
					params.name = this.className;
				    await classService.createClasses({ ...params });
					this.$emit('addClass', params);
					this.$v.$reset();
                    console.log(params)
					this.className = '';
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.className.$dirty) {
				return errors;
			}
			!this.$v.className.required &&
				errors.push('Назва пари обов`язкове поле для заповнення');
			return errors;
		},
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
