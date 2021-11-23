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
import axios from 'axios';
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
		onCreate() {
			console.log(this.category);
			axios.post("/api/newsCategory",{
				name: this.category,
			});
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
