<template>
	<div class="d-flex justify-center align-center w-100 h-100">
		<v-card max-width="400" class="w-100">
			<v-card-title>Авторизація </v-card-title>
			<v-card-text>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details
							v-model="email"
							label="Email"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col>
						<v-text-field
							dense
							outlined
							hide-details
							:type="passwordVisible ? 'text' : 'password'"
							:append-icon="passwordVisible ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="passwordVisible = !passwordVisible"
							v-model="password"
							label="Пароль"
						></v-text-field>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-col>
					<v-btn :to="{ path: '/' }" text color="secondary"
						><VIcon left>mdi-arrow-left</VIcon>
						назад
					</v-btn>
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

export default {
	data: () => ({
		password: null,
		email: null,
		passwordVisible: false,
		loading: false,
	}),
	methods: {
		...mapActions('auth', {
			logIn: actionTypes.FETCH_USER,
			fetchUser: actionTypes.FETCH_USER,
		}),
		async login() {
			try {
				this.loading = true;
				const params = [];
				params.email = this.email;
				params.password = this.password;

				let token = await usersService.login({ ...params });
				localStorage.token = JSON.stringify(token);
				this.logIn(token);

				setTimeout(function () {
					location.reload();
					this.loading = false;
				}, 100);
			} catch (e) {
				this.loading = false;
				alert(e);
			}
		},
	},
};
</script>

<style></style>
