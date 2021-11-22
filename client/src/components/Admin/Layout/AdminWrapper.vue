<template>
	<VApp>
		<div>
			<v-app-bar color="white" style="height: 65px; top: 0; z-index: 1">
				<VAppBarNavIcon @click="mini = !mini"></VAppBarNavIcon>
				<div class="admin-logo ml-4">
					<img :src="require('@/assets/img/logo-admin.svg')" alt="" />
				</div>
				<VSpacer></VSpacer>
				<VBtn icon class="mr-5">
					<v-badge overlap content="99+">
						<VIcon>mdi-bell</VIcon>
					</v-badge>
				</VBtn>
				<UserDropDown :tmpUserName="tmpUserName" />
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
			<VList nav dense>
				<VListItemGroup color="primary">
					<VListItem :to="{ path: '/admin' }">
						<VListItemIcon>
							<VIcon>mdi-view-dashboard</VIcon>
						</VListItemIcon>
						<VListItemTitle>Головна</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/news' }">
						<VListItemIcon>
							<VIcon>mdi-newspaper-variant</VIcon>
						</VListItemIcon>
						<VListItemTitle>Новини</VListItemTitle>
					</VListItem>
				</VListItemGroup>
				<VListGroup class="listGroupMenu" :value="specialitiesSelector">
					<template v-slot:activator>
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Спеціальності</VListItemTitle>
					</template>
					<VListItem :to="{ path: '/2' }">
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Крута спеціальність</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/3' }">
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Не крута спеціальність</VListItemTitle>
					</VListItem>
					<VListItem :to="{ path: '/add' }">
						<VListItemIcon>
							<VIcon>mdi-folder-account</VIcon>
						</VListItemIcon>
						<VListItemTitle>Додати</VListItemTitle>
					</VListItem>
				</VListGroup>
				<VListItem @click="visible = true">
					<VListItemIcon>
						<VIcon>mdi-playlist-plus</VIcon>
					</VListItemIcon>
					<VListItemTitle>Додати</VListItemTitle>
				</VListItem>
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
		<AddNewPageDialog :visible="visible" @close="visible = false"/>
	</VApp>
</template>

<script>
import UserDropDown from './UserDropDown';
import AddNewPageDialog from './AddNewPageDialog';

export default {
	components: {
		UserDropDown,
		AddNewPageDialog
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
		clearInterval(this.intervalFetchData);
		console.log('destroyed');
	},
	data: () => ({
		mini: true,
		specialitiesSelector: false,
		fixed: false,
		tmpUserName: 'Ростик Урдейчук',
		visible:false
	}),
	methods: {
		handleScroll() {
			this.fixed = window.pageYOffset > 55;
		},
		addNewPage(){
			console.log(e)
		}
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
