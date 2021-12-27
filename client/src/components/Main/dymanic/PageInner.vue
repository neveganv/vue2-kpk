<template>
	<div>
		<div style="min-height: 80vh">
			<div class="title" no-gutter align="start" v-if="!sceletonLoader">
				<VRow no-gutters>
					<span class="text-title" v-if="page.folder">
						{{ page.folder.name || '--' }}
					</span>
				</VRow>
				<VRow no-gutters>
					<span class="text-subtitle">
						{{ page.name || '--' }}
					</span>
				</VRow>
			</div>
			<VRow v-else class="title" no-gutter align="center">
				<v-skeleton-loader type="chip" class="pl-2 my-2"></v-skeleton-loader>
			</VRow>
			<myDivider class="my-3" :height="1" v-if="page.html" />
			<VRow no-gutters v-if="page && !sceletonLoader" class="h-auto">
				<div v-if="page.html" class="w-100">
					<VCard>
						<VCardText>
							<div v-html="page.html" class="editor w-100"></div>
						</VCardText>
					</VCard>
				</div>
				<div v-else-if="fileCount === 0" class="w-100 text-center">
					<span class="error--text"> Ця сторінка поки порожня</span>
				</div>
			</VRow>
			<VRow v-else class="title" no-gutter align="center">
				<VCol class="title-text">
					<v-skeleton-loader type="article"></v-skeleton-loader>
				</VCol>
				<VCol class="title-text">
					<v-skeleton-loader type="article"></v-skeleton-loader>
				</VCol>
				<VCol class="title-text">
					<v-skeleton-loader type="article"></v-skeleton-loader>
				</VCol>
			</VRow>
			<myDivider class="my-3" :height="1" v-if="fileCount > 0" />
			<VRow no-gutters justify="center" v-if="!sceletonLoader">
				<VCol cols="12">
					<VCard v-for="pdfFile in page.files" :key="pdfFile.id">
						<VCardTitle>
							<VRow justify="space-between" align="center">
								<VCol class="text-left" cols="auto">{{ pdfFile.title }}</VCol>
							</VRow>
						</VCardTitle>
						<VCardSubtitle>PDF-файл</VCardSubtitle>
						<VCardText>
							<VRow no-gutters>
								<VCol cols="12">
									<VuePdfApp
										@after-created="afterCreated"
										style="height: 80vh"
										page-scale="40"
										theme="light"
										:pdf="pdfFile.file"
										:file-name="pdfFile.title"
									/>
								</VCol>
							</VRow>
						</VCardText>
					</VCard>
				</VCol>
			</VRow>
			<VRow v-else class="title" no-gutter align="center">
				<VCol class="title-text">
					<v-skeleton-loader type="card"></v-skeleton-loader>
				</VCol>
			</VRow>
		</div>
		<footer-component />
	</div>
</template>

<script>
import myDivider from '../UI/my-divider.vue';
import { VueEditor } from 'vue2-editor';
import VuePdfApp from 'vue-pdf-app';

import 'vue-pdf-app/dist/icons/main.css';
import FooterComponent from '../main/FooterComponent.vue';
export default {
	components: {
		VueEditor,
		VuePdfApp,
		myDivider,
		FooterComponent,
	},
	methods: {
		afterCreated(pdfjs) {
			console.log(pdfjs);
			// non-reactive
			this.pdfjs = pdfjs;
			window._pdf = pdfjs;
		},
	},
	data: () => ({
		fileCount: 0,
	}),
	watch: {
		page: {
			deep: true,
			handler(e) {
				this.fileCount = e.files.length;
			},
		},
	},
	props: {
		page: {
			require: true,
		},
		sceletonLoader: {
			require: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.text {
	&-title {
		font-family: Montserrat;
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		color: #4b4453;
	}
	&-subtitle {
		font-family: Montserrat;
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		color: #4b4453;
	}
}
</style>
