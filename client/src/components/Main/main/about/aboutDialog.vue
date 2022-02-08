<template>
	<VDialog v-model="visibility" scrollable width="800">
		<VCard>
			<VCardTitle> Історія Коледжу </VCardTitle>
			<VDivider class="mx-5" />

			<VCardText class="py-5">
				<div v-html="collegeInfo" v-if="collegeInfo && !loading"></div>
				<div v-if="loading">
					<v-skeleton-loader
						type="article"
					></v-skeleton-loader>
					<v-skeleton-loader
						type="article"
					></v-skeleton-loader>
					<v-skeleton-loader
						type="article"
					></v-skeleton-loader>
				</div>
			</VCardText>
			<VDivider class="mx-5" />
			<VCardActions>
				<VBtn
					text
					@click="$emit('close')"
					:small="$vuetify.breakpoint.smAndDown"
				>
					Закрити
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import collegeInfoServices from '@/request/collegeInfo/collegeInfoServices';

export default {
	data: () => ({
		collegeInfo: '',
		loading: false,
	}),
	props: {
		visible: {
			require: true,
		},
	},
	async mounted() {
		try {
			this.loading = true;
			const newItem = await collegeInfoServices.getAll();
			this.collegeInfo = newItem.info;
			this.loading = false;
		} catch (e) {
			alert(e);
		}
	},
	computed: {
		visibility: {
			get() {
				return this.visible;
			},
			set() {
				return this.$emit('close');
			},
		},
	},
};
</script>

<style></style>
