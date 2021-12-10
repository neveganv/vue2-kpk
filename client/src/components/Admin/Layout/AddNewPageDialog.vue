<template>
	<VDialog v-model="visibility" width="600" content-class="c-dialog">
		<VCard>
			<VCardTitle v-if="!addPageVisibility"> Додати нову папку </VCardTitle>
			<VCardTitle v-else> Додати нову сторінку </VCardTitle>
			<VCardText>
				<VRow>
					<VCol>
						<VTextField
							:label="addPageVisibility ? 'Назва сторінки' : 'Назва папки'"
              :prepend-icon="addPageVisibility ? 'mdi-note-edit-outline' : 'mdi-folder-edit-outline'"
							outlined
							dense
							hide-details
							v-model="page.name"
						>
						</VTextField>
					</VCol>
				</VRow>

				<VRow v-if="!addPageVisibility">
					<VCol>
						<v-select
							v-model="page.permissions"
							:items="Object.values(categories)"
							attach
							:item-value="'_id'"
							:item-text="'title'"
							prepend-icon="mdi-shield-account"
							outlined
							dense
							label="Права доступу"
							multiple
							deletable-chips
              :menu-props="{ bottom: true, offsetY: true }"

						>
							<template #selection="{ item }">
								<v-chip small color="primary">{{ item.title }}</v-chip>
							</template></v-select
						>
					</VCol>
				</VRow>
			</VCardText>
			<VCardActions>
				<VSpacer />
				<VBtn color="primary" @click="onCreateFolder" v-if="!addPageVisibility">
					Додати Папку
				</VBtn>
				<VBtn color="primary" @click="onCreatePage" v-else>
					Додати Сторінку
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script>
import pageService from '@/request/page/pageService';
import folderService from '@/request/folders/folderService';
import positionService from '@/request/positions/positionService';

export default {
	data: () => ({
		page: [],
		categories: [],
	}),
	props: {
		visible: {
			require: true,
		},
		addPageVisibility: {
			require: false,
		},
		folder: {
			type: Object,
			require: false,
		},
	},
	watch: {
		addPageVisibility: {
			deep: true,
			handler(e) {
				console.log(e);
			},
		},
	},
	mounted() {
		this.getPositions();
	},
	methods: {
		async onCreateFolder() {
      try {
        const params = [];
        params.name = this.page.name;
        params.positions = this.page.permissions;
				await folderService
					.addFolder({
						...params,
					})
					.then(res => {
						this.page = [];
						this.$emit('addedFolder', res);
						this.$emit('close');
					});
			} catch (e) {
				alert(e);
			}
		},
		async getPositions() {
			try {
				this.categories = await positionService.getAll();
			} catch (e) {
				alert(e);
			}
		},
		async onCreatePage() {
			try {
				const params = [];
				params.name = this.page.name;
				params.folder = this.folder._id;
				await pageService
					.addPage({
						...params,
					})
					.then(res => {
						this.page = [];
						this.$emit('addNewPage', res);
						this.$emit('close');
					});
			} catch (e) {
				alert(e);
			}
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
<style lang="scss" >
.v-dialog{
&.c-dialog{
  overflow-y:unset!important
}
}
  </style>
