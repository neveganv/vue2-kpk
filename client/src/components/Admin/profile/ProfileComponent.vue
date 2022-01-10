<template>
	<div class="p-1">
		<VRow no-gutters>
			<VCol class="text-center" cols="12">
				Профіль користувача
				<b>{{ getUser.name || '--' }} {{ getUser.surname || '--' }}</b>
				<VDivider class="my-3" />
			</VCol>
		</VRow>
		<VRow style="height: 80vh">
			<VCol cols="7" class="px-10">
				<VRow justify="space-between">
					<VCol cols="6">
						<VTextField
							label="Ім`я"
							prepend-icon="mdi-account-edit-outline"
							outlined
							dense
							v-model="user.name"
							hide-details="auto"
							:error-messages="NameError"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Прізвище"
							prepend-icon="mdi-badge-account-horizontal-outline"
							outlined
							dense
							v-model="user.surname"
							hide-details="auto"
							:error-messages="SurnameError"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow justify="space-between">
					<VCol cols="6">
						<VTextField
							label="Телефон"
							prepend-icon="mdi-phone-outline"
							outlined
							dense
							v-model="user.phone"
							hide-details="auto"
							return-masked-value
							v-mask="'+38 (###) ##-##-###'"
							:error-messages="PhoneError"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Посада"
							prepend-icon="mdi-shield-account-outline"
							outlined
							dense
							disabled
							v-model="user.positionTitle"
							hide-details="auto"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol cols="12">
						<VTextField
							label="Пошта"
							prepend-icon="mdi-email-edit-outline"
							outlined
							dense
							disabled
							readonly
							v-model="user.email"
							hide-details="auto"
							:error-messages="EmailError"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VSpacer />
					<VCol cols="auto"
						><VBtn
							rounded
							text
							color="error"
							:disabled="!isChanged"
							@click="onCancel"
							><VIcon left dense>mdi-close</VIcon> Скасувати зміни</VBtn
						></VCol
					>
					<VCol cols="auto"
						><VBtn
							rounded
							color="success"
							:disabled="!isChanged || isLoadingBtn"
							@click="onSave"
							:loading="isLoadingBtn"
							><VIcon left dense>mdi-check</VIcon> Зберегти</VBtn
						></VCol
					>
				</VRow>
			</VCol>
			<VDivider vertical />
			<VCol cols="4"
				><VBtn rounded text color="primary" @click="showChange = true"
					><VIcon left>mdi-lock-reset</VIcon>Змінити пароль</VBtn
				></VCol
			>
		</VRow>
		<ChangePassword
			:user="user"
			:visible="showChange"
			v-if="showChange"
			@close="showChange = false"
		/>
	</div>
</template>

<script>
import _ from 'lodash';
import ChangePassword from '@/components/Admin/profile/ChangeUserPassword';
import user from '@/mixins/user';
import loader from '@/mixins/loader';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
const validPhone = value => value.replace(/[^+\d]/g, '').length === 13;
import usersService from '@/request/users/usersService';
import * as actionTypes from '@/store/modules/auth/types/actions';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: {
		ChangePassword,
	},
	mixins: [user, validationMixin, loader],
	data: () => ({
		showChange: false,
		user: [],
		isChanged: false,
		isLoadingBtn: false,
	}),
	watch: {
		user: {
			deep: true,
			handler() {
				this.isChanged = !_.isEqual(this.user, this.inputUser);
			},
		},
	},
	validations: {
		user: {
			name: {
				required,
			},
			surname: {
				required,
			},
			phone: {
				required,
				validPhone,
			},
			email: {
				required,
				email,
			},
		},
	},
	computed: {
		NameError() {
			const errors = [];
			if (!this.$v.user.name.$dirty) {
				return errors;
			}
			!this.$v.user.name.required &&
				errors.push("Ім'я обов`язкове поле для заповнення");
			return errors;
		},
		SurnameError() {
			const errors = [];
			if (!this.$v.user.surname.$dirty) {
				return errors;
			}
			!this.$v.user.surname.required &&
				errors.push('Прізвище обов`язкове поле для заповлення');
			return errors;
		},
		PhoneError() {
			const errors = [];
			if (!this.$v.user.phone.$dirty) {
				return errors;
			}

			if (this.user.phone) {
				if (!this.$v.user.phone.validPhone) {
					errors.push('Телефон повинен бути валідним');
					return errors;
				}
			}
			!this.$v.user.phone.required &&
				errors.push('Телефон обов`язкове поле для заповлення');
			return errors;
		},
		EmailError() {
			const errors = [];
			if (!this.$v.user.email.$dirty) {
				return errors;
			}
			if (!this.$v.user.email.email) {
				errors.push('Пошта повинна бути валідна');
				return errors;
			}
			!this.$v.user.email.required &&
				errors.push('Пошта обов`язкове поле для заповлення');
			return errors;
		},
	},
	methods: {
		onSave() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoadingBtn = true;
					console.log(this.user);
					usersService.update(this.user);
					this.fetchUser(JSON.parse(localStorage.token));
					console.log(this.user);
					this.isChanged = false;
					this.isLoadingBtn = false;
					this.inputUser = {
						...this.user,
					};
				} catch (e) {
					this.isLoadingBtn = false;
					alert(e);
				}
			}
		},
		...mapActions('auth', {
			fetchUser: actionTypes.FETCH_USER,
		}),

		onCancel() {
			this.user = {
				...this.getUser,
			};
		},
	},
	mounted() {
		this.user = {
			...this.getUser,
		};
		this.inputUser = {
			...this.user,
		};
	},
};
</script>

<style></style>
