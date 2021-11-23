<template>
	<VDialog v-model="visibility" transition="scroll-y-transition">
		<VCard width="500">
			<VCardTitle> Додати нову категорію новини </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Назва категорії"
							prepend-icon="mdi-shape"
							outlined
							dense
							hide-details
							v-model="category"
						>
						</VTextField>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreate"> Створити категорію </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import newsService from '@/request/news/newsService';
export default {
	props: {
		visibleAdd: {
			require: true,
		},
	},
	data: () => ({
		category: '',
	}),
	methods: {
		async onCreate() {
			console.log(this.category);
			// });
			try {
				const params = [];
				params.name = this.category;
				await newsService.addSimpleNewCategory({ ...params });
				this.$emit('addCategory',params)
				this.category = ''
			} catch (e) {
				alert(e);
			}
		},
	},
	computed: {
		visibility: {
			get() {
				return this.visibleAdd;
			},
			set() {
				this.category = '';
				this.$emit('close');
			},
		},
	},
};
</script>

<style></style>
