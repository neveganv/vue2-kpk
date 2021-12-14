<template>
	<VDialog v-model="visibility" :persistent="edit">
		<VCard width="700">
			<VCardTitle v-if="edit"> Редагувати користувача </VCardTitle>
			<VCardTitle v-else> Додати користувача </VCardTitle>
			<VCardText>
				<VRow>
					<VCol cols="6">
						<VTextField
							label="Ім`я"
							prepend-icon="mdi-account"
							outlined
							dense
							:hide-details="!NameError.length"
							:error-messages="NameError"
							v-model="user.name"
							@input.native="$v.user.name.$touch()"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Прізвище"
							outlined
							dense
							:hide-details="!SurnameError.length"
							:error-messages="SurnameError"
							v-model="user.surname"
							@input.native="$v.user.surname.$touch()"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<VTextField
							label="Email"
							prepend-icon="mdi-email"
							outlined
							dense
							:hide-details="!EmailError.length"
							:error-messages="EmailError"
							v-model="user.email"
							@blur="$v.user.email.$touch()"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<VTextField
							label="Телефон"
							prepend-icon="mdi-phone"
							outlined
							dense
							:class="{
								'success-phone': !PhoneError.length && userPhone == 19,
							}"
							return-masked-value
							v-mask="'+38 (###) ##-##-###'"
							:append-icon="
								!PhoneError.length && userPhone == 19 ? 'mdi-check' : ''
							"
							:color="!PhoneError.length && userPhone == 19 ? 'success' : ''"
							:hide-details="!PhoneError.length"
							:error-messages="PhoneError"
							v-model="user.phone"
							@blur="$v.user.phone.$touch()"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol cols="6">
						<v-select
							prepend-icon="mdi-shield-account"
							:items="Object.values(categories)"
							:item-value="'_id'"
							:item-text="'title'"
							v-model="user.permission"
							label="Посада"
							outlined
							dense
							:hide-details="!PermissionError.length"
							:error-messages="PermissionError"
							clearable
						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.title }}</v-chip>
							</template></v-select
						>
					</VCol>
					<VCol cols="6">
						<VBtn text color="primary" @click="visibleAdd = true">
							<VIcon left>mdi-plus</VIcon>Додати нову посаду</VBtn
						>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn
					color="primary"
					@click="onUpdate"
					v-if="edit"
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
		<add-new-permission-dialog
			:visibleAdd="visibleAdd"
			v-if="visibleAdd"
			@close="visibleAdd = false"
			@added="addedPosition"
		/>
	</VDialog>
</template>

<script>
import positionService from '@/request/positions/positionService';
import usersService from '@/request/users/usersService';
import AddNewPermissionDialog from './AddNewPermissionDialog.vue';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
const validPhone = value => value.replace(/[^+\d]/g, '').length === 13;

export default {
	components: { AddNewPermissionDialog },
	name: 'add-users-dialog',
	mixins: [validationMixin],

	props: {
		visible: {
			require: true,
		},
		chosenUser: {
			require: false,
		},
	},

	data: () => ({
		categories: [],
		user: [],
		phone: '12312321',
		visibleAdd: false,
		edit: false,
		isLoading: false,
	}),
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
			permission: {
				required,
			},
		},
	},
	mounted() {
		this.getChosenUser();
		this.getPositions();
	},
	methods: {
		async getChosenUser() {
			if (this.chosenUser) {
				console.log(this.chosenUser);
				try {
					this.edit = true;
					const newUser = await usersService.findUserById({
						id: this.chosenUser,
					});
					this.user = newUser;
					console.log(this.user);
				} catch (e) {
					alert(e);
				}
				this.user.permission = this.user.position;
			} else {
				this.edit = false;
			}
		},
		async getPositions() {
			try {
				this.categories = await positionService.getAll();
			} catch (e) {
				alert(e);
			}
		},
		onCancel() {
			this.user = [];
			this.$v.$reset();
			this.$emit('close');
		},
		async onCreate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.name = this.user.name;
					params.surname = this.user.surname;
					params.email = this.user.email;
					params.phone = this.user.phone;
					params.position = this.user.permission;

					await usersService.addNewUser({
						...params,
					});
					this.user = [];
					this.$emit('addUser');
					this.$v.$reset();
					this.isLoading = false;
				} catch (e) {
					alert(e);
				}
			}
		},
		addedPosition(position) {
			this.getPositions();
			this.visibleAdd = false;
		},
		async onUpdate() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				try {
					this.isLoading = true;
					const params = [];
					params.id = this.user._id;
					params.name = this.user.name;
					params.surname = this.user.surname;
					params.email = this.user.email;
					params.phone = this.user.phone;
					params.position = this.user.permission;
					console.log(params);

					await usersService.update({
						...params,
					});
					this.$emit('updateUser', params);
					this.$v.$reset();
					this.isLoading = false;
				} catch (e) {
					alert(e);
				}
			}
		},
	},
	computed: {
		userPhone() {
			console.log(this.user.phone);
			if (this.user.phone) {
				return this.user.phone.length;
			}
			return 0;
		},
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit('close');
			},
		},
		NameError() {
			const errors = [];
			if (!this.$v.user.name.$dirty) {
				return errors;
			}
			!this.$v.user.name.required &&
				errors.push('Заголовок обов`язкове поле для заповнення');
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
		PermissionError() {
			const errors = [];
			if (!this.$v.user.permission.$dirty) {
				return errors;
			}
			!this.$v.user.permission.required &&
				errors.push('Посада обов`язкове поле для заповлення');
			return errors;
		},
	},
};
</script>
