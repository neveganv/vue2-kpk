<template>
	<VDialog v-model="visibility">
		<VCard width="700">
			<VCardTitle> Створити Новину </VCardTitle>
			<VCardText>
				<VTextField
					label="Заголовок"
					prepend-icon="mdi-clipboard-text"
					outlined
					dense
				>
				</VTextField>
				<v-file-input
					v-model="files"
					dense
					counter
					label="File input"
					placeholder="Головна картинка"
					prepend-icon="mdi-camera"
					outlined
					:show-size="1000"
				>
					<template v-slot:selection="{ index, text }">
						<v-chip v-if="index < 2" label small>
							{{ text }}
						</v-chip>

						<span
							v-else-if="index === 2"
							class="text-overline grey--text text--darken-3 mx-2"
						>
							+{{ files.length - 2 }} File(s)
						</span>
					</template>
				</v-file-input>
				тут буде едітор, но його поки немає
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="error" text @click="onCancel"> Скасувати </VBtn>
				<VBtn color="primary" @click="onCreate"> Створити </VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
export default {
	props: {
		visible: {
			require: true,
		},
	},
	methods: {
		onCancel() {
			this.$emit('close');
		},
		onCreate() {
			this.$emit('close');
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
