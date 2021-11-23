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
							hide-details
							v-model="user.name"
						>
						</VTextField>
					</VCol>
					<VCol cols="6">
						<VTextField
							label="Прізвище"
							outlined
							dense
							hide-details
							v-model="user.surname"
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
							hide-details
							v-model="user.email"
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
							hide-details
							prefix="+380"
							v-model="user.phone"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol cols="6">
						<v-select
							prepend-icon="mdi-shield-account"
							:items="Object.values(categories)"
							:item-value="'value'"
							:item-text="'name'"
							v-model="user.permission"
							label="Посада"
							hide-details
							outlined
							dense
						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.name }}</v-chip>
							</template></v-select
						>
					</VCol>
					<VCol cols="6">
						<VBtn text color="primary">
							<VIcon left>mdi-plus</VIcon>Додати нову посаду</VBtn
						>
					</VCol>
				</VRow>
			</VCardText>
			<VDivider />
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onUpdate" v-if="edit"> Оновити </VBtn>
				<VBtn color="primary" @click="onCreate" v-else> Створити </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import usersService from '@/request/users/usersService';
export default {
	name: 'add-users-dialog',
	props: {
		visible: {
			require: true,
		},
		edit: {
			require: false,
		},
		chosenUser: {
			require: false,
		},
	},

	data: () => ({
		categories: [{ id: 1, name: 'Адмін', value: 'admin' }],
		user: [],
	}),
	mounted() {
		this.getChosenUser();
	},
	methods: {
		getChosenUser() {
			if (this.chosenUser) {
				this.user = this.chosenUser;
			}
		},
		onCancel() {
			this.user = [];
			this.$emit('close');
		},
		async onCreate() {
			try {
				const params = [];
				params.name = this.user.name;
				params.surname = this.user.surname;
				params.email = this.user.email;
				params.phone = this.user.phone;
				params.type = this.user.permission;

				await usersService.addNewUser({
					...params,
				});
							this.user = [];
				this.$emit('addUser',params);
	
		
			} catch (e) {
				alert(e);
			}
		},
		async onUpdate() {
			try {
				console.log(this.user);
			} catch (e) {
				alert(e);
			}
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
