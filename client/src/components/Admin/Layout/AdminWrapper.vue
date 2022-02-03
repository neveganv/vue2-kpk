<template>
	<VApp>
		<div>
			<v-app-bar color="white" style="height: 65px; top: 0; z-index: 1">
				<VAppBarNavIcon @click="mini = !mini"></VAppBarNavIcon>
				<div class="admin-logo ml-4" >
					<VBadge color="error" overlap right bottom text content="beta">
						<img :src="require('@/assets/img/logo-admin.svg')" alt="" />
					</VBadge>
				</div>
				<VSpacer></VSpacer>
				<VBtn icon class="mr-5">
					<v-badge overlap content="99+">
						<VIcon>mdi-bell</VIcon>
					</v-badge>
				</VBtn>
				<UserDropDown :user="getUser" />
			</v-app-bar>
		</div>

		<v-navigation-drawer
			permanent
			absolute
			style="top: 65px; height: calc(100vh - 65px)"
			v-model="mini"
			:mini-variant="!mini"
			:class="{ fixed: fixed }"
		>
			<VDivider />
			<VList dense shaped class="pl-0">
				<VListItemGroup color="primary">
					<VListItem :to="{ path: '/admin' }" v-if="permissions.owner">
						<VListItemIcon>
							<VIcon>mdi-view-dashboard-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Головна</VListItemTitle>
					</VListItem>
					<VListItem
						:to="{ path: '/admin-news' }"
						v-if="permissions.can_edit_news"
					>
						<VListItemIcon>
							<VIcon>mdi-newspaper-variant-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Новини</VListItemTitle>
					</VListItem>
					<VListItem
						:to="{ path: '/admin-specialities' }"
						v-if="permissions.can_edit_specialities"
					>
						<VListItemIcon>
							<VIcon>mdi-folder-account-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Спеціальності</VListItemTitle>
					</VListItem>
					<VListItem
						:to="{ path: '/admin-shedule' }"
						v-if="permissions.can_edit_shedule"
					>
						<VListItemIcon>
							<VIcon>mdi-calendar</VIcon>
						</VListItemIcon>
						<VListItemTitle>Розклад</VListItemTitle>
					</VListItem>
					<VListItem
						:to="{ path: '/admin-prepareCourse' }"
						v-if="permissions.can_edit_prepareCourse"
					>
						<VListItemIcon>
							<VIcon>mdi-school-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Підготовчі курси</VListItemTitle>
					</VListItem>
				</VListItemGroup>
				<div v-if="!foldersLoader">
					<VListGroup
						class="listGroupMenu"
						:value="specialitiesSelector"
						v-for="folder in folders"
						:key="folder._id"
						
					>
						<template v-slot:activator>
							<VListItemIcon>
								<VIcon>mdi-folder-outline</VIcon>
							</VListItemIcon>
							<VListItemTitle>{{ folder.name }}</VListItemTitle>
						</template>
						<div v-for="page in folder.pages" :key="page._id">
							<VListItem :to="{ path: `/admin-dynamic-page/${page._id}` }">
								<VListItemIcon>
									<VIcon>mdi-note-outline</VIcon>
								</VListItemIcon>
								<VListItemTitle>{{ page.name }}</VListItemTitle>
							</VListItem>
						</div>
						<VListItem
								v-if="permissions.owner"
							@click="
								visible = true;
								addPageVisibility = true;
								selectedFolder = folder;
							"
						>
							<VListItemIcon>
								<VIcon>mdi-note-plus-outline</VIcon>
							</VListItemIcon>
							<VListItemTitle>Додати</VListItemTitle>
						</VListItem>
					</VListGroup>
					<VListItem
					v-if="permissions.owner"
						@click="
							visible = true;
							addPageVisibility = false;
						"
					>
						<VListItemIcon>
							<VIcon>mdi-folder-plus-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle> Додати </VListItemTitle>
					</VListItem>
				</div>
				<div v-else class="d-flex justify-center mt-4">
					<v-progress-circular
						indeterminate
						color="grey darken-2
