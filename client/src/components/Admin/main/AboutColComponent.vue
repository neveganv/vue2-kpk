<template>
	<div class="py-10 px-5">
		<VRow justify="start">
			<VCol v-for="i in 5" :key="i" cols="12" xl="4" lg="3" md="6" sm="6">
				<VCard ripple @click="onAddIMage" height="200">
					<VCardText class="pa-0 ma-0">
						<div class="img__wrapper">
							<img src="@/assets/img/first.jpg" alt="" />
						</div>
					</VCardText>
					<VCardActions>
                        <VSpacer />
						<VBtn color="error" text small>
							<VIcon left> mdi-delete </VIcon>
							Видалити
						</VBtn>
					</VCardActions>
				</VCard>
			</VCol>
			<VCol xl="4" lg="3" md="6" sm="6">
				<VCard
					ripple
					height="200"
					class="d-flex align-center"
					@click="onAddIMage"
				>
					<VCardText class="text-center unselectable pa-0">
						<VIcon>mdi-plus</VIcon>
						Додати картинку
					</VCardText>
				</VCard>
			</VCol>
		</VRow>
	</div>
</template>

<script>
export default {
	methods: {
		onAddIMage() {
			console.log(1);
		},
	},
};
</script>

<style scoped lang="scss">
.img__wrapper {
	width: inherit;
	height: 160px;
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}
</style>
