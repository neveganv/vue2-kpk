<template>
	<div class="py-10 px-5">
		<VRow justify="start">
			<VCol
				v-for="item in images"
				:key="item._id"
				cols="12"
				xl="4"
				lg="3"
				md="6"
				sm="6"
				v-if="!loading"
			>
				<VCard ripple height="200">
					<VCardText class="pa-0 ma-0">
						<div class="img__wrapper">
							<img :src="item.img" alt="" />
						</div>
					</VCardText>
					<VCardActions>
						<VSpacer />
						<VBtn color="error" text small @click="onDelete(item._id)">
							<VIcon left> mdi-delete </VIcon>
							Видалити
						</VBtn>
					</VCardActions>
				</VCard>
			</VCol>

			<VCol v-for="i in 3" :key="i" cols="12" xl="4" lg="3" md="6" sm="6" v-if="loading">
				<VCard ripple height="200">
					<VCardText class="pa-0 ma-0">
						<v-skeleton-loader
							type="image"
						></v-skeleton-loader>
					</VCardText>
				</VCard>
			</VCol>

			<VCol xl="4" lg="3" md="6" sm="6">
				<VCard
					ripple
					height="200"
					class="d-flex align-center"
					@click="onClickAdd"
				>
					<VCardText class="text-center unselectable pa-0">
						<VIcon>mdi-plus</VIcon>
						Додати Зображення
					</VCardText>
				</VCard>
				<input
					type="file"
					v-show="false"
					ref="imageInput"
					@change="onAddImage"
				/>
			</VCol>
		</VRow>
	</div>
</template>

<script>
import collegeInfoServices from '@/request/collegeInfo/collegeInfoServices';

export default {
	data: () => ({
		newImage: '',
		images: [],
		loading: false,
	}),
	mounted() {
		this.getAllImages();
	},
	methods: {
		async onDelete(itemID) {
			try {
				await collegeInfoServices.deletePhoto({
					id: itemID,
				});
				this.getAllImages()
			} catch (e) {
				alert(e);
			}
		},
		async getAllImages() {
			try {
				this.loading = true;
				const newItem = await collegeInfoServices.getPhotos()
				this.images = newItem.result.reverse()
				this.loading = false;
			} catch (e) {
				alert(e);
			}
		},
		onAddImage(e) {
			const files = e.target.files[0];
			if (files) {
				const reader = new FileReader();
				reader.readAsDataURL(files);
				reader.onload = e => {
				this.newImage = e.target.result;
				this.onUpdate();
				};
			}
		},
		onClickAdd() {
			this.$nextTick(function () {
				this.$refs.imageInput.click();
			});
		},
		async onUpdate() {
			try {
				await collegeInfoServices
					.createPhoto({
						img: this.newImage,
					})
					.then(e => {
						this.getAllImages()
						this.$refs.imageInput.value = '';

					});
			} catch (e) {}
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
