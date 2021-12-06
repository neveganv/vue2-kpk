<template>
	<VDialog v-model="visibility">
		<VCard width="500">
			<VCardTitle v-if="addPageVisibility"> Додати нову папку </VCardTitle>
			<VCardTitle v-else> Додати нову сторінку </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							:label="addPageVisibility ? 'Назва сторінки': 'Назва папки'"
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
					<!-- <VCol>
						<VTextField
							label="Тип Сторінки (тут напевно чот над зробить вибірку якусь)"
							prepend-icon="mdi-application-cog"
							outlined
							dense
							hide-details
							v-model="page.type"
						>
						</VTextField>
					</VCol> -->
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
				<VBtn color="primary" @click="onCreateFolder" v-if="addPageVisibility"> Додати Папку </VBtn>
				<VBtn color="primary" @click="onCreatePage" v-else > Додати Сторінку </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
// import pageService from "@/request/page/pageService";
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
		addPageVisibility:{
			require:false,
		}
	},
	watch:{
		addPageVisibility:{
			deep:true,
			handler(e){
				console.log(e)
			}
		}
	},
	methods: {
		async onCreateFolder() {
			console.log(this.page);
			const params = [];
			params.name = this.page.name,
			params.type = this.page.type
			//params.accessRights = this.page.permissions
            // await pageService.addPage({ 
			// 	...params
			// });
		},
		async onCreatePage(){

		}
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
