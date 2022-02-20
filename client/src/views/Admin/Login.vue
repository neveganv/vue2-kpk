<template>
	<div class="d-flex justify-center align-center w-100 h-100">
		<v-snackbar
			v-model="isNotification"
			top
			color="error"
			rounded
			elevation="4"
			:timeout="2000"
		>
			Неправильний логін чи пароль <br />
		</v-snackbar>
		<v-card max-width="400" class="w-100">
			<v-card-title>Авторизація </v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details="auto"
							v-model="email"
							label="Email"
							:error-messages="emailError"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details="auto"
							:type="passwordVisible ? 'text' : 'password'"
							:append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="passwordVisible = !passwordVisible"
							v-model="password"
							label="Пароль"
							:error-messages="PasswordError"
						></v-text-field>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-col>
					<!-- <v-btn :to="{ path: '/' }" text color="secondary"
						><VIcon left>mdi-arrow-left</VIcon>
						назад
					</v-btn> -->
				</v-col>
				<v-spacer></v-spacer>
				<v-col>
					<v-btn
						@click="login"
						color="primary"
						:loading="loading"
						:disabled="loading"
						>Авторизуватися</v-btn
					>
				</v-col>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import usersService from '@/request/users/usersService';
import * as actionTypes from '@/store/modules/auth/types/actions';
import { mapActions, mapGetters } from 'vuex';
import user from '@/mixins/user';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
	mixins: [user, validationMixin],
	data: () => ({
		password: null,
		email: null,
		passwordVisible: false,
		loading: false,
		isNotification: false,
	}),
	validations: {
		password: { required },
		email: { required },
	},
	watch: {
		getUser(e) {
			if (e) {
				this.$router.push({ name: 'admin-permission-guard' }).catch(() => {});
			}
		},
	},
	computed: {
		emailError() {
			const errors = [];
			if (!this.$v.email.$dirty) {
				return errors;
			}
			!this.$v.email.required &&
				errors.push('Email обов`язкове поле для заповнення');
			return errors;
		},
		PasswordError() {
			const errors = [];
			if (!this.$v.password.$dirty) {
				return errors;
			}
			!this.$v.password.required &&
				errors.push('Пароль обов`язкове поле для заповнення');
			return errors;
		},
	},
	methods: {
		...mapActions('auth', {
			logIn: actionTypes.FETCH_USER,
			fetchUser: actionTypes.FETCH_USER,
		}),
		async login() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return false;
			}
			try {
				this.loading = true;
				const params = [];
				params.email = this.email;
				params.password = this.password;

				let token = await usersService.login({ ...params });
				localStorage.token = JSON.stringify(token);

				this.logIn(token);
				// setTimeout(function () {
				// 	location.reload();			// це найкраща частина коду в цьому проекті, не видаляйте його пліз (це Андрій писав)
				// 	this.loading = false;
				// }, 300);
			} catch (e) {
				this.loading = false;
				this.isNotification = true;
			}
		},
	},
};
</script>

<style>
body,html {
	overflow: hidden !important;
}</style>
