<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle> Змінити пароль </VCardTitle>
			<VCardText>
				<VRow class="px-5">
					<VCol cols="6">
						<VTextField
							label="Поточний пароль"
							outlined
							dense
							hide-details="auto"
							v-model="password.oldPassword"
							:error-messages="oldPasswordErrors"
							:type="oldPasswordVisible ? 'text' : 'password'"
							:append-icon="oldPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="oldPasswordVisible = !oldPasswordVisible"
							autocomplete="new-password"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Новий пароль"
							outlined
							dense
							hide-details="auto"
							v-model="password.newPassword"
							:error-messages="newPassErrors"
							:type="newPasswordVisible ? 'text' : 'password'"
							:append-icon="newPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="newPasswordVisible = !newPasswordVisible"
							autocomplete="new-password"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow class="px-5">
					<VCol>
						<VTextField
							label="Підтвердіть пароль"
							outlined
							dense
							hide-details="auto"
							v-model="password.confirmedPassword"
							:error-messages="newPassRepeatErrors"
							:type="confirmPasswordVisible ? 'text' : 'password'"
							:append-icon="confirmPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="confirmPasswordVisible = !confirmPasswordVisible"
							autocomplete="new-password"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onClose"> Скасувати </VBtn>
				<VBtn color="primary" @click="onChange" :loading="isLoading" :disabled="isLoading">
					Змінити
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
// import positionService from '@/request/positions/positionService';
import usersService from '@/request/users/usersService';
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import user from '@/mixins/user';

export default {
	name: 'change-users-password-dialog',
	mixins: [validationMixin, user],
	data: () => ({
		password: {
			oldPassword: '',
			newPassword: '',
			confirmedPassword: '',
		},
		oldPasswordVisible: false,
		newPasswordVisible: false,
		confirmPasswordVisible: false,
		isLoading: false,
	}),
	validations: {
		password: {
			oldPassword: {
				required,
			},
			newPassword: {
				required,
			},
			confirmedPassword: {
				required,
				sameAsPassword: sameAs('newPassword'),
			},
		},
	},
	props: {
		visible: {
			require: true,
		},
		user: {
			require: true,
		},
	},
	mounted() {},
	methods: {
		async onChange() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.id = this.getUser.uuid;
					params.oldPassword = this.password.oldPassword;
					params.password = this.password.confirmedPassword;
					await usersService.changePassword({
						...params,
					});
					this.$emit('close');
					this.$v.$reset();
					this.password = {};
					this.isLoading = false;
				} catch (e) {
					this.isLoading = false;
					alert(e);
				}
			}
		},
		onClose() {
			this.$emit('close');
			this.$v.$reset();
			this.password = {};
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
		oldPasswordErrors() {
			const errors = [];
			if (!this.$v.password.oldPassword.$dirty) {
				return errors;
			}
			// eslint-disable-next-line no-unused-expressions
			!this.$v.password.oldPassword.required &&
				errors.push("Поточний пароль обов'язкове поле для заповнення");
			return errors;
		},
		newPassErrors() {
			const errors = [];
			if (!this.$v.password.newPassword.$dirty) {
				return errors;
			}
			// eslint-disable-next-line no-unused-expressions
			!this.$v.password.newPassword.required &&
				errors.push("Новий пароль обов'язкове поле для заповнення");
			return errors;
		},
		newPassRepeatErrors() {
			const errors = [];
			if (!this.$v.password.confirmedPassword.$dirty) {
				return errors;
			}
			if (!this.$v.password.confirmedPassword.required) {
				errors.push("Підтвердіть пароль обов'язкове поле для заповнення");

				return errors;
			}
			// eslint-disable-next-line no-unused-expressions
			!this.$v.password.confirmedPassword.sameAsPassword &&
				errors.push('Паролі не збігаються');
			return errors;
		},
	},
};
</script>

<style></style>
