<template>
	<div class="px-3">
		<VRow no-gutters align="center" justify="space-between">
			<VRow>
				<VCol cols="auto"
					><VBtn text color="primary" @click="onChangeFolder">
						Назва папки</VBtn
					></VCol
				>
				<VIcon small>mdi-chevron-right</VIcon>
				<VCol cols="auto"><VBtn text disabled> Назва Сторінки</VBtn></VCol>
			</VRow>
			<div class="d-flex">
				<VCol cols="auto"
					><VBtn color="error" text @click="onCancel"
						><VIcon left>mdi-close</VIcon>Скасувати</VBtn
					></VCol
				>
				<VCol cols="auto"
					><VBtn color="success" @click="onCreate"
						><VIcon left>mdi-check-all</VIcon>Зберегти</VBtn
					></VCol
				>
			</div>
		</VRow>
		<VDivider class="mb-5" />

		<VRow no-gutters>
			<vue-editor class="editor w-100 px-2" v-model="page.content" />
		</VRow>
		<VRow justify="end">
			<v-speed-dial v-model="fab" transition="slide-y-reverse-transition">
				<template v-slot:activator>
					<v-btn v-model="fab" color="blue darken-2" dark fab small>
						<v-icon v-if="fab"> mdi-close </v-icon>
						<v-icon v-else> mdi-plus </v-icon>
					</v-btn>
				</template>
				<v-btn fab dark small color="green">
					<v-icon>mdi-file-pdf-box</v-icon>
				</v-btn>
				<v-btn fab dark small color="indigo">
					<v-icon>mdi-calendar-text</v-icon>
				</v-btn>
			</v-speed-dial>
		</VRow>
		<AddNewPageDialog
			:visible="editFolderVisivle"
			@close="visible = false"
            :isEditFolder="isEditFolder"
		/>	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import AddNewPageDialog from '../Layout/AddNewPageDialog';
export default {
	components: {
		VueEditor,
        AddNewPageDialog
        
	},
	data: () => ({
		page: [],
		fab: '',
		pageId: '',
        changeFolderVisible:false,
        isEditFolder:false,
        editFolderVisivle:false
	}),
	mounted() {
		this.pageId = this.$route.params.id;
		this.getPage();
	},
	methods: {
		async getPage() {
			console.log(213);
		},
		onCreate() {
			console.log(this.page.content);
		},
		onCancel() {
			this.page = [];
		},
		onChangeFolder() {
			this.isEditFolder = true;
			this.editFolderVisivle = true;
            
		},
	},
};
</script>

<style lang="scss" scoped>
.editor {
	min-height: 60vh;
	height: auto;
}
</style>
