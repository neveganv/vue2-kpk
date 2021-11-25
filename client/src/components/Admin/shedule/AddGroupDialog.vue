<template>
	<VDialog
		v-model="visibility"
		transition="scroll-y-transition"
		@click:outside="$v.$reset()"
	>
		<VCard width="500">
			<VCardTitle> Додати нову групу </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Назва групи"
							prepend-icon="mdi-account-multiple-plus"
							outlined
							dense
							v-model="group"
							:hide-details="!NameError.length"
							:error-messages="NameError"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate"> Створити групу </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import sheduleService from '@/request/shedule/sheduleService';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
	mixins: [validationMixin],
	validations: {
		group: {
			required,
		},
	},
	props: {
		visible: {
			require: true,
		},
	},
	data: () => ({
		group: '',
	}),
	methods: {
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					const params = [];
					params.name = this.group;
					const group = await sheduleService.createGroup({ ...params });
					this.$emit('addGroup', group);
					this.$v.$reset();
					this.group = '';
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.group.$dirty) {
				return errors;
			}
			!this.$v.group.required &&
				errors.push('Назва групи обов`язкове поле для заповнення');
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
