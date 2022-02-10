<template>
	<div class="my-footer"
	:class="{
							md: $vuetify.breakpoint.md,
							sm: $vuetify.breakpoint.sm,
							xs: $vuetify.breakpoint.xs,
						}">
		<my-divider class="my-3" :height="1" />
		<v-slide-x-transition>
		<VRow no-gutters class="my-footer__inner" v-if="folders.length > 0  && !sceletonLoader">
			<VCol
				cols="12"
				xl="4"
				md="4"
				sm="4"
				class="my-footer__col"
				v-for="folder in folders"
				:key="folder._id"
			>
				<VCol class="my-footer__col-inner">
					<VRow no-gutters class="my-footer__col-title">
						<div class="mb-3">{{ folder.name || '--' }}</div>
					</VRow>
					<span
						:class="{
							'purple--text  font-weight-medium': page._id === $route.params.id,
						}"
						v-for="page in folder.pages"
						:key="page._id"
						@click="onClickPage(page._id)"
						>{{ page.name || '--' }}</span
					>
				</VCol>
			</VCol>
		</VRow>
		</v-slide-x-transition>
		<VRow v-if="sceletonLoader" no-gutters>
			<VCol cols="4" v-for="i in 6" :key="i">
				<v-skeleton-loader type="article"></v-skeleton-loader>
			</VCol>

		</VRow>
		<my-divider class="my-3" :height="1" />
	</div>
</template>

<script>
import myDivider from '../../UI/my-divider.vue';
import folderService from '@/request/folders/folderService';
import pageService from '@/request/page/pageService';
export default {
	components: { myDivider },
	mounted() {
		this.getFolders();
	},
	data: () => ({
		folders: [],
		sceletonLoader: false,
	}),
	methods: {
		onClickPage(e) {
			this.$router.push({ path: `/page/${e}` });
		},
		async getFolders() {
			try {
				this.sceletonLoader = true;
				const newPage = await pageService.getPages();
				const newFolder = await folderService.getFolders();
				this.folders = newFolder;
				this.folders.forEach(item => {
					item.pages = newPage.filter(e => e.folder._id == item._id);
				});
				this.sceletonLoader = false;

			} catch (e) {
				alert(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.my-footer {
	width: 100%;
	&__col-title {
		line-height: 18px;
		color: #757575;
		font-family: Montserrat;

		font-size: 17px;
		font-weight: normal;
	}
	span {
		display: flex;
		font-family: Montserrat;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		color: #4b4453;
		cursor: pointer;
		&:hover {
			color: darken(#4b4453, 90);
		}
		&:active {
			transform: scaleY(0.9);
		}
	}
}
</style>
