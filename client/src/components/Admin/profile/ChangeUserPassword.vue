<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle> Змінити пароль </VCardTitle>
			<VCardText>
				<VRow>
					<VCol cols="6">
						<VTextField
							label="Поточний пароль"
							prepend-icon="mdi-account"
							outlined
							dense
							hide-details
							v-model="password.oldPassword"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Новий пароль"
							outlined
							dense
							hide-details
							v-model="password.newPassword"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<VTextField
							label="Повторити новий пароль"
							prepend-icon="mdi-email"
							outlined
							dense
							hide-details
							v-model="password.confirmedPassword"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onClose"> Скасувати </VBtn>
				<VBtn color="primary" @click="onChange"> Змінити </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
// import positionService from '@/request/positions/positionService';
import usersService from '@/request/users/usersService';

export default {
	name: 'change-users-password-dialog',
	data: () => ({
		password: {
			oldPassword: '',
			newPassword: '',
			confirmedPassword: '',
		},
	}),
	props: {
		visible: {
			require: true,
		},
		user: {
			require: true,
		},
	},
	methods: {
		async onChange() {
			try {
				if (this.newPassword !== this.confirmedPassword) {
					console.log('Паролі не збігаються');
				} else {
					const params = [];
					params.id = this.user._id;
					params.password = this.password.confirmedPassword;

					await usersService.changePassword({
						...params,
					});
				}
			} catch (e) {
				alert(e);
			}
		},
		onClose() {
			this.$emit('close');
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
	},
};
</script>

<style></style>
