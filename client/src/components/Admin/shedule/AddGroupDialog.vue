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
				<VBtn color="primary" @click="onCreate" :loading="isLoading" :disabled="isLoading"> Створити групу </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import groupService from '@/request/shedule/groupService';
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
		isLoading:false
	}),
	methods: {
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.name = this.group;
					const group = await groupService.createGroup({ ...params });
					this.$emit('addGroup', group);
					this.$v.$reset();
					this.group = '';
					this.isLoading = false;
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