"
						:width="4"
						:size="40"
					></v-progress-circular>
				</div>
			</VList>
		</v-navigation-drawer>
		<MainLoaderLine />
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container
				class="content-block_wrap"
				fluid
				:style="mini ? 'padding-left: 276px;' : 'padding-left: 76px;'"
			>
				<VCard class="content-block_wrap-card">
					<slot></slot>
					<MainLoader />
				</VCard>
			</v-container>
		</v-main>
		<AddNewPageDialog
			@addNewPage="addNewPage"
			:visible="visible"
			@close="visible = false"
			:addPageVisibility="addPageVisibility"
			@addedFolder="updateFolders"
			:folder="selectedFolder"
			v-if="visible"
		/>
	</VApp>
</template>

<script>
import UserDropDown from './UserDropDown';
import AddNewPageDialog from './AddNewPageDialog';
import MainLoader from '@/common/MainLoader';
import MainLoaderLine from '@/common/MainLoaderLine';
import folderService from '@/request/folders/folderService';
import pageService from '@/request/page/pageService';
import user from '@/mixins/user';

export default {
	components: {
		UserDropDown,
		MainLoader,
		AddNewPageDialog,
		MainLoaderLine,
	},
	mixins: [user],
	created() {},
	destroyed() {},
	mounted() {
		this.getFolders();
		console.log('userInfo', this.getUser);
		console.log('permissions', this.permissions);
	},
	data: () => ({
		mini: true,
		specialitiesSelector: false,
		fixed: false,
		visible: false,
		addPageVisibility: false,
		folders: [],
		user: {},
		selectedFolder: null,
		foldersLoader: false,
	}),
	computed: {
		isIdPage() {},
	},
	methods: {
		onPushDynamic(e) {
			this.$router.push({
				name: 'admin-dynamic-page',
				params: { id: e },
			});
			// .catch(() => {});
		},

		handleScroll() {
			this.fixed = window.pageYOffset > 55;
		},
		addNewPage(e) {
			const newPage = e;
			const myFolder = this.folders.filter(e => e._id == newPage.folder);
			if (!myFolder[0].pages) {
				myFolder[0].pages = [];
			}
			console.log(myFolder);
			myFolder[0].pages.push(newPage);
			this.$router.push({ path: `/admin-dynamic-page/${e._id}` });
			this.addPageVisibility = false;
		},
		updateFolders(folder) {
			this.getFolders();
			console.log(folder);
		},
		async getFolders() {
			try {
				if (localStorage.token) {
					this.foldersLoader = true;
					if(this.getUser.positionUUID){
						const newPage = await pageService.getPages();
						const newFolder = await folderService.getFolders({
							position: this.getUser.positionUUID,
						});
						this.folders = newFolder;
						this.folders.forEach(item => {
						item.pages = newPage.filter(e => e.folder._id == item._id);
					});
					}
				}
				this.foldersLoader = false;
			} catch (e) {
				this.foldersLoader = false;
				console.log(e)
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.listGroupMenu {
	.v-list-group__items {
		padding-left: 18px;
	}
}

.v-navigation-drawer--mini-variant {
	.listGroupMenu {
		.v-list-group__items {
			padding-left: 0;
			border-left: 3px solid;
			margin-left: -3px;
		}
	}
}
.admin-logo {
	height: 45px;
	width: 45px;
	border-radius: 25px;
	padding: 5px;
	box-shadow: 0px 1px 4px rgba(25, 118, 210, 0.2);

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
}
.fixed {
	position: fixed;
	top: 0 !important;
}
.content-block_wrap {
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	max-height: calc(100vh - 64px);
	min-height: calc(100vh - 64px);
	margin-top: 5px;
	&-card {
		min-height: calc(100vh - 94px);
		height: auto;
	}
}
body,
html {
	overflow: hidden !important;
}
</style>
