<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle> Додати користувача </VCardTitle>
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
				<VBtn color="primary" @click="onCreate"> Створити </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
export default {
	name: 'add-users-dialog',
	props: ['visible'],
	data: () => ({
		categories: [{ id: 1, name: 'Адмін', value: 'admin' }],
		user: [],
	}),
	methods: {
		onCancel() {
			this.user = [];
			this.$emit('close');
		},
		onCreate() {
			console.log(this.user);
			// this.$emit('close');
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
