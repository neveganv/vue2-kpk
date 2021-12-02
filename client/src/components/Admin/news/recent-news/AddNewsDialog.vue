<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle v-if="chosenNews"> Оновити Круту Новину </VCardTitle>
			<VCardTitle v-else> Створити Круту Новину </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							label="Заголовок"
							prepend-icon="mdi-clipboard-text"
							outlined
							dense
							hide-details
							v-model="news.title"
						>
						</VTextField>
					</VCol>
				</VRow>
				<VRow>
					<VCol>
						<v-file-input
							dense
							counter
							label="Головна картинка"
							placeholder="Головна картинка"
							prepend-icon="mdi-camera"
							outlined
							accept="image/png, image/jpeg, image/svg"
							:show-size="1000"
							:rules="rules"
							v-model="news.main_img"
						>
							<template v-slot:selection="{ index, text }">
								<v-chip v-if="index < 2" label small>
									{{ text }}
								</v-chip>

								<span
									v-else-if="index === 2"
									class="text-overline grey--text text--darken-3 mx-2"
								>
									+{{ news.main_img.length - 2 }} File(s)
								</span>
							</template>
						</v-file-input>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onUpdate" v-if="chosenNews"> Оновити </VBtn>
				<VBtn color="primary" @click="onCreate" v-else> Створити </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import newsService from "@/request/news/newsService"
export default {
	data: () => ({
		rules: [
			value =>
				!value || value.size < 3000000 || 'Зображення повинне бути менше 3 MB!',
		],
		news: [],
	}),
	props: {
		visible: {
			require: true,
		},
		chosenNews: {
			require:false
		}
	},
	methods: {
		onCancel() {
			this.news = [];
			this.$emit('close');
		},
		async onCreate() {
			const params = [];
			console.log(this.news);
			params.title = this.news.title,
			params.img = this.news.main_img.name,
			this.$emit('close');
            await newsService.addCoolNews({
				...params
			})
		},
		async onUpdate(){
			const params = [];
			console.log(this.news);
			params.title = this.news.title,
			params.img = this.news.main_img.name,
			this.$emit('close');
            await newsService.updateCoolNews({
				...params
			})
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
