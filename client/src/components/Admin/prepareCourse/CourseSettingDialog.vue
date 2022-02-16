<template>
	<VDialog v-model="visibility" width="800">
		<VCard>
			<VCardTitle> Інформація Підготовчих курсів </VCardTitle>
			<VCardText>
				<VRow>
					<VCol cols="8">
						<VTextField
							label="Заголовок"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							v-model="settings.title"
							counter="70"
							maxlength="150"
						>
						</VTextField>
					</VCol>
					<VCol cols="4">
						<VTextField
							label="Ціна"
							prepend-icon="mdi-cash"
							outlined
							dense
							type="number"
							v-model="settings.price"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol v-if="!showEditorText">
						<vue-editor v-model="settings.content"></vue-editor>
					</VCol>

					<VCol v-else>
						<div v-html="settings.content" class="editor-view"></div>
					</VCol>
					<VBtn icon color="primary" @click="showEditorText = !showEditorText"
						><VIcon>mdi-eye</VIcon></VBtn
					>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onUpdate"> Оновити</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import entrantInfoService from '@/request/entrantInfo/entrantInfoService';
export default {
	components: {
		VueEditor,
	},
	props: {
		visible: {
			require: true,
		},
	},
	mounted(){
		this.getEntrantInfo()
	},
	methods: {
		async getEntrantInfo(){
			let settings = await entrantInfoService.getAll()
			this.settings = settings.result
		},
		async onUpdate() {
			try {
			const params = []
			params.title = this.settings.title
			params.content = this.settings.content
			params.price = this.settings.price
			await entrantInfoService.update(this.settings._id, {...params})
			this.$emit('close')
			}
			catch(e) {
				alert (e)
			}
		},
		onCancel() {
			this.$emit('close')
		},
	},
	data: () => ({
		settings: {},
		showEditorText: false,
	}),
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

<style lang="scss" scoped>
.editor-view {
	border: 1px solid #e3e3e3;
	padding: 5px;
	width: 100%;
	min-height: 283px;
	p {
		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	}
}
</style>
