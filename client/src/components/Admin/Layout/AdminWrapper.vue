<template>
	<VApp>
		<div>
			<v-app-bar color="white" style="height: 65px; top: 0; z-index: 1">
				<VAppBarNavIcon @click="mini = !mini"></VAppBarNavIcon>
				<div class="admin-logo ml-4">
					<VBadge color="error" overlap right bottom text content="pre-alpha">
						<img :src="require('@/assets/img/logo-admin.svg')" alt="" />
					</VBadge>
				</div>
				<VSpacer></VSpacer>
				<VBtn icon class="mr-5">
					<v-badge overlap content="99+">
						<VIcon>mdi-bell</VIcon>
					</v-badge>
				</VBtn>
				<UserDropDown :user="user" />
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
			<VList  dense shaped class="pl-0" >
				<VListItemGroup color="primary">
					<VListItem :to="{ path: '/admin' }">
						<VListItemIcon>
							<VIcon>mdi-view-dashboard-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Головна</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/admin-news' }">
						<VListItemIcon>
							<VIcon>mdi-newspaper-variant-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Новини</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/admin-specialities' }">
						<VListItemIcon>
							<VIcon>mdi-folder-account-outline</VIcon>
						</VListItemIcon>
						<VListItemTitle>Спеціальності</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/admin-shedule' }">
						<VListItemIcon>
							<VIcon>mdi-calendar</VIcon>
						</VListItemIcon>
						<VListItemTitle>Розклад</VListItemTitle>
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
							<VListItem  :to="{path:`/admin-dynamic-page/${page._id}`}">
								<VListItemIcon>
									<VIcon>mdi-note-outline</VIcon>
								</VListItemIcon>
								<VListItemTitle>{{ page.name }}</VListItemTitle>
							</VListItem>
						</div>
						<VListItem
						
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
						@click="
							visible = true;
							addPageVisibility = false;
						"
					>
						<VListItemIcon>
							<VBadge dot color="error" bottom overlap>
								<VIcon>mdi-folder-plus-outline</VIcon>
							</VBadge>
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
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container
				class="content-block_wrap"
				fluid
				:style="mini ? 'padding-left: 276px;' : 'padding-left: 76px;'"
			>
				<VCard class="content-block_wrap-card">
					<slot></slot>
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
		/>
	</VApp>
</template>

<script>
import UserDropDown from './UserDropDown';
import AddNewPageDialog from './AddNewPageDialog';
import usersService from '@/request/users/usersService';
import folderService from '@/request/folders/folderService';
import pageService from '@/request/page/pageService';

export default {
	components: {
		UserDropDown,
		AddNewPageDialog,
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.intervalFetchData);
		console.log('destroyed');
	},
	mounted() {
		this.getUser();
		this.getFolders();
	},
	data: () => ({
		mini: true,
		specialitiesSelector: false,
		fixed: false,
		user: {},
		visible: false,
		addPageVisibility: false,
		folders: [],
		selectedFolder: null,
		foldersLoader: false,
		activePage: true,
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
		async getUser() {
			try {

				this.user = await usersService.getOne(JSON.parse(localStorage.token));
			} catch (e) {
				alert(e);
			}
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
			this.addPageVisibility = false;
		},
		updateFolders(folder) {
			this.folders.push(folder);
			console.log(folder);
		},
		async getFolders() {
			try {
				this.foldersLoader = true;
				const newPage = await pageService.getPages();
				const newFolder = await folderService.getFolders();
				this.folders = newFolder;
				this.folders.forEach(item => {
					item.pages = newPage.filter(e => e.folder._id == item._id);
				});
				this.foldersLoader = false;
				console.log(this.folders);
			} catch (e) {
				alert(e);
			}
		},
	},
};
</script>

<style lang="scss">
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
</style>
