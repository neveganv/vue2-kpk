<template>
	<VDialog v-model="visibility">
		<VCard width="500">
			<VCardTitle> Додати нову сторінку </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Назва Сторінки"
							prepend-icon="mdi-application-edit"
							outlined
							dense
							hide-details
							v-model="page.name"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<VTextField
							label="Тип Сторінки (тут напевно чот над зробить вибірку якусь)"
							prepend-icon="mdi-application-cog"
							outlined
							dense
							hide-details
							v-model="page.type"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<v-select
							v-model="page.permissions"
							:items="Object.values(categories)"
							attach
							:item-value="'value'"
							:item-text="'name'"
							prepend-icon="mdi-shield-account"
							outlined
							dense
							label="Права доступу"
							multiple
						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.name }}</v-chip>
							</template></v-select
						>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate"> Додати Сторінку </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
export default {
	data: () => ({
		page: [],
		categories: [
			{ id: 1, name: 'Адмін', value: 'admin' },
			{ id: 2, name: 'Менеджер', value: 'manager' },
		],
	}),
	props: {
		visible: {
			require: true,
		},
	},
	methods: {
		onCreate() {
			console.log(this.page);
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
