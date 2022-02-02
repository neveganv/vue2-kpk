<template>
	<div>
		<div style="min-height: 970px" v-if="!PageDeleted">
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
			<myDivider class="my-3" :height="1" v-if="page.html  && !sceletonLoader" />
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
			<myDivider class="my-3" :height="1" v-if="fileCount > 0 && !sceletonLoader" />
			<VRow no-gutters justify="center" v-if="!sceletonLoader">
				<VCol cols="12">
					<VCard class="pa-5" v-if="pdf">
        <v-tabs centered @change="checkPdf" show-arrows>
          <v-tab v-for="pdfFile in page.files" :key="pdfFile.id">{{
            pdfFile.title
          }}</v-tab>
        </v-tabs>
        <div v-if="page.files && pdf">
          <VCardTitle>
            <VRow justify="space-between" align="center">
              <VCol class="text-left" cols="auto">{{ title }}</VCol>
            </VRow>
          </VCardTitle>
          <VCardSubtitle>PDF-файл</VCardSubtitle>
          <VCardText> </VCardText>
          <VRow no-gutters justify="center">
            <VCol cols="11">
              <VuePdfApp
                v-show="pdf"
                style="height: 80vh"
                page-scale="40"
                theme="light"
                :pdf="pdf"
                file-name="name"
              />
            </VCol>
          </VRow>
        </div>
      </VCard>
				</VCol>
			</VRow>
			<VRow v-else class="title" no-gutter align="center">
				<VCol class="title-text">
					<v-skeleton-loader type="card"></v-skeleton-loader>
				</VCol>
			</VRow>
		</div>
		<div v-else style="min-height: 970px" class="w-100 text-center">
			<myDivider class="my-3" :height="1" />
			<span class="error--text"> На жаль дана сторінка уже видалена </span>
			<myDivider class="my-3" :height="1" />
		</div>
		
	</div>
</template>

<script>
import myDivider from '../UI/my-divider.vue';
import { VueEditor } from 'vue2-editor';
import VuePdfApp from 'vue-pdf-app';

import 'vue-pdf-app/dist/icons/main.css';
export default {
	components: {
		VueEditor,
		VuePdfApp,
		myDivider,
	},
	methods: {
		afterCreated(pdfjs) {
			console.log(pdfjs);
			// non-reactive
			this.pdfjs = pdfjs;
			window._pdf = pdfjs;
		},
		checkPdf(e) {
      //console.log(e)
      if (typeof e !== "undefined") {
        this.title = this.page.files[e].title;
        this.pdf = this.page.files[e].file;
        this.idPdf = this.page.files[e].id;
      }
    },
	},
	mounted() {
		this.fileCount = this.page.files.length;
		if (this.page.files) {
				this.checkPdf(0)
			}
			else {
				this.pdf = ""
			}
	},
	data: () => ({
		fileCount: 0,
		pdf: "",
		title: "",
	}),
	watch: {
		page: {
			deep: true,
			handler(e) {
				this.fileCount = e.files.length;
				if (e.files.length > 0) {
					this.checkPdf(0)
				}
				else {
					this.pdf = ""
				}
				
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
		PageDeleted: {
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
